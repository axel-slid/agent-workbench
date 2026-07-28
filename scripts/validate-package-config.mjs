import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(appRoot, "package.json"), "utf8"));
const packageLock = JSON.parse(fs.readFileSync(path.join(appRoot, "package-lock.json"), "utf8"));
const errors = [];

if (packageJson.productName !== "BsCode") {
  errors.push('package.json productName must be "BsCode".');
}
if (!fs.existsSync(path.join(appRoot, packageJson.main || ""))) {
  errors.push(`Electron entry point is missing: ${packageJson.main || "(unset)"}.`);
}
if (packageLock.name !== packageJson.name || packageLock.version !== packageJson.version) {
  errors.push("package-lock.json name/version does not match package.json.");
}
for (const scriptName of ["package:current", "package:mac", "package:windows", "package:linux"]) {
  if (!packageJson.scripts?.[scriptName]) errors.push(`Missing npm script: ${scriptName}.`);
}
for (const relativePath of [
  "scripts/package-current.mjs",
  "scripts/package-mac.mjs",
  "scripts/package-platform.mjs"
]) {
  if (!fs.existsSync(path.join(appRoot, relativePath))) {
    errors.push(`Missing packaging script: ${relativePath}.`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Packaging configuration is valid for BsCode.");
