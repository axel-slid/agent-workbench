const { app, BrowserWindow, clipboard, dialog, ipcMain, Menu, Notification, shell } = require("electron");
const crypto = require("node:crypto");
const { execFile } = require("node:child_process");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { promisify } = require("node:util");
const pty = require("node-pty");

app.setName(process.env.AGENT_WORKBENCH_USER_DATA_DIR ? "Agent Workbench Test" : "Agent Workbench");
if (process.env.AGENT_WORKBENCH_USER_DATA_DIR) {
  app.setPath("userData", process.env.AGENT_WORKBENCH_USER_DATA_DIR);
}

const execFileAsync = promisify(execFile);
let mainWindow = null;
const terminalSessions = new Map();
const sshAuthSessions = new Map();
const workspaceWatchers = new Map();
const workspaceRefreshTimers = new Map();
const remoteWorkspaceSyncTimers = new Map();
const remoteWorkspaceSyncBusy = new Set();
const remoteSystemMetricsCache = new Map();
const remoteSystemMetricsInFlight = new Map();
let previousCpuSample = null;

const ARTIFACT_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".pdf",
  ".md", ".txt", ".csv", ".json", ".html", ".htm",
  ".ppt", ".pptx", ".doc", ".docx", ".xls", ".xlsx"
]);
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);
const TEXT_EXTENSIONS = new Set([
  ".md", ".txt", ".csv", ".json", ".html", ".htm", ".js", ".mjs",
  ".cjs", ".ts", ".tsx", ".jsx", ".css", ".scss", ".py", ".rb", ".rs",
  ".go", ".java", ".c", ".cc", ".cpp", ".h", ".hpp", ".sh", ".zsh",
  ".fish", ".toml", ".yaml", ".yml", ".xml", ".tex"
]);
const IGNORED_DIRECTORIES = new Set([
  ".git", ".agent-workbench", "node_modules", ".next", ".cache",
  "__pycache__", ".venv", "venv", "dist", "build"
]);

function workspacesPath() {
  return path.join(app.getPath("userData"), "workspaces.json");
}

function sshHistoryPath() {
  return path.join(app.getPath("userData"), "ssh-history.json");
}

function sessionMetadataRoot() {
  return path.join(app.getPath("userData"), "agent-sessions");
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fsp.readFile(filePath, "utf8"));
  } catch (error) {
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await fsp.mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  await fsp.writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fsp.rename(temporaryPath, filePath);
}

async function readWorkspaces() {
  const items = await readJson(workspacesPath(), []);
  return Array.isArray(items) ? items.filter((item) => item && item.root) : [];
}

async function saveWorkspaces(items) {
  await writeJson(workspacesPath(), items);
}

function workspaceIdFor(root) {
  return crypto.createHash("sha1").update(path.resolve(root)).digest("hex").slice(0, 16);
}

function normalizeRemoteOptions(remote = {}) {
  const rawHost = String(remote.host || remote.server || "").trim();
  const at = rawHost.lastIndexOf("@");
  const parsedUser = at > 0 ? rawHost.slice(0, at) : "";
  const parsedHost = at > 0 ? rawHost.slice(at + 1) : rawHost;
  return {
    user: String(remote.user || parsedUser || "").trim(),
    host: String(parsedHost || "").trim(),
    path: String(remote.path || "~").trim() || "~",
    root: String(remote.root || "").trim(),
    controlPath: String(remote.controlPath || "").trim()
  };
}

function remoteTarget(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  return normalized.user ? `${normalized.user}@${normalized.host}` : normalized.host;
}

function validateRemote(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  if (!normalized.host) throw new Error("Enter an SSH server.");
  if (!/^[A-Za-z0-9._:-]+$/.test(normalized.host)) throw new Error("The SSH server contains unsupported characters.");
  if (normalized.user && !/^[A-Za-z0-9._-]+$/.test(normalized.user)) throw new Error("The SSH user contains unsupported characters.");
  if (/[\r\n\0]/.test(normalized.path)) throw new Error("The remote path is invalid.");
  return normalized;
}

function sshControlPath(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  // One master connection per login endpoint. Remote folders deliberately share
  // the same socket so switching projects never asks the user to authenticate again.
  const key = `${normalized.user || "user"}-${normalized.host || "host"}`;
  const uid = typeof process.getuid === "function" ? process.getuid() : os.userInfo().username;
  const hash = crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);
  return path.join("/tmp", `agent-workbench-ssh-${uid}`, `${hash}.sock`);
}

