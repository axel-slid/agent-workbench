# BsCode feature reference

This document describes the user-facing features, runtime behavior, settings,
shortcuts, platform support, data model, and security boundaries in BsCode.
It is intended to be the complete product reference for the current desktop
application.

## Contents

- [Product model](#product-model)
- [Workspace management](#workspace-management)
- [Agent runtimes](#agent-runtimes)
- [Agent terminal view](#agent-terminal-view)
- [Zen view and progress tracking](#zen-view-and-progress-tracking)
- [Files and transfers](#files-and-transfers)
- [Outputs and previews](#outputs-and-previews)
- [Pixel Mode](#pixel-mode)
- [Navigation and command palette](#navigation-and-command-palette)
- [Notifications and live status](#notifications-and-live-status)
- [Appearance](#appearance)
- [Settings](#settings)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Local data and persistence](#local-data-and-persistence)
- [Desktop architecture](#desktop-architecture)
- [Security model](#security-model)
- [Platform support](#platform-support)
- [Performance behavior](#performance-behavior)
- [Current limitations](#current-limitations)

## Product model

BsCode is an Electron desktop environment for coordinating multiple coding
agents in one project. A workspace supplies the working directory. Each
workspace can contain one, two, or four agent slots, and each slot can run:

- OpenAI Codex CLI
- Anthropic Claude Code CLI
- The platform login shell

The primary application surfaces are:

1. **Home** for recent workspaces.
2. **Terminal view** for direct interaction with every agent.
3. **Zen view** for checklist-first progress monitoring and follow-up prompts.
4. **Pixel Mode** for a visual office representation of the same live agents.
5. **Cinematic Mode** for a distraction-free, full-screen agent wall over
   credited artist-made animated landscapes.
6. **Files** for workspace browsing and file operations.
7. **Outputs** for generated artifact discovery and preview.
8. **Workspace Notes** for shared notes, todos, and sketches that agents can
   read from `.bscode-notes.md`.

All views share the same workspace, terminal sessions, agent metadata, files,
and generated outputs. Switching views does not start another agent.

## Workspace management

### Workspace types

| Type | Working directory | Agent execution | File browser |
| --- | --- | --- | --- |
| Local | A directory on the current computer | Local PTY process | Native filesystem |
| SSH | A directory on a remote host | Remote command through SSH | Lazy remote directory listing |

### Add-workspace flow

The new-workspace wizard guides the user through:

1. Choosing **Local** or **Remote**.
2. Selecting or entering the working directory.
3. Choosing a default layout: `1×1`, `1×2`, or `2×2`.
4. Reviewing the resulting agent slots.

Local workspaces use the operating system folder picker. SSH workspaces accept
a host, user, port, and remote folder, and can use an interactive terminal for
authentication when SSH requires it.

### Workspace tabs

- Every open workspace has a persistent editor tab.
- The active tab is merged into the editor baseline.
- Running-agent portraits appear on a tab only while those agents exist.
- Portraits display live ETA text when the corresponding agent is working.
- The add button opens the workspace wizard.
- Right-click a tab to rename the workspace.
- Closing a tab opens a removal confirmation.
- Removing a workspace removes it from BsCode; it does not delete the
  underlying local or remote project directory.
- The Home screen provides another entry point for recent workspaces.

### SSH connection behavior

- Recent SSH destinations and folders are retained for reuse.
- The status bar distinguishes checking, connected, and disconnected states.
- A disconnected remote workspace does not expose stale files as though they
  were live.
- Clicking the remote status control reopens the SSH connection flow.
- Remote directories expand lazily instead of mirroring an entire server tree
  before the Explorer can be used.
- Files required for local preview or external opening are copied into the
  workspace cache on demand.
- Remote agent metadata is polled while remote agents are running.

## Agent runtimes

### Starting an agent

An empty slot contains:

- The slot number.
- A multiline task field.
- Codex, Claude, and shell launch controls.

Pressing `Enter` in the task field starts the default agent selected in
Settings. Use `Shift+Enter` to add a newline. The toolbar and command palette
can also start a runtime in the first available slot.

### Runtime commands

Local Codex starts in the workspace directory. Local Claude receives the
workspace and metadata directories as allowed directories. Shell sessions use
the platform login shell.

SSH workspaces run the corresponding CLI or shell on the remote host in the
configured remote directory. BsCode checks that the requested agent CLI is
available in the remote login shell and reports a useful error when it is not.

### PTY integration

- Every runtime is hosted in a real pseudoterminal through `node-pty`.
- The terminal resizes when its card or the application window changes.
- ANSI color and full interactive input are supported through xterm.js.
- Original PTY chunks flow directly through xterm's ordered, time-sliced write
  buffer so escape sequences cannot be dropped or merged incorrectly.
- Hidden, detached, and actively resized panes keep their last valid PTY
  dimensions; xterm owns scroll anchoring and reflow.
- Native resizing settles once before terminals refit. The responsive layout
  stays usable down to 900 × 600 and restores saved pane widths when enlarged.
- An exited session exposes a reconnect action.

### Per-agent identity and metadata

Each agent receives:

- A deterministic one-word name from a pool of 1,024 names.
- Its agent number and runtime kind.
- A private JSON metadata file.
- Instructions for reporting status, progress, ETA, checklist items, relevant
  files, and a preferred preview file.

The name can be edited in the agent header. The same identity appears in the
terminal card, workspace tab portrait, notification history, output
attribution, and Pixel Mode.

### Agent actions

Each live agent supports:

- Rename.
- Send terminal input.
- Send a follow-up instruction.
- Ask for a metadata/status refresh.
- Pause or resume ETA tracking.
- Interrupt the current command.
- Stop the process.
- Retry a failed task.
- Reassign a task.
- Duplicate into another available slot.
- Clear terminal output.
- Reconnect after exit.
- Maximize the card.
- Swap horizontally or vertically in the layout.
- Switch between Terminal and Zen view.

Global controls can pause/resume, stop, retry, request status from, or toggle
Zen view for every agent in the active workspace.

## Agent terminal view

The standard view shows one, two, or four terminal cards according to the
workspace layout.

Each card contains:

- Editable agent name.
- Runtime badge and runtime/model description.
- Live status and elapsed/remaining time.
- Direct xterm.js output.
- Relevant-file history.
- Follow-up prompt input.
- Layout, Zen, menu, and stop controls.

The grid supports:

- `1×1` for one focused agent.
- `1×2` for two side-by-side agents.
- `2×2` for four agents.
- Temporary maximization of a single agent.
- Keyboard focus of slots 1–4.
- Focus Mode, which hides side panels and maximizes the working surface.

## Zen view and progress tracking

Zen view replaces raw terminal output with structured progress while leaving
the underlying PTY running.

It displays:

- Current task or completion summary.
- Agent state: planning, coding, waiting, failed, or complete.
- Overall progress percentage.
- Live ETA countdown.
- Checklist items and item-specific ETAs.
- Relevant files.
- A follow-up prompt.
- An interrupt control.

Submitting a new follow-up begins a new task cycle. The previous checklist ETA
state is cleared and replaced with a preparation state until the agent reports
its next checklist.

ETA behavior includes:

- A deadline derived from reported seconds.
- Countdown updates every second.
- Pause/resume support.
- Preservation across repeated metadata reports.
- Completion output in place of a stale countdown.

## Files and transfers

### Explorer

The Files pane supports:

- Local and SSH workspaces.
- Expandable folders.
- Lazy expansion of remote folders.
- Material-style file and folder icons.
- Selection and inline rename.
- Collapse-all.
- Create file.
- Create folder.
- Files/workspaces sidebar switching.
- Full pane collapse.
- Drag resizing with optional snap-to-close.

### File context menu

Right-clicking a file or folder exposes applicable actions:

- Open.
- Open in Visual Studio Code.
- Reveal in Finder, Explorer, or the Linux file manager.
- Create a file or folder at that location.
- Rename.
- Duplicate.
- Copy absolute or remote path.
- Copy workspace-relative path.

### Drag, drop, and paste

- Drop local files or folders into the Explorer to import them.
- Drop files into an agent slot to import them and insert workspace-relative
  references into the prompt.
- Local-to-SSH drops upload directly into the selected remote workspace.
- Pasted images are validated, bounded in size, saved under the workspace, and
  referenced in the receiving agent prompt.
- Name collisions are resolved without silently overwriting an existing file.

### Safety boundaries

File operations normalize paths and reject paths that escape the selected
workspace. Common high-volume directories and internal metadata are excluded
from broad artifact scans.

## Outputs and previews

### Session files

The Outputs pane lists artifacts created during the current BsCode session,
excluding files that existed at the session baseline. Agent-reported
`relevantFiles` and `previewFile` entries are used to attribute outputs to the
agent that produced them, including in SSH workspaces.

Each output can show:

- Agent icon.
- Agent number.
- Agent name.
- Relative path.
- File-kind thumbnail.

The output list can be collapsed independently from the preview area.

### Supported preview classes

| Kind | Examples | Preview behavior |
| --- | --- | --- |
| Image | PNG, JPEG, GIF, WebP, SVG | Embedded image |
| Video | MP4, MOV, WebM | Embedded player with controls |
| PDF | PDF | Embedded document with original, adaptive, or inverted rendering |
| Web | HTML | Sandboxed embedded page |
| Code | JS, TS, JSON, CSS, HTML, Python, shell, and others | Syntax-aware text view |
| Text/data | TXT, Markdown, CSV, logs, structured text | Scrollable text |

The path field can preview a local or remote file directly even when it is not
in the current Session files list.

### Automatic preview

When enabled:

- Agent-reported preview files open automatically.
- The Outputs pane can expand automatically.
- The most relevant generated file becomes the active preview.

## Pixel Mode

Pixel Mode is a visual layer over the same live agents. It embeds the
open-source [Pixel Agents](https://github.com/pixel-agents-hq/pixel-agents)
runtime under its MIT license.

### Tower and floors

- The floor count grows up to 20.
- Each active agent is assigned a distinct floor.
- Each floor button shows one of 20 bundled 640 × 320 preview PNGs generated
  from the real Pixel room compositor before release.
- The running app never cycles hidden floors or captures thumbnails in the
  background. This keeps tab changes stable and makes the tower update
  immediately.
- The active room opens beside the tower.
- Floors can be added, deleted when safe, selected, and refreshed.
- Floor layouts persist per workspace.
- The visual iframe remains laid out invisibly in Terminal view so switching
  back to Pixel Mode can be immediate.
- Initial visual warmup uses the bundled BsCode assembly animation as a
  borderless, silent part of the loading surface. The optimized local clip is
  alpha-keyed so only the assembling B appears over the already-warmed room;
  it has no controls or audio and stops decoding as soon as the room is ready.

The first 20 floors use distinct occupied silhouettes, room dimensions,
architecture, flooring materials, color transforms, workstation placement,
and decor rather than recoloring one repeated plan.
The generator takes cues from the
[official compact layout](https://github.com/pixel-agents-hq/pixel-agents/blob/main/webview-ui/public/assets/default-layout-1.json),
the larger community-office proportions, and the corporate, cozy-library,
garden-office, and startup layouts in
[Orseni's Pixel Agents fork](https://github.com/orseni/pixel-agents/tree/main/webview-ui/public/assets).

1. Code Library
2. Indie Studio
3. Sunken Lounge
4. Glass Greenhouse
5. Strategy War Room
6. Night Owl Café
7. Lunar Observatory
8. Maker Garage
9. Digital Gallery
10. Recording Loft
11. Retro Arcade
12. Zen Garden
13. Breaking Newsroom
14. Wellness Suite
15. Robotics Lab
16. Creative Loft
17. Deep Archive
18. Command Bridge
19. Golden Sunroom
20. Rooftop Lookout

### Time-aware exterior

The tower exterior follows the computer’s local time:

- Sunrise sky.
- Day sky with a pixel sun.
- Sunset sky.
- Night sky with stars and a pixel moon.

The exterior, tower shell, elevator shaft, rooftop, lobby, and structural
divider are rendered with hard-edged pixel geometry. A sun/moon button cycles
manually through sunrise, day, sunset, and night; until it is used, those four
phases are selected from local time. Double-clicking the control returns it to
local time.

### Live agents

- Running agents use deterministic character sprites.
- Agent status controls whether a character works, waits, or reports an error.
- Tool activity and speech are sent into the room.
- Agent details show name, runtime/team, state, ETA, current task, checklist,
  relevant files, and follow-up controls.
- Opening a person keeps the user in Pixel Mode; opening the full terminal is
  a separate action.

### Pets

Pixel pets can be disabled. When enabled, floors rotate through distinct
species so adjacent rooms remain recognizable:

- Nibbles — hamster
- Claudio — cat
- Scout — dog
- Pixel — lizard
- Mochi — rabbit
- Atlas — tortoise
- Ribbit — frog
- Piper — cockatiel
- Pippin — hedgehog
- Bandit — raccoon
- Waddles — penguin
- Maple — red panda

The first-floor species is selectable in Settings.

Clicking a pet in the room bypasses Pixel Agents' speech bubble and opens its
character sheet directly with its name, species, floor, HP, energy, level,
mood, favorite food, hobbies, trait, and talent.
The sheet anchors beside the clicked sprite, flips sides near the viewport
edge, and keeps its pointer aligned to the pet.
Pet wandering uses short nearby paths, a slower step speed, and path updates
only between steps to avoid sliding or snapping.

### Room interaction

- Left-drag the room to pan.
- Use the mouse wheel to zoom.
- Use the room `+` and `−` controls as an alternative.
- Use Up/Down arrows to move one floor at a time while Pixel Mode is active.
- Use the tower refresh control to reload the selected premade preview.
- Use the clipboard control to browse active agents. Clicking a clipboard
  entry switches to that agent's assigned floor before opening their details.

## Navigation and command palette

The command center shows the active workspace, remote target, running-agent
count, and runtime state. Clicking it or pressing the command-palette shortcut
opens fuzzy search over:

- Start Codex, Claude, or shell.
- Add workspace.
- Create file or folder.
- Open workspace in Visual Studio Code.
- Toggle Pixel Mode.
- Toggle Files or Outputs.
- Refresh the workspace.
- Run/pause, stop, retry, or request status from agents.
- Toggle global Zen view.
- Toggle Focus Mode.
- Open Settings.
- Focus a live agent.
- Open a workspace file.
- Switch workspace.

Arrow keys change the selected result, `Enter` executes it, and `Escape`
closes it.

## Notifications and live status

### Agent notifications

- Completed and failed work can create native desktop notifications.
- Clicking a native notification focuses BsCode.
- An in-app bell keeps unread history.
- The unread count is persisted.
- Notification history records the agent, workspace, summary, and time.

### Title bar

The custom title bar can show:

- Spotify artwork, track, artist, and playback controls.
- Current workspace/runtime summary.
- Home, new-agent, Visual Studio Code, Zen, Pixel, notification, and Settings
  actions.
- Local time.
- Battery percentage and charging state.

Spotify controls use the native Spotify application when available.

### Status bar

The bottom status bar can show:

- SSH connection state.
- Codex remaining usage and reset date.
- Active local or remote target.
- CPU usage.
- Memory usage.
- NVIDIA GPU usage and memory.
- GPU user, memory used, and utilization on hover.

Remote metrics are explicitly cleared when a remote workspace disconnects.

## Appearance

BsCode applies one palette across the desktop chrome, terminals, Zen view,
outputs, and Pixel Mode.

Theme categories include:

- Light.
- Light Contrast.
- Transparent.
- Gradient.
- Dark.
- Dark Contrast.
- Pixelized.

The catalog includes built-in themes and imported Openleaf palettes. Theme
search filters the catalog by name and category.

### Cinematic Mode and living backgrounds

The yin-yang Cinematic Mode button recreates the agent grid as floating,
translucent panes over a full-window scene. The button stays visually stable;
when enabled in Settings, Spotify playback drives only a faint outer-edge
glow. It does not pulse the agent panes, command dock, center artwork, or
compact player. Cinematic Mode hides
Files, Outputs, workspace tabs, status
chrome, and each terminal's model/usage strip. The Spotify player alone floats
in the top-left. It also enters the operating system's native fullscreen state,
covering the macOS menu/notch strip, and restores the prior window state on
exit. A small exit button remains in the top-right. A single command box
remains centered below the grid; `Command/Ctrl+K` opens the mode and places the
cursor in that box from anywhere:

- If a live agent is selected, the command is sent to that agent.
- Otherwise an idle agent is preferred.
- If no agent is available, the default runtime starts in the next empty slot.
- If every slot is occupied, the command is sent to the first live agent.
- Type `@` for a keyboard-navigable picker containing only named, active
  agents. The menu stays closed at every other time.

The four panes remain visible with generous outer margins and gutters even
when the workspace layout is smaller or no agents are running. The floating
landscape button in the bottom-right advances directly to the next animated
scene; the floating close button remains in the top-right. Dragging the resize
grip on any pane changes the width and height of all four panes together with a
mirrored spring animation.

Appearance settings provide a searchable gallery of 52 bundled 2560 × 1440
human-made artworks. The collection spans landscape, coastal, mountain,
architectural, ruin, Venetian, and ukiyo-e scenery by named artists including
Thomas Cole, Claude Monet, Winslow Homer, Hubert Robert, Katsushika Hokusai,
Utagawa Hiroshige, George Inness, and many others. Gallery cards use lazy
320 × 180 thumbnails, expose artist and license details, and never decode the
master artwork until it is selected.

Every work is Public Domain and distributed through The Met Open Access or the
Art Institute of Chicago CC0 program. The base art never pans, zooms, or
scrolls. A transparent canvas adds one slow, localized atmosphere effect per
scene, with independently phased motion rather than a short repeating clip.
BsCode decodes only the selected local WebP.
Reduce Motion stops all atmosphere, hidden windows stop scheduling frames, and
the scene frame-rate setting is capped at 30 fps. Optional Spotify-reactive
mode anchors its restrained perimeter pulse to Spotify playback position,
stops cleanly on pause, and never moves the underlying artwork.
Complete source URLs and license details are recorded in
[`assets/scenes/README.md`](../assets/scenes/README.md) and
[`assets/scenes/LICENSES.md`](../assets/scenes/LICENSES.md). New works must pass
the documented museum-host allowlist, explicit human-origin, open-rights,
no-upscale, and duplicate-image checks before they can enter the catalog.

PDF rendering has three independent modes:

- **Adaptive** — darkens document surfaces while attempting to preserve
  figures.
- **Original** — keeps source page colors.
- **Invert** — inverts the complete page.

On macOS, the window uses hidden-inset traffic lights, transparency, and
vibrancy. Other platforms use an opaque application background.

## Settings

### Workspace

- Remember Files and Outputs pane widths.
- Snap panes closed when dragged beyond the edge.
- Compact workspace tabs.
- Show live agent ETAs in tabs.

### Appearance

- Theme category.
- Theme.
- Theme search.
- Living background.
- PDF rendering mode.

### Agents

- Default runtime used by `Enter` in an empty slot.
- Zen view by default.
- Auto-open generated files.
- Native completion notifications.
- Recent-file history limit.
- Pixel pets.
- First-floor pet species.
- Colored Pixel status labels.

### Terminal

- Font size.
- Line spacing.
- Scrollback limit.
- Blinking cursor.
- Live typography preview while font size and line spacing are adjusted.

### Outputs

- Open the pane automatically for previews.
- Compact generated-file rows.

### Performance

- System metrics interval: 2, 5, or 10 seconds.
- Reduce Motion.
- Music-reactive Cinematic effects.
- Cinematic effect strength.
- Cinematic pane opacity.
- Living-scene frame-rate cap.

### Profile

- Pixel avatar.
- Display name.
- Role.
- Current focus message.

Settings are searchable and most visual/terminal changes apply immediately.
The sticky Settings header includes **Reset to defaults**, which restores
workbench preferences without deleting workspaces, notes, profile data, or
project files.

## Keyboard shortcuts

Use `Command` on macOS and `Ctrl` on Windows/Linux.

| Shortcut | Action |
| --- | --- |
| `Command/Ctrl+P` | Open or close the command palette |
| `Command/Ctrl+1` through `4` | Focus agent slot 1–4 |
| `Command/Ctrl+Shift+Space` | Pause or resume all agents |
| `Command/Ctrl+Shift+R` | Retry failed agents |
| `Command/Ctrl+Shift+A` | Ask all agents for status |
| `Command/Ctrl+Shift+F` | Toggle Focus Mode |
| `Command/Ctrl+Alt+Z` | Toggle global Zen view |
| `Command/Ctrl+K` | Open Cinematic Mode and focus its command dock |
| `Enter` in an empty task field | Start the default runtime |
| `Shift+Enter` in a prompt | Insert a newline |
| `Enter` in a follow-up prompt | Send the instruction |
| `Escape` | Close the topmost open panel, preview, palette, dialog, or Cinematic Mode |
| Arrow keys in command palette | Move selection |

## Local data and persistence

BsCode stores application data under Electron’s platform user-data directory.
The exact base directory depends on the operating system.

Persisted data includes:

- Workspace records.
- SSH connection history and recent folders.
- Active workspace.
- Workspace layouts.
- Sidebar widths and collapsed state.
- Theme and settings preferences.
- Notification history.
- Pixel floor count, layouts, assignments, and preview images.
- Per-session agent metadata.

Remote non-shell agents also write metadata under:

```text
<remote-workspace>/.agent-workbench/sessions/
```

The core metadata format is:

```json
{
  "name": "Short task-specific name",
  "tldr": "One sentence describing current progress.",
  "status": "working",
  "state": "coding",
  "etaSeconds": 180,
  "progressPercent": 40,
  "checklist": [
    {
      "text": "Implement the parser",
      "status": "working",
      "etaSeconds": 120
    }
  ],
  "relevantFiles": ["relative/path/to/output.png"],
  "previewFile": "relative/path/to/output.png"
}
```

Metadata writes are serialized and use collision-resistant temporary files
before replacement.

## Desktop architecture

BsCode uses Electron’s process isolation:

```text
Renderer UI
   │
   │ window.agentWorkbench
   ▼
Context-isolated preload bridge
   │
   │ validated IPC messages
   ▼
Electron main process
   ├── workspace and artifact filesystem services
   ├── SSH connection and remote directory services
   ├── PTY/agent lifecycle management
   ├── metadata watchers and remote polling
   ├── system, battery, usage, and Spotify integrations
   └── native menus, notifications, and external-open actions
```

The BrowserWindow uses:

- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`

The renderer does not receive unrestricted Node.js access. The preload exposes
a narrow API for workspace, agent, preview, metrics, and notification actions.

## Security model

### Important agent permissions

BsCode intentionally starts Codex with:

```text
--dangerously-bypass-approvals-and-sandbox
```

and Claude with:

```text
--dangerously-skip-permissions
```

This applies to local and SSH agent launches. Agents therefore have broad
access to the selected workspace and can execute commands without interactive
approval. Only use trusted tasks and trusted workspaces, and review
`createAgent` in `main.js` before changing the launch model.

### Application boundaries

- Workspace paths are normalized and constrained before filesystem access.
- External URLs are denied inside the Electron window and opened through the
  operating system instead.
- File previews use bounded read paths and kind-specific rendering.
- Dropped and pasted images are validated before being stored.
- SSH credentials remain handled by the SSH process; BsCode stores connection
  destinations and options, not a custom password database.

## Platform support

| Capability | macOS | Windows | Linux |
| --- | --- | --- | --- |
| Local Codex/Claude/shell agents | Yes | Yes | Yes |
| Local and SSH workspaces | Yes | Yes | Yes |
| PTY terminals | Yes | Yes | Yes |
| Files, outputs, and previews | Yes | Yes | Yes |
| Pixel Mode | Yes | Yes | Yes |
| Battery state | Yes | When exposed by Electron | When exposed by Electron |
| NVIDIA GPU metrics | When `nvidia-smi` is available | When `nvidia-smi` is available | When `nvidia-smi` is available |
| Spotify native controls | Yes | Status may be unavailable | Status may be unavailable |
| Window vibrancy | Yes | No | No |

Builds must be produced on their target operating system because Electron and
`node-pty` include native binaries. See
[Cross-platform builds](cross-platform.md) for requirements and release
checks.

## Performance behavior

BsCode uses several live surfaces that can consume CPU/GPU time:

- xterm.js rendering for every visible terminal.
- The Pixel Mode canvas, sprites, pets, and room animation.
- Electron GPU compositing.
- Per-second ETA updates.
- System metrics polling.
- Remote workspace and metadata polling.
- Static premade tower preview compositing.
- Transparent/vibrant macOS window compositing.
- One local 1440p scene image plus a restrained transparent atmosphere canvas
  when Cinematic Mode is active.

Controls that reduce load:

1. Switch from Pixel Mode to Terminal view when the animated room is not
   needed. Pixel Mode remains prepared in the background, but its visible
   animation and live preview loop are reduced.
2. Enable **Reduce Motion**.
3. Leave Cinematic Mode when its scene is not needed.
4. Set **System metrics refresh** to 10 seconds.
5. Reduce terminal scrollback.
6. Collapse previews that contain animated pages or video.
7. Close unused agents, workspaces, browser tabs, and other Electron apps.

macOS WindowServer usage reflects the combined cost of every visible,
transparent, animated, or frequently repainted window, so it may be high even
when no single application owns all of the reported CPU usage.

## Current limitations

- A workspace supports up to four simultaneous agent slots.
- Pixel Mode supports up to 20 floors.
- Tower preview PNGs are generated ahead of the release; the live Pixel iframe
  never cycles through hidden floors to update the tower.
- Remote files may need to be cached locally before external applications can
  open them.
- Remote metrics depend on commands available on the remote host.
- NVIDIA GPU reporting requires `nvidia-smi`.
- Spotify integration depends on the native Spotify application and platform
  support.
- The broad agent permission flags are intentional and are not appropriate for
  untrusted repositories.
