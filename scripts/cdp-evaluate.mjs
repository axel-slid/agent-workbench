#!/usr/bin/env node

const debugPort = Number(
  process.argv.find((argument) => argument.startsWith("--port="))?.slice(7)
    || 9222
);
const expression = process.argv.filter((argument) => !argument.startsWith("--port="))[2];
if (!expression) {
  throw new Error("Usage: node scripts/cdp-evaluate.mjs '<JavaScript expression>' [--port=9222]");
}

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

const response = await new Promise((resolve, reject) => {
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id !== 1) return;
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });
  socket.send(JSON.stringify({
    id: 1,
    method: "Runtime.evaluate",
    params: {
      expression,
      awaitPromise: true,
      returnByValue: true
    }
  }));
});
socket.close();

if (response.exceptionDetails) {
  throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
}
const value = response.result?.value;
if (value === undefined) process.stdout.write("undefined\n");
else if (typeof value === "string") process.stdout.write(`${value}\n`);
else process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
