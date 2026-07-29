# Visual QA and release matrix

BsCode uses screenshot-driven visual testing in addition to its 42 automated
regression checks. A release is not complete until the packaged Apple Silicon
application passes the same smoke test as the development build.

## Required view states

| Surface | States checked |
| --- | --- |
| Home | dark and light appearance; recent local and SSH workspaces; app icon; immersive controls disabled |
| Workspace chrome | Files and Workspaces switch; local and SSH tabs; curved active tab; address bar; compact add button; running-agent faces and status |
| Agent grid | one, two, and four panes; empty and active slots; Terminal and Zen; light and dark appearance; model/footer visibility |
| Zen / bullet view | checklist spacing; transparent header; readable ETA and completion text; `Enter` submission; send/interrupt control |
| Files and Outputs | Explorer open and collapsed; opened-output retention; preview panel; disconnected SSH state; storage status |
| Settings | Appearance, Agents, Cinematic, Performance, Profile, and About; only actionable controls; readable light/dark contrast |
| Workspace Notes | notes, todos, sketch canvas, brush controls, generated `.bscode-notes.md`, and `.bscode-notes.json` |
| Pixel Mode | all 20 premade floor previews; connected crown and ground; four time-of-day skies; clipboard empty/active; agent-floor navigation |
| Pet sheets | actual sprite click; species portrait; HP, energy, level, mood, food, hobbies, trait, and talent |
| Cinematic Mode | idle and four active panes; true full screen; 20 scene changes; borderless panes; shared resizing; mention picker; command dock; Results and exit controls |

## Size and motion checks

- The normal desktop application is checked at its minimum supported window
  and at the default 1580 × 1000 size.
- Cinematic Mode is checked at native full-screen size and again after
  mirrored pane resizing.
- The product page is rendered at 1440 × 1000, 900 × 1100, and 430 × 900.
- Scene videos are inspected at multiple timestamps to confirm actual motion.
- Pixel pet movement is sampled over time to catch teleporting, broken walk
  frames, or unrealistic speed.
- Reduced-motion and lower-FPS settings are exercised independently of the
  default scene playback.

## Automated gates

Run:

```bash
npm run check
npm test
```

The test suite verifies, among other things:

- exactly 20 unique 640 × 320 tower preview PNGs;
- pet clicks route to the RPG stat sheet;
- Zen and bullet-point prompts submit on `Enter`;
- all 20 Cinematic scenes and their local poster/video assets resolve;
- workspace tabs show faces and optional ETAs only for live agents;
- light-mode agent names meet the intended contrast;
- Home prevents Pixel and Cinematic activation;
- packaging metadata, icons, and native module rules remain valid.

## Packaged Apple Silicon gate

After `npm run package:mac`:

1. Confirm the application and every Mach-O executable are `arm64`.
2. Confirm the archive contains `BsCode.app` and no source-only artifacts.
3. Install the generated application in `/Applications`.
4. Close all prior development and installed BsCode processes.
5. Open the installed build and repeat Home, Agent, Pixel, Cinematic, Notes,
   Settings, and light/dark smoke checks.
6. Publish the exact tested archive and its SHA-256 checksum.

## Evidence

Release screenshots live in [`docs/screenshots`](screenshots/). The 20
Cinematic source credits and licenses are recorded in
[`assets/scenes/README.md`](../assets/scenes/README.md). The product page owns
its own desktop/tablet/phone capture script and fails on horizontal overflow,
broken images, missing videos, missing download links, or off-viewport key
headings.
