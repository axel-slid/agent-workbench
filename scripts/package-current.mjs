import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsRoot = path.dirname(fileURLToPath(import.meta.url));
const script = process.platform === "darwin"
  ? path.join(scriptsRoot, "package-mac.mjs")
  : path.join(scriptsRoot, "package-platform.mjs");
const args = process.platform === "darwin"
  ? [script]
  : [script, process.platform];

if (!["darwin", "win32", "linux"].includes(process.platform)) {
  console.error(`Packaging is not configured for ${process.platform}.`);
  process.exit(1);
}

try {
  execFileSync(process.execPath, args, { stdio: "inherit" });
} catch (error) {
  process.exit(typeof error.status === "number" ? error.status : 1);
}