function sshConnectionArgs(remote = {}) {
  const normalized = validateRemote(remote);
  const controlPath = normalized.controlPath || sshControlPath(normalized);
  fs.mkdirSync(path.dirname(controlPath), { recursive: true });
  return [
    "-S", controlPath,
    "-o", "ControlMaster=auto",
    "-o", "ControlPersist=24h",
    "-o", "BatchMode=yes",
    "-o", "ConnectTimeout=15"
  ];
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function shellQuoteRemotePath(value) {
  const raw = String(value || "").trim();
  if (raw === "~") return "~";
  if (raw.startsWith("~/")) return `~/${shellQuote(raw.slice(2))}`;
  return shellQuote(raw);
}

function remoteLoginCommand(command) {
  return `exec \${SHELL:-/bin/bash} -lic ${shellQuote(command)}`;
}

function remoteWorkspaceCachePath(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  const key = `${normalized.user || "user"}@${normalized.host}:${normalized.path || "~"}`;
  const hash = crypto.createHash("sha1").update(key).digest("hex").slice(0, 20);
  const hostName = normalized.host.replace(/[^A-Za-z0-9._-]+/g, "-") || "ssh";
  return path.join(app.getPath("userData"), "remote-workspaces", `${hostName}-${hash}`);
}

function rsyncSshCommand(remote = {}) {
  return [resolveExecutable("ssh"), ...sshConnectionArgs(remote)]
    .map((part) => part.includes(" ") ? shellQuote(part) : part)
    .join(" ");
}

async function verifySshConnection(remote = {}) {
  const normalized = validateRemote(remote);
  const script = [
    "import json, os, sys",
    'root = os.path.abspath(os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else "~"))',
    'assert os.path.isdir(root), f"Remote path is not a directory: {root}"',
    'print(json.dumps({"root": root}))'
  ].join("\n");
  const { stdout } = await execFileAsync(
    resolveExecutable("ssh"),
    [
      ...sshConnectionArgs(normalized),
      remoteTarget(normalized),
      ["python3", "-c", script, normalized.path].map(shellQuote).join(" ")
    ],
    { timeout: 25000, maxBuffer: 1024 * 1024 }
  );
  const parsed = JSON.parse(stdout || "{}");
  return {
    ...normalized,
    root: parsed.root || normalized.path,
    controlPath: normalized.controlPath || sshControlPath(normalized)
  };
}

async function startSshAuthentication(_event, payload = {}) {
  const normalized = validateRemote(payload.remote || payload);
  const controlPath = normalized.controlPath || sshControlPath(normalized);
  fs.mkdirSync(path.dirname(controlPath), { recursive: true });
  try {
    await execFileAsync(
      resolveExecutable("ssh"),
      ["-S", controlPath, "-O", "check", remoteTarget(normalized)],
      { timeout: 4000, maxBuffer: 256 * 1024 }
    );
    return {
      id: null,
      reused: true,
      commandLabel: `ssh ${remoteTarget(normalized)} · authenticated`,
      controlPath
    };
  } catch (error) {
  }

  const id = crypto.randomUUID();
  const cwd = os.homedir();
  const args = [
    "-S", controlPath,
    "-o", "ControlMaster=auto",
    "-o", "ControlPersist=24h",
    "-o", "ConnectTimeout=20",
    "-o", "BatchMode=no",
    "-o", "StrictHostKeyChecking=ask",
    "-o", "PreferredAuthentications=publickey,keyboard-interactive,password",
    "-o", "NumberOfPasswordPrompts=3",
    "-o", "ServerAliveInterval=15",
    "-o", "ServerAliveCountMax=2",
    "-f",
    "-N",
    remoteTarget(normalized)
  ];

  ensurePtyHelperExecutable();
  const ptyProcess = pty.spawn(resolveExecutable("ssh"), args, {
    name: "xterm-256color",
    cols: Math.max(50, Math.min(180, Number(payload.cols) || 96)),
    rows: Math.max(6, Math.min(30, Number(payload.rows) || 9)),
    cwd,
    env: terminalEnvironment(cwd)
  });

  sshAuthSessions.set(id, { id, ptyProcess, remote: normalized, controlPath, exited: false });
  ptyProcess.onData((data) => sendToRenderer("ssh-auth:data", { id, data: String(data) }));
  ptyProcess.onExit(({ exitCode, signal }) => {
    const session = sshAuthSessions.get(id);
    if (session) session.exited = true;
    sshAuthSessions.delete(id);
    sendToRenderer("ssh-auth:exit", { id, code: exitCode, signal });
  });

  return {
    id,
    commandLabel: `ssh ${remoteTarget(normalized)} · authenticate`,
    controlPath
  };
}

function writeSshAuthentication(_event, payload = {}) {
  const session = sshAuthSessions.get(payload.id);
  if (!session || session.exited) return false;
  session.ptyProcess.write(String(payload.data || ""));
  return true;
}

function resizeSshAuthentication(_event, payload = {}) {
  const session = sshAuthSessions.get(payload.id);
  if (!session || session.exited) return false;
  session.ptyProcess.resize(
    Math.max(50, Math.min(180, Number(payload.cols) || 96)),
    Math.max(6, Math.min(30, Number(payload.rows) || 9))
  );
  return true;
}

function killSshAuthentication(_event, id) {
  const session = sshAuthSessions.get(id);
  if (!session) return false;
  if (!session.exited) session.ptyProcess.kill("SIGTERM");
  sshAuthSessions.delete(id);
  return true;
}

async function mirrorRemoteWorkspace(remote = {}, destination) {
  const normalized = validateRemote(remote);
  await fsp.mkdir(destination, { recursive: true });
  const remotePath = normalized.root || normalized.path || "~";
  const sourcePath = remotePath === "~"
    ? "~/"
    : `${shellQuoteRemotePath(remotePath.replace(/\/+$/, ""))}/`;
  const source = `${remoteTarget(normalized)}:${sourcePath}`;
  await execFileAsync(
    resolveExecutable("rsync"),
    [
      "-az",
      "--delete",
      "--delete-delay",
      "--partial",
      "--timeout=20",
      "--exclude", ".git/",
      "--exclude", ".agent-workbench/",
      "--exclude", "node_modules/",
      "--exclude", "__pycache__/",
      "--exclude", ".venv/",
      "--exclude", "venv/",
      "--exclude", ".cache/",
      "--exclude", ".pytest_cache/",
      "--exclude", ".mypy_cache/",
      "--exclude", ".ruff_cache/",
      "--exclude", ".tox/",
      "--exclude", ".ipynb_checkpoints/",
      "--exclude", "wandb/",
      "-e", rsyncSshCommand(normalized),
      source,
      `${destination}${path.sep}`
    ],
    { timeout: 120000, maxBuffer: 12 * 1024 * 1024 }
  );
}

async function mirrorRemoteFile(workspace, relativePath) {
  if (!workspace || workspace.type !== "ssh" || !workspace.remote) return;
  const normalizedRelative = String(relativePath || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");
  const destination = safeWorkspacePath(workspace.root, normalizedRelative);
  const remoteRoot = workspace.remote.root || workspace.remote.path || "~";
  const sourcePath = remoteChildPath(remoteRoot, normalizedRelative);
  await fsp.mkdir(path.dirname(destination), { recursive: true });
  await execFileAsync(
    resolveExecutable("rsync"),
    [
      "-az",
      "--partial",
      "--timeout=20",
      "-e", rsyncSshCommand(workspace.remote),
      `${remoteTarget(workspace.remote)}:${shellQuoteRemotePath(sourcePath)}`,
      destination
    ],
    { timeout: 30000, maxBuffer: 4 * 1024 * 1024 }
  );
}

async function mirrorRemoteWorkspaceInBackground(workspace) {
  if (!workspace || remoteWorkspaceSyncBusy.has(workspace.id)) return;
  remoteWorkspaceSyncBusy.add(workspace.id);
  try {
    await mirrorRemoteWorkspace(workspace.remote, workspace.root);
    sendToRenderer("workspace:changed", { workspaceId: workspace.id, relativePath: "", remoteSync: true });
  } catch (error) {
    const message = String(error && error.message ? error.message : error || "Remote sync failed.")
      .split(/\r?\n/)[0]
      .trim();
    sendToRenderer("workspace:changed", {
      workspaceId: workspace.id,
      relativePath: "",
      remoteSyncError: message || "Remote sync failed."
    });
  } finally {
    remoteWorkspaceSyncBusy.delete(workspace.id);
  }
}

function normalizedSshHistoryEntry(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  if (!normalized.host) return null;
  const target = remoteTarget(normalized);
  const lastPath = String(normalized.root || normalized.path || "~").trim() || "~";
  return {
    id: crypto.createHash("sha1").update(target).digest("hex").slice(0, 16),
    user: normalized.user,
    host: normalized.host,
    target,
    lastPath
  };
}

async function readSshHistory() {
  const history = await readJson(sshHistoryPath(), []);
  if (!Array.isArray(history)) return [];
  return history
    .filter((entry) => entry && entry.host)
    .map((entry) => ({
      id: String(entry.id || ""),
      user: String(entry.user || ""),
      host: String(entry.host || ""),
      target: String(entry.target || remoteTarget(entry)),
      lastPath: String(entry.lastPath || "~"),
      lastUsedAt: String(entry.lastUsedAt || ""),
      paths: (Array.isArray(entry.paths) ? entry.paths : [])
        .filter((item) => item && item.path)
        .map((item) => ({
          path: String(item.path),
          lastUsedAt: String(item.lastUsedAt || "")
        }))
        .slice(0, 16)
    }))
    .slice(0, 16);
}

async function rememberSshConnection(remote = {}) {
  const normalized = normalizedSshHistoryEntry(remote);
  if (!normalized) return;
  const now = new Date().toISOString();
  const history = await readSshHistory();
  const existingIndex = history.findIndex((entry) =>
    entry.user === normalized.user && entry.host === normalized.host
  );
  const existing = existingIndex >= 0 ? history.splice(existingIndex, 1)[0] : null;
  const paths = Array.isArray(existing?.paths) ? existing.paths : [];
  const nextPaths = [
    { path: normalized.lastPath, lastUsedAt: now },
    ...paths.filter((item) => item.path !== normalized.lastPath)
  ].slice(0, 16);
  history.unshift({
    ...normalized,
    lastUsedAt: now,
    paths: nextPaths
  });
  await writeJson(sshHistoryPath(), history.slice(0, 16));
}

async function listSshHosts() {
  const hosts = new Set();
  const sshDirectory = path.join(os.homedir(), ".ssh");
  const addHost = (host) => {
    const value = String(host || "").trim();
    if (!value || value === "*" || value.includes("*") || value.startsWith("|")) return;
    hosts.add(value);
  };

  try {
    const config = await fsp.readFile(path.join(sshDirectory, "config"), "utf8");
    config.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*Host\s+(.+)$/i);
      if (match) match[1].split(/\s+/).forEach(addHost);
    });
  } catch (error) {
  }

  try {
    const knownHosts = await fsp.readFile(path.join(sshDirectory, "known_hosts"), "utf8");
    knownHosts.split(/\r?\n/).forEach((line) => {
      const field = line.trim().split(/\s+/)[0] || "";
      field.split(",").forEach((entry) => addHost(entry.replace(/^\[([^\]]+)\](?::\d+)?$/, "$1").replace(/:\d+$/, "")));
    });
  } catch (error) {
  }

  const history = await readSshHistory();
  const workspaces = await readWorkspaces();
  for (const workspace of workspaces) {
    if (workspace.type !== "ssh" || !workspace.remote) continue;
    const normalized = normalizedSshHistoryEntry(workspace.remote);
    if (!normalized) continue;
    const existing = history.find((entry) =>
      entry.user === normalized.user && entry.host === normalized.host
    );
    const workspacePath = normalized.lastPath;
    if (existing) {
      if (!existing.paths.some((item) => item.path === workspacePath)) {
        existing.paths.push({
          path: workspacePath,
          lastUsedAt: workspace.lastOpenedAt || workspace.createdAt || ""
        });
      }
      continue;
    }
    history.push({
      ...normalized,
      lastUsedAt: workspace.lastOpenedAt || workspace.createdAt || "",
      paths: [{
        path: workspacePath,
        lastUsedAt: workspace.lastOpenedAt || workspace.createdAt || ""
      }]
    });
  }
  history.sort((left, right) =>
    String(right.lastUsedAt || "").localeCompare(String(left.lastUsedAt || ""))
  );
  await writeJson(sshHistoryPath(), history.slice(0, 16));
  history.forEach((entry) => hosts.add(entry.host));
  return {
    hosts: Array.from(hosts).sort((a, b) => a.localeCompare(b)),
    recentConnections: history.slice(0, 16)
  };
}

async function connectSshWorkspace(_event, remote = {}) {
  const verified = await verifySshConnection(remote);
  await rememberSshConnection(verified);
  const root = remoteWorkspaceCachePath(verified);
  await fsp.mkdir(root, { recursive: true });
  const now = new Date().toISOString();
  const id = crypto.createHash("sha1")
    .update(`ssh:${remoteTarget(verified)}:${verified.root}`)
    .digest("hex")
    .slice(0, 16);
  const workspaces = await readWorkspaces();
  const existingIndex = workspaces.findIndex((workspace) => workspace.id === id);
  const workspace = {
    id,
    name: path.posix.basename(verified.root.replace(/\/+$/, "")) || verified.host,
    root,
    type: "ssh",
    remote: verified,
    createdAt: existingIndex >= 0 ? workspaces[existingIndex].createdAt : now,
    lastOpenedAt: now
  };
  if (existingIndex >= 0) workspaces.splice(existingIndex, 1);
  workspaces.unshift(workspace);
  await saveWorkspaces(workspaces);
  ensureWorkspaceWatcher(workspace);
  void mirrorRemoteWorkspaceInBackground(workspace);
  return { ...workspace, syncing: true };
}

