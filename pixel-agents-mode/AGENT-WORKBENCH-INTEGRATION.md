Pixel Mode embeds the Pixel Agents 1.4.0 webview from:
https://github.com/pixel-agents-hq/pixel-agents

The bundled webview is licensed under the included MIT LICENSE.

Agent Workbench supplies its own postMessage transport and session state. It
does not launch the Pixel Agents standalone server or install Claude hooks.

## BsCode bridge additions

The bundled browser mock decodes the complete Pixel Agents 2D asset set,
including all nine floor textures and all three auto-tiling carpets. BsCode
bundles twelve animated pet species and keeps the upstream walking, idle,
following, and petting animation behavior while slowing path updates enough to
prevent sliding.

Generated room geometry takes cues from:

- The compact
  [upstream default](https://github.com/pixel-agents-hq/pixel-agents/blob/main/webview-ui/public/assets/default-layout-1.json).
- The wider 21 × 21 community layout in
  [Hootbu's fork](https://github.com/hootbu/pixel-agents/blob/main/webview-ui/public/assets/default-layout.json).
- The corporate, cozy-library, garden-office, and startup layouts in
  [Orseni's fork](https://github.com/orseni/pixel-agents/tree/main/webview-ui/public/assets).

BsCode uses those references as design vocabulary, then generates twenty
distinct silhouettes, dimensions, tile combinations, color transforms,
workstation arrangements, and decor sets. Generated rooms leave the carpet
layer empty so their actual floor patterns remain visible.

Every incoming `layoutLoaded` room is non-destructively enriched when needed:

- `workbenchFloor` identifies the floor represented by the room.
- An empty carpet layer keeps generated geometry free of repeated mask shapes.
- A never-customized standalone floor begins with one official walking pet.
  In BsCode, `houseConfig.petsEnabled` and `houseConfig.pet` are the source of
  truth, so the Pixel pets toggle and first-floor species selector update every
  room.

Pet clicks call BsCode's direct profile bridge before the upstream dialogue
handler runs. This opens the stat sheet without displaying a speech bubble.

The bridge continues to support the existing `captureFloorPreview` request and
`floorPreview` response. It also captures the active room every four seconds
while Pixel mode is visible, so the tower thumbnail tracks the actual canvas
instead of a static placeholder.

It additionally emits:

```js
{
  type: "pixelRoomState",
  floor: 2,
  agents: [{ id: 1, name: "Ada", bubble: "" }],
  pets: [{ id: "workbench-floor-2-pet", name: "Gitcat", state: "walk" }]
}
```

This message is informational. BsCode can ignore it; listening allows the
tower UI to expose accessible live-room labels without parsing preview images.

## Recommended parent messages

For a robust preview sweep, the parent should bracket its temporary layout
cycle with:

```js
postPixelMessage({ type: "previewCycle", active: true });
// load each floor and request its capture
postPixelMessage({ type: "previewCycle", active: false });
```

The bridge currently also recognizes BsCode's
`#pixelModeView.refreshing-floor-previews` state, so existing builds remain
compatible. During a preview cycle, temporary `agentClosed` messages are hidden
from Pixel Agents; real closes outside the cycle still pass through normally.

The parent should preferably avoid sending `agentClosed` during thumbnail
generation at all—Pixel Agents preserves characters across `layoutLoaded`
rebuilds. If the parent retains that legacy step, mark the temporary close with
`reason: "preview"` so it cannot be confused with a user closing an agent while
the preview sweep is running.

New generated layouts should set `workbenchFloor` explicitly. Existing BsCode
layouts remain compatible because the bridge can infer floors from `fN-*`
furniture IDs, with floor 1 as the safe fallback.
