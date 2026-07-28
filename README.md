# BsCode

A desktop Electron workspace for running and organizing Codex, Claude, and
shell agents in a VS Code-inspired 2×2 interface.

![BsCode agent grid](docs/screenshots/agent-grid.jpg)

## Highlights

- Four independent agent terminals with one-word human names, tl;drs, ETAs, checklists, and relevant files
- Per-agent and global Zen views for checklist-first prompting without hiding generated files
- Local and SSH workspaces in persistent tabs, with reusable SSH sessions and recent remote folders
- Drag local files or folders into any agent, including direct local-to-SSH transfers
- Explorer and output panes with resizable or fully collapsible sidebars
- Embedded previews for images, HTML, PDFs, code, and generated artifacts
- Live CPU, memory, NVIDIA GPU, battery, Codex usage, and Spotify status
- Openleaf theme catalog shared across the application and terminals
- Command palette, workspace context menus, and `⌘1`–`⌘4` agent navigation
- Native notifications and an unread bell when an agent finishes
- Pixel Mode with a growable textured tower, one agent and a distinct animated pet per floor, mouse pan/zoom, and a sprite-face agent clipboard

![BsCode Pixel Mode](docs/screenshots/pixel-mode.jpg)

## Run locally

Requirements: Node.js 22.12 or newer, npm 10 or newer, and at least one
supported CLI (`codex`, `claude`, or a shell).

```bash
npm ci
npm run dev
```

Validate the source and packaging configuration:

```bash
npm run check
```

Build a native application directory for the current operating system:

```bash
npm run package:current
```

Platform-specific commands are also available:

```bash
npm run package:mac
npm run package:windows
npm run package:linux
```

Build Windows on Windows and Linux on Linux. This is required because Electron
and `node-pty` contain host-native binaries. The existing macOS build remains
at `dist/mac/BsCode.app`; Windows and Linux builds are written under `dist/win`
and `dist/linux`.

See [Cross-platform builds](docs/cross-platform.md) for prerequisites, output
paths, feature availability, signing guidance, and a release smoke-test
checklist.

BsCode launches Codex with its approvals and sandbox bypass flag.
Review the launch configuration in `main.js` before using untrusted
workspaces.

## Agent metadata

Each agent receives a private metadata path under Electron's user-data
directory and updates it with:

```json
{
  "name": "Short task-specific name",
  "tldr": "One sentence describing current progress.",
  "status": "working",
  "etaSeconds": 180,
  "progressPercent": 40,
  "checklist": [
    { "text": "Implement the parser", "status": "working", "etaSeconds": 120 },
    { "text": "Run regression tests", "status": "pending", "etaSeconds": 240 }
  ],
  "relevantFiles": ["relative/path/to/output.png"],
  "previewFile": "relative/path/to/output.png"
}
```

The renderer watches this file to keep names, TLDRs, countdowns, notifications,
Pixel Mode, and output previews in sync.

## Pixel Mode

Pixel Mode embeds the open-source
[Pixel Agents](https://github.com/pixel-agents-hq/pixel-agents) webview under
its MIT license. Left-drag to pan and use the scroll wheel or the `+`/`−`
controls to zoom. Use the tower’s `+` control to add a persistent floor.
Pet choices include animated cats, dogs, and lizards, with deterministic
floor-specific variants so neighboring floors remain easy to distinguish.