async function syncWorkspace(_event, workspaceId) {
  const workspace = (await readWorkspaces()).find((item) => item.id === workspaceId);
  if (!workspace) throw new Error("Workspace not found.");
  if (workspace.type !== "ssh" || !workspace.remote) return workspace;
  await mirrorRemoteWorkspace(workspace.remote, workspace.root);
  return workspace;
}

async function listWorkspaces() {
  const workspaces = await readWorkspaces();
  for (const workspace of workspaces) ensureWorkspaceWatcher(workspace);
  return workspaces.map((workspace) => ({
    ...workspace,
    type: workspace.type || "local",
    available: fs.existsSync(workspace.root)
  }));
}

async function addWorkspace() {
  const filePaths = dialog.showOpenDialogSync(mainWindow, {
    title: "Add workspace",
    properties: ["openDirectory", "createDirectory"]
  });
  if (!filePaths || !filePaths[0]) return null;

  const root = path.resolve(filePaths[0]);
  const workspaces = await readWorkspaces();
  let workspace = workspaces.find((item) => path.resolve(item.root) === root);
  const now = new Date().toISOString();

  if (!workspace) {
    workspace = {
      id: workspaceIdFor(root),
      name: path.basename(root) || root,
      root,
      type: "local",
      createdAt: now,
      lastOpenedAt: now
    };
    workspaces.unshift(workspace);
  } else {
    workspace.lastOpenedAt = now;
    workspaces.splice(workspaces.indexOf(workspace), 1);
    workspaces.unshift(workspace);
  }

  await saveWorkspaces(workspaces);
  ensureWorkspaceWatcher(workspace);
  return workspace;
}

async function removeWorkspace(_event, workspaceId) {
  const workspaces = await readWorkspaces();
  const next = workspaces.filter((workspace) => workspace.id !== workspaceId);
  await saveWorkspaces(next);
  const watcher = workspaceWatchers.get(workspaceId);
  if (watcher) watcher.close();
  workspaceWatchers.delete(workspaceId);
  return true;
}

async function renameWorkspace(_event, payload = {}) {
  const workspaceId = String(payload.workspaceId || "");
  const name = String(payload.name || "").trim().replace(/[\r\n]/g, " ").slice(0, 64);
  if (!workspaceId) throw new Error("Missing workspace.");
  if (!name) throw new Error("Enter a workspace name.");
  const workspaces = await readWorkspaces();
  const workspace = workspaces.find((item) => item.id === workspaceId);
  if (!workspace) throw new Error("Workspace not found.");
  workspace.name = name;
  workspace.lastOpenedAt = new Date().toISOString();
  await saveWorkspaces(workspaces);
  return workspace;
}

async function getWorkspace(workspaceId) {
  const workspace = (await readWorkspaces()).find((item) => item.id === workspaceId);
  if (!workspace) throw new Error("Workspace not found.");
  if (!fs.existsSync(workspace.root)) throw new Error(`Workspace is unavailable: ${workspace.root}`);
  return workspace;
}

function safeWorkspacePath(root, relativePath = "") {
  const workspaceRoot = path.resolve(root);
  const resolved = path.resolve(workspaceRoot, String(relativePath || "").replace(/^[/\\]+/, ""));
  if (resolved !== workspaceRoot && !resolved.startsWith(`${workspaceRoot}${path.sep}`)) {
    throw new Error("Path escapes the workspace.");
  }
  return resolved;
}

function normalizedRelativePath(root, absolutePath) {
  return path.relative(root, absolutePath).split(path.sep).join("/");
}

function shouldIgnoreRelativePath(relativePath) {
  return String(relativePath || "")
    .split(/[\\/]/)
    .some((part) => IGNORED_DIRECTORIES.has(part));
}

async function walkFileTree(root, current = root, depth = 0, budget = { count: 0 }) {
  if (depth > 8 || budget.count > 2500) return [];
  let entries = [];
  try {
    entries = await fsp.readdir(current, { withFileTypes: true });
  } catch (error) {
    return [];
  }

  entries.sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
  });

  const nodes = [];
  for (const entry of entries) {
    if (budget.count > 2500) break;
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue;
    if (entry.name === ".DS_Store") continue;
    budget.count += 1;
    const absolutePath = path.join(current, entry.name);
    const relativePath = normalizedRelativePath(root, absolutePath);
    const node = {
      name: entry.name,
      relativePath,
      type: entry.isDirectory() ? "directory" : "file"
    };
    if (entry.isDirectory()) {
      node.children = await walkFileTree(root, absolutePath, depth + 1, budget);
    } else {
      const extension = path.extname(entry.name).toLowerCase();
      node.artifact = ARTIFACT_EXTENSIONS.has(extension);
    }
    nodes.push(node);
  }
  return nodes;
}

async function listWorkspaceFiles(_event, workspaceId) {
  const workspace = await getWorkspace(workspaceId);
  return walkFileTree(workspace.root);
}

function validWorkspaceEntryName(value) {
  const name = String(value || "").trim();
  if (!name || name === "." || name === "..") throw new Error("Enter a file or folder name.");
  if (/[/\\\0\r\n]/.test(name)) throw new Error("Names cannot contain slashes.");
  return name;
}

async function uniqueWorkspaceDestination(parentDirectory, requestedName) {
  const parsed = path.parse(validWorkspaceEntryName(requestedName));
  let attempt = 1;
  let candidateName = requestedName;
  let candidatePath = path.join(parentDirectory, candidateName);
  while (fs.existsSync(candidatePath)) {
    attempt += 1;
    candidateName = `${parsed.name} ${attempt}${parsed.ext}`;
    candidatePath = path.join(parentDirectory, candidateName);
  }
  return { name: candidateName, path: candidatePath };
}

function remoteChildPath(root, relativePath) {
  const base = String(root || "~").replace(/\/+$/, "") || "/";
  const child = String(relativePath || "").replace(/^\/+/, "");
  if (!child) return base;
  return base === "/" ? `/${child}` : `${base}/${child}`;
}

async function createWorkspaceEntry(_event, payload = {}) {
  const workspace = await getWorkspace(payload.workspaceId);
  const kind = payload.kind === "folder" ? "folder" : "file";
  const name = validWorkspaceEntryName(payload.name);
  const parentPath = String(payload.parentPath || "").replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  const relativePath = path.posix.join(parentPath, name);
  const absolutePath = safeWorkspacePath(workspace.root, relativePath);

  if (workspace.type === "ssh" && workspace.remote) {
    const remoteRoot = workspace.remote.root || workspace.remote.path || "~";
    const remotePath = remoteChildPath(remoteRoot, relativePath);
    const parentRelativePath = path.posix.dirname(relativePath);
    const parentRemotePath = remoteChildPath(remoteRoot, parentRelativePath === "." ? "" : parentRelativePath);
    const quotedPath = shellQuoteRemotePath(remotePath);
    const quotedParent = shellQuoteRemotePath(parentRemotePath);
    const command = kind === "folder"
      ? `test ! -e ${quotedPath} && mkdir ${quotedPath}`
      : `test ! -e ${quotedPath} && mkdir -p ${quotedParent} && : > ${quotedPath}`;
    await execFileAsync(
      resolveExecutable("ssh"),
      [...sshConnectionArgs(workspace.remote), remoteTarget(workspace.remote), command],
      { timeout: 15000, maxBuffer: 512 * 1024 }
    );
    if (kind === "folder") {
      await fsp.mkdir(absolutePath, { recursive: true });
    } else {
      await fsp.mkdir(path.dirname(absolutePath), { recursive: true });
      await fsp.writeFile(absolutePath, "", { flag: "a" });
    }
  } else if (kind === "folder") {
    await fsp.mkdir(absolutePath);
  } else {
    await fsp.writeFile(absolutePath, "", { flag: "wx" });
  }

  sendToRenderer("workspace:changed", { workspaceId: workspace.id, relativePath });
  return { kind, name, relativePath };
}

async function importWorkspacePaths(_event, payload = {}) {
  const workspace = await getWorkspace(payload.workspaceId);
  const parentPath = String(payload.parentPath || "").replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  const parentDirectory = safeWorkspacePath(workspace.root, parentPath);
  await fsp.mkdir(parentDirectory, { recursive: true });
  const sourcePaths = Array.from(new Set(
    (Array.isArray(payload.paths) ? payload.paths : [])
      .map((value) => String(value || "").trim())
      .filter(Boolean)
  )).slice(0, 64);
  if (!sourcePaths.length) throw new Error("Drop a file or folder to import it.");

  const imported = [];
  for (const sourcePath of sourcePaths) {
    const source = path.resolve(sourcePath);
    const stat = await fsp.stat(source);
    if (!stat.isFile() && !stat.isDirectory()) continue;
    const destination = await uniqueWorkspaceDestination(parentDirectory, path.basename(source));
    if (destination.path === source || destination.path.startsWith(`${source}${path.sep}`)) {
      throw new Error("That folder cannot be copied into itself.");
    }
    await fsp.cp(source, destination.path, {
      recursive: stat.isDirectory(),
      errorOnExist: true,
      force: false,
      preserveTimestamps: true
    });

    const relativePath = normalizedRelativePath(workspace.root, destination.path);
    if (workspace.type === "ssh" && workspace.remote) {
      const remoteRoot = workspace.remote.root || workspace.remote.path || "~";
      const remoteParent = remoteChildPath(remoteRoot, parentPath);
      await execFileAsync(
        resolveExecutable("ssh"),
        [
          ...sshConnectionArgs(workspace.remote),
          remoteTarget(workspace.remote),
          `mkdir -p ${shellQuoteRemotePath(remoteParent)}`
        ],
        { timeout: 15000, maxBuffer: 512 * 1024 }
      );
      await execFileAsync(
        resolveExecutable("rsync"),
        [
          "-az",
          "--partial",
          "--timeout=20",
          "-e", rsyncSshCommand(workspace.remote),
          destination.path,
          `${remoteTarget(workspace.remote)}:${shellQuoteRemotePath(remoteParent)}/`
        ],
        { timeout: 120000, maxBuffer: 12 * 1024 * 1024 }
      );
    }
    imported.push({
      name: destination.name,
      relativePath,
      type: stat.isDirectory() ? "directory" : "file"
    });
  }

  sendToRenderer("workspace:changed", {
    workspaceId: workspace.id,
    relativePath: parentPath,
    imported: imported.map((item) => item.relativePath)
  });
  return imported;
}

