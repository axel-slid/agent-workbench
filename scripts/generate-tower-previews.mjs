import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "assets", "tower-previews");
const expected = Array.from(
  { length: 20 },
  (_, index) => `floor-${String(index + 1).padStart(2, "0")}.png`
);
const missing = expected.filter((filename) => !fs.existsSync(path.join(outputDirectory, filename)));
if (missing.length) {
  throw new Error(
    `Missing pre-rendered Pixel Agents room previews: ${missing.join(", ")}. `
      + "Run scripts/capture-tower-previews.mjs against the development app."
  );
}

const invalid = expected.filter((filename) => {
  const bytes = fs.readFileSync(path.join(outputDirectory, filename));
  return bytes.length < 24
    || bytes.subarray(1, 4).toString("ascii") !== "PNG"
    || bytes.readUInt32BE(16) !== 640
    || bytes.readUInt32BE(20) !== 320;
});
if (invalid.length) {
  throw new Error(`Invalid 640×320 preview PNGs: ${invalid.join(", ")}`);
}

console.log("Verified 20 pre-rendered Pixel Agents room previews (640×320).");
