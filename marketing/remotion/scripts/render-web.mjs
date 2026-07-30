import {execFileSync} from "node:child_process";
import {mkdtempSync, mkdirSync, renameSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(
  projectRoot,
  "../../../personal-website/assets/bscode/motion/bscode-digital-twin.mp4",
);
const renderDirectory = mkdtempSync(resolve(tmpdir(), "bscode-remotion-"));
const renderedPath = resolve(renderDirectory, "bscode-digital-twin-render.mp4");
const silentPath = resolve(renderDirectory, "bscode-digital-twin.mp4");

try {
  mkdirSync(dirname(outputPath), {recursive: true});
  execFileSync(
    resolve(projectRoot, "node_modules/.bin/remotion"),
    [
      "render",
      "src/index.jsx",
      "BsCodeDigitalTwin",
      renderedPath,
      "--codec=h264",
      "--crf=20",
      "--pixel-format=yuv420p",
      "--concurrency=4",
      "--overwrite",
    ],
    {cwd: projectRoot, stdio: "inherit"},
  );
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      renderedPath,
      "-map",
      "0:v:0",
      "-c:v",
      "copy",
      "-an",
      "-movflags",
      "+faststart",
      "-y",
      silentPath,
    ],
    {stdio: "inherit"},
  );
  renameSync(silentPath, outputPath);
} finally {
  rmSync(renderDirectory, {recursive: true, force: true});
}
