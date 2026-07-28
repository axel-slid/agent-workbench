(function installWorkbenchPixelBridge() {
  "use strict";

  const retainedAgents = new Map();
  const nativeAddEventListener = window.addEventListener.bind(window);
  const nativeRemoveEventListener = window.removeEventListener.bind(window);
  const wrappedMessageListeners = new WeakMap();
  let currentFloor = 1;
  let replayTimer = 0;
  let livePreviewTimer = 0;
  let previewCycleActive = false;
  let petPreferenceReceived = false;
  let petsEnabled = true;
  let selectedPet = "gitcat";
  const petBaseNames = ["Claudio", "Gitcat", "Scout", "Pixel"];
  const petVariantNames = ["", " Mint", " Amber", " Violet", " Sky", " Rose"];
  const petNames = petVariantNames.flatMap(
    (suffix) => petBaseNames.map((name) => `${name}${suffix}`),
  );
  const bridgeState = {
    currentFloor: 1,
    enhancedLayouts: 0,
    lastPetCount: 0,
    lastCarpetCount: 0,
  };
  window.__workbenchPixelBridge = bridgeState;

  function parentIsRefreshingPreviews() {
    if (previewCycleActive) return true;
    try {
      return window.parent.document
        .getElementById("pixelModeView")
        ?.classList.contains("refreshing-floor-previews");
    } catch (error) {
      return false;
    }
  }

  function inferFloor(layout) {
    const explicit = Number(layout?.workbenchFloor);
    if (Number.isInteger(explicit) && explicit > 0) return explicit;
    for (const item of layout?.furniture || []) {
      const match = /^f(\d+)-/.exec(String(item?.uid || ""));
      if (match) return Math.max(1, Number(match[1]) || 1);
    }
    return 1;
  }

  function isWalkable(layout, column, row) {
    const index = row * layout.cols + column;
    const tile = layout.tiles[index];
    return tile !== 0 && tile !== 255 && tile !== undefined;
  }

  function petTypeForFloor(floor) {
    const preferredOffset = {
      claudio: 0,
      gitcat: 1,
      dog: 2,
      lizard: 3,
    }[selectedPet] ?? 1;
    return (Math.max(1, Number(floor) || 1) - 1 + preferredOffset) % petNames.length;
  }

  function petNameForFloor(floor) {
    return petNames[petTypeForFloor(floor)];
  }

  function addRoomCarpet(layout, floor, fromColumn, toColumn, fromRow, toRow, variant, order) {
    for (let row = fromRow; row <= toRow; row += 1) {
      for (let column = fromColumn; column <= toColumn; column += 1) {
        if (!isWalkable(layout, column, row)) continue;
        const index = row * layout.cols + column;
        if (layout.carpetTiles[index]) continue;
        const edge =
          column === fromColumn ||
          column === toColumn ||
          row === fromRow ||
          row === toRow;
        const checker = (column + row + floor) % 5 === 0;
        if (!edge || checker) {
          layout.carpetTiles[index] = {
            variant,
            order,
          };
        }
      }
    }
  }

  function decorateLayout(source) {
    if (!source || !Array.isArray(source.tiles)) return source;
    const layout = structuredClone(source);
    const floor = inferFloor(layout);
    layout.workbenchFloor = floor;
    layout.__workbenchDecorated = true;

    if (!Array.isArray(layout.carpetTiles) || layout.carpetTiles.length !== layout.tiles.length) {
      layout.carpetTiles = Array(layout.tiles.length).fill(null);
      const leftInset = 2 + (floor % 2);
      const rightInset = Math.max(11, layout.cols - 9 - (floor % 3));
      const upperRow = Math.max(11, layout.rows - 11);
      addRoomCarpet(
        layout,
        floor,
        leftInset,
        Math.min(layout.cols - 2, leftInset + 6),
        upperRow,
        Math.min(layout.rows - 2, upperRow + 5),
        (floor - 1) % 3,
        floor * 2,
      );
      addRoomCarpet(
        layout,
        floor,
        rightInset,
        Math.min(layout.cols - 2, rightInset + 6),
        Math.min(layout.rows - 3, upperRow + (floor % 2)),
        Math.min(layout.rows - 2, upperRow + 6),
        floor % 3,
        floor * 2 + 1,
      );
    }

    // BsCode's Pixel pets setting is the source of truth once houseConfig has
    // arrived. Before that first parent sync, a never-customized standalone
    // room still gets one official walking pet.
    if (petPreferenceReceived) {
      layout.pets = petsEnabled
        ? [
            {
              id: `workbench-floor-${floor}-pet`,
              petType: petTypeForFloor(floor),
            },
          ]
        : [];
    } else if (!Object.prototype.hasOwnProperty.call(source, "pets")) {
      layout.pets = [
        {
          id: `workbench-floor-${floor}-pet`,
          petType: petTypeForFloor(floor),
        },
      ];
    }
    bridgeState.enhancedLayouts += 1;
    bridgeState.currentFloor = floor;
    bridgeState.lastPetCount = layout.pets?.length || 0;
    bridgeState.lastCarpetCount = layout.carpetTiles.filter(Boolean).length;
    return layout;
  }

  // Pixel Agents installs its extension-message receiver after this bridge.
  // Wrap that receiver so layouts from both the standalone mock and BsCode's
  // parent transport arrive with room texture and pet state in one event.
  window.addEventListener = function workbenchAddEventListener(type, listener, options) {
    if (type !== "message" || typeof listener !== "function") {
      return nativeAddEventListener(type, listener, options);
    }
    let wrapped = wrappedMessageListeners.get(listener);
    if (!wrapped) {
      wrapped = function workbenchMessageReceiver(event) {
        const message = event.data;
        if (
          message?.type === "layoutLoaded" &&
          message.layout &&
          !message.__workbenchEnhanced
        ) {
          const layout = decorateLayout(message.layout);
          return listener.call(
            this,
            new MessageEvent("message", {
              data: {
                ...message,
                layout,
                __workbenchEnhanced: true,
              },
              origin: event.origin,
              source: event.source,
            }),
          );
        }
        return listener.call(this, event);
      };
      wrappedMessageListeners.set(listener, wrapped);
    }
    return nativeAddEventListener(type, wrapped, options);
  };

  window.removeEventListener = function workbenchRemoveEventListener(type, listener, options) {
    const wrapped =
      type === "message" && typeof listener === "function"
        ? wrappedMessageListeners.get(listener) || listener
        : listener;
    return nativeRemoveEventListener(type, wrapped, options);
  };

  function rememberAgentMessage(message) {
    const id = Number(message.id);
    if (!Number.isFinite(id)) return;
    const record = retainedAgents.get(id) || {
      created: { type: "agentCreated", id },
      team: null,
      status: null,
      tools: [],
    };
    if (message.type === "agentCreated") record.created = { ...message };
    else if (message.type === "agentTeamInfo") record.team = { ...message };
    else if (message.type === "agentStatus") record.status = { ...message };
    else if (message.type === "agentToolsClear") record.tools = [];
    else if (message.type === "agentToolStart") {
      record.tools = record.tools.filter((tool) => tool.toolId !== message.toolId);
      record.tools.push({ ...message });
    } else if (message.type === "agentToolDone") {
      record.tools = record.tools.filter((tool) => tool.toolId !== message.toolId);
    }
    retainedAgents.set(id, record);
  }

  function dispatchToPixelAgents(message) {
    window.dispatchEvent(
      new MessageEvent("message", {
        data: { ...message, __workbenchReplay: true },
      }),
    );
  }

  function replayAgentsIntoRoom() {
    window.clearTimeout(replayTimer);
    replayTimer = window.setTimeout(() => {
      for (const record of retainedAgents.values()) {
        dispatchToPixelAgents(record.created);
        if (record.team) dispatchToPixelAgents(record.team);
        if (record.status) dispatchToPixelAgents(record.status);
        for (const tool of record.tools) dispatchToPixelAgents(tool);
      }
    }, 55);
  }

  function publishRoomState(floor = currentFloor) {
    const hooks = window.__pixelAgentsTestHooks;
    const characters = hooks?.getCharacters?.() || [];
    const reportedAgents = new Map();
    for (const character of characters) {
      const id = Number(character.id);
      if (id <= 0) continue;
      reportedAgents.set(id, {
        id,
        name: character.agentName || "",
        bubble: character.bubbleType || "",
      });
    }
    // Upstream's optional test hook can be absent (or stale during React's
    // strict-mode remount). The bridge's transport state remains authoritative.
    for (const [id, record] of retainedAgents) {
      if (reportedAgents.has(id)) continue;
      reportedAgents.set(id, {
        id,
        name: record.team?.agentName || "",
        bubble: record.status?.awaitingInput ? "waiting" : "",
      });
    }
    let pets = hooks?.getPets?.() || [];
    if (!pets.length && petPreferenceReceived && petsEnabled) {
      pets = [
        {
          id: `workbench-floor-${floor}-pet`,
          name: petNameForFloor(floor),
          state: "live",
        },
      ];
    }
    window.parent.postMessage(
      {
        source: "agent-workbench-pixel-mode",
        message: {
          type: "pixelRoomState",
          floor,
          agents: Array.from(reportedAgents.values()),
          pets: pets.map((pet) => ({
            id: pet.id,
            name: pet.name,
            state: pet.state,
          })),
        },
      },
      "*",
    );
  }

  nativeAddEventListener(
    "message",
    (event) => {
      const message = event.data;
      if (!message || typeof message !== "object") return;
      if (message.__workbenchReplay || message.__workbenchEnhanced) return;
      if (message.type === "previewCycle") {
        previewCycleActive = Boolean(message.active);
        if (!previewCycleActive) replayAgentsIntoRoom();
        return;
      }
      if (message.type === "houseConfig") {
        petPreferenceReceived = true;
        petsEnabled = message.petsEnabled !== false;
        selectedPet = ["claudio", "gitcat", "dog", "lizard"].includes(message.pet)
          ? message.pet
          : "gitcat";
        bridgeState.petsEnabled = petsEnabled;
        bridgeState.selectedPet = selectedPet;
      }
      if (message.type === "captureFloorPreview") {
        const floor = Math.max(1, Number(message.floor) || currentFloor);
        window.setTimeout(() => publishRoomState(floor), 90);
      }

      if (
        [
          "agentCreated",
          "agentTeamInfo",
          "agentStatus",
          "agentToolsClear",
          "agentToolStart",
          "agentToolDone",
        ].includes(message.type)
      ) {
        rememberAgentMessage(message);
      } else if (message.type === "agentClosed") {
        retainedAgents.delete(Number(message.id));
      }

      if (message.type !== "layoutLoaded" || !message.layout) return;
      const layout = decorateLayout(message.layout);
      currentFloor = inferFloor(layout);
      bridgeState.currentFloor = currentFloor;
      if (parentIsRefreshingPreviews()) replayAgentsIntoRoom();
    },
    false,
  );

  function scheduleLivePreview() {
    window.clearInterval(livePreviewTimer);
    livePreviewTimer = window.setInterval(() => {
      if (document.visibilityState !== "visible" || parentIsRefreshingPreviews()) return;
      if (typeof window.captureFloorPreview === "function") {
        window.captureFloorPreview(currentFloor);
        window.setTimeout(() => publishRoomState(currentFloor), 90);
      }
    }, 4000);
  }

  window.addEventListener("DOMContentLoaded", scheduleLivePreview, { once: true });
  window.addEventListener("beforeunload", () => window.clearInterval(livePreviewTimer));
})();