async function renameWorkspaceEntry(_event, payload = {}) {
  const workspace = await getWorkspace(payload.workspaceId);
  const relativePath = String(payload.relativePath || "").replace(/\\/g, "/").replace(/^\/+/, "");
  const sourcePath = safeWorkspacePath(workspace.root, relativePath);
  const nextName = validWorkspaceEntryName(payload.name);
  const parentRelative = path.posix.dirname(relativePath);
  const nextRelative = path.posix.join(parentRelative === "." ? "" : parentRelative, nextName);
  const destinationPath = safeWorkspacePath(workspace.root, nextRelative);
  if (fs.existsSync(destinationPath)) throw new Error("A file or folder with that name already exists.");

  if (workspace.type === "ssh" && workspace.remote) {
    const remoteRoot = workspace.remote.root || workspace.remote.path || "~";
    const remoteSource = remoteChildPath(remoteRoot, relativePath);
    const remoteDestination = remoteChildPath(remoteRoot, nextRelative);
    await execFileAsync(
      resolveExecutable("ssh"),
      [
        ...sshConnectionArgs(workspace.remote),
        remoteTarget(workspace.remote),
        `test ! -e ${shellQuoteRemotePath(remoteDestination)} && mv ${shellQuoteRemotePath(remoteSource)} ${shellQuoteRemotePath(remoteDestination)}`
      ],
      { timeout: 20000, maxBuffer: 512 * 1024 }
    );
  }
  await fsp.rename(sourcePath, destinationPath);
  sendToRenderer("workspace:changed", { workspaceId: workspace.id, relativePath: nextRelative });
  return { relativePath: nextRelative, name: nextName };
}

async function duplicateWorkspaceEntry(workspace, relativePath) {
  const sourcePath = safeWorkspacePath(workspace.root, relativePath);
  const stat = await fsp.stat(sourcePath);
  const parentDirectory = path.dirname(sourcePath);
  const parsed = path.parse(path.basename(sourcePath));
  const destination = await uniqueWorkspaceDestination(parentDirectory, `${parsed.name} copy${parsed.ext}`);
  const nextRelative = normalizedRelativePath(workspace.root, destination.path);

  if (workspace.type === "ssh" && workspace.remote) {
    const remoteRoot = workspace.remote.root || workspace.remote.path || "~";
    const remoteSource = remoteChildPath(remoteRoot, relativePath);
    const remoteDestination = remoteChildPath(remoteRoot, nextRelative);
    await execFileAsync(
      resolveExecutable("ssh"),
      [
        ...sshConnectionArgs(workspace.remote),
        remoteTarget(workspace.remote),
        `test ! -e ${shellQuoteRemotePath(remoteDestination)} && cp -R ${shellQuoteRemotePath(remoteSource)} ${shellQuoteRemotePath(remoteDestination)}`
      ],
      { timeout: 120000, maxBuffer: 1024 * 1024 }
    );
  }
  await fsp.cp(sourcePath, destination.path, {
    recursive: stat.isDirectory(),
    errorOnExist: true,
    force: false,
    preserveTimestamps: true
  });
  sendToRenderer("workspace:changed", { workspaceId: workspace.id, relativePath: nextRelative });
  return { relativePath: nextRelative, name: destination.name };
}

async function collectArtifacts(root, current = root, depth = 0, results = []) {
  if (depth > 10 || results.length > 400) return results;
  let entries = [];
  try {
    entries = await fsp.readdir(current, { withFileTypes: true });
  } catch (error) {
    return results;
  }

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;
    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name)) {
        await collectArtifacts(root, path.join(current, entry.name), depth + 1, results);
      }
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!ARTIFACT_EXTENSIONS.has(extension)) continue;
    const absolutePath = path.join(current, entry.name);
    try {
      const stat = await fsp.stat(absolutePath);
      results.push({
        name: entry.name,
        relativePath: normalizedRelativePath(root, absolutePath),
        extension,
        size: stat.size,
        modifiedAt: stat.mtime.toISOString(),
        fileUrl: pathToFileURL(absolutePath).href,
        kind: IMAGE_EXTENSIONS.has(extension) ? "image" : extension === ".pdf" ? "pdf" : "file"
      });
    } catch (error) {
    }
  }
  return results;
}

async function listArtifacts(_event, workspaceId) {
  const workspace = await getWorkspace(workspaceId);
  const artifacts = await collectArtifacts(workspace.root);
  const attributions = await collectArtifactAttributions(workspace.id);
  return artifacts
    .map((artifact) => {
      const owner = attributions.get(artifact.relativePath);
      return {
        ...artifact,
        agentId: owner ? owner.id : null,
        agentName: owner ? owner.name : "Imported",
        agentKind: owner ? owner.kind : null,
        agentNumber: owner ? owner.agentNumber : null
      };
    })
    .sort((a, b) => String(b.modifiedAt).localeCompare(String(a.modifiedAt)))
    .slice(0, 80);
}

async function collectArtifactAttributions(workspaceId) {
  const directory = path.join(sessionMetadataRoot(), workspaceId);
  let entries = [];
  try {
    entries = await fsp.readdir(directory, { withFileTypes: true });
  } catch (error) {
    return new Map();
  }
  const owners = new Map();
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    const metadata = await readJson(path.join(directory, entry.name), null);
    if (!metadata) continue;
    const reportedFiles = [
      ...(Array.isArray(metadata.relevantFiles) ? metadata.relevantFiles : []),
      ...(Array.isArray(metadata.recentFiles) ? metadata.recentFiles : [])
    ];
    if (!reportedFiles.length) continue;
    const updatedAt = Date.parse(metadata.updatedAt || metadata.createdAt || 0) || 0;
    for (const relativePath of new Set(reportedFiles)) {
      const key = String(relativePath || "").replace(/^[/\\]+/, "").split(path.sep).join("/");
      if (!key) continue;
      const current = owners.get(key);
      if (!current || updatedAt >= current.updatedAt) {
        owners.set(key, {
          id: metadata.id,
          name: metadata.name || `${metadata.kind || "Agent"} agent`,
          kind: metadata.kind || "shell",
          agentNumber: Number.isInteger(metadata.agentNumber) ? metadata.agentNumber : 1,
          updatedAt
        });
      }
    }
  }
  return owners;
}

function mimeTypeFor(extension) {
  return {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml"
  }[extension] || "application/octet-stream";
}

async function readArtifact(_event, payload = {}) {
  const workspace = await getWorkspace(payload.workspaceId);
  if (workspace.type === "ssh" && workspace.remote) {
    await mirrorRemoteFile(workspace, payload.relativePath);
  }
  const absolutePath = safeWorkspacePath(workspace.root, payload.relativePath);
  const stat = await fsp.stat(absolutePath);
  if (!stat.isFile()) throw new Error("Artifact is not a file.");
  const extension = path.extname(absolutePath).toLowerCase();
  const base = {
    name: path.basename(absolutePath),
    relativePath: normalizedRelativePath(workspace.root, absolutePath),
    extension,
    fileUrl: pathToFileURL(absolutePath).href,
    size: stat.size
  };

  if (IMAGE_EXTENSIONS.has(extension) && stat.size <= 12 * 1024 * 1024) {
    const data = await fsp.readFile(absolutePath);
    return { ...base, kind: "image", dataUrl: `data:${mimeTypeFor(extension)};base64,${data.toString("base64")}` };
  }
  if (TEXT_EXTENSIONS.has(extension) && stat.size <= 768 * 1024) {
    return { ...base, kind: "text", text: await fsp.readFile(absolutePath, "utf8") };
  }
  if (extension === ".pdf") return { ...base, kind: "pdf" };
  return { ...base, kind: "file" };
}

async function openWorkspaceFile(_event, payload = {}) {
  const workspace = await getWorkspace(payload.workspaceId);
  if (workspace.type === "ssh" && workspace.remote) {
    await mirrorRemoteFile(workspace, payload.relativePath);
  }
  return shell.openPath(safeWorkspacePath(workspace.root, payload.relativePath));
}

