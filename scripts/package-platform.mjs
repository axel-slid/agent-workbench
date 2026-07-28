import { execFileSync } from "node:child_process";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildOpenleafThemeCatalog } from "./import-openleaf-themes.mjs";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = path.join(appRoot, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const productName = packageJson.productName || "BsCode";
const targetPlatform = process.argv[2];
const supportedPlatforms = new Set(["win32", "linux"]);
const supportedArchitectures = new Set(["x64", "arm64", "ia32"]);

const appFiles = [
  "main.js",
  "preload.js",
  "renderer.js",
  "index.html",
  "styles.css",
  "package.json",
  "package-lock.json",
  "README.md"
];

function run(command, args, options = {}) {
  execFileSync(command, args, { ...options, stdio: "inherit" });
}

function assertHostMatchesTarget() {
  if (!supportedPlatforms.has(targetPlatform)) {
    throw new Error("Pass a supported target platform: win32 or linux.");
  }
  if (process.platform !== targetPlatform) {
    const expectedHost = targetPlatform === "win32" ? "Windows" : "Linux";
    throw new Error(
      `${productName} must be packaged for ${expectedHost} on a ${expectedHost} host. ` +
      "This keeps Electron and node-pty native binaries matched to the target."
    );
  }
  if (!supportedArchitectures.has(process.arch)) {
    throw new Error(`Unsupported ${targetPlatform} architecture: ${process.arch}.`);
  }
}

function ensureElectronRuntime() {
  const electronDist = path.join(appRoot, "node_modules", "electron", "dist");
  const expectedExecutable = targetPlatform === "win32" ? "electron.exe" : "electron";
  if (!fs.existsSync(path.join(electronDist, expectedExecutable))) {
    const installer = path.join(appRoot, "node_modules", "electron", "install.js");
    if (!fs.existsSync(installer)) {
      throw new Error("Electron is not installed. Run npm ci first.");
    }
    run(process.execPath, [installer], { cwd: appRoot });
  }
  if (!fs.existsSync(path.join(electronDist, expectedExecutable))) {
    throw new Error(`The installed Electron runtime is not for ${targetPlatform}/${process.arch}.`);
  }
  return electronDist;
}

async function copyAppPayload(appResources) {
  await fsp.mkdir(appResources, { recursive: true });
  for (const entry of appFiles) {
    const source = path.join(appRoot, entry);
    if (fs.existsSync(source)) {
      await fsp.copyFile(source, path.join(appResources, entry));
    }
  }
  for (const directory of ["assets", "pixel-agents-mode"]) {
    const source = path.join(appRoot, directory);
    if (fs.existsSync(source)) {
      await fsp.cp(source, path.join(appResources, directory), { recursive: true });
    }
  }
}

async function makeLinuxMetadata(bundleRoot) {
  const iconSource = path.join(appRoot, "assets", "app-icon.png");
  const iconDirectory = path.join(bundleRoot, "resources");
  if (fs.existsSync(iconSource)) {
    await fsp.mkdir(iconDirectory, { recursive: true });
    await fsp.copyFile(iconSource, path.join(iconDirectory, "bscode.png"));
  }
  const desktopEntry = [
    "[Desktop Entry]",
    "Version=1.0",
    "Type=Application",
    `Name=${productName}`,
    `Comment=${packageJson.description || "Agent workspace"}`,
    `Exec=${productName} %U`,
    "Icon=bscode",
    "Terminal=false",
    "Categories=Development;IDE;",
    "StartupNotify=true",
    ""
  ].join("\n");
  await fsp.writeFile(path.join(bundleRoot, "bscode.desktop"), desktopEntry, "utf8");
}

async function packageCurrentPlatform() {
  assertHostMatchesTarget();
  await buildOpenleafThemeCatalog(appRoot);

  const electronDist = ensureElectronRuntime();
  const targetLabel = targetPlatform === "win32" ? "win" : "linux";
  const outputRoot = path.join(appRoot, "dist", targetLabel);
  const bundleRoot = path.join(outputRoot, `${productName}-${targetPlatform}-${process.arch}`);
  const resources = path.join(bundleRoot, "resources");
  const appResources = path.join(resources, "app");

  await fsp.rm(bundleRoot, { recursive: true, force: true });
  await fsp.mkdir(outputRoot, { recursive: true });
  await fsp.cp(electronDist, bundleRoot, { recursive: true, preserveTimestamps: true });

  const electronExecutable = path.join(
    bundleRoot,
    targetPlatform === "win32" ? "electron.exe" : "electron"
  );
  const productExecutable = path.join(
    bundleRoot,
    targetPlatform === "win32" ? `${productName}.exe` : productName
  );
  await fsp.rename(electronExecutable, productExecutable);
  if (targetPlatform === "linux") await fsp.chmod(productExecutable, 0o755);

  await fsp.rm(path.join(resources, "default_app.asar"), { force: true });
  await copyAppPayload(appResources);

  const npmCommand = targetPlatform === "win32" ? "npm.cmd" : "npm";
  run(npmCommand, ["ci", "--omit=dev", "--no-audit", "--no-fund"], { cwd: appResources });

  if (targetPlatform === "linux") await makeLinuxMetadata(bundleRoot);

  const runtimeVersionPath = path.join(bundleRoot, "version");
  const runtimeVersion = fs.existsSync(runtimeVersionPath)
    ? fs.readFileSync(runtimeVersionPath, "utf8").trim()
    : "unknown";
  console.log(
    `Packaged ${productName} ${packageJson.version} with Electron ${runtimeVersion} at ${bundleRoot}`
  );
}

packageCurrentPlatform().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
