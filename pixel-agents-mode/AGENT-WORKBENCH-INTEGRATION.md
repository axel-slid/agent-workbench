Pixel Mode embeds the Pixel Agents 1.4.0 webview from:
https://github.com/pixel-agents-hq/pixel-agents

The bundled webview is licensed under the included MIT LICENSE.

Agent Workbench supplies its own postMessage transport and session state. It
does not launch the Pixel Agents standalone server or install Claude hooks.

## BsCode bridge additions

The bundled browser mock decodes the complete Pixel Agents 2D asset set,
including all nine floor textures, all three auto-tiling carpets, and both
official animated pets (`Claudio` and `Gitcat`). The pets appear as selectable
options in Pixel Agents' Layout → Pets tool and retain the upstream walking,
idle, following, and petting animation behavior.

Every incoming `layoutLoaded` room is non-destructively enriched when needed:

- `workbenchFloor` identifies the floor represented by the room.
- Distinct auto-tiled carpet zones give generated floors a lived-in identity.
- A never-customized standalone floor begins with one official walking pet.
  In BsCode, `houseConfig.petsEnabled` and `houseConfig.pet` are the source of
  truth, so the Pixel pets toggle and Claudio/Gitcat selector update every room.

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