async function showWorkspaceFileMenu(event, payload = {}) {
  const workspace = await getWorkspace(payload.workspaceId);
  const relativePath = String(payload.relativePath || "").replace(/\\/g, "/").replace(/^\/+/, "");
  const absolutePath = safeWorkspacePath(workspace.root, relativePath);
  const stat = await fsp.stat(absolutePath);
  const isDirectory = stat.isDirectory();
  const copyPath = workspace.type === "ssh" && workspace.remote
    ? remoteChildPath(workspace.remote.root || workspace.remote.path || "~", relativePath)
    : absolutePath;
  const sender = event.sender;
  const sendMenuAction = (action, extra = {}) => {
    if (!sender.isDestroyed()) {
      sender.send("workspace:menu-action", {
        action,
        workspaceId: workspace.id,
        relativePath,
        isDirectory,
        ...extra
      });
    }
  };
  const openInCode = () => {
    const { spawn } = require("node:child_process");
    const child = spawn("/usr/bin/open", ["-a", "Visual Studio Code", absolutePath], {
      detached: true,
      stdio: "ignore"
    });
    child.unref();
  };
  const parentPath = isDirectory
    ? relativePath
    : path.posix.dirname(relativePath) === "."
      ? ""
      : path.posix.dirname(relativePath);
  const menu = Menu.buildFromTemplate([
    {
      label: isDirectory ? "Open Folder" : "Open",
      click: () => shell.openPath(absolutePath)
    },
    {
      label: "Open in Visual Studio Code",
      click: openInCode
    },
    {
      label: "Reveal in Finder",
      click: () => shell.showItemInFolder(absolutePath)
    },
    { type: "separator" },
    {
      label: "New File Here",
      click: () => sendMenuAction("new-file", { parentPath })
    },
    {
      label: "New Folder Here",
      click: () => sendMenuAction("new-folder", { parentPath })
    },
    { type: "separator" },
    {
      label: "Rename…",
      click: () => sendMenuAction("rename")
    },
    {
      label: "Duplicate",
      click: async () => {
        try {
          const duplicate = await duplicateWorkspaceEntry(workspace, relativePath);
          sendMenuAction("duplicated", duplicate);
        } catch (error) {
          sendMenuAction("error", { message: error.message || String(error) });
        }
      }
    },
    { type: "separator" },
    {
      label: "Copy Path",
      click: () => clipboard.writeText(copyPath)
    },
    {
      label: "Copy Relative Path",
      click: () => clipboard.writeText(relativePath)
    }
  ]);
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) || mainWindow });
  return copyPath;
}

async function openWorkspaceInCode(_event, workspaceId) {
  const workspace = await getWorkspace(workspaceId);
  if (process.platform === "darwin") {
    const { spawn } = require("node:child_process");
    const child = spawn("/usr/bin/open", ["-a", "Visual Studio Code", workspace.root], {
      detached: true,
      stdio: "ignore"
    });
    child.unref();
    return true;
  }
  return shell.openPath(workspace.root);
}

function resolveExecutable(name) {
  const candidates = [
    path.join("/opt/homebrew/bin", name),
    path.join("/usr/local/bin", name),
    path.join(os.homedir(), ".local", "bin", name),
    path.join(os.homedir(), "bin", name),
    name
  ];
  for (const candidate of candidates) {
    if (candidate === name) return name;
    try {
      if (fs.statSync(candidate).isFile()) return candidate;
    } catch (error) {
    }
  }
  return name;
}

function terminalEnvironment(cwd) {
  const pathParts = [
    "/opt/homebrew/bin", "/opt/homebrew/sbin", "/usr/local/bin",
    process.env.PATH || "", "/usr/bin", "/bin", "/usr/sbin", "/sbin"
  ].join(path.delimiter);
  return {
    ...process.env,
    COLORTERM: "truecolor",
    FORCE_COLOR: "1",
    PATH: pathParts,
    PWD: cwd,
    TERM: "xterm-256color"
  };
}

function ensurePtyHelperExecutable() {
  const architecture = process.arch === "arm64" ? "darwin-arm64" : "darwin-x64";
  const helperPath = path
    .join(__dirname, "node_modules", "node-pty", "prebuilds", architecture, "spawn-helper")
    .replace("app.asar", "app.asar.unpacked")
    .replace("node_modules.asar", "node_modules.asar.unpacked");
  try {
    if (fs.existsSync(helperPath)) fs.chmodSync(helperPath, 0o755);
  } catch (error) {
  }
}

function agentProtocol(metadataPath, workspaceRoot) {
  return [
    "You are running inside Agent Workbench.",
    `Your workspace is ${workspaceRoot}.`,
    `Maintain your session metadata at ${metadataPath}.`,
    "Immediately, and whenever your task or progress changes, write valid JSON to that file.",
    'Use exactly these fields: {"name":"short task-specific name","tldr":"one sentence under 140 characters","status":"working|waiting|done|error","state":"planning|coding|waiting|failed|complete","model":"exact model name and effort","currentTask":"short current step","etaSeconds":number|null,"etaMinutes":number|null,"progressPercent":number,"checklist":[{"text":"short concrete step","status":"pending|working|done|blocked","etaSeconds":number|null}],"inputTokens":number|null,"outputTokens":number|null,"costUsd":number|null,"testsPassed":number|null,"testsFailed":number|null,"relevantFiles":["workspace-relative/path"],"previewFile":"workspace-relative/path"|null}.',
    "Choose your own short name based on what you are doing. Keep relevantFiles current, ordered most useful first, with only files the user is likely to want to open. Use workspace-relative paths and omit incidental implementation files.",
    "Keep model, currentTask, progressPercent, checklist, token counts, costUsd, test results, and state current. Keep checklist items short, mark them done immediately when finished, and mark exactly one active step working when possible. Give the working item an honest etaSeconds remaining; for pending items, etaSeconds is the estimated duration once that item starts. Use null when your runtime does not expose a metric; never invent usage, cost, or test results.",
    "Set etaSeconds to your honest estimate of seconds remaining and etaMinutes to the same estimate rounded up to minutes. Re-estimate after every major step and at least once per minute. Do not rewrite an unchanged estimate just to refresh it. Use null while waiting for a task and 0 when done.",
    "Set status to done immediately when the task is complete so Agent Workbench can notify the user.",
    "Whenever you create or materially update a viewable output such as an image, PDF, HTML, SVG, Markdown, text report, chart, or data file, set previewFile to its workspace-relative path so Agent Workbench opens it in the Agent Output pane.",
    "Do not mention this metadata protocol in normal conversation."
  ].join("\n");
}

function localCodexRuntimeLabel() {
  try {
    const config = fs.readFileSync(path.join(os.homedir(), ".codex", "config.toml"), "utf8");
    const model = config.match(/^\s*model\s*=\s*"([^"]+)"/m)?.[1];
    const effort = config.match(/^\s*model_reasoning_effort\s*=\s*"([^"]+)"/m)?.[1];
    if (model) return effort ? `${model} [${effort}]` : model;
  } catch (error) {
  }
  return "Codex";
}

