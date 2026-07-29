const { contextBridge, ipcRenderer, webUtils } = require("electron");

contextBridge.exposeInMainWorld("agentWorkbench", {
  listWorkspaces: () => ipcRenderer.invoke("workspace:list"),
  addWorkspace: () => ipcRenderer.invoke("workspace:add"),
  listSshHosts: () => ipcRenderer.invoke("workspace:list-ssh-hosts"),
  connectSshWorkspace: (remote) => ipcRenderer.invoke("workspace:connect-ssh", remote),
  startSshAuthentication: (remote, dimensions = {}) => ipcRenderer.invoke("workspace:ssh-auth-start", { remote, ...dimensions }),
  writeSshAuthentication: (id, data) => ipcRenderer.send("workspace:ssh-auth-write", { id, data }),
  resizeSshAuthentication: (id, cols, rows) => ipcRenderer.send("workspace:ssh-auth-resize", { id, cols, rows }),
  killSshAuthentication: (id) => ipcRenderer.invoke("workspace:ssh-auth-kill", id),
  syncWorkspace: (workspaceId) => ipcRenderer.invoke("workspace:sync", workspaceId),
  removeWorkspace: (workspaceId) => ipcRenderer.invoke("workspace:remove", workspaceId),
  renameWorkspace: (workspaceId, name) => ipcRenderer.invoke("workspace:rename", { workspaceId, name }),
  createWorkspaceEntry: (workspaceId, parentPath, kind, name) => ipcRenderer.invoke("workspace:create-entry", {
    workspaceId,
    parentPath,
    kind,
    name
  }),
  importWorkspacePaths: (workspaceId, parentPath, paths) => ipcRenderer.invoke("workspace:import-paths", {
    workspaceId,
    parentPath,
    paths
  }),
  importWorkspaceData: (workspaceId, parentPath, items) => ipcRenderer.invoke("workspace:import-data", {
    workspaceId,
    parentPath,
    items
  }),
  renameWorkspaceEntry: (workspaceId, relativePath, name) => ipcRenderer.invoke("workspace:rename-entry", {
    workspaceId,
    relativePath,
    name
  }),
  readWorkspaceNotes: (workspaceId) => ipcRenderer.invoke("workspace:read-notes", workspaceId),
  writeWorkspaceNotes: (workspaceId, payload) => ipcRenderer.invoke("workspace:write-notes", {
    workspaceId,
    ...payload
  }),
  pathForDroppedFile: (file) => webUtils.getPathForFile(file),
  listFiles: (workspaceId) => ipcRenderer.invoke("workspace:files", workspaceId),
  listDirectory: (workspaceId, relativePath) => ipcRenderer.invoke("workspace:list-directory", {
    workspaceId,
    relativePath
  }),
  listArtifacts: (workspaceId) => ipcRenderer.invoke("workspace:artifacts", workspaceId),
  readArtifact: (workspaceId, relativePath) => ipcRenderer.invoke("workspace:read-artifact", { workspaceId, relativePath }),
  readPreviewPath: (workspaceId, filePath) => ipcRenderer.invoke("workspace:read-preview-path", {
    workspaceId,
    path: filePath
  }),
  openFile: (workspaceId, relativePath) => ipcRenderer.invoke("workspace:open-file", { workspaceId, relativePath }),
  showFileMenu: (workspaceId, relativePath, entryType) => ipcRenderer.invoke("workspace:show-file-menu", {
    workspaceId,
    relativePath,
    entryType
  }),
  openInCode: (workspaceId) => ipcRenderer.invoke("workspace:open-code", workspaceId),
  openApplication: (application) => ipcRenderer.invoke("application:open", application),
  writeClipboardText: (value) => ipcRenderer.invoke("clipboard:write-text", value),

  createAgent: (workspaceId, kind, task, slotIndex, dimensions = {}) => ipcRenderer.invoke("agent:create", {
    workspaceId,
    kind,
    task,
    slotIndex,
    ...dimensions
  }),
  writeAgent: (id, data) => ipcRenderer.send("agent:write", { id, data }),
  resizeAgent: (id, cols, rows) => ipcRenderer.send("agent:resize", { id, cols, rows }),
  killAgent: (id) => ipcRenderer.invoke("agent:kill", id),
  renameAgent: (id, name) => ipcRenderer.invoke("agent:rename", { id, name }),
  getUsage: () => ipcRenderer.invoke("usage:get"),
  getSystemMetrics: (workspaceId) => ipcRenderer.invoke("system:metrics", workspaceId),
  getWorkspaceDiagnostics: (workspaceId) => ipcRenderer.invoke("workspace:diagnostics", workspaceId),
  getPowerStatus: () => ipcRenderer.invoke("power:status"),
  getSpotifyStatus: () => ipcRenderer.invoke("spotify:status"),
  controlSpotify: (action) => ipcRenderer.invoke("spotify:control", action),
  notifyAgentFinished: (payload) => ipcRenderer.invoke("notification:agent-finished", payload),
  getWindowFullScreen: () => ipcRenderer.invoke("window:is-full-screen"),
  setWindowCinematicFullScreen: (active) => ipcRenderer.invoke("window:set-cinematic-full-screen", Boolean(active)),

  onAgentData: (callback) => ipcRenderer.on("agent:data", (_event, payload) => callback(payload)),
  onAgentExit: (callback) => ipcRenderer.on("agent:exit", (_event, payload) => callback(payload)),
  onAgentMetadata: (callback) => ipcRenderer.on("agent:metadata", (_event, payload) => callback(payload)),
  onSshAuthenticationData: (callback) => ipcRenderer.on("ssh-auth:data", (_event, payload) => callback(payload)),
  onSshAuthenticationExit: (callback) => ipcRenderer.on("ssh-auth:exit", (_event, payload) => callback(payload)),
  onWorkspaceChanged: (callback) => ipcRenderer.on("workspace:changed", (_event, payload) => callback(payload)),
  onWorkspaceMenuAction: (callback) => ipcRenderer.on("workspace:menu-action", (_event, payload) => callback(payload)),
  onWindowFullScreen: (callback) => ipcRenderer.on("window:full-screen", (_event, active) => callback(Boolean(active)))
});
