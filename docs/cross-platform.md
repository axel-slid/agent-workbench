# Cross-platform builds

BsCode uses platform-native Electron and `node-pty` binaries. Build each target
on that target operating system; the packaging scripts intentionally reject
cross-building. This prevents a package that looks complete but contains a
terminal binary for the wrong platform.

## Shared prerequisites

- Node.js 22.12 or newer
- npm 10 or newer
- Git
- A supported agent CLI in `PATH`: Codex, Claude, or both
- A platform shell that `node-pty` can launch

Install dependencies and validate the checkout before packaging:

```bash
npm ci
npm run check
```

`npm run package:current` selects the correct native packager. The
platform-specific scripts are useful in CI and fail clearly when invoked on
the wrong host.

## macOS

Run:

```bash
npm run package:mac
open "dist/mac/BsCode.app"
```

Output:

```text
dist/mac/BsCode.app
```

The existing macOS packager is preserved. It copies the Electron application,
installs production dependencies inside the bundle, applies the BsCode icon
and bundle metadata, then performs an ad-hoc signature. A public release still
needs a Developer ID signature and Apple notarization.

Spotify controls and the detailed battery/charging indicator currently use
macOS system APIs.

## Windows

Use Windows PowerShell or Command Prompt:

```powershell
npm ci
npm run check
npm run package:windows
.\dist\win\BsCode-win32-x64\BsCode.exe
```

On Windows on Arm, the architecture suffix is `arm64` instead of `x64`.

The output is an unpacked, portable application directory:

```text
dist/win/BsCode-win32-<architecture>/
```

For SSH workspaces, install OpenSSH Client and an `rsync` implementation and
make both commands available in `PATH`. Spotify automation and the macOS
battery detail are unavailable; their UI should report the feature as
unsupported.

The unpacked executable is not code-signed and does not include an installer.
A public release should sign `BsCode.exe` and its shipped binaries, then wrap
the directory with an installer such as MSIX or a signed setup executable.

## Linux

On a glibc-based desktop distribution, run:

```bash
npm ci
npm run check
npm run package:linux
./dist/linux/BsCode-linux-$(node -p "process.arch")/BsCode
```

Output:

```text
dist/linux/BsCode-linux-<architecture>/
```

The portable directory includes `bscode.desktop` and a 1024-pixel application
icon as release metadata. A distributor can install the icon under the
freedesktop icon hierarchy and adjust the desktop entry’s `Exec` field to the
installed executable.

SSH workspaces require `ssh` and `rsync` in `PATH`. NVIDIA metrics require
`nvidia-smi`. Spotify automation and the macOS battery detail are unavailable.

Electron also relies on standard desktop libraries supplied by the target
distribution. Package and smoke-test on the oldest Linux distribution the
release intends to support. If the Chromium sandbox is unavailable, fix the
host sandbox or packaging configuration rather than shipping a global
`--no-sandbox` launcher.

## What the native packager does

The Windows/Linux packager:

1. verifies that the host matches the requested target;
2. verifies the installed Electron runtime and CPU architecture;
3. copies the native Electron distribution into a deterministic output path;
4. renames the runtime executable to `BsCode`;
5. copies the application, assets, and Pixel Mode files;
6. runs `npm ci --omit=dev` inside the packaged application so `node-pty`
   matches the host;
7. removes Electron’s default application archive; and
8. emits Linux desktop metadata where applicable.

It does not silently download another platform’s runtime, mutate a native
module into a different target, sign binaries, publish artifacts, or deploy a
release.

## Release smoke test

Run this checklist on every target and architecture:

- Launch BsCode from the packaged executable, not `npm run dev`.
- Open and close a local workspace, then reopen it from recents.
- Start shell and installed agent CLIs; type continuously while output streams.
- Resize, collapse, and restore both sidebars.
- Create, rename, drag, preview, and remove a disposable file.
- Connect an SSH workspace, reconnect it, and verify a transferred file.
- Confirm terminal colors and code previews in one dark and one light theme.
- Verify command-palette and agent-focus keyboard shortcuts.
- Verify notifications after an agent completes.
- Enter and leave Pixel Mode and confirm pan, zoom, and floor switching.
- Quit and relaunch, then confirm persisted workspaces and settings.

## CI release layout

Use separate macOS, Windows, and Linux jobs. Each job should run:

```bash
npm ci
npm run check
npm run package:current
```

Archive only the platform’s `dist` output after the smoke test. Keep signing
credentials in the CI provider’s protected secret store and sign after the
unsigned directory build succeeds.