function initialAgentMetadata(id, kind, task, workspaceId, agentNumber, modelLabel = "") {
  return {
    id,
    workspaceId,
    kind,
    agentNumber,
    name: task ? task.slice(0, 34) : `${kind === "claude" ? "Claude" : kind === "codex" ? "Codex" : "Shell"} agent`,
    tldr: task || "Waiting for a task.",
    status: task ? "working" : "waiting",
    state: task ? "planning" : "waiting",
    model: modelLabel || (kind === "codex" ? "Codex" : kind === "claude" ? "Claude" : "Shell"),
    currentTask: task || "Waiting for a task",
    etaSeconds: null,
    etaMinutes: null,
    progressPercent: task ? 5 : 0,
    checklist: [],
    inputTokens: null,
    outputTokens: null,
    costUsd: null,
    testsPassed: null,
    testsFailed: null,
    relevantFiles: [],
    recentFiles: [],
    previewFile: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

async function mergeSessionMetadata(session, patch) {
  const current = await readJson(session.metadataPath, session.metadata);
  const next = {
    ...session.metadata,
    ...current,
    ...patch,
    id: session.id,
    workspaceId: session.workspaceId,
    kind: session.kind,
    agentNumber: session.metadata.agentNumber,
    updatedAt: patch.updatedAt || new Date().toISOString()
  };
  session.metadata = next;
  await writeJson(session.metadataPath, next);
  sendToRenderer("agent:metadata", next);
  return next;
}

async function refreshSessionMetadata(session) {
  const metadata = await readJson(session.metadataPath, null);
  if (!metadata || typeof metadata !== "object") return;
  let fileUpdatedAt = metadata.updatedAt;
  if (!fileUpdatedAt) {
    try {
      fileUpdatedAt = (await fsp.stat(session.metadataPath)).mtime.toISOString();
    } catch (error) {
      fileUpdatedAt = new Date().toISOString();
    }
  }
  session.metadata = {
    ...session.metadata,
    ...metadata,
    id: session.id,
    workspaceId: session.workspaceId,
    kind: session.kind,
    agentNumber: session.metadata.agentNumber,
    updatedAt: fileUpdatedAt
  };
  sendToRenderer("agent:metadata", session.metadata);
}

async function refreshRemoteSessionMetadata(session) {
  if (!session.remote || !session.remoteMetadataPath || session.exited) return;
  try {
    const { stdout } = await execFileAsync(
      resolveExecutable("ssh"),
      [
        ...sshConnectionArgs(session.remote),
        remoteTarget(session.remote),
        `cat ${shellQuoteRemotePath(session.remoteMetadataPath)}`
      ],
      { timeout: 8000, maxBuffer: 512 * 1024 }
    );
    const rawMetadata = String(stdout || "").trim();
    if (!rawMetadata || rawMetadata === session.lastRemoteMetadataRaw) return;
    session.lastRemoteMetadataRaw = rawMetadata;
    const metadata = JSON.parse(rawMetadata);
    if (!metadata.updatedAt) metadata.updatedAt = new Date().toISOString();
    if (metadata && typeof metadata === "object") await mergeSessionMetadata(session, metadata);
  } catch (error) {
  }
}

function ensureRemoteWorkspacePolling(workspace) {
  if (!workspace || workspace.type !== "ssh" || !workspace.remote || remoteWorkspaceSyncTimers.has(workspace.id)) return;
  const poll = () => mirrorRemoteWorkspaceInBackground(workspace);
  remoteWorkspaceSyncTimers.set(workspace.id, setInterval(poll, 30000));
}

function cleanupRemoteWorkspacePolling(workspaceId) {
  const stillActive = Array.from(terminalSessions.values())
    .some((session) => session.workspaceId === workspaceId && session.remote && !session.exited);
  if (stillActive) return;
  const timer = remoteWorkspaceSyncTimers.get(workspaceId);
  if (timer) clearInterval(timer);
  remoteWorkspaceSyncTimers.delete(workspaceId);
  remoteWorkspaceSyncBusy.delete(workspaceId);
  remoteSystemMetricsCache.delete(workspaceId);
  remoteSystemMetricsInFlight.delete(workspaceId);
}

async function createAgent(_event, payload = {}) {
  const workspace = await getWorkspace(payload.workspaceId);
  const remote = workspace.type === "ssh" && workspace.remote ? normalizeRemoteOptions(workspace.remote) : null;
  const agentWorkspaceRoot = remote ? (remote.root || remote.path) : workspace.root;
  const kind = ["codex", "claude", "shell"].includes(payload.kind) ? payload.kind : "codex";
  const task = String(payload.task || "").trim();
  const id = crypto.randomUUID();
  const metadataDirectory = path.join(sessionMetadataRoot(), workspace.id);
  const metadataPath = path.join(metadataDirectory, `${id}.json`);
  const remoteMetadataDirectory = remote ? `${agentWorkspaceRoot.replace(/\/+$/, "")}/.agent-workbench/sessions` : "";
  const remoteMetadataPath = remote ? `${remoteMetadataDirectory}/${id}.json` : "";
  const requestedSlot = payload.slotIndex ?? payload.slot;
  const agentNumber = Math.max(1, Math.min(4, Number(requestedSlot) + 1 || 1));
  const modelLabel = kind === "codex" && !remote ? localCodexRuntimeLabel() : "";
  const metadata = initialAgentMetadata(id, kind, task, workspace.id, agentNumber, modelLabel);
  await writeJson(metadataPath, metadata);

  const protocol = agentProtocol(remoteMetadataPath || metadataPath, agentWorkspaceRoot);
  const prompt = task ? `${protocol}\n\nYour initial task:\n${task}` : `${protocol}\n\nStart by naming yourself, then wait for my task.`;
  let command;
  let args;
  let commandLabel;

  if (remote) {
    command = resolveExecutable("ssh");
    let remoteCommand;
    if (kind === "codex") {
      const agentCommand = [
        `mkdir -p ${shellQuoteRemotePath(remoteMetadataDirectory)}`,
        `cd ${shellQuoteRemotePath(agentWorkspaceRoot)}`,
        'command -v codex >/dev/null 2>&1 || { printf "\\nCodex was not found in the remote login shell PATH.\\nPATH=%s\\n" "$PATH"; exit 127; }',
        `exec codex --dangerously-bypass-approvals-and-sandbox -C ${shellQuoteRemotePath(agentWorkspaceRoot)} ${shellQuote(prompt)}`
      ].join(" && ");
      remoteCommand = remoteLoginCommand(agentCommand);
      commandLabel = `Codex · SSH ${remoteTarget(remote)}`;
    } else if (kind === "claude") {
      const agentCommand = [
        `mkdir -p ${shellQuoteRemotePath(remoteMetadataDirectory)}`,
        `cd ${shellQuoteRemotePath(agentWorkspaceRoot)}`,
        'command -v claude >/dev/null 2>&1 || { printf "\\nClaude was not found in the remote login shell PATH.\\nPATH=%s\\n" "$PATH"; exit 127; }',
        `exec claude --dangerously-skip-permissions --add-dir ${shellQuoteRemotePath(agentWorkspaceRoot)} --add-dir ${shellQuoteRemotePath(remoteMetadataDirectory)} --name ${shellQuote("Agent Workbench")} --append-system-prompt ${shellQuote(protocol)} ${shellQuote(prompt)}`
      ].join(" && ");
      remoteCommand = remoteLoginCommand(agentCommand);
      commandLabel = `Claude · SSH ${remoteTarget(remote)}`;
    } else {
      remoteCommand = `cd ${shellQuoteRemotePath(agentWorkspaceRoot)} && exec \${SHELL:-/bin/sh} -l`;
      commandLabel = `Shell · SSH ${remoteTarget(remote)}`;
    }
    args = [...sshConnectionArgs(remote), "-t", remoteTarget(remote), remoteCommand];
  } else if (kind === "codex") {
    command = resolveExecutable("codex");
    args = ["--dangerously-bypass-approvals-and-sandbox", "-C", workspace.root, prompt];
    commandLabel = "Codex · full workspace access";
  } else if (kind === "claude") {
    command = resolveExecutable("claude");
    args = [
      "--dangerously-skip-permissions",
      "--add-dir", workspace.root,
      "--add-dir", metadataDirectory,
      "--name", "Agent Workbench",
      "--append-system-prompt", protocol,
      prompt
    ];
    commandLabel = "Claude · full workspace access";
  } else {
    command = process.env.SHELL || "/bin/zsh";
    args = ["-l"];
    commandLabel = path.basename(command);
  }

  ensurePtyHelperExecutable();
  const ptyProcess = pty.spawn(command, args, {
    name: "xterm-256color",
    cols: Math.max(40, Math.min(220, Number(payload.cols) || 90)),
    rows: Math.max(8, Math.min(80, Number(payload.rows) || 20)),
    cwd: workspace.root,
    env: terminalEnvironment(workspace.root)
  });

  const session = {
    id,
    kind,
    workspaceId: workspace.id,
    workspaceRoot: workspace.root,
    agentWorkspaceRoot,
    remote,
    remoteMetadataPath,
    metadataPath,
    metadata,
    ptyProcess,
    lastActivityAt: Date.now(),
    exited: false
  };
  terminalSessions.set(id, session);
  fs.watchFile(metadataPath, { interval: 500 }, () => refreshSessionMetadata(session));
  if (remote) {
    ensureRemoteWorkspacePolling(workspace);
    if (kind !== "shell") {
      session.remoteMetadataTimer = setInterval(() => refreshRemoteSessionMetadata(session), 5000);
    }
  }

  ptyProcess.onData((data) => {
    session.lastActivityAt = Date.now();
    sendToRenderer("agent:data", { id, data: String(data) });
  });
  ptyProcess.onExit(({ exitCode, signal }) => {
    session.exited = true;
    fs.unwatchFile(metadataPath);
    if (session.remoteMetadataTimer) clearInterval(session.remoteMetadataTimer);
    cleanupRemoteWorkspacePolling(session.workspaceId);
    mergeSessionMetadata(session, { status: exitCode === 0 ? "done" : "error" }).catch(() => {});
    sendToRenderer("agent:exit", { id, code: exitCode, signal });
  });

  return {
    id,
    kind,
    workspaceId: workspace.id,
    cwd: agentWorkspaceRoot,
    commandLabel,
    metadata
  };
}

function writeAgent(_event, payload = {}) {
  const session = terminalSessions.get(payload.id);
  if (!session || session.exited) return false;
  session.lastActivityAt = Date.now();
  session.ptyProcess.write(String(payload.data || ""));
  return true;
}

function resizeAgent(_event, payload = {}) {
  const session = terminalSessions.get(payload.id);
  if (!session || session.exited) return false;
  session.ptyProcess.resize(
    Math.max(40, Math.min(220, Number(payload.cols) || 90)),
    Math.max(8, Math.min(80, Number(payload.rows) || 20))
  );
  return true;
}

async function killAgent(_event, id) {
  const session = terminalSessions.get(id);
  if (!session) return false;
  fs.unwatchFile(session.metadataPath);
  if (session.remoteMetadataTimer) clearInterval(session.remoteMetadataTimer);
  if (!session.exited) session.ptyProcess.kill("SIGTERM");
  terminalSessions.delete(id);
  cleanupRemoteWorkspacePolling(session.workspaceId);
  await mergeSessionMetadata(session, { status: "done" }).catch(() => {});
  return true;
}

async function renameAgent(_event, payload = {}) {
  const session = terminalSessions.get(payload.id);
  if (!session) return false;
  await mergeSessionMetadata(session, { name: String(payload.name || "").trim().slice(0, 48) || session.metadata.name });
  return true;
}

function ensureWorkspaceWatcher(workspace) {
  if (!workspace || workspaceWatchers.has(workspace.id) || !fs.existsSync(workspace.root)) return;
  try {
    const watcher = fs.watch(workspace.root, { recursive: true }, (_eventType, fileName) => {
      const relativePath = String(fileName || "").split(path.sep).join("/");
      if (!relativePath || shouldIgnoreRelativePath(relativePath)) return;

      clearTimeout(workspaceRefreshTimers.get(workspace.id));
      workspaceRefreshTimers.set(workspace.id, setTimeout(() => {
        sendToRenderer("workspace:changed", { workspaceId: workspace.id, relativePath });
      }, 220));

      setTimeout(async () => {
        const absolutePath = safeWorkspacePath(workspace.root, relativePath);
        let stat;
        try {
          stat = await fsp.stat(absolutePath);
        } catch (error) {
          return;
        }
        if (!stat.isFile()) return;
        const candidates = Array.from(terminalSessions.values())
          .filter((session) => session.workspaceId === workspace.id && !session.exited)
          .sort((a, b) => b.lastActivityAt - a.lastActivityAt);
        const session = candidates[0];
        if (!session || Date.now() - session.lastActivityAt > 45000) return;
        const existing = Array.isArray(session.metadata.recentFiles) ? session.metadata.recentFiles : [];
        const recentFiles = [relativePath, ...existing.filter((item) => item !== relativePath)].slice(0, 40);
        await mergeSessionMetadata(session, { recentFiles });
      }, 160);
    });
    watcher.on("error", () => {});
    workspaceWatchers.set(workspace.id, watcher);
  } catch (error) {
    workspaceWatchers.set(workspace.id, { close() {} });
  }
}

function findLatestFile(root, predicate) {
  let latest = null;
  const visit = (directory, depth = 0) => {
    if (depth > 6) return;
    let entries = [];
    try {
      entries = fs.readdirSync(directory, { withFileTypes: true });
    } catch (error) {
      return;
    }
    for (const entry of entries) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(absolutePath, depth + 1);
      } else if (predicate(absolutePath)) {
        try {
          const modified = fs.statSync(absolutePath).mtimeMs;
          if (!latest || modified > latest.modified) latest = { path: absolutePath, modified };
        } catch (error) {
        }
      }
    }
  };
  visit(root);
  return latest && latest.path;
}

