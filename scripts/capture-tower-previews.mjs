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
      "-gravity", "south",
      "-crop", "100%x90%+0+0",
      "+repage",
      "-alpha", "on",
      "-fuzz", "1%",
      "-transparent", "#1e1e1e",
      "-transparent", "#10192a",
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
  await send("Page.enable");
  for (let floor = 1; floor <= floorCount; floor += 1) {
    const expression = `(async () => {
      homeView.hidden = true;
      mainLayout.inert = false;
      pixelModeView.hidden = false;
      Object.assign(pixelModeView.style, {
        display: "block",
        inset: "0",
        position: "fixed",
        visibility: "visible",
        width: "100vw",
        height: "100vh",
        zIndex: "2147483646"
      });
      Object.assign(pixelModeFrame.style, {
        display: "block",
        inset: "0",
        position: "absolute",
        visibility: "visible",
        width: "100%",
        height: "100%"
      });
      for (const child of pixelModeView.children) {
        if (child !== pixelModeFrame) child.style.setProperty("display", "none", "important");
      }
      for (let attempt = 0; attempt < 120; attempt += 1) {
        if (
          pixelModeFrame.contentWindow?.__workbenchPixelBridge
          && pixelModeFrame.contentWindow?.__pixelAgentsTestHooks
        ) break;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      const pixelWindow = pixelModeFrame.contentWindow;
      if (!pixelWindow?.__workbenchPixelBridge) {
        throw new Error("Pixel Agents bridge is unavailable.");
      }
      pixelWindow.postMessage({
        type: "houseConfig",
        floors: 20,
        slots: 4,
        petsEnabled: false,
        pet: "hamster"
      }, "*");
      for (let id = 1; id <= 12; id += 1) {
        pixelWindow.postMessage({ type: "agentClosed", id }, "*");
      }
      const layout = await pixelLayoutForFloor(${floor});
      pixelWindow.postMessage({ type: "layoutLoaded", layout }, "*");
      for (let attempt = 0; attempt < 80; attempt += 1) {
        if (pixelWindow.__workbenchPixelBridge.currentFloor === ${floor}) break;
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      if (pixelWindow.__workbenchPixelBridge.currentFloor !== ${floor}) {
        throw new Error("Floor ${floor} did not reach the Pixel Agents renderer.");
      }
      await new Promise((resolve) => setTimeout(resolve, 700));
      const canvases = Array.from(pixelModeFrame.contentDocument.querySelectorAll("canvas"));
      const canvas = canvases.sort(
        (left, right) => right.width * right.height - left.width * left.height
      )[0];
      if (!canvas) throw new Error("Pixel Agents canvas is unavailable.");
      const pixelRoot = pixelModeFrame.contentDocument.getElementById("root");
      for (const element of pixelRoot?.querySelectorAll("*") || []) {
        if (element === canvas || element.contains(canvas)) continue;
        element.style.setProperty("visibility", "hidden", "important");
      }
      await new Promise((resolve) => setTimeout(resolve, 80));
      return {
        floor: layout.workbenchFloor,
        theme: layout.workbenchRoomTheme,
        plan: layout.workbenchRoomPlan,
        bridgeFloor: pixelWindow.__workbenchPixelBridge.currentFloor,
        canvasCount: canvases.length,
        canvasSize: String(canvas.width) + "x" + String(canvas.height),
        furnitureCount: pixelWindow.__pixelAgentsTestHooks?.getFurnitureCount?.(),
        expectedFurnitureCount: layout.furniture.length,
        clip: (() => {
          const bounds = pixelModeFrame.getBoundingClientRect();
          return {
            x: Math.max(0, bounds.left),
            y: Math.max(0, bounds.top),
            width: Math.max(1, Math.min(window.innerWidth - Math.max(0, bounds.left), bounds.width)),
            height: Math.max(1, Math.min(window.innerHeight - Math.max(0, bounds.top), bounds.height)),
            scale: 1
          };
        })()
      };
    })()`;
    const response = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (response.exceptionDetails) {
      throw new Error(response.exceptionDetails.text || `Floor ${floor} did not render.`);
    }
    const capture = response.result?.value;
    const screenshot = await send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false,
      clip: capture.clip
    });
    const dataUrl = `data:image/png;base64,${screenshot.data}`;
    const baseName = `floor-${String(floor).padStart(2, "0")}.png`;
    const rawPath = path.join(rawDirectory, baseName);
    const outputPath = path.join(outputDirectory, baseName);
    await fs.writeFile(rawPath, Buffer.from(dataUrl.split(",")[1], "base64"));
    convertCapture(rawPath, outputPath);
    process.stdout.write(
      `Captured ${baseName} · ${capture.theme || "unknown theme"} · ${capture.plan || "unknown plan"}`
        + ` · ${capture.canvasCount} canvas ${capture.canvasSize}`
        + ` · ${capture.furnitureCount}/${capture.expectedFurnitureCount} furniture\n`
    );
  }
} finally {
  socket.close();
}

process.stdout.write(`Saved ${floorCount} pre-rendered room previews to ${outputDirectory}\n`);
