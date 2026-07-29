# BsCode 0.2.1

BsCode 0.2.1 is the visual-stability and interaction-polish release. It keeps
the 0.2 feature set while tightening the packaged Apple Silicon experience
across Home, Cinematic Mode, Pixel Mode, tabs, Settings, Notes, and macOS
chrome.

## Download

The macOS release is packaged natively for Apple Silicon (`arm64`) as
`BsCode-macOS-arm64.zip`.

## Highlights

- Clean keyboard-first Home screen with the standalone B artwork, no page
  scrollbar, and recent local/SSH workspaces.
- Readable Cinematic panes in every appearance, corrected progress ordering,
  aligned send/interrupt controls, typed-`@` routing, and a rebuilt library of
  15 licensed artist-made 1440p scenery and architecture backgrounds.
- Fixed-camera living art with slow localized atmosphere, proper Reduce Motion
  and hidden-window throttling, and no stock footage or short video seams.
- Spotify playback now drives an adjustable but restrained perimeter glow.
  The center artwork, agent panes, command dock, and player remain still;
  pausing removes the effect.
- Correct head-and-shoulders agent portraits in workspace tabs.
- Tab hover now highlights only the curved outline, and the Files divider
  begins below the tab strip.
- Previous/next month navigation in the macOS calendar.
- Sticky Settings header with Reset to defaults and a live Terminal
  typography preview.

## Pixel Mode

- Twenty distinct, premade 640 × 320 tower previews rendered from the actual
  Pixel room compositor.
- Collision-aware furniture footprints and regenerated room layouts.
- Attached Art Deco crown, grounded tower shell, and Up/Down floor traversal.
- Pet RPG sheets anchor beside the clicked sprite and flip at viewport edges.
- Corrected side-idle and small-pet walking frames.
- Clearer empty clipboard coffee state.

## Notes and workflow

- Refined sketch tools with pen, eraser, swatches, brush size, undo/redo,
  clear, and `⌘Z` / `⇧⌘Z`.
- Follow-up messages send reliably from Zen/bullet mode with a real delayed
  terminal Return, and Cinematic terminals retain a usable multi-line viewport.
- Original PTY chunks now pass through xterm's native ordered write buffer;
  large bursts no longer force-scroll, drop ANSI state, or replay output.
- Hidden and actively resized panes retain valid PTY geometry, and duplicate
  BsCode launches can no longer share one profile concurrently.
- Responsive pane clamps and settled terminal refits keep Home, Workbench,
  Pixel, and Cinematic layouts stable down to 900 × 600 without overwriting
  saved wide-window preferences.
- Typed-`@` menus expose only named active agents while provider aliases remain
  available as hidden routing shortcuts.
- Completed or waiting agents render as Idle instead of stale Planning.
- Running-agent tabs preserve live ETA labels and correctly cropped faces.
- Home continues to block Pixel and Cinematic modes until a workspace opens.

## Validation

- 53 automated regression checks.
- Source syntax and packaging-configuration validation.
- Twenty unique tower-preview asset checks.
- Packaged `/Applications/BsCode.app` code-signature verification.
- Native `arm64` Electron framework verification.
- Screenshot-driven review of Home, light-mode agents, Cinematic Mode,
  Settings, tabs, and Pixel Mode.

Scene sources and licenses remain documented in
[`assets/scenes/README.md`](../assets/scenes/README.md).
