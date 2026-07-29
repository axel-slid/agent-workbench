import { execFileSync } from "node:child_process";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildOpenleafThemeCatalog } from "./import-openleaf-themes.mjs";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(appRoot, "package.json"), "utf8"));
const productName = packageJson.productName || "BsCode";
const sourceApp = path.join(appRoot, "node_modules", "electron", "dist", "Electron.app");
const outputDir = path.join(appRoot, "dist", "mac");
const appBundle = path.join(outputDir, `${productName}.app`);
const resources = path.join(appBundle, "Contents", "Resources");
const appResources = path.join(resources, "app");

function run(command, args, options = {}) {
  execFileSync(command, args, { ...options, stdio: "inherit" });
}

function plist(command) {
  run("/usr/libexec/PlistBuddy", ["-c", command, path.join(appBundle, "Contents", "Info.plist")]);
}

async function main() {
  await buildOpenleafThemeCatalog(appRoot);
  if (!fs.existsSync(sourceApp)) {
    const installer = path.join(appRoot, "node_modules", "electron", "install.js");
    if (!fs.existsSync(installer)) throw new Error("Electron is not installed. Run npm install first.");
    run(process.execPath, [installer], { cwd: appRoot });
  }
  if (!fs.existsSync(sourceApp)) throw new Error("Electron runtime download did not complete.");

  await fsp.rm(appBundle, { recursive: true, force: true });
  await fsp.mkdir(outputDir, { recursive: true });
  run("ditto", [sourceApp, appBundle]);
  await fsp.mkdir(appResources, { recursive: true });

  for (const entry of ["main.js", "preload.js", "renderer.js", "index.html", "styles.css", "package.json", "package-lock.json", "README.md"]) {
    const source = path.join(appRoot, entry);
    if (fs.existsSync(source)) await fsp.copyFile(source, path.join(appResources, entry));
  }
  const assetsSource = path.join(appRoot, "assets");
  if (fs.existsSync(assetsSource)) {
    await fsp.cp(assetsSource, path.join(appResources, "assets"), { recursive: true });
  }
  const pixelModeSource = path.join(appRoot, "pixel-agents-mode");
  if (fs.existsSync(pixelModeSource)) {
    await fsp.cp(pixelModeSource, path.join(appResources, "pixel-agents-mode"), { recursive: true });
  }
  const appIconSource = path.join(assetsSource, "AppIcon.icns");
  if (fs.existsSync(appIconSource)) {
    await fsp.copyFile(appIconSource, path.join(resources, "AppIcon.icns"));
  }

  run("npm", ["ci", "--omit=dev", "--no-audit", "--no-fund"], { cwd: appResources });
  const prebuilds = path.join(appResources, "node_modules", "node-pty", "prebuilds");
  if (fs.existsSync(prebuilds)) {
    for (const entry of await fsp.readdir(prebuilds)) {
      if (entry === "darwin-arm64") continue;
      await fsp.rm(path.join(prebuilds, entry), { recursive: true, force: true });
    }
  }
  const arm64Helper = path.join(prebuilds, "darwin-arm64", "spawn-helper");
  if (fs.existsSync(arm64Helper)) await fsp.chmod(arm64Helper, 0o755);
  const windowsRuntime = path.join(appResources, "node_modules", "node-pty", "third_party", "conpty");
  await fsp.rm(windowsRuntime, { recursive: true, force: true });
  plist(`Set :CFBundleDisplayName ${productName}`);
  plist("Set :CFBundleIdentifier com.alexdils.agent-workbench");
  plist(`Set :CFBundleShortVersionString ${packageJson.version}`);
  plist(`Set :CFBundleVersion ${packageJson.version}`);
  plist("Set :LSApplicationCategoryType public.app-category.developer-tools");
  plist("Add :NSAppleEventsUsageDescription string BsCode uses Spotify automation to show and control your current track.");
  if (fs.existsSync(appIconSource)) plist("Set :CFBundleIconFile AppIcon.icns");
  run("xattr", ["-cr", appBundle]);
  run("codesign", ["--force", "--deep", "--sign", "-", appBundle]);
  console.log(`Packaged ${appBundle}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
