(function installWorkbenchPixelBridge() {
  "use strict";

  const retainedAgents = new Map();
  const nativeAddEventListener = window.addEventListener.bind(window);
  const nativeRemoveEventListener = window.removeEventListener.bind(window);
  const wrappedMessageListeners = new WeakMap();
  let currentFloor = 1;
  let replayTimer = 0;
  let livePreviewTimer = 0;
  let pixelModeVisible = false;
  let petPreferenceReceived = false;
  let petsEnabled = true;
  let selectedPet = "hamster";
  let petClickSequence = 0;
  let petPointerSnapshot = null;
  const petNames = [
    "Claudio",
    "Nibbles",
    "Scout",
    "Pixel",
    "Mochi",
    "Atlas",
    "Ribbit",
    "Piper",
    "Pippin",
    "Bandit",
    "Waddles",
    "Maple",
  ];
  const petIds = [
    "claudio",
    "hamster",
    "dog",
    "lizard",
    "rabbit",
    "tortoise",
    "frog",
    "cockatiel",
    "hedgehog",
    "raccoon",
    "penguin",
    "red-panda",
  ];
  const bridgeState = {
    currentFloor: 1,
    enhancedLayouts: 0,
    lastPetCount: 0,
    lastCarpetCount: 0,
  };
  window.__workbenchPixelBridge = bridgeState;

  function inferFloor(layout) {
    const explicit = Number(layout?.workbenchFloor);
    if (Number.isInteger(explicit) && explicit > 0) return explicit;
    for (const item of layout?.furniture || []) {
      const match = /^f(\d+)-/.exec(String(item?.uid || ""));
      if (match) return Math.max(1, Number(match[1]) || 1);
    }
    return 1;
  }

  function petTypeForFloor(floor) {
    const preferredOffset = Math.max(0, petIds.indexOf(selectedPet));
    return (Math.max(1, Number(floor) || 1) - 1 + preferredOffset) % petNames.length;
  }

  function petNameForFloor(floor) {
    return petNames[petTypeForFloor(floor)];
  }

  function appearanceValue(value, fallback) {
    const normalized = String(value || "").trim();
    return normalized && normalized.length <= 512 ? normalized : fallback;
  }

  function applyAppearanceConfig(config = {}) {
    const root = document.documentElement;
    const background = appearanceValue(config.background, config.bg || "#10141c");
    const bg = appearanceValue(config.bg, "#10141c");
    const panel = appearanceValue(config.panel, bg);
    const elevated = appearanceValue(config.elevated, panel);
    const hover = appearanceValue(config.hover, elevated);
    const active = appearanceValue(config.active, hover);
    const border = appearanceValue(config.border, "#465465");
    const text = appearanceValue(config.text, "#eef2f7");
    const muted = appearanceValue(config.muted, "#99a5b3");
    const accent = appearanceValue(config.accent, "#69a8ff");
    const status = appearanceValue(config.status, accent);
    const variables = {
      "--workbench-pixel-background": background,
      "--workbench-pixel-bg": bg,
      "--color-bg": panel,
      "--color-bg-dark": bg,
      "--color-bg-thumb": elevated,
      "--color-border": border,
      "--color-accent": accent,
      "--color-text": text,
      "--color-text-muted": muted,
      "--color-btn-bg": elevated,
      "--color-btn-hover": hover,
      "--color-active-bg": active,
      "--color-accent-bright": status,
      "--color-reset-text": text,
    };
    for (const [name, value] of Object.entries(variables)) {
      root.style.setProperty(name, value);
    }
    root.dataset.workbenchAppearanceTone = config.tone === "light" ? "light" : "dark";
    root.dataset.workbenchTheme = String(config.theme || "dark-plus");
    root.style.colorScheme = config.tone === "light" ? "light" : "dark";
    let style = document.getElementById("workbench-pixel-appearance");
    if (!style) {
      style = document.createElement("style");
      style.id = "workbench-pixel-appearance";
      style.textContent = `
        html, body, #root {
          background: var(--workbench-pixel-background, var(--workbench-pixel-bg)) !important;
        }
        canvas {
          background-color: var(--workbench-pixel-bg) !important;
        }
      `;
      document.head.appendChild(style);
    }
    bridgeState.appearanceTheme = root.dataset.workbenchTheme;
    bridgeState.appearanceTone = root.dataset.workbenchAppearanceTone;
  }

  function decorateLayout(source) {
    if (!source || !Array.isArray(source.tiles)) return source;
    const layout = structuredClone(source);
    const floor = inferFloor(layout);
    layout.workbenchFloor = floor;
    layout.__workbenchDecorated = true;

    if (!Array.isArray(layout.carpetTiles) || layout.carpetTiles.length !== layout.tiles.length) {
      layout.carpetTiles = Array(layout.tiles.length).fill(null);
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
      speech: null,
      tools: [],
    };
    if (message.type === "agentCreated") record.created = { ...message };
    else if (message.type === "agentTeamInfo") record.team = { ...message };
    else if (message.type === "agentStatus") record.status = { ...message };
    else if (message.type === "agentSpeech") record.speech = { ...message };
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
        if (record.speech) dispatchToPixelAgents(record.speech);
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

  function petSpeechSnapshot() {
    const pets = window.__pixelAgentsTestHooks?.getPets?.() || [];
    return new Map(
      pets.map((pet) => [
        pet.id,
        {
          bubbleType: pet.bubbleType || "",
          speechText: pet.speechText || "",
          speechTimer: Number(pet.speechTimer) || 0,
        },
      ]),
    );
  }

  function openPetProfileDirect(pet) {
    if (!pet || !pet.id) return false;
    petClickSequence += 1;
    bridgeState.lastSelectedPet = pet.id;
    window.parent.postMessage(
      {
        source: "agent-workbench-pixel-mode",
        message: {
          type: "pixelPetSelected",
          floor: currentFloor,
          pet: {
            id: pet.id,
            name: pet.name,
            petType: pet.petType,
            state: pet.state,
          },
        },
      },
      "*",
    );
    return true;
  }
  window.__workbenchOpenPetProfile = openPetProfileDirect;

  function publishClickedPetProfile(sequence, before) {
    if (sequence !== petClickSequence) return false;
    const pets = window.__pixelAgentsTestHooks?.getPets?.() || [];
    const changedPet = pets
      .map((pet) => {
        const previous = before.get(pet.id) || {
          bubbleType: "",
          speechText: "",
          speechTimer: 0,
        };
        const timer = Number(pet.speechTimer) || 0;
        const changed =
          (pet.bubbleType || "") !== previous.bubbleType
          || (pet.speechText || "") !== previous.speechText
          || timer > previous.speechTimer + 0.25;
        return {
          pet,
          changed,
          score: changed
            ? Math.max(0, timer - previous.speechTimer)
              + ((pet.bubbleType || "") !== previous.bubbleType ? 5 : 0)
              + ((pet.speechText || "") !== previous.speechText ? 2 : 0)
            : -1,
        };
      })
      .filter((candidate) => candidate.changed)
      .sort((first, second) => second.score - first.score)[0]?.pet;
    if (!changedPet) return false;

    return openPetProfileDirect(changedPet);
  }

  // Capture the pet state before Pixel Agents handles pointer-down. Some pet
  // sprites react before the later click event, so a click-only snapshot can
  // miss the exact pet that changed.
  nativeAddEventListener(
    "pointerdown",
    (event) => {
      if (event.target?.tagName !== "CANVAS") return;
      petPointerSnapshot = petSpeechSnapshot();
    },
    true,
  );

  // Pixel Agents owns the canvas interaction. Watch the pet speech-bubble
  // state that its click handler changes, then tell BsCode which pet was hit.
  nativeAddEventListener(
    "click",
    (event) => {
      if (event.target?.tagName !== "CANVAS") return;
      const before = petPointerSnapshot?.size ? petPointerSnapshot : petSpeechSnapshot();
      petPointerSnapshot = null;
      if (!before.size) return;
      const sequence = ++petClickSequence;
      for (const delay of [0, 40, 120, 260]) {
        window.setTimeout(() => publishClickedPetProfile(sequence, before), delay);
      }
    },
    true,
  );

  nativeAddEventListener(
    "message",
    (event) => {
      const message = event.data;
      if (!message || typeof message !== "object") return;
      if (message.__workbenchReplay || message.__workbenchEnhanced) return;
      if (message.type === "appearanceConfig") {
        applyAppearanceConfig(message.appearance);
        return;
      }
      if (message.type === "pixelModeVisibility") {
        pixelModeVisible = Boolean(message.active);
        bridgeState.pixelModeVisible = pixelModeVisible;
        return;
      }
      if (message.type === "houseConfig") {
        petPreferenceReceived = true;
        petsEnabled = message.petsEnabled !== false;
        selectedPet = petIds.includes(message.pet)
          ? message.pet
          : "hamster";
        bridgeState.petsEnabled = petsEnabled;
        bridgeState.selectedPet = selectedPet;
      }
      if (message.type === "captureFloorPreview") {
        const floor = Math.max(1, Number(message.floor) || currentFloor);
        window.setTimeout(() => publishRoomState(floor), 30);
      }

      if (
        [
          "agentCreated",
          "agentTeamInfo",
          "agentStatus",
          "agentSpeech",
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
    },
    false,
  );

  function scheduleLivePreview() {
    window.clearInterval(livePreviewTimer);
    livePreviewTimer = window.setInterval(() => {
      if (!pixelModeVisible || document.visibilityState !== "visible") return;
      if (typeof window.captureFloorPreview === "function") {
        window.captureFloorPreview(currentFloor);
        window.setTimeout(() => publishRoomState(currentFloor), 30);
      }
    }, 15000);
  }

  window.addEventListener("DOMContentLoaded", scheduleLivePreview, { once: true });
  window.addEventListener("beforeunload", () => window.clearInterval(livePreviewTimer));
})();
