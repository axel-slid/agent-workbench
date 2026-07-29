import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(appRoot, "assets");
const sourceSvg = path.join(assetsDir, "app-icon-symbol.svg");
const sourcePng = path.join(assetsDir, "app-icon-source.png");
const appPng = path.join(assetsDir, "app-icon.png");
const appIcns = path.join(assetsDir, "AppIcon.icns");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bscode-icon-"));
const iconset = path.join(tempRoot, "AppIcon.iconset");

function run(command, args) {
  execFileSync(command, args, { cwd: appRoot, stdio: "inherit" });
}

try {
  fs.mkdirSync(iconset, { recursive: true });
  run("rsvg-convert", ["--width", "1024", "--height", "1024", "--output", sourcePng, sourceSvg]);
  fs.copyFileSync(sourcePng, appPng);

  const variants = [
    [16, "icon_16x16.png"],
    [32, "icon_16x16@2x.png"],
    [32, "icon_32x32.png"],
    [64, "icon_32x32@2x.png"],
    [128, "icon_128x128.png"],
    [256, "icon_128x128@2x.png"],
    [256, "icon_256x256.png"],
    [512, "icon_256x256@2x.png"],
    [512, "icon_512x512.png"],
    [1024, "icon_512x512@2x.png"]
  ];
  for (const [size, filename] of variants) {
    run("sips", ["-z", String(size), String(size), sourcePng, "--out", path.join(iconset, filename)]);
  }
  run("iconutil", ["-c", "icns", iconset, "-o", appIcns]);
  console.log(`Generated ${path.relative(appRoot, appIcns)} from ${path.relative(appRoot, sourceSvg)}.`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
