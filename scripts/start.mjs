import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const electronPath = require("electron");
const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const child = spawn(electronPath, [appRoot], {
  detached: true,
  stdio: "ignore"
});

child.unref();
console.log(`Opened ${appRoot}`);