function cpuSample() {
  return os.cpus().reduce((aggregate, cpu) => {
    const times = cpu.times || {};
    aggregate.idle += Number(times.idle) || 0;
    aggregate.total += Object.values(times).reduce((sum, value) => sum + (Number(value) || 0), 0);
    return aggregate;
  }, { idle: 0, total: 0 });
}

async function localSystemMetrics() {
  const next = cpuSample();
  let cpuPercent = null;
  if (previousCpuSample) {
    const totalDelta = next.total - previousCpuSample.total;
    const idleDelta = next.idle - previousCpuSample.idle;
    if (totalDelta > 0) cpuPercent = Math.max(0, Math.min(100, (1 - idleDelta / totalDelta) * 100));
  }
  previousCpuSample = next;
  let memoryUsedBytes = os.totalmem() - os.freemem();
  if (process.platform === "darwin") {
    try {
      const { stdout } = await execFileAsync("/usr/bin/vm_stat", [], { timeout: 3000, maxBuffer: 512 * 1024 });
      const pageSize = Number((stdout.match(/page size of (\d+) bytes/i) || [])[1]) || 4096;
      const pages = {};
      stdout.split(/\r?\n/).forEach((line) => {
        const match = line.match(/^([^:]+):\s+(\d+)/);
        if (match) pages[match[1].trim()] = Number(match[2]);
      });
      const availablePages = (pages["Pages free"] || 0)
        + (pages["Pages inactive"] || 0)
        + (pages["Pages speculative"] || 0)
        + (pages["Pages purgeable"] || 0);
      if (availablePages > 0) memoryUsedBytes = Math.max(0, os.totalmem() - availablePages * pageSize);
    } catch (error) {
    }
  }
  return {
    source: "local",
    label: os.hostname(),
    cpuPercent,
    memoryUsedBytes,
    memoryTotalBytes: os.totalmem(),
    gpus: []
  };
}

async function remoteSystemMetrics(workspace) {
  const remote = validateRemote(workspace.remote);
  const script = [
    "import json, subprocess, time",
    "def cpu():",
    "  values=list(map(int,open('/proc/stat').readline().split()[1:]))",
    "  return sum(values), values[3] + (values[4] if len(values)>4 else 0)",
    "t1,i1=cpu(); time.sleep(.12); t2,i2=cpu()",
    "mem={}",
    "for line in open('/proc/meminfo'):",
    "  key,value=line.split(':',1); mem[key]=int(value.strip().split()[0])*1024",
    "gpus=[]; gpu_error=None",
    "try:",
    "  result=subprocess.run(['nvidia-smi','--query-gpu=index,name,utilization.gpu,memory.used,memory.total','--format=csv,noheader,nounits'],text=True,capture_output=True,timeout=5)",
    "  if result.returncode != 0: raise RuntimeError((result.stderr or result.stdout or 'nvidia-smi failed').strip())",
    "  out=result.stdout",
    "  for row in out.strip().splitlines():",
    "    p=[x.strip() for x in row.split(',')]",
    "    if len(p)>=5: gpus.append({'index':int(p[0]),'name':p[1],'utilizationPercent':float(p[2]),'memoryUsedMiB':float(p[3]),'memoryTotalMiB':float(p[4]),'metricsAvailable':True})",
    "except Exception as error:",
    "  gpu_error=str(error)",
    "  try:",
    "    import glob",
    "    for info_path in glob.glob('/proc/driver/nvidia/gpus/*/information'):",
    "      info={}",
    "      for line in open(info_path):",
    "        if ':' in line:",
    "          key,value=line.split(':',1); info[key.strip()]=value.strip()",
    "      index=int(info.get('Device Minor',len(gpus)))",
    "      gpus.append({'index':index,'name':info.get('Model','NVIDIA GPU'),'utilizationPercent':None,'memoryUsedMiB':None,'memoryTotalMiB':None,'metricsAvailable':False})",
    "    gpus.sort(key=lambda gpu:gpu['index'])",
    "  except Exception: pass",
    "total=mem.get('MemTotal',0); available=mem.get('MemAvailable',mem.get('MemFree',0))",
    "print(json.dumps({'cpuPercent':(1-(i2-i1)/max(1,t2-t1))*100,'memoryUsedBytes':total-available,'memoryTotalBytes':total,'gpus':gpus,'gpuError':gpu_error}))"
  ].join("\n");
  const { stdout } = await execFileAsync(
    resolveExecutable("ssh"),
    [
      ...sshConnectionArgs(remote),
      remoteTarget(remote),
      ["python3", "-c", script].map(shellQuote).join(" ")
    ],
    { timeout: 12000, maxBuffer: 1024 * 1024 }
  );
  return {
    source: "ssh",
    label: remoteTarget(remote),
    ...JSON.parse(stdout || "{}")
  };
}

async function getSystemMetrics(_event, workspaceId) {
  const workspace = workspaceId
    ? (await readWorkspaces()).find((item) => item.id === workspaceId)
    : null;
  if (workspace && workspace.type === "ssh" && workspace.remote) {
    const cached = remoteSystemMetricsCache.get(workspace.id);
    if (cached && Date.now() - cached.timestamp < 12000) return cached.value;
    if (remoteSystemMetricsInFlight.has(workspace.id)) {
      return remoteSystemMetricsInFlight.get(workspace.id);
    }
    const request = remoteSystemMetrics(workspace)
      .then((value) => {
        remoteSystemMetricsCache.set(workspace.id, { timestamp: Date.now(), value });
        return value;
      })
      .finally(() => remoteSystemMetricsInFlight.delete(workspace.id));
    remoteSystemMetricsInFlight.set(workspace.id, request);
    try {
      return await request;
    } catch (error) {
      return { ...(await localSystemMetrics()), source: "ssh-error", label: remoteTarget(workspace.remote), error: error.message };
    }
  }
  return await localSystemMetrics();
}

async function getWorkspaceDiagnostics(_event, workspaceId) {
  const workspace = workspaceId
    ? (await readWorkspaces()).find((item) => item.id === workspaceId)
    : null;
  if (!workspace) return { connected: true, branch: "—", changes: 0, gitAvailable: false };
  try {
    let branchOutput = "";
    let statusOutput = "";
    if (workspace.type === "ssh" && workspace.remote) {
      const remote = validateRemote(workspace.remote);
      const remoteRoot = workspace.remote.root || workspace.remote.path || "~";
      const command = [
        `git -C ${shellQuoteRemotePath(remoteRoot)} branch --show-current 2>/dev/null || true`,
        "printf '\\036'",
        `git -C ${shellQuoteRemotePath(remoteRoot)} status --porcelain 2>/dev/null || true`
      ].join("; ");
      const { stdout } = await execFileAsync(
        resolveExecutable("ssh"),
        [...sshConnectionArgs(remote), remoteTarget(remote), command],
        { timeout: 8000, maxBuffer: 512 * 1024 }
      );
      [branchOutput, statusOutput] = String(stdout || "").split("\u001e");
    } else {
      const branch = await execFileAsync(
        resolveExecutable("git"),
        ["-C", workspace.root, "branch", "--show-current"],
        { timeout: 4000, maxBuffer: 64 * 1024 }
      );
      const status = await execFileAsync(
        resolveExecutable("git"),
        ["-C", workspace.root, "status", "--porcelain"],
        { timeout: 4000, maxBuffer: 512 * 1024 }
      );
      branchOutput = branch.stdout;
      statusOutput = status.stdout;
    }
    const branch = String(branchOutput || "").trim() || "detached";
    const changes = String(statusOutput || "").split(/\r?\n/).filter(Boolean).length;
    return { connected: true, branch, changes, gitAvailable: true };
  } catch (error) {
    return {
      connected: workspace.type !== "ssh",
      branch: "—",
      changes: 0,
      gitAvailable: false,
      error: error.message
    };
  }
}

