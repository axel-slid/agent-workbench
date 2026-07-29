#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.resolve(
  process.argv.find((argument) => argument.startsWith("--out="))?.slice(6)
    || path.join(root, "assets", "tower-previews")
);
const debugPort = Number(
  process.argv.find((argument) => argument.startsWith("--port="))?.slice(7)
    || 9222
);
const floorCount = 20;

async function connectToApp() {
  const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) => response.json());
  const target = targets.find((candidate) => candidate.type === "page" && candidate.title === "BsCode");
  if (!target?.webSocketDebuggerUrl) {
    throw new Error(`No BsCode page found on Chromium debugging port ${debugPort}.`);
  }

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id;
    pending.set(requestId, { resolve, reject });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });

  return { socket, send };
}

function convertCapture(rawPath, outputPath) {
  const conversion = spawnSync(
    "magick",
    [
      rawPath,
      "-fuzz", "2%",
      "-trim",
      "+repage",
      "-filter", "point",
      "-resize", "620x300",
      "-gravity", "center",
      "-background", "#10192a",
      "-extent", "640x320",
      "-strip",
      outputPath
    ],
    { encoding: "utf8" }
  );
  if (conversion.status !== 0) {
    throw new Error(conversion.stderr || `ImageMagick failed for ${outputPath}.`);
  }
}

await fs.mkdir(outputDirectory, { recursive: true });
const rawDirectory = await fs.mkdtemp("/tmp/bscode-tower-captures-");
const { socket, send } = await connectToApp();

try {
  await send("Runtime.enable");
  for (let floor = 1; floor <= floorCount; floor += 1) {
    const expression = `(async () => {
      if (!pixelModeEnabled) togglePixelMode(true);
      postPixelMessage({
        type: "houseConfig",
        floors: 20,
        slots: 4,
        petsEnabled: false,
        pet: "hamster"
      });
      for (let id = 1; id <= 12; id += 1) {
        postPixelMessage({ type: "agentClosed", id });
      }
      const layout = await pixelLayoutForFloor(${floor});
      postPixelMessage({ type: "layoutLoaded", layout });
      await new Promise((resolve) => setTimeout(resolve, 700));
      const canvas = pixelModeFrame.contentDocument.querySelector("canvas");
      if (!canvas) throw new Error("Pixel Agents canvas is unavailable.");
      return canvas.toDataURL("image/png");
    })()`;
    const response = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (response.exceptionDetails) {
      throw new Error(response.exceptionDetails.text || `Floor ${floor} did not render.`);
    }
    const dataUrl = response.result?.value;
    if (!String(dataUrl).startsWith("data:image/png;base64,")) {
      throw new Error(`Floor ${floor} returned an invalid canvas capture.`);
    }
    const baseName = `floor-${String(floor).padStart(2, "0")}.png`;
    const rawPath = path.join(rawDirectory, baseName);
    const outputPath = path.join(outputDirectory, baseName);
    await fs.writeFile(rawPath, Buffer.from(dataUrl.split(",")[1], "base64"));
    convertCapture(rawPath, outputPath);
    process.stdout.write(`Captured ${baseName}\n`);
  }
} finally {
  socket.close();
}

process.stdout.write(`Saved ${floorCount} pre-rendered room previews to ${outputDirectory}\n`);