const SPOTIFY_STATUS_SCRIPT = `
const spotify = Application("Spotify");
if (!spotify.running()) {
  JSON.stringify({ running: false });
} else {
  try {
    const track = spotify.currentTrack();
    JSON.stringify({
      running: true,
      state: String(spotify.playerState()),
      name: track.name(),
      artist: track.artist(),
      album: track.album(),
      artworkUrl: track.artworkUrl(),
      position: spotify.playerPosition(),
      duration: track.duration()
    });
  } catch (error) {
    JSON.stringify({ running: true, state: String(spotify.playerState()) });
  }
}`;

async function getSpotifyStatus() {
  if (process.platform !== "darwin") return { running: false, supported: false };
  try {
    const { stdout } = await execFileAsync(
      "/usr/bin/osascript",
      ["-l", "JavaScript", "-e", SPOTIFY_STATUS_SCRIPT],
      { timeout: 3500, maxBuffer: 128 * 1024 }
    );
    return { supported: true, ...JSON.parse(stdout || "{}") };
  } catch (error) {
    return { supported: true, running: false, error: error.message };
  }
}

async function getPowerStatus() {
  if (process.platform !== "darwin") return { available: false };
  try {
    const { stdout } = await execFileAsync(
      "/usr/bin/pmset",
      ["-g", "batt"],
      { timeout: 3000, maxBuffer: 64 * 1024 }
    );
    const percentMatch = stdout.match(/(\d+)%/);
    const stateMatch = stdout.match(/\d+%;\s*([^;]+);/);
    const sourceMatch = stdout.match(/Now drawing from '([^']+)'/);
    if (!percentMatch) return { available: false };
    const state = String(stateMatch && stateMatch[1] || "").trim().toLowerCase();
    return {
      available: true,
      percent: Math.max(0, Math.min(100, Number(percentMatch[1]) || 0)),
      state,
      charging: state === "charging",
      charged: state === "charged",
      source: sourceMatch ? sourceMatch[1] : ""
    };
  } catch (error) {
    return { available: false, error: error.message };
  }
}

async function controlSpotify(_event, action) {
  const commands = {
    previous: "previousTrack()",
    playpause: "playpause()",
    next: "nextTrack()"
  };
  if (process.platform !== "darwin" || !commands[action]) {
    throw new Error("Unsupported Spotify control");
  }
  await execFileAsync(
    "/usr/bin/osascript",
    ["-l", "JavaScript", "-e", `const spotify = Application("Spotify"); if (spotify.running()) spotify.${commands[action]};`],
    { timeout: 3500, maxBuffer: 64 * 1024 }
  );
  return getSpotifyStatus();
}

function readLastCodexRateLimit() {
  const sessionsRoot = path.join(os.homedir(), ".codex", "sessions");
  const latestFile = findLatestFile(sessionsRoot, (filePath) => filePath.endsWith(".jsonl"));
  if (!latestFile) return null;
  try {
    const stat = fs.statSync(latestFile);
    const length = Math.min(stat.size, 1024 * 1024);
    const buffer = Buffer.alloc(length);
    const descriptor = fs.openSync(latestFile, "r");
    fs.readSync(descriptor, buffer, 0, length, stat.size - length);
    fs.closeSync(descriptor);
    const lines = buffer.toString("utf8").split(/\r?\n/).reverse();
    for (const line of lines) {
      if (!line.includes("rate_limits")) continue;
      try {
        const parsed = JSON.parse(line);
        const limits = parsed && parsed.payload && parsed.payload.rate_limits;
        if (limits && limits.primary) return limits;
      } catch (error) {
      }
    }
  } catch (error) {
  }
  return null;
}

async function getUsage() {
  const codexLimits = readLastCodexRateLimit();
  const primary = codexLimits && codexLimits.primary;
  const codexUsed = primary ? Math.max(0, Math.min(100, Number(primary.used_percent) || 0)) : null;
  return {
    codex: {
      available: codexUsed !== null,
      remainingPercent: codexUsed === null ? null : 100 - codexUsed,
      usedPercent: codexUsed,
      resetsAt: primary && primary.resets_at ? new Date(primary.resets_at * 1000).toISOString() : null,
      windowMinutes: primary ? primary.window_minutes : null,
      planType: codexLimits ? codexLimits.plan_type : null
    }
  };
}

function sendToRenderer(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send(channel, payload);
}

function showAgentFinishedNotification(_event, payload = {}) {
  if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isFocused()) {
    mainWindow.flashFrame(true);
  }
  if (!Notification.isSupported()) return false;
  const agentNumber = String(payload.agentNumber || "").trim() || "?";
  const workspaceName = String(payload.workspaceName || "").trim().slice(0, 80);
  const agentName = String(payload.name || `Agent ${agentNumber}`).trim().slice(0, 80);
  const tldr = String(payload.tldr || "Task finished.").trim().slice(0, 220);
  const notification = new Notification({
    title: `Agent ${agentNumber} finished${workspaceName ? ` · ${workspaceName}` : ""}`,
    body: `${agentName}: ${tldr}`,
    silent: false
  });
  notification.on("click", () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });
  notification.show();
  return true;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1580,
    height: 1000,
    minWidth: 1180,
    minHeight: 720,
    title: "Agent Workbench",
    backgroundColor: "#00000000",
    transparent: true,
    ...(process.platform === "darwin"
      ? {
          titleBarStyle: "hiddenInset",
          trafficLightPosition: { x: 14, y: 14 },
          vibrancy: "under-window",
          visualEffectState: "active"
        }
      : {}),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("enter-full-screen", () => sendToRenderer("window:full-screen", true));
  mainWindow.on("leave-full-screen", () => sendToRenderer("window:full-screen", false));
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  mainWindow.on("closed", () => {
    for (const session of terminalSessions.values()) {
      fs.unwatchFile(session.metadataPath);
      if (session.remoteMetadataTimer) clearInterval(session.remoteMetadataTimer);
      if (!session.exited) session.ptyProcess.kill("SIGTERM");
    }
    terminalSessions.clear();
    for (const watcher of workspaceWatchers.values()) watcher.close();
    workspaceWatchers.clear();
    for (const timer of remoteWorkspaceSyncTimers.values()) clearInterval(timer);
    remoteWorkspaceSyncTimers.clear();
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  ipcMain.handle("workspace:list", listWorkspaces);
  ipcMain.handle("workspace:add", addWorkspace);
  ipcMain.handle("workspace:list-ssh-hosts", listSshHosts);
  ipcMain.handle("workspace:connect-ssh", connectSshWorkspace);
  ipcMain.handle("workspace:ssh-auth-start", startSshAuthentication);
  ipcMain.handle("workspace:ssh-auth-kill", killSshAuthentication);
  ipcMain.on("workspace:ssh-auth-write", writeSshAuthentication);
  ipcMain.on("workspace:ssh-auth-resize", resizeSshAuthentication);
  ipcMain.handle("workspace:sync", syncWorkspace);
  ipcMain.handle("workspace:remove", removeWorkspace);
  ipcMain.handle("workspace:rename", renameWorkspace);
  ipcMain.handle("workspace:create-entry", createWorkspaceEntry);
  ipcMain.handle("workspace:import-paths", importWorkspacePaths);
  ipcMain.handle("workspace:rename-entry", renameWorkspaceEntry);
  ipcMain.handle("workspace:files", listWorkspaceFiles);
  ipcMain.handle("workspace:artifacts", listArtifacts);
  ipcMain.handle("workspace:read-artifact", readArtifact);
  ipcMain.handle("workspace:open-file", openWorkspaceFile);
  ipcMain.handle("workspace:show-file-menu", showWorkspaceFileMenu);
  ipcMain.handle("workspace:open-code", openWorkspaceInCode);
  ipcMain.handle("agent:create", createAgent);
  ipcMain.handle("agent:kill", killAgent);
  ipcMain.handle("agent:rename", renameAgent);
  ipcMain.on("agent:write", writeAgent);
  ipcMain.on("agent:resize", resizeAgent);
  ipcMain.handle("usage:get", getUsage);
  ipcMain.handle("system:metrics", getSystemMetrics);
  ipcMain.handle("workspace:diagnostics", getWorkspaceDiagnostics);
  ipcMain.handle("power:status", getPowerStatus);
  ipcMain.handle("spotify:status", getSpotifyStatus);
  ipcMain.handle("spotify:control", controlSpotify);
  ipcMain.handle("notification:agent-finished", showAgentFinishedNotification);
  ipcMain.handle("window:is-full-screen", () => Boolean(mainWindow && !mainWindow.isDestroyed() && mainWindow.isFullScreen()));
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
