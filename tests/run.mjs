import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
const tests = [];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function test(name, run) {
  tests.push({ name, run });
}

function extractDeclaration(source, start, brace, label) {
  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = brace; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];
    if (lineComment) {
      if (character === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (character === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = "";
      }
      continue;
    }
    if (character === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (character === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (character === "'" || character === '"' || character === "`") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  assert.fail(`Could not find the end of ${label}`);
}

function extractFunction(source, name) {
  const label = `${name}()`;
  const match = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`).exec(source);
  assert.ok(match, `Could not find ${label}`);
  const start = match.index;
  const parametersStart = source.indexOf("(", start);
  let depth = 0;
  let parametersEnd = -1;
  for (let index = parametersStart; index < source.length; index += 1) {
    if (source[index] === "(") depth += 1;
    if (source[index] === ")") {
      depth -= 1;
      if (depth === 0) {
        parametersEnd = index;
        break;
      }
    }
  }
  assert.notEqual(parametersEnd, -1, `Could not parse the parameters of ${label}`);
  const brace = source.indexOf("{", parametersEnd);
  assert.notEqual(brace, -1, `Could not find the body of ${label}`);
  return extractDeclaration(source, start, brace, label);
}

function extractArray(source, name) {
  const match = new RegExp(`const\\s+${name}\\s*=\\s*(\\[[\\s\\S]*?\\]);`).exec(source);
  assert.ok(match, `Could not find ${name}`);
  return vm.runInNewContext(match[1], Object.create(null));
}

function parseHexColor(value) {
  const match = /^#([0-9a-f]{6})$/i.exec(String(value || "").trim());
  if (!match) return null;
  const hex = match[1];
  return [0, 2, 4].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
}

function relativeLuminance(rgb) {
  const channels = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(first, second) {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test("core JavaScript and packaging scripts have valid syntax", () => {
  const files = [
    "main.js",
    "preload.js",
    "renderer.js",
    "assets/openleaf-themes.js",
    "pixel-agents-mode/assets/workbench-bridge.js",
    ...fs.readdirSync(path.join(projectRoot, "scripts"))
      .filter((name) => name.endsWith(".mjs"))
      .map((name) => `scripts/${name}`)
  ];
  for (const relativePath of files) {
    assert.ok(fs.existsSync(path.join(projectRoot, relativePath)), `${relativePath} is missing`);
    const result = spawnSync(process.execPath, ["--check", relativePath], {
      cwd: projectRoot,
      encoding: "utf8"
    });
    assert.equal(
      result.status,
      0,
      `${relativePath} failed node --check:\n${result.stderr || result.stdout}`
    );
  }
});

test("session output listing excludes the baseline and pre-session files", async () => {
  const mainSource = read("main.js");
  const listArtifactsSource = extractFunction(mainSource, "listArtifacts");
  const workspaceOutputSessionStarts = new Map();
  const workspaceOutputSessionBaselines = new Map();
  const workspace = { id: "workspace-fixture", root: "/fixture" };
  const artifacts = [
    {
      name: "old-but-modified.md",
      relativePath: "old-but-modified.md",
      createdAt: new Date(4_000).toISOString(),
      modifiedAt: new Date(12_000).toISOString()
    },
    {
      name: "too-early.png",
      relativePath: "too-early.png",
      createdAt: new Date(8_000).toISOString(),
      modifiedAt: new Date(8_000).toISOString()
    },
    {
      name: "newer.png",
      relativePath: "newer.png",
      createdAt: new Date(10_100).toISOString(),
      modifiedAt: new Date(10_200).toISOString()
    },
    {
      name: "newest.html",
      relativePath: "newest.html",
      createdAt: new Date(11_100).toISOString(),
      modifiedAt: new Date(11_200).toISOString()
    }
  ];
  const context = {
    workspaceOutputSessionStarts,
    workspaceOutputSessionBaselines,
    getWorkspace: async () => workspace,
    collectArtifacts: async () => artifacts,
    collectArtifactAttributions: async () => new Map()
  };
  vm.runInNewContext(
    `${listArtifactsSource}\nthis.listArtifacts = listArtifacts;`,
    context
  );

  assert.deepEqual(
    Array.from(await context.listArtifacts(null, workspace.id)),
    [],
    "Outputs must stay empty before the first agent session begins"
  );

  workspaceOutputSessionStarts.set(workspace.id, 10_000);
  workspaceOutputSessionBaselines.set(workspace.id, new Set(["old-but-modified.md"]));
  const listed = await context.listArtifacts(null, workspace.id);
  assert.deepEqual(
    Array.from(listed, (artifact) => artifact.relativePath),
    ["newest.html", "newer.png"],
    "Only files created in the current session should be listed, newest first"
  );
  assert.ok(listed.every((artifact) => artifact.agentName === "Imported"));

  const createAgentSource = extractFunction(mainSource, "createAgent");
  const baselineCapture = createAgentSource.indexOf("workspaceOutputSessionBaselines.set");
  const sessionStart = createAgentSource.indexOf("workspaceOutputSessionStarts.set");
  assert.ok(baselineCapture >= 0, "createAgent() must record an output baseline");
  assert.ok(sessionStart > baselineCapture, "The baseline must be captured before the session clock starts");
  assert.match(
    createAgentSource,
    /if\s*\(!workspaceOutputSessionStarts\.has\(workspace\.id\)\)/,
    "A second agent must not reset the workspace output session"
  );
});

test("ETA formatting is complete and repeated reports do not reset countdowns", () => {
  const rendererSource = read("renderer.js");
  const declarations = [
    "reportedEtaSeconds",
    "etaDeadlineFromMetadata",
    "formatEtaClock",
    "remainingEtaSeconds",
    "updateAgentMetadata"
  ].map((name) => extractFunction(rendererSource, name)).join("\n");

  const context = {
    syncChecklistEtaState() {},
    updateAgentStatusCard() {},
    scheduleAgentCleanRender() {},
    normalizedAgentState() { return "planning"; },
    recordAgentNotification() {},
    showToast() {},
    notifyAgentFinished() {},
    numericPreference() { return 40; },
    booleanPreference() { return false; },
    openReportedAgentPreview() {},
    updateAgentEta() {},
    renderAgentSidebar() {},
    syncPixelSession() {},
    renderPixelAgentRoster() {},
    createAgentRelevantFile() { return {}; },
    requestAnimationFrame() {},
    document: { activeElement: null }
  };
  vm.runInNewContext(
    `${declarations}
     this.formatEtaClock = formatEtaClock;
     this.remainingEtaSeconds = remainingEtaSeconds;
     this.updateAgentMetadata = updateAgentMetadata;`,
    context
  );

  assert.equal(context.formatEtaClock(0), "0s");
  assert.equal(context.formatEtaClock(65), "1m 05s");
  assert.equal(context.formatEtaClock(3_661), "1h 01m 01s");
  assert.equal(context.formatEtaClock(93_784), "1d 02h 03m 04s");

  const session = {
    metadata: {
      status: "working",
      etaSeconds: 300,
      updatedAt: new Date().toISOString(),
      relevantFiles: []
    },
    etaPaused: false,
    etaPausedSeconds: null,
    etaDeadline: 50_000,
    lastReportedEtaSeconds: 300,
    recentFooter: { hidden: true },
    recentFilesNode: { innerHTML: "", appendChild() {} },
    nameInput: { value: "" },
    kind: "codex",
    slotIndex: 0,
    finishNotified: false,
    notifiedFailure: false,
    notifiedApproval: false,
    lastPreviewFile: ""
  };
  context.updateAgentMetadata(session, {
    status: "working",
    etaSeconds: 300,
    updatedAt: new Date(Date.now() + 30_000).toISOString()
  });
  assert.equal(
    session.etaDeadline,
    50_000,
    "Receiving the same ETA again must preserve the original absolute deadline"
  );

  const countdown = { etaPaused: false, etaPausedSeconds: null, etaDeadline: 10_000 };
  assert.equal(context.remainingEtaSeconds(countdown, 1_000), 9);
  assert.equal(context.remainingEtaSeconds(countdown, 2_500), 8);
  assert.equal(context.remainingEtaSeconds(countdown, 10_000), 0);
  countdown.etaPaused = true;
  countdown.etaPausedSeconds = 8;
  assert.equal(context.remainingEtaSeconds(countdown, 9_999), 8, "Interrupted ETAs must stay paused");
});

test("Openleaf theme catalog has complete palettes and readable contrast", () => {
  const context = { window: {} };
  vm.runInNewContext(read("assets/openleaf-themes.js"), context);
  const catalog = context.window.OPENLEAF_THEME_CATALOG;
  assert.ok(Array.isArray(catalog));
  assert.ok(catalog.length >= 60, `Expected the full theme catalog, found ${catalog.length}`);

  const requiredKeys = [
    "background", "bg", "panel", "elevated", "hover", "active", "border",
    "text", "muted", "accent", "status", "terminal", "gradientA", "gradientB"
  ];
  const ids = new Set();
  let opaquePalettes = 0;
  for (const theme of catalog) {
    assert.ok(theme.id && theme.name && theme.category, "Every theme needs identity metadata");
    assert.ok(!ids.has(theme.id), `Duplicate theme id: ${theme.id}`);
    ids.add(theme.id);
    for (const key of requiredKeys) {
      assert.equal(typeof theme.palette?.[key], "string", `${theme.id} is missing palette.${key}`);
      assert.ok(theme.palette[key].trim(), `${theme.id} has an empty palette.${key}`);
    }
    const background = parseHexColor(theme.palette.bg);
    const text = parseHexColor(theme.palette.text);
    if (background && text) {
      opaquePalettes += 1;
      assert.ok(
        contrastRatio(background, text) >= 4.5,
        `${theme.id} text/background contrast is below 4.5:1`
      );
    }
  }
  assert.ok(opaquePalettes >= 20, "The hand-authored palettes should remain contrast-auditable");
  for (const theme of catalog) {
    assert.match(
      theme.palette.bg,
      /^(?:#[0-9a-f]{3,8}|rgba?\(|hsla?\(|color-mix\()/i,
      `${theme.id} must use a concrete CSS color`
    );
  }
  const categoryCounts = catalog.reduce((counts, theme) => {
    counts[theme.category] = (counts[theme.category] || 0) + 1;
    return counts;
  }, {});
  for (const [category, count] of Object.entries(categoryCounts)) {
    assert.ok(count > 20, `${category} should expose more than 20 themes`);
  }
  assert.deepEqual(
    [...new Set(catalog.map((theme) => theme.category))].sort(),
    ["Dark", "Dark Contrast", "Gradient", "Light", "Light Contrast", "Pixelized", "Transparent"].sort()
  );
});

test("Home view DOM and renderer navigation stay wired together", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const allIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(allIds).size, allIds.length, "index.html must not contain duplicate IDs");

  for (const id of ["homeButton", "homeView", "homeWorkspaceGrid", "homeAddWorkspaceButton"]) {
    assert.ok(allIds.includes(id), `Home view is missing #${id}`);
    assert.match(
      rendererSource,
      new RegExp(`const\\s+\\w+\\s*=\\s*document\\.getElementById\\("${escapeRegExp(id)}"\\)`),
      `renderer.js must bind #${id}`
    );
  }

  assert.match(
    html,
    /<section\s+id="homeView"[^>]*\shidden(?:\s|>)/,
    "Home must not cover the workspace on startup"
  );
  assert.match(html, /id="homeWorkspaceGrid"[^>]*aria-label="Recent workspaces"/);

  const renderHomeViewSource = extractFunction(rendererSource, "renderHomeView");
  assert.match(renderHomeViewSource, /lastOpenedAt/, "Recent workspaces should be ordered by last use");
  assert.match(renderHomeViewSource, /\.slice\(0,\s*12\)/, "The Home list must stay bounded");
  assert.match(renderHomeViewSource, /workspace\.type\s*===\s*"ssh"/, "Home must distinguish SSH workspaces");
  assert.match(renderHomeViewSource, /home-workspace-card/);
  assert.match(
    renderHomeViewSource,
    /makeInteractive\(card,\s*\(\)\s*=>\s*selectWorkspace\(workspace\.id\)\)/,
    "A Home card must open its workspace"
  );

  const setHomeViewSource = extractFunction(rendererSource, "setHomeView");
  assert.match(setHomeViewSource, /homeView\.hidden\s*=\s*!next/);
  assert.match(setHomeViewSource, /homeButton\.setAttribute\("aria-pressed",\s*String\(next\)\)/);
  assert.match(setHomeViewSource, /renderHomeView\(\)/);

  const selectWorkspaceSource = extractFunction(rendererSource, "selectWorkspace");
  assert.match(
    selectWorkspaceSource,
    /setHomeView\(false\)/,
    "Selecting a recent workspace must return to the workbench"
  );
  assert.match(
    rendererSource,
    /homeButton\.addEventListener\("click",\s*\(\)\s*=>\s*setHomeView\(homeView\.hidden\)\)/,
    "The Home toolbar button must toggle Home"
  );
  assert.match(
    rendererSource,
    /homeAddWorkspaceButton\.addEventListener\("click",[\s\S]*?setWorkspaceAddMenu\(true\);[\s\S]*?\}\);/,
    "Home's add button must open the workspace picker"
  );
});

test("application shortcuts stay in the titlebar while agent launchers keep provider controls", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const preloadSource = read("preload.js");
  const mainSource = read("main.js");
  const styles = read("styles.css");

  assert.match(html, /id="openChromeButton"[\s\S]*?assets\/chrome-symbol\.svg/);
  assert.match(html, /id="openOpenleafButton"[\s\S]*?assets\/openleaf-symbol\.svg/);
  assert.match(html, /id="spotifyOpenButton"[\s\S]*?assets\/spotify-symbol\.svg/);
  assert.match(rendererSource, /for \(const kind of \["codex", "claude", "shell"\]\)/);
  assert.match(rendererSource, /openChromeButton\.addEventListener\("click"[\s\S]*?openApplicationShortcut\("chrome"/);
  assert.match(rendererSource, /openOpenleafButton\.addEventListener\("click"[\s\S]*?openApplicationShortcut\("openleaf"/);
  assert.match(preloadSource, /openApplication:[\s\S]*?ipcRenderer\.invoke\("application:open"/);
  assert.match(mainSource, /ipcMain\.handle\("application:open", openApplication\)/);
  assert.match(styles, /html\[data-appearance-mode="pixelized"\] \.workspace-tab-shape\s*\{[\s\S]*?display:\s*block/);
  assert.match(styles, /html\[data-appearance-mode="pixelized"\] \.editor-tab\.workspace-editor-tab,[\s\S]*?background:\s*transparent\s*!important/);
  assert.match(styles, /\.command-center\s*\{[\s\S]*?display:\s*none\s*!important/);
});

test("settings controls have matching DOM IDs, bindings, initialization, and listeners", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const settingsTargets = [...html.matchAll(/data-settings-target="([^"]+)"/g)]
    .map((match) => match[1])
    .sort();
  const settingsPages = [...html.matchAll(/data-settings-page="([^"]+)"/g)]
    .map((match) => match[1])
    .sort();
  assert.deepEqual(settingsTargets, settingsPages, "Every settings navigation item needs one page");

  const interactiveSettings = [
    ...html.matchAll(/<(?:input|select)\b[^>]*\bid="(settings[A-Za-z0-9]+)"/g)
  ].map((match) => match[1]);
  assert.ok(interactiveSettings.length >= 15, "The expanded settings dialog should expose its controls");

  const initializeSource = extractFunction(rendererSource, "initializeWorkbenchSettings");
  for (const id of interactiveSettings) {
    const variable = id;
    assert.match(
      rendererSource,
      new RegExp(`const\\s+${escapeRegExp(variable)}\\s*=\\s*document\\.getElementById\\("${escapeRegExp(id)}"\\)`),
      `renderer.js must bind #${id}`
    );
    const hasDirectListener = new RegExp(
      `${escapeRegExp(variable)}\\.addEventListener\\("(?:input|change)"`
    ).test(rendererSource);
    const hasGroupedProfileListener = [
      "settingsProfileNameInput",
      "settingsProfileRoleInput",
      "settingsProfileFocusInput"
    ].includes(id) && /\[settingsProfileNameInput,\s*settingsProfileRoleInput,\s*settingsProfileFocusInput\]\.forEach\([\s\S]*?addEventListener\("input",\s*syncProfileSettings\)/.test(rendererSource);
    assert.ok(hasDirectListener || hasGroupedProfileListener, `#${id} must persist or apply changes`);
    if (id !== "settingsSearchInput") {
      assert.match(
        initializeSource,
        new RegExp(`\\b${escapeRegExp(variable)}\\b`),
        `#${id} must receive an initial value`
      );
    }
  }

  for (const [id, listener] of [
    ["openSettingsButton", "openSettings"],
    ["closeSettingsButton", "closeSettings"]
  ]) {
    assert.match(html, new RegExp(`\\bid="${id}"`), `Missing #${id}`);
    assert.match(
      rendererSource,
      new RegExp(`${id}\\.addEventListener\\("click",\\s*${listener}\\)`),
      `#${id} must invoke ${listener}()`
    );
  }
  assert.match(
    rendererSource,
    /settingsNavItems\.forEach\(\(item\)\s*=>\s*makeInteractive\(item,\s*\(\)\s*=>\s*showSettingsPage\(item\.dataset\.settingsTarget\)\)\)/,
    "Settings navigation must switch pages"
  );
  assert.match(
    rendererSource,
    /appearanceCategories\.forEach\(\(category\)\s*=>\s*makeInteractive\(category,\s*\(\)\s*=>\s*selectAppearanceCategory\(category\.textContent\.trim\(\)\)\)\)/,
    "Appearance categories must be selectable"
  );
});

test("Pixelized appearance maps catalog, category, dataset, and CSS consistently", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const preloadSource = read("preload.js");
  const mainSource = read("main.js");
  const styles = read("styles.css");
  const context = { window: {} };
  vm.runInNewContext(read("assets/openleaf-themes.js"), context);
  const pixelThemes = context.window.OPENLEAF_THEME_CATALOG
    .filter((theme) => theme.category === "Pixelized");
  assert.ok(pixelThemes.length >= 3, "Pixelized should offer multiple appearance choices");
  assert.ok(pixelThemes.some((theme) => theme.id === "pixel-night"), "Pixelized needs its default theme");
  assert.match(html, />Pixelized<\/div>/, "Settings must expose the Pixelized category");
  assert.match(
    rendererSource,
    /Pixelized:\s*"pixel-night"/,
    "The Pixelized category must map to an existing default theme"
  );

  const applyPaletteSource = extractFunction(rendererSource, "applyPalette");
  assert.match(
    applyPaletteSource,
    /root\.dataset\.appearanceMode\s*=\s*mode\.toLowerCase\(\)\.replace\(\/\\s\+\/g,\s*"-"\)/,
    "Palette application must expose a normalized appearance-mode dataset"
  );
  const selectThemeSource = extractFunction(rendererSource, "selectTheme");
  assert.match(
    selectThemeSource,
    /applyPalette\(palette,\s*category,\s*theme\)/,
    "Theme selection must pass the Pixelized category and selected theme through to appearance mapping"
  );
  assert.match(
    applyPaletteSource,
    /theme\s*===\s*"pixel-studio"/,
    "Pixel Studio must opt into light icon and native control treatment"
  );
  assert.match(
    applyPaletteSource,
    /root\.dataset\.appearanceTone\s*=\s*lightAppearance\s*\?\s*"light"\s*:\s*"dark"/,
    "Palette application must expose a light/dark appearance tone"
  );
  assert.match(
    styles,
    /html\[data-appearance-mode="pixelized"\]/,
    "Pixelized must have a dedicated CSS appearance mapping"
  );
  assert.match(
    styles,
    /font-family:\s*"BsCode Pixel"/,
    "Pixelized must use the bundled pixel typeface"
  );
  assert.match(
    styles,
    /html\[data-appearance-mode="pixelized"\]\s+body,\s*html\[data-appearance-mode="pixelized"\]\s+body \*\s*\{[\s\S]*?font-family:\s*var\(--font\)\s*!important;/,
    "Pixelized must apply the bundled pixel font to visible interface text"
  );
  assert.match(
    styles,
    /--pixel-dither:\s*repeating-conic-gradient\(/,
    "Pixelized must define a reusable hard dither image"
  );
  assert.match(
    styles,
    /background-image:\s*var\(--pixel-dither\)\s*!important;[\s\S]*?background-size:\s*4px 4px\s*!important;/,
    "Pixelized dithered surfaces need an explicit pixel grid size"
  );
  assert.match(
    styles,
    /html\[data-appearance-tone="light"\]\s+:is\([\s\S]*?\.system-metrics strong,[\s\S]*?\.footer-status[\s\S]*?\)\s*\{[\s\S]*?color:\s*var\(--theme-text\);/,
    "Light palettes must recolor footer values instead of inheriting white"
  );
  assert.match(
    styles,
    /html\[data-appearance-tone="light"\]\s+\.brand-symbol\[src\*="openai"\]/,
    "Light themes must adapt the OpenAI toolbar symbol"
  );
  assert.match(
    styles,
    /url\("pixel-agents-mode\/assets\/floors\/floor_4\.png"\)/,
    "Pixelized editor chrome should use an authentic bundled Pixel Agents texture"
  );
  assert.ok(
    fs.existsSync(path.join(projectRoot, "pixel-agents-mode/fonts/FSPixelSansUnicode-Regular.ttf")),
    "The Pixelized font asset is missing"
  );
});

test("Pixel floors keep one live agent, a distinct pet, and a sprite portrait", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  const bridgeSource = read("pixel-agents-mode/assets/workbench-bridge.js");
  const browserMockSource = read("pixel-agents-mode/assets/browserMock-DHJcqYbF.js");
  const assetIndex = JSON.parse(read("pixel-agents-mode/assets/asset-index.json"));

  for (const functionName of [
    "ensurePixelFloorCapacity",
    "reconcilePixelAgentFloorAssignments",
    "pixelSessionsForFloor",
    "setPixelVisibleSessionsForFloor",
    "notePixelSessionPreviewChange"
  ]) {
    assert.match(
      rendererSource,
      new RegExp(`function\\s+${functionName}\\s*\\(`),
      `Pixel mode is missing ${functionName}()`
    );
  }
  const reconcileSource = extractFunction(rendererSource, "reconcilePixelAgentFloorAssignments");
  assert.match(reconcileSource, /const usedFloors\s*=\s*new Set\(\)/);
  assert.match(reconcileSource, /!usedFloors\.has\(candidate\)/);
  assert.match(reconcileSource, /savePixelAgentFloorAssignments\(workspaceId,\s*assignments\)/);
  const assignmentState = { savedAssignments: { 1: 1, 2: 1, 3: 99 } };
  const assignmentFixture = {
    sessions: new Map(
      [0, 1, 2, 3].map((slotIndex) => [
        `agent-${slotIndex}`,
        { workspaceId: "workspace-fixture", slotIndex }
      ])
    ),
    activeWorkspaceId: "workspace-fixture",
    pixelFloorCount: 4,
    ensurePixelFloorCapacity() {},
    pixelAgentFloorAssignments() {
      return { ...assignmentState.savedAssignments };
    },
    savePixelAgentFloorAssignments(workspaceId, assignments) {
      assignmentState.savedWorkspaceId = workspaceId;
      assignmentState.savedAssignments = { ...assignments };
    }
  };
  vm.runInNewContext(
    `${reconcileSource}
     this.assignments = reconcilePixelAgentFloorAssignments("workspace-fixture");`,
    assignmentFixture
  );
  assert.equal(new Set(Object.values(assignmentFixture.assignments)).size, 4);
  assert.deepEqual(
    Array.from(Object.values(assignmentFixture.assignments)).sort(),
    [1, 2, 3, 4],
    "Four live agents must occupy four different floors"
  );
  const visibleSessionsSource = extractFunction(rendererSource, "setPixelVisibleSessionsForFloor");
  assert.match(visibleSessionsSource, /pixelSessionsForFloor\(floor\)/);
  assert.match(visibleSessionsSource, /type:\s*"agentClosed"/);
  assert.match(visibleSessionsSource, /postPixelSessionDetails\(session\)/);
  const refreshSource = extractFunction(rendererSource, "refreshPixelFloorPreviews");
  assert.match(refreshSource, /pixelDirtyPreviewFloors/);
  assert.match(refreshSource, /decoratePixelFloorButton\(button\)/);
  assert.doesNotMatch(refreshSource, /setPixelVisibleSessionsForFloor\(floor\)/);
  assert.doesNotMatch(refreshSource, /requestPixelFloorPreview\(floor\)/);
  const previewHashes = new Set();
  for (let floor = 1; floor <= 20; floor += 1) {
    const previewPath = path.join(
      projectRoot,
      "assets",
      "tower-previews",
      `floor-${String(floor).padStart(2, "0")}.png`
    );
    const previewPng = fs.readFileSync(previewPath);
    assert.deepEqual(
      Array.from(previewPng.subarray(0, 8)),
      [137, 80, 78, 71, 13, 10, 26, 10],
      `Floor ${floor} must have a bundled PNG preview`
    );
    assert.equal(previewPng.readUInt32BE(16), 640, `Floor ${floor} preview width must be 640`);
    assert.equal(previewPng.readUInt32BE(20), 320, `Floor ${floor} preview height must be 320`);
    previewHashes.add(crypto.createHash("sha256").update(previewPng).digest("hex"));
  }
  assert.equal(previewHashes.size, 20, "Every tower floor must have a distinct real-room preview");
  const setPreviewSource = extractFunction(rendererSource, "setPixelFloorPreview");
  assert.doesNotMatch(setPreviewSource, /localStorage\.setItem/);
  assert.match(setPreviewSource, /preview\.src\s*=\s*pixelFloorPreview\(normalizedFloor\)/);
  const previewKeySource = extractFunction(rendererSource, "pixelFloorPreviewKey");
  assert.match(previewKeySource, /encodeURIComponent\(String\(workspaceId\s*\|\|\s*"no-workspace"\)\)/);
  const workspacePreviewSource = extractFunction(rendererSource, "refreshPixelFloorPreviewsForWorkspaceSwitch");
  assert.doesNotMatch(
    workspacePreviewSource,
    /localStorage\.removeItem\(pixelFloorPreviewKey/,
    "Switching workspaces must retain each workspace's real captured floor previews"
  );

  assert.match(rendererSource, /className\s*=\s*"pixel-roster-agent"/);
  assert.match(rendererSource, /class="pixel-roster-avatar"/);
  assert.match(rendererSource, /function agentPortraitSpriteUrl\(session\)/);
  assert.match(rendererSource, /characters\/char_\$\{agentPortraitIndex\(session\)\}\.png/);
  assert.match(rendererSource, /function agentFaceUrl\(session\)/);
  assert.match(rendererSource, /assets\/agent-face-\$\{agentPortraitIndex\(session\)\}\.png/);
  const detailSource = extractFunction(rendererSource, "renderPixelAgentDetail");
  assert.match(detailSource, /agentFaceUrl\(session\)/);
  assert.doesNotMatch(detailSource, /agentPortraitUrl/);
  assert.match(rendererSource, /openPixelAgentDetail\(session\)/);
  assert.match(
    rendererSource,
    /item\.addEventListener\("click",\s*async\s*\(\)\s*=>\s*\{[\s\S]*?applyPixelFloor\(assignedFloor,\s*\{\s*showLoader:\s*true\s*\}\)[\s\S]*?openPixelAgentDetail\(session\)/,
    "Clicking an agent in the clipboard must jump to that agent's floor"
  );
  assert.doesNotMatch(rendererSource, /class="pixel-roster-number"/);
  assert.match(styles, /\.pixel-roster-avatar\s*\{[\s\S]*?image-rendering:\s*pixelated;/);
  assert.match(styles, /\.pixel-roster-avatar\s*\{[\s\S]*?background-position:\s*0 -10px;/);
  assert.match(styles, /\.pixel-roster-avatar\s*\{[\s\S]*?background-size:\s*224px 192px;/);
  assert.match(styles, /\.pixel-roster-avatar\s*\{[\s\S]*?height:\s*32px;[\s\S]*?width:\s*32px;/);
  assert.match(styles, /\.pixel-floor-list\s*\{[\s\S]*?gap:\s*0;/);
  assert.doesNotMatch(styles, /\.pixel-floor-list\s*>\s*button:nth-child\(3n/);
  assert.match(styles, /\.pixel-floor-list\s*>\s*button,[\s\S]*?border-bottom:\s*5px solid #3f4a56;/);
  assert.match(styles, /\.pixel-floor-list\s*>\s*button\.active\s*\{[\s\S]*?0 0 16px rgba\(242,\s*207,\s*99,\s*0\.3\)/);
  assert.match(styles, /\.pixel-floor-summary/);
  const floorButtonSource = extractFunction(rendererSource, "updatePixelFloorButtons");
  assert.match(floorButtonSource, /--pixel-tower-height/);
  assert.match(floorButtonSource, /pixelFloorCount\s*\*\s*82\s*\+\s*106/);
  assert.match(styles, /Final Pixel tower silhouette/);
  assert.match(styles, /\.pixel-floor-stack\s*\{[\s\S]*?height:\s*min\(var\(--pixel-tower-height/);
  assert.match(styles, /\.pixel-floor-stack::after\s*\{[\s\S]*?bottom:\s*-22px;/);
  assert.match(styles, /\.pixel-tower-roof\s*\{[\s\S]*?clip-path:\s*polygon/);
  assert.match(styles, /\.pixel-tower-lobby\s*\{[\s\S]*?height:\s*48px;/);

  const pets = assetIndex.pets || [];
  for (const [id, name] of [
    ["claudio", "Claudio"],
    ["hamster", "Nibbles"],
    ["dog", "Scout"],
    ["lizard", "Pixel"],
    ["rabbit", "Mochi"],
    ["tortoise", "Atlas"],
    ["frog", "Ribbit"],
    ["cockatiel", "Piper"],
    ["hedgehog", "Pippin"],
    ["raccoon", "Bandit"],
    ["penguin", "Waddles"],
    ["red-panda", "Maple"]
  ]) {
    assert.ok(pets.some((pet) => pet.id === id && pet.name === name), `Missing ${name} pet`);
    const petPath = path.join(projectRoot, `pixel-agents-mode/assets/pets/${id}/pet.png`);
    assert.ok(fs.existsSync(petPath), `Missing ${id} pet sprite`);
    const png = fs.readFileSync(petPath);
    assert.equal(png.subarray(1, 4).toString("ascii"), "PNG", `${id} must be a PNG`);
    assert.equal(png.readUInt32BE(16), 96, `${id} sprite width must match upstream topology`);
    assert.equal(png.readUInt32BE(20), 96, `${id} sprite height must match upstream topology`);
  }
  const petProfiles = extractArray(rendererSource, "pixelPetProfiles");
  assert.equal(petProfiles.length, 12, "Every bundled pet needs an attribute profile");
  assert.deepEqual(
    Array.from(petProfiles, (profile) => profile.id),
    pets.map((pet) => pet.id),
    "Pet profiles must follow the runtime sprite order"
  );
  for (const profile of petProfiles) {
    for (const key of ["species", "hp", "energy", "mood", "snack", "hobbies", "trait", "talent"]) {
      assert.ok(profile[key], `${profile.id} is missing ${key}`);
    }
  }
  assert.match(html, /id="pixelPetDetail"[\s\S]*?id="pixelPetHpText"[\s\S]*?id="pixelPetHobbies"/);
  assert.match(rendererSource, /function openPixelPetDetail\(pet,\s*floor\s*=\s*activePixelFloor\)/);
  assert.match(rendererSource, /message\.type\s*===\s*"pixelPetSelected"/);
  assert.match(bridgeSource, /function openPetProfileDirect\(pet\)/);
  assert.match(bridgeSource, /window\.__workbenchOpenPetProfile\s*=\s*openPetProfileDirect/);
  assert.match(bridgeSource, /function publishClickedPetProfile\(sequence,\s*before\)/);
  assert.match(bridgeSource, /"pointerdown"[\s\S]*?petPointerSnapshot\s*=\s*petSpeechSnapshot\(\)/);
  assert.match(bridgeSource, /type:\s*"pixelPetSelected"/);
  assert.match(bridgeSource, /getPets\?\.\(\)/);
  assert.match(styles, /\.pixel-pet-detail\s*\{[\s\S]*?left:\s*calc\(var\(--pixel-tower-zone\) \+ 18px\)/);
  assert.match(rendererSource, /pixelPetDetailAvatar\.style\.setProperty\([\s\S]*?"--pixel-pet-image"/);
  assert.match(
    styles,
    /\.pixel-pet-detail-avatar::before\s*\{[\s\S]*?background-size:\s*216px 216px;[\s\S]*?transform:\s*none;[\s\S]*?width:\s*36px;/
  );
  assert.match(
    styles,
    /\.pixel-pet-attributes > div\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?grid-template-columns:\s*96px minmax\(0,\s*1fr\);/
  );
  assert.match(bridgeSource, /const petNames\s*=\s*\[[\s\S]*?"Scout"[\s\S]*?"Maple"/);
  assert.match(bridgeSource, /const petIds\s*=\s*\[[\s\S]*?"dog"[\s\S]*?"red-panda"/);
  assert.doesNotMatch(bridgeSource, /petVariantNames| Mint| Amber| Violet| Sky| Rose/);
  assert.doesNotMatch(read("pixel-agents-mode/assets/browserMock-DHJcqYbF.js"), /tintPetPixel|tintPetFrames/);
  const pixelRuntime = read("pixel-agents-mode/assets/index-CDwRPJIS.js");
  assert.ok(
    pixelRuntime.includes("if(window.__workbenchOpenPetProfile?.(t))return"),
    "Pet clicks must open the BsCode stat sheet before Pixel Agents can show dialogue"
  );
  assert.ok(
    pixelRuntime.includes("Fa(Ba),Ua().catch(console.error)"),
    "Pet and room test hooks must stay enabled in the packaged Pixel Agents runtime"
  );
  for (const dialogue of ["Walk break?", "I found a bug!", "Good code!", "Woof!"]) {
    assert.ok(pixelRuntime.includes(dialogue), `Scout dialogue is missing: ${dialogue}`);
  }
  assert.ok(pixelRuntime.includes("Cheeks full, build clean."), "Nibbles needs species-specific dialogue");
  assert.ok(pixelRuntime.includes("e.moveProgress+=.72*t"), "Pet steps should use the slower natural pace");
  assert.ok(
    pixelRuntime.includes("n.length>0&&0===e.moveProgress&&(e.path=n)"),
    "Pet follow paths must not reset in the middle of a step"
  );
  assert.ok(pixelRuntime.includes("agentSpeech"), "Agent speech transport must reach the Pixel runtime");
  const petTypeSource = extractFunction(bridgeSource, "petTypeForFloor");
  const petFixture = {
    selectedPet: "hamster",
    petIds: [
      "claudio", "hamster", "dog", "lizard", "rabbit", "tortoise",
      "frog", "cockatiel", "hedgehog", "raccoon", "penguin", "red-panda"
    ],
    petNames: Array.from({ length: 12 }, (_, index) => `Pet ${index}`)
  };
  vm.runInNewContext(
    `${petTypeSource}
     this.floorPetTypes = Array.from({ length: 12 }, (_, index) => petTypeForFloor(index + 1));`,
    petFixture
  );
  assert.equal(
    new Set(petFixture.floorPetTypes).size,
    12,
    "Every supported tower floor must receive a distinct deterministic pet"
  );
  assert.doesNotMatch(browserMockSource, /tintPetFrames|const variants\s*=/);
  assert.match(browserMockSource, /pets\.push\(petFrames\(png\)\)/);
  for (const id of [
    "hamster", "claudio", "dog", "lizard", "rabbit", "tortoise",
    "frog", "cockatiel", "hedgehog", "raccoon", "penguin", "red-panda"
  ]) {
    assert.match(html, new RegExp(`<option\\s+value="${id}"`), `Settings must offer ${id}`);
  }

  const roomThemes = extractArray(rendererSource, "PIXEL_ROOM_THEMES");
  const roomPlans = extractArray(rendererSource, "PIXEL_ROOM_PLANS");
  assert.equal(roomThemes.length, 20, "Pixel mode must provide twenty room designs");
  assert.equal(roomPlans.length, 20, "Every room theme needs a real floor plan");
  assert.equal(new Set(roomThemes.map((theme) => theme.name)).size, 20, "Every room needs a unique name");
  assert.equal(
    new Set(roomThemes.map((theme) => theme.topology)).size,
    20,
    "Every room needs distinct architecture"
  );
  assert.equal(new Set(roomPlans.map((plan) => plan.key)).size, 20, "Every floor plan needs a unique key");
  assert.equal(
    new Set(roomPlans.map((plan) => plan.silhouette)).size,
    20,
    "Every floor plan needs a unique occupied silhouette"
  );
  assert.equal(
    new Set(roomPlans.map((plan) => JSON.stringify(plan.colors))).size,
    20,
    "Every floor plan needs its own material color treatment"
  );
  assert.doesNotMatch(bridgeSource, /function addRoomCarpet|roomCarpetSchemes/);
  assert.match(
    bridgeSource,
    /layout\.carpetTiles\s*=\s*Array\(layout\.tiles\.length\)\.fill\(null\)/,
    "Generated rooms should expose their actual tile plans without carpet masks"
  );
  assert.match(rendererSource, /Math\.min\(20,\s*Number\(localStorage\.getItem\("agentWorkbenchPixelFloorCount"\)/);
  assert.match(rendererSource, /if\s*\(pixelFloorCount\s*>=\s*20\)/);
  assert.match(rendererSource, /function buildPixelRoomLayout\(baseLayout,\s*floor\)/);
  assert.match(html, /id="pixelPetDetail"[\s\S]*?Favorite food/);
  assert.match(html, /id="pixelSkyToggleButton"/);
  assert.match(rendererSource, /function timeBasedPixelSkyPhase\([\s\S]*?"sunrise"[\s\S]*?"sunset"/);
  assert.match(rendererSource, /const phases\s*=\s*\["sunrise",\s*"day",\s*"sunset",\s*"night"\]/);
  assert.match(rendererSource, /pixelSkyToggleButton\.addEventListener\("click",\s*togglePixelSkyPhase\)/);
  assert.match(styles, /\.pixel-mode-view\[data-sky-phase="sunrise"\]/);
  assert.match(styles, /\.pixel-mode-view\[data-sky-phase="sunset"\]/);
  assert.match(styles, /body\.cinematic-mode \.agent-slot,[\s\S]*?border:\s*0;/);
  assert.match(
    styles,
    /body\.cinematic-mode \.terminal-host \.xterm-viewport[\s\S]*?bottom:\s*0[\s\S]*?top:\s*7px/
  );
  assert.match(
    styles,
    /body\.cinematic-mode \.terminal-host \.xterm-viewport::\-webkit-scrollbar-thumb[\s\S]*?border-radius:\s*999px/
  );
});

test("pasted agent images are bounded, referenced, and uploaded for SSH workspaces", () => {
  const mainSource = read("main.js");
  const preloadSource = read("preload.js");
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");

  assert.match(mainSource, /const MAX_PASTED_IMAGE_BYTES\s*=\s*24\s*\*\s*1024\s*\*\s*1024/);
  assert.match(mainSource, /const MAX_PASTED_IMAGE_TOTAL_BYTES\s*=\s*40\s*\*\s*1024\s*\*\s*1024/);
  for (const mimeType of ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"]) {
    assert.ok(mainSource.includes(`"${mimeType}"`), `Missing pasted-image support for ${mimeType}`);
  }

  const verifySource = extractFunction(mainSource, "verifyPastedImage");
  const bufferSource = extractFunction(mainSource, "pastedImageBuffer");
  const verifyContext = { Buffer, ArrayBuffer };
  vm.runInNewContext(
    `${bufferSource}\n${verifySource}
     this.pastedImageBuffer = pastedImageBuffer;
     this.verifyPastedImage = verifyPastedImage;`,
    verifyContext
  );
  const pngHeader = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.doesNotThrow(() => verifyContext.verifyPastedImage(
    verifyContext.pastedImageBuffer(pngHeader),
    "image/png"
  ));
  assert.throws(
    () => verifyContext.verifyPastedImage(Buffer.from("not an image"), "image/png"),
    /invalid/
  );

  const importSource = extractFunction(mainSource, "importWorkspaceData");
  assert.match(importSource, /sourceItems\.length/, "Empty clipboard payloads must be rejected");
  assert.match(importSource, /workspace\.type\s*===\s*"ssh"/, "Remote workspaces need an upload branch");
  assert.match(importSource, /resolveExecutable\("rsync"\)/, "SSH image attachments must be transferred");
  assert.match(importSource, /fsp\.rm\(destination\.path,\s*\{\s*force:\s*true\s*\}\)/, "Failed uploads must clean up their mirror file");
  assert.match(
    mainSource,
    /ipcMain\.handle\("workspace:import-data",\s*importWorkspaceData\)/,
    "Main must register the binary image import endpoint"
  );
  assert.match(
    preloadSource,
    /importWorkspaceData:[\s\S]*?ipcRenderer\.invoke\("workspace:import-data"/,
    "The secure preload bridge must expose image imports"
  );

  const pasteSource = extractFunction(rendererSource, "importPastedImagesToAgent");
  assert.match(pasteSource, /new Uint8Array\(await file\.arrayBuffer\(\)\)/);
  assert.match(pasteSource, /api\.importWorkspaceData\(activeWorkspaceId,\s*"",\s*items\)/);
  assert.match(pasteSource, /insertAgentFileReferences\(slot,\s*slotIndex,\s*imported\)/);
  const referenceSource = extractFunction(rendererSource, "insertAgentFileReferences");
  assert.match(referenceSource, /session\?\.cleanMode/, "Zen prompts must receive pasted image references");
  assert.match(referenceSource, /\.agent-task-input/, "Empty agent prompts must receive pasted image references");
  assert.match(referenceSource, /api\.writeAgent\(session\.id/, "Running terminal agents must receive pasted image references");
  const dropSource = extractFunction(rendererSource, "enableAgentFileDrop");
  assert.match(
    dropSource,
    /slot\.addEventListener\("paste",[\s\S]*?importPastedImagesToAgent[\s\S]*?,\s*true\)/,
    "Agent cells must capture image paste events before xterm consumes them"
  );
  assert.match(styles, /\.agent-slot\.agent-paste-target/, "Image transfer needs visible in-cell feedback");
});

test("agent names use a deterministic pool of 1,024 normal one-word names", () => {
  const mainSource = read("main.js");
  const nameData = JSON.parse(read("assets/agent-names.json"));
  const names = nameData.names;
  assert.equal(names.length, 1_024);
  assert.equal(new Set(names.map((name) => name.toLowerCase())).size, 1_024);
  assert.ok(names.every((name) => /^[A-Za-z]+$/.test(name)), "Every agent name should be one word");

  const source = extractFunction(mainSource, "coolAgentName");
  const buildContext = () => {
    const context = { crypto };
    vm.runInNewContext(
      `const AGENT_NAMES = ${JSON.stringify(names)};
       ${source}
       this.coolAgentName = coolAgentName;`,
      context
    );
    return context;
  };
  const first = buildContext();
  const second = buildContext();
  const firstRun = [1, 2, 3, 4].map((number) => first.coolAgentName("fixture-agent", number));
  const secondRun = [1, 2, 3, 4].map((number) => second.coolAgentName("fixture-agent", number));
  assert.deepEqual(firstRun, secondRun, "Names must remain deterministic across runtimes");
  assert.ok(firstRun.every((name) => /^[A-Za-z]+$/.test(name)), "Names should be normal one-word names");
});

test("cross-platform packaging entrypoints exist and remain wired", () => {
  const packageJson = JSON.parse(read("package.json"));
  const expectedScripts = {
    "package:current": "scripts/package-current.mjs",
    "package:mac": "scripts/package-mac.mjs",
    "package:windows": "scripts/package-platform.mjs win32",
    "package:linux": "scripts/package-platform.mjs linux"
  };
  for (const [name, marker] of Object.entries(expectedScripts)) {
    assert.equal(typeof packageJson.scripts?.[name], "string", `Missing npm script ${name}`);
    assert.ok(packageJson.scripts[name].includes(marker), `${name} must invoke ${marker}`);
  }
  for (const relativePath of [
    "scripts/package-current.mjs",
    "scripts/package-mac.mjs",
    "scripts/package-platform.mjs",
    "scripts/validate-package-config.mjs",
    "docs/cross-platform.md"
  ]) {
    assert.ok(fs.existsSync(path.join(projectRoot, relativePath)), `Missing ${relativePath}`);
  }
  const dispatcher = read("scripts/package-current.mjs");
  assert.match(dispatcher, /\["darwin",\s*"win32",\s*"linux"\]/);
  const macPackager = read("scripts/package-mac.mjs");
  assert.match(macPackager, /entry\s*===\s*"darwin-arm64"/);
  assert.match(
    macPackager,
    /fsp\.rm\(path\.join\(prebuilds,\s*entry\),\s*\{\s*recursive:\s*true,\s*force:\s*true\s*\}\)/,
    "The Apple Silicon archive must prune non-arm64 node-pty prebuilds"
  );
  assert.match(
    macPackager,
    /fsp\.rm\(windowsRuntime,\s*\{\s*recursive:\s*true,\s*force:\s*true\s*\}\)/,
    "The Apple Silicon archive must prune bundled Windows PTY binaries"
  );
  const platformPackager = read("scripts/package-platform.mjs");
  assert.match(platformPackager, /new Set\(\["win32",\s*"linux"\]\)/);
  assert.match(platformPackager, /process\.platform\s*!==\s*targetPlatform/);
  assert.match(platformPackager, /process\.env\.npm_execpath/);
  assert.match(platformPackager, /process\.env\.ComSpec\s*\|\|\s*"cmd\.exe"/);
});

test("workspace tabs show portraits only for running agents", () => {
  const styles = read("styles.css");
  const rendererSource = read("renderer.js");
  assert.doesNotMatch(rendererSource, /tab\.dataset\.agentCount\s*=/);
  assert.doesNotMatch(rendererSource, /etaGroup\.dataset\.agentCount\s*=/);
  assert.match(rendererSource, /eta\.hidden\s*=\s*true/);
  assert.match(rendererSource, /if\s*\(!session\)\s*\{[\s\S]*?item\.hidden\s*=\s*true/);
  assert.match(rendererSource, /item\.hidden\s*=\s*false[\s\S]*?item\.classList\.add\("has-agent-face"\)/);
  assert.match(rendererSource, /item\.textContent\s*=\s*""/);
  assert.match(rendererSource, /etaGroup\.hidden\s*=\s*true/);
  assert.match(rendererSource, /etaGroup\.hidden\s*=\s*!Array\.from\(etaGroup\.children\)/);
  assert.match(rendererSource, /classList\.add\("workspace-tab-shape"\)/);
  assert.match(rendererSource, /workspace-tab-shape-fill/);
  assert.match(rendererSource, /M0 34C7 34 10 31 13 26C17 20 18 14 19 9C20 4 25 2 31 2/);
  assert.match(rendererSource, /workspaceEditorTabs\.appendChild\(addTabButton\)/);
  assert.doesNotMatch(rendererSource, /workspace-tab-tail/);
  assert.match(rendererSource, /activeTab\?\.scrollIntoView\(\{\s*block:\s*"nearest",\s*inline:\s*"nearest"\s*\}\)/);
  assert.match(styles, /\.workspace-editor-tabs\s*\{[\s\S]*?flex-wrap:\s*nowrap;/);
  assert.match(styles, /\.workspace-editor-tabs\s*\{[\s\S]*?overflow-x:\s*auto;/);
  assert.match(styles, /\.workspace-editor-tabs\s*\{[\s\S]*?column-gap:\s*0;/);
  assert.match(styles, /\.workspace-tab-shape-fill\s*\{[\s\S]*?fill:/);
  assert.match(styles, /\.workspace-tab-add\s*\{[\s\S]*?font-size:\s*27px;/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta\s*\{[\s\S]*?display:\s*flex;/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta\s*\{[\s\S]*?flex:\s*0 0 auto;/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta\s*\{[\s\S]*?overflow:\s*visible;/);
  assert.doesNotMatch(styles, /\.workspace-editor-tab \.agent-eta\[data-agent-count=/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta > span\s*\{[\s\S]*?border:\s*0;/);
  assert.match(styles, /\.agent-eta > span\.has-agent-face::before\s*\{[\s\S]*?background-image:\s*var\(--agent-face\)/);
  assert.match(styles, /\.workspace-editor-tab \.workspace-editor-label\s*\{[\s\S]*?text-overflow:\s*ellipsis;/);
});

test("remote status control opens SSH with the active connection", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  assert.match(html, /id="remoteStatusButton"[\s\S]*?aria-label="Open remote workspace"/);
  assert.match(html, /id="remoteStatusLabel"\s+class="remote-status-label"/);
  assert.match(rendererSource, /`Disconnected from \$\{host\}`/);
  assert.match(rendererSource, /remoteConnectionStates\.get\(workspace\.id\)\s*\|\|\s*"disconnected"/);
  assert.match(rendererSource, /metrics\.source\s*===\s*"ssh"\s*\?\s*"connected"\s*:\s*"disconnected"/);
  assert.match(rendererSource, /remoteStatusButton\.classList\.toggle\("disconnected",\s*connectionState\s*===\s*"disconnected"\)/);
  assert.match(rendererSource, /`Remote \$\{metrics\.label\} unavailable`/);
  assert.match(rendererSource, /if\s*\(metrics\.source\s*===\s*"ssh-error"\)\s*\{[\s\S]*?cpuUsageText\.textContent\s*=\s*"—"/);
  assert.match(rendererSource, /openSshDialog\(workspace\?\.type\s*===\s*"ssh"\s*\?\s*workspace\.remote\s*:\s*null,\s*false\)/);
  const refreshPanelsSource = extractFunction(rendererSource, "refreshWorkspacePanels");
  assert.match(refreshPanelsSource, /workspace\.type\s*===\s*"ssh"\s*&&\s*!isWorkspaceConnected\(workspace\)/);
  assert.ok(
    refreshPanelsSource.indexOf("!isWorkspaceConnected(workspace)") < refreshPanelsSource.indexOf("api.listFiles"),
    "A disconnected SSH workspace must be rejected before its files are requested"
  );
  const clearPanelsSource = extractFunction(rendererSource, "clearDisconnectedWorkspacePanels");
  assert.match(clearPanelsSource, /fileNodes\s*=\s*\[\]/);
  assert.match(clearPanelsSource, /resetArtifactPreview\(\)/);
  const emptyStateSource = extractFunction(rendererSource, "updateFileEmptyState");
  assert.match(emptyStateSource, /Disconnected from \$\{host\}\. Reconnect to browse remote files\./);
});

test("startup keeps the clock and battery responsive while usage loads asynchronously", () => {
  const mainSource = read("main.js");
  const rendererSource = read("renderer.js");
  const initializeSource = extractFunction(rendererSource, "initialize");
  assert.ok(
    initializeSource.indexOf("refreshTitlebarTime()") < initializeSource.indexOf("refreshUsage()"),
    "Clock rendering must not wait for usage history"
  );
  assert.ok(
    initializeSource.indexOf("refreshPowerStatus()") < initializeSource.indexOf("refreshUsage()"),
    "Battery rendering must start before usage history"
  );
  assert.match(initializeSource, /powerStatusTimer\s*=\s*setInterval/);
  assert.match(mainSource, /async function findLatestFile\(root,\s*predicate\)/);
  assert.match(mainSource, /entries\s*=\s*await fsp\.readdir/);
  assert.match(mainSource, /async function readLastCodexRateLimit\(\)/);
  assert.match(mainSource, /const codexLimits\s*=\s*await readLastCodexRateLimit\(\)/);
});

test("metadata writes are serialized and use collision-proof temporary files", async () => {
  const source = extractFunction(read("main.js"), "writeJson");
  const temporaryPaths = [];
  const renames = [];
  let activeWrites = 0;
  let maximumActiveWrites = 0;
  const context = {
    crypto,
    jsonWriteQueues: new Map(),
    path,
    process: { pid: 90210 },
    fsp: {
      async mkdir() {},
      async writeFile(filePath) {
        temporaryPaths.push(filePath);
        activeWrites += 1;
        maximumActiveWrites = Math.max(maximumActiveWrites, activeWrites);
        await Promise.resolve();
        activeWrites -= 1;
      },
      async rename(sourcePath, destinationPath) {
        renames.push([sourcePath, destinationPath]);
      }
    }
  };
  vm.createContext(context);
  vm.runInContext(`${source}\nthis.writeJson = writeJson;`, context);
  await Promise.all(
    Array.from({ length: 16 }, (_, index) => context.writeJson("/tmp/agent.json", { index }))
  );
  assert.equal(maximumActiveWrites, 1, "Writes to one metadata file must stay ordered");
  assert.equal(new Set(temporaryPaths).size, temporaryPaths.length, "Every write needs a unique temporary path");
  assert.equal(renames.length, 16);
  assert.ok(renames.every(([, destination]) => destination === "/tmp/agent.json"));
});

test("terminal output stays bounded and yields between animation frames", () => {
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  const source = [
    extractFunction(rendererSource, "flushTerminalOutput"),
    extractFunction(rendererSource, "queueTerminalOutput")
  ].join("\n");
  const frames = [];
  const writes = [];
  const context = {
    requestAnimationFrame(callback) {
      frames.push(callback);
    }
  };
  vm.createContext(context);
  vm.runInContext(`${source}\nthis.queueTerminalOutput = queueTerminalOutput;`, context);
  const session = {
    terminalWriteScheduled: false,
    pendingTerminalOutput: [],
    pendingTerminalOutputBytes: 0,
    term: { write(chunk) { writes.push(chunk); } }
  };
  for (let index = 0; index < 5200; index += 1) {
    context.queueTerminalOutput(session, "x".repeat(1024));
  }
  assert.equal(frames.length, 1, "A burst should schedule only one animation frame");
  assert.equal(writes.length, 0, "Output must not block the input turn with synchronous writes");
  assert.ok(session.pendingTerminalOutputBytes <= 4 * 1024 * 1024 + 1024);
  frames.shift()();
  assert.equal(writes.length, 1, "Only one queued chunk may render per frame");
  assert.equal(frames.length, 1, "Remaining output should yield to another frame");
  assert.match(styles, /\.agent-card \.terminal-host\s*\{\s*padding:\s*0;/);
  assert.match(styles, /\.agent-card \.terminal-host > \.xterm\s*\{[\s\S]*?padding:\s*5px 4px 16px 7px;/);
});

test("follow-up prompts replace the checklist without forcing terminal scroll", () => {
  const mainSource = read("main.js");
  const rendererSource = read("renderer.js");
  assert.match(
    mainSource,
    /Treat every new user instruction, including follow-up prompts in the same terminal session, as a new task cycle/
  );
  const beginTaskSource = extractFunction(rendererSource, "beginAgentTask");
  assert.match(beginTaskSource, /session\.checklistEtaState\.clear\(\)/);
  assert.match(beginTaskSource, /checklist:\s*\[\{\s*text:\s*"Preparing task checklist",\s*status:\s*"working"/);
  assert.match(rendererSource, /session\.kind\s*!==\s*"shell"[\s\S]*?beginAgentTask\(session,\s*task\)/);
  assert.match(rendererSource, /scrollOnUserInput:\s*false/);
  assert.doesNotMatch(rendererSource, /session\.term\.scrollToBottom\(\)/);
  assert.match(rendererSource, /if\s*\(!wasAtBottom\)\s*session\.term\.scrollToLine\(viewportY\)/);
});

test("GPU hover cards identify users, processes, and VRAM", () => {
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  const source = extractFunction(rendererSource, "refreshSystemMetrics");
  assert.match(source, /process\.user\s*\|\|\s*"unknown"/);
  assert.match(source, /process\.memoryUsedMiB/);
  assert.match(source, /const userMemory\s*=\s*new Map\(\)/);
  assert.match(source, /userMemory\.set\(user,\s*total\s*\+/);
  assert.match(source, /\+ \$\{hiddenProcesses\.length\} more process/);
  assert.match(source, /Process ownership unavailable/);
  assert.match(source, /item\.dataset\.tooltip\s*=\s*gpuTooltip/);
  assert.match(source, /item\.setAttribute\("aria-label",\s*gpuTooltip\)/);
  assert.doesNotMatch(source, /item\.title\s*=\s*gpuTooltip/);
  assert.match(source, /gpuMetrics\.replaceChildren\(\)/);
  assert.match(styles, /\.gpu-metric\[data-tooltip\]::after\s*\{[\s\S]*?content:\s*attr\(data-tooltip\)/);
  assert.match(styles, /\.gpu-metric\[data-tooltip\]:hover::after,[\s\S]*?display:\s*block;/);
});

test("SSH Explorer lists the server live and expands remote folders lazily", () => {
  const mainSource = read("main.js");
  const preloadSource = read("preload.js");
  const rendererSource = read("renderer.js");
  const listFilesSource = extractFunction(mainSource, "listWorkspaceFiles");
  const remoteDirectorySource = extractFunction(mainSource, "listRemoteWorkspaceDirectory");
  const remotePollingSource = extractFunction(mainSource, "ensureRemoteWorkspacePolling");
  assert.match(listFilesSource, /workspace\.type\s*===\s*"ssh"[\s\S]*?listRemoteWorkspaceDirectory\(workspace,\s*""\)/);
  assert.match(remoteDirectorySource, /os\.scandir\(directory\)/);
  assert.match(remoteDirectorySource, /childrenLoaded:\s*entry\.type\s*!==\s*"directory"/);
  assert.doesNotMatch(mainSource, /async function mirrorRemoteWorkspace/);
  assert.doesNotMatch(mainSource, /"--delete-delay"/);
  assert.match(remotePollingSource, /remoteRefresh:\s*true/);
  assert.doesNotMatch(remotePollingSource, /rsync|mirrorRemote/);
  assert.match(preloadSource, /listDirectory:\s*\(workspaceId,\s*relativePath\)/);
  assert.match(rendererSource, /node\.childrenLoaded\s*!==\s*false/);
  assert.match(rendererSource, /api\.listDirectory\(workspaceId,\s*node\.relativePath\)/);
  assert.doesNotMatch(rendererSource, /showToast\(`Remote connection succeeded, but file sync failed/);
});

test("visual mode keeps the room unobstructed and agent prompts still submit", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  assert.match(html, /id="pixelFloorLauncher"[\s\S]*?id="pixelFloorTaskInput"[\s\S]*?data-agent-kind="codex"/);
  assert.match(html, /class="pixel-scene-divider"\s+aria-hidden="true"/);
  assert.match(rendererSource, /function renderPixelFloorLauncher\(\)\s*\{[\s\S]*?pixelFloorLauncher\.hidden\s*=\s*true/);
  assert.match(styles, /\.pixel-mode-view \.pixel-floor-launcher\s*\{\s*display:\s*none\s*!important;/);
  assert.match(rendererSource, /pixelAgentDetailPrompt\.addEventListener\("keydown"/);
  assert.match(rendererSource, /api\.writeAgent\(session\.id,\s*`\$\{message\}\\r`\)/);
  assert.doesNotMatch(extractFunction(rendererSource, "deletePixelFloor"), /window\.confirm/);
  assert.match(styles, /\.agent-launcher\s*\{[\s\S]*?align-content:\s*center;/);
  assert.match(styles, /\.launcher-button\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?border:\s*0;/);
  assert.match(styles, /\.pixel-scene-divider\s*\{[\s\S]*?left:\s*var\(--pixel-tower-zone\);[\s\S]*?pointer-events:\s*none;[\s\S]*?top:\s*0;[\s\S]*?width:\s*5px;/);
  assert.match(styles, /\.pixel-agent-clipboard \.pixel-roster-agent\s*\{[\s\S]*?grid-template-columns:\s*18px 36px minmax\(0,\s*1fr\) max-content;/);
  assert.match(rendererSource, /Seems pretty empty in here\.\.\./);
  assert.match(rendererSource, /class="pixel-coffee-animation"/);
  assert.match(styles, /@keyframes pixel-coffee-bob/);
  assert.match(styles, /@keyframes pixel-coffee-steam/);
});

test("Cinematic Mode layers efficient local scene loops behind one command dock", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const preloadSource = read("preload.js");
  const mainSource = read("main.js");
  const styles = read("styles.css");
  assert.match(html, /id="sceneBackgroundCanvas"[\s\S]*?aria-hidden="true"/);
  assert.match(html, /id="sceneBackground"[\s\S]*?preload="none"/);
  assert.match(html, /id="cinematicModeButton"[\s\S]*?title="Cinematic mode"/);
  assert.match(html, /id="cinematicModeButton"[\s\S]*?class="yin-yang-symbol"/);
  assert.match(html, /id="cinematicExitButton"[\s\S]*?title="Exit cinematic mode"/);
  assert.match(html, /id="cinematicNextSceneButton"[\s\S]*?title="Next animated scene"/);
  assert.match(html, /id="cinematicMentionMenu"[\s\S]*?role="listbox"/);
  assert.match(html, /id="cinematicPromptDock"[\s\S]*?id="cinematicPromptInput"[\s\S]*?⌘K[\s\S]*?id="cinematicPromptSendButton"/);
  const sceneCatalogSource = rendererSource.match(/const SCENE_THEMES\s*=\s*\{([\s\S]*?)\n\};/)?.[1] || "";
  assert.ok(
    [...sceneCatalogSource.matchAll(/\n\s*"?[a-z][a-z0-9-]*"?\s*:/g)].length >= 21,
    "Cinematic mode should provide at least 20 animated scenes plus None"
  );
  assert.match(rendererSource, /function drawLivingScene\(/);
  assert.match(rendererSource, /function drawSceneClouds\(/);
  assert.match(rendererSource, /function drawSceneMountains\(/);
  assert.match(rendererSource, /function drawSceneParticles\(/);
  const cinematicSource = extractFunction(rendererSource, "setCinematicMode");
  const scenePlaybackSource = extractFunction(rendererSource, "syncSceneBackgroundPlayback");
  const promptSource = extractFunction(rendererSource, "submitCinematicPrompt");
  assert.match(cinematicSource, /cinematicPromptDock\.hidden\s*=\s*!cinematicModeEnabled/);
  assert.match(cinematicSource, /cinematicExitButton\.hidden\s*=\s*!cinematicModeEnabled/);
  assert.match(cinematicSource, /cinematicNextSceneButton\.hidden\s*=\s*!cinematicModeEnabled/);
  assert.match(cinematicSource, /setPixelMode\(false\)/);
  assert.match(rendererSource, /agentWorkbenchReduceMotion/);
  assert.match(rendererSource, /document\.visibilityState\s*!==\s*"visible"/);
  assert.match(scenePlaybackSource, /sceneBackground\.pause\(\)/);
  assert.match(scenePlaybackSource, /sceneBackgroundCanvas\.classList\.toggle\("active",\s*reactive\)/);
  assert.match(scenePlaybackSource, /cinematicModeEnabled\s*&&\s*homeView\.hidden/);
  assert.match(rendererSource, /agentWorkbenchMusicReactive/);
  assert.match(rendererSource, /latestSpotifyStatus\?\.state\s*===\s*"playing"/);
  assert.match(promptSource, /sessions\.get\(selectedAgentId\)/);
  assert.match(promptSource, /firstEmptySlot\(\)/);
  assert.match(promptSource, /startAgent\(/);
  assert.match(promptSource, /api\.writeAgent\(target\.id/);
  assert.match(styles, /body\.cinematic-mode \.main-layout\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(styles, /body\.cinematic-mode \.app-shell\s*\{[\s\S]*?display:\s*block;[\s\S]*?height:\s*100%/);
  assert.match(styles, /body\.cinematic-mode \.agent-stage\s*\{[\s\S]*?padding:\s*54px 72px 112px/);
  assert.match(styles, /body\.cinematic-mode \.agent-grid\s*\{[\s\S]*?gap:\s*34px 40px/);
  assert.match(styles, /body\.cinematic-mode \.agent-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, var\(--cinematic-agent-width, 600px\)\)\)/);
  assert.match(styles, /body\.cinematic-mode \.agent-grid\s*\{[\s\S]*?grid-template-rows:\s*repeat\(2, minmax\(0, var\(--cinematic-agent-height, 285px\)\)\)/);
  assert.match(styles, /body\.cinematic-mode \.agent-grid\[data-layout-count\] \.agent-slot\s*\{[\s\S]*?display:\s*block/);
  assert.match(styles, /body\.cinematic-mode \.agent-task-input,[\s\S]*?rgba\(255,\s*255,\s*255,\s*0\.065\)/);
  assert.match(styles, /body\.cinematic-mode \.agent-card-header\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?border-bottom-color:\s*transparent/);
  assert.match(styles, /body\.cinematic-mode \.agent-card-header \.agent-action\s*\{[\s\S]*?opacity:\s*0\.58/);
  assert.match(styles, /body\.cinematic-mode \.agent-checklist-item,[\s\S]*?background:\s*transparent;[\s\S]*?border-color:\s*transparent/);
  assert.match(styles, /body\.cinematic-mode \.agent-checklist-item\.working \.agent-checklist-marker\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none/);
  assert.match(rendererSource, /function selectNextSceneTheme\(\)[\s\S]*?selectSceneTheme/);
  assert.match(rendererSource, /function resolveCinematicMention\([\s\S]*?\["codex", "claude", "shell"\]/);
  assert.match(rendererSource, /cinematicPromptInput\.addEventListener\("input"[\s\S]*?renderCinematicMentionMenu/);
  assert.match(rendererSource, /cinematicMentionMenu\.addEventListener\("pointerdown"[\s\S]*?insertCinematicMention/);
  assert.match(rendererSource, /button\.classList\.add\("has-profile"\)[\s\S]*?applyAgentFace\(avatar, choice\.session\)/);
  assert.match(styles, /\.cinematic-mention-avatar\s*\{[\s\S]*?image-rendering:\s*pixelated/);
  assert.match(styles, /body\.cinematic-mode \.agent-slot,[\s\S]*?backdrop-filter:\s*blur\(18px\)/);
  assert.match(
    rendererSource,
    /document\.body\?\.classList\.contains\("scene-background-active"\)[\s\S]*?"rgba\(0, 0, 0, 0\)"/,
    "Cinematic terminal canvases must inherit the same pane surface as their headers"
  );
  assert.match(styles, /body\.cinematic-mode \.agent-slot\.clean-mode \.agent-clean-view,[\s\S]*?background:\s*transparent\s*!important/);
  assert.match(styles, /\.cinematic-prompt-dock\s*\{[\s\S]*?bottom:\s*18px/);
  assert.match(styles, /\.cinematic-prompt-shortcut\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?border:\s*0;[\s\S]*?font:\s*680 15px/);
  assert.match(styles, /\.cinematic-prompt-dock > button\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?border:\s*0;[\s\S]*?font:\s*680 24px/);
  assert.match(styles, /\.scene-atmosphere::before,[\s\S]*?will-change:\s*opacity, transform/);
  assert.match(styles, /body\[data-scene-theme="rain"\] \.scene-atmosphere::before[\s\S]*?scene-rain-fall/);
  assert.match(styles, /body\[data-scene-theme="lookout"\] \.scene-atmosphere::before[\s\S]*?scene-embers-rise/);
  assert.match(styles, /body\.cinematic-mode \.agent-slot\.clean-mode \.agent-clean-view\s*\{[\s\S]*?grid-template-rows:\s*auto auto minmax\(0, 1fr\) auto auto/);
  assert.match(rendererSource, /function beginCinematicPaneResize\([\s\S]*?cinematic-resizing/);
  assert.match(rendererSource, /function finishCinematicPaneResize\([\s\S]*?agentWorkbenchCinematicPaneWidth/);
  assert.match(styles, /body\.cinematic-resize-settling \.agent-slot\s*\{[\s\S]*?cinematic-pane-settle/);
  assert.match(styles, /\.cinematic-mention-menu\s*\{[\s\S]*?bottom:\s*calc\(100% \+ 8px\)/);
  assert.match(styles, /\.cinematic-mention-choice\[aria-selected="true"\]/);
  assert.match(styles, /body\.cinematic-mode \.titlebar\s*\{[\s\S]*?display:\s*none\s*!important/);
  assert.match(rendererSource, /api\.setWindowCinematicFullScreen\(cinematicModeEnabled\)/);
  assert.match(preloadSource, /setWindowCinematicFullScreen:[\s\S]*?window:set-cinematic-full-screen/);
  assert.match(mainSource, /function setCinematicWindowFullScreen\([\s\S]*?window\.setSimpleFullScreen\(true\)[\s\S]*?window\.setFullScreen\(true\)/);
  assert.match(mainSource, /ipcMain\.handle\("window:set-cinematic-full-screen", setCinematicWindowFullScreen\)/);
  assert.match(styles, /body\.cinematic-mode \.terminal-host > \.xterm\s*\{[\s\S]*?clip-path:\s*none/);
  assert.match(styles, /body\.music-playing \.cinematic-mode-button svg/);
  assert.match(rendererSource, /event\.key\.toLowerCase\(\)\s*===\s*"k"[\s\S]*?setCinematicMode\(true\)[\s\S]*?cinematicPromptInput\.focus\(\)/);
});

test("completed Zen tasks show an output message and ETA includes transition overhead", () => {
  const mainSource = read("main.js");
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  assert.match(mainSource, /Estimate end-to-end wall-clock time, not just hands-on coding time/);
  assert.match(mainSource, /transitions between steps/);
  assert.match(mainSource, /SSH\/network latency/);
  assert.match(mainSource, /output preview generation/);
  assert.match(rendererSource, /const hasOutputMessage\s*=\s*state\s*===\s*"complete"\s*\|\|\s*state\s*===\s*"failed"/);
  assert.match(rendererSource, /metadata\.tldr\s*\|\|\s*metadata\.currentTask/);
  assert.match(styles, /\.agent-clean-eta-row\.has-output-message/);
});

test("remote Session files come from agent reports and support videos", () => {
  const mainSource = read("main.js");
  const rendererSource = read("renderer.js");
  const attributionSource = extractFunction(mainSource, "collectArtifactAttributions");
  const artifactSource = extractFunction(mainSource, "listArtifacts");
  assert.match(attributionSource, /metadata\.previewFile/);
  assert.match(artifactSource, /workspace\.type\s*===\s*"ssh"/);
  assert.match(artifactSource, /Array\.from\(attributions\.entries\(\)\)/);
  assert.match(mainSource, /const VIDEO_EXTENSIONS\s*=\s*new Set\(\["\.mp4",\s*"\.mov",\s*"\.webm"\]\)/);
  assert.match(rendererSource, /artifact\.kind\s*===\s*"video"/);
  assert.match(rendererSource, /video\.controls\s*=\s*true/);
});

test("visual view preloads behind the terminals with the bundled BsCode loading animation", () => {
  const html = read("index.html");
  const pixelHtml = read("pixel-agents-mode/index.html");
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  assert.match(html, /id="pixelRefreshButton"[^>]*aria-label="Refresh visual view"/);
  assert.match(html, /id="pixelViewLoader"[^>]*role="status"[\s\S]*?id="pixelViewLoaderStatus"/);
  const refreshSource = extractFunction(rendererSource, "refreshPixelView");
  assert.doesNotMatch(refreshSource, /setPixelViewLoading\(true/);
  assert.match(refreshSource, /setPixelVisibleSessionsForFloor\(activePixelFloor\)/);
  assert.match(refreshSource, /postPixelSessionDetails\(session\)/);
  assert.match(refreshSource, /refreshPixelFloorPreviews\(\{\s*all:\s*true\s*\}\)/);
  assert.match(rendererSource, /now\s*-\s*lastPixelAutoSyncAt\s*>=\s*5000/);
  assert.match(rendererSource, /titlebarBatteryCharge\.hidden\s*=\s*!charging/);
  assert.match(pixelHtml, /window\.captureFloorPreview\s*=\s*captureFloorPreview/);
  assert.match(rendererSource, /Array\.from\(\{\s*length:\s*pixelFloorCount\s*\}/);
  const bundledPreviewSource = extractFunction(rendererSource, "pixelFloorPreview");
  assert.match(bundledPreviewSource, /assets\/tower-previews\/floor-\$\{String\(preset\)\.padStart\(2,\s*"0"\)\}\.png/);
  assert.match(html, /id="pixelLoaderAnimation"[^>]*src="assets\/bscode-loading-transparent\.webm"[^>]*muted[^>]*playsinline[^>]*loop/);
  assert.doesNotMatch(html, /bscode-loader-logo|pixel-loader-building|pixel-loader-elevator/);
  assert.match(styles, /\.pixel-view-loader\s*\{[\s\S]*?background:\s*transparent/);
  assert.match(styles, /\.pixel-loader-animation\s*\{[\s\S]*?object-fit:\s*contain/);
  assert.match(rendererSource, /pixelLoaderAnimation\.play\(\)\.catch/);
  assert.match(rendererSource, /pixelLoaderAnimation\.pause\(\)/);
  assert.ok(fs.existsSync(path.join(projectRoot, "assets/bscode-loading-animation.mp4")));
  assert.ok(fs.existsSync(path.join(projectRoot, "assets/bscode-loading-transparent.webm")));
  assert.match(rendererSource, /function warmPixelView\(\)[\s\S]*?await syncPixelMode\(true,\s*\{\s*showLoader:\s*false\s*\}\)[\s\S]*?pixelViewReady\s*=\s*true/);
  assert.match(styles, /\.pixel-mode-view\.background-warm\s*\{[\s\S]*?visibility:\s*hidden/);
  assert.match(rendererSource, /pixelModeView\.dataset\.skyPhase\s*=\s*skyPhase/);
  assert.match(styles, /\.pixel-mode-view\[data-sky-phase="night"\]/);
  assert.match(styles, /\.pixel-mode-view\[data-sky-phase="day"\]::before/);
});

test("pet clicks open a pixel RPG stat sheet instead of dialogue", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  for (const label of ["HP", "Energy", "Favorite food", "Hobbies", "Trait", "Talent"]) {
    assert.match(html, new RegExp(`>${escapeRegExp(label)}<`));
  }
  const petSource = extractFunction(rendererSource, "openPixelPetDetail");
  assert.match(petSource, /pixelPetHpFill\.style\.width/);
  assert.match(petSource, /pixelPetEnergyFill\.style\.width/);
  assert.match(petSource, /pixelPetSnack\.textContent/);
  assert.match(petSource, /pixelPetHobbies\.textContent/);
  assert.match(styles, /\.pixel-pet-detail[\s\S]*?image-rendering:\s*pixelated/);
  assert.match(styles, /\.pixel-pet-detail,[\s\S]*?border-radius:\s*0\s*!important/);
});

test("the tower uses an attached Art Deco crown and never captures previews live", () => {
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  const refreshSource = extractFunction(rendererSource, "refreshPixelFloorPreviews");
  assert.doesNotMatch(refreshSource, /captureFloorPreview|requestPixelFloorPreview|setPixelVisibleSessionsForFloor/);
  assert.match(styles, /\.pixel-tower-roof[\s\S]*?clip-path:\s*polygon/);
  assert.match(styles, /\.pixel-tower-roof::after[\s\S]*?border-bottom/);
  assert.ok(fs.existsSync(path.join(projectRoot, "scripts/generate-tower-previews.mjs")));
});

test("Zen and bullet-point prompts send on Enter and expose a send control", () => {
  const rendererSource = read("renderer.js");
  const source = extractFunction(rendererSource, "sendAgentCleanInstruction");
  assert.match(source, /api\.writeAgent\(session\.id,\s*`\$\{message\}\\r`\)/);
  assert.match(rendererSource, /cleanComposeInput\.addEventListener\("keydown"[\s\S]*?event\.key\s*!==\s*"Enter"[\s\S]*?sendAgentCleanInstruction\(session\)/);
  assert.match(rendererSource, /cleanSendButton\.addEventListener\("click",\s*\(\)\s*=>\s*sendAgentCleanInstruction\(session\)\)/);
});

test("workspace notes persist text, todos, and sketches for local and SSH agents", () => {
  const html = read("index.html");
  const mainSource = read("main.js");
  const preloadSource = read("preload.js");
  const rendererSource = read("renderer.js");
  assert.match(html, /id="openNotepadButton"/);
  assert.match(html, /id="notepadText"[\s\S]*?id="notepadTodoList"[\s\S]*?id="notepadSketchCanvas"/);
  assert.match(mainSource, /\.bscode-notes\.md/);
  assert.match(mainSource, /workspace\.type\s*===\s*"ssh"/);
  assert.match(mainSource, /ipcMain\.handle\("workspace:read-notes"/);
  assert.match(mainSource, /ipcMain\.handle\("workspace:write-notes"/);
  assert.match(preloadSource, /readWorkspaceNotes/);
  assert.match(preloadSource, /writeWorkspaceNotes/);
  assert.match(rendererSource, /notepadSketchCanvas\.toDataURL\("image\/png"\)/);
});

test("Home owns startup and immersive modes are unavailable there", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  assert.match(html, /class="home-brand"[\s\S]*?assets\/app-icon\.png/);
  const homeSource = extractFunction(rendererSource, "setHomeView");
  assert.match(homeSource, /setCinematicMode\(false,\s*\{\s*persist:\s*false\s*\}\)/);
  assert.match(homeSource, /setPixelMode\(false,\s*\{\s*persist:\s*false\s*\}\)/);
  assert.match(homeSource, /cinematicModeButton\.disabled\s*=\s*next/);
  assert.match(homeSource, /pixelModeButton\.disabled\s*=\s*next/);
  assert.match(rendererSource, /if\s*\(!workspaces\.length\)\s*setHomeView\(true\)/);
});

test("the restored address bar shows local or SSH workspace context", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  assert.match(html, /class="workspace-address-shell"[\s\S]*?id="workspaceBackButton"[\s\S]*?id="commandCenter"/);
  assert.match(rendererSource, /\[SSH: \$\{workspace\.remote\?\.host \|\| workspace\.name\}\]/);
  assert.match(styles, /\.workspace-address-shell[\s\S]*?grid-template-columns/);
  assert.match(styles, /\.command-center[\s\S]*?display:\s*flex\s*!important/);
});

test("workspace tabs show faces, live ETAs, and a compact plus control", () => {
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  assert.match(rendererSource, /etaGroup\.className\s*=\s*"agent-eta"/);
  assert.match(rendererSource, /agentWorkbenchShowTabEtas/);
  assert.match(rendererSource, /item\.style\.setProperty\("--agent-face",\s*`url\("\$\{agentFaceUrl\(session\)\}"\)`\)/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta > span\.has-agent-face/);
  assert.match(styles, /\.workspace-tab-add[\s\S]*?width:\s*22px\s*!important/);
});

test("agent state, current task, and checklist normalization stay synchronized", () => {
  const rendererSource = read("renderer.js");
  const checklistSource = extractFunction(rendererSource, "normalizedAgentChecklist");
  assert.match(checklistSource, /firstWorking/);
  assert.match(checklistSource, /item\.status\s*===\s*"working"/);
  assert.match(rendererSource, /agent-state-chip/);
  assert.match(rendererSource, /agent-current-task-indicator/);
  assert.match(rendererSource, /metadata\.currentTask/);
});

test("the cinematic mention picker lists models and running agent profiles", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  assert.match(html, /id="cinematicMentionButton"[\s\S]*?aria-label="Mention an agent"/);
  assert.match(html, /id="cinematicMentionMenu"[\s\S]*?role="listbox"/);
  assert.match(rendererSource, /token:\s*"codex"[\s\S]*?token:\s*"claude"[\s\S]*?token:\s*"shell"/);
  assert.match(rendererSource, /cinematic-mention-profile/);
  assert.match(rendererSource, /applyAgentFace\(avatar,\s*choice\.session\)/);
});

test("Cinematic cells are borderless, resizable as one grid, and have scene shuffle", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  assert.match(html, /id="cinematicNextSceneButton"/);
  assert.match(rendererSource, /beginCinematicPaneResize/);
  assert.match(rendererSource, /finishCinematicPaneResize/);
  assert.match(styles, /body\.cinematic-mode \.agent-slot,[\s\S]*?border:\s*0\s*!important/);
  assert.match(styles, /body\.cinematic-mode \.agent-grid[\s\S]*?--cinematic-agent-width/);
});

test("Spotify integration exposes shuffle and optional music-reactive atmosphere", () => {
  const html = read("index.html");
  const mainSource = read("main.js");
  const rendererSource = read("renderer.js");
  assert.match(html, /id="spotifyShuffleButton"/);
  assert.match(html, /id="settingsMusicReactive"/);
  assert.match(html, /id="settingsCinematicEffectStrength"/);
  assert.match(mainSource, /shuffle:\s*"shuffling = !spotify\.shuffling\(\)"/);
  assert.match(rendererSource, /agentWorkbenchMusicReactive/);
  assert.match(rendererSource, /--cinematic-beat/);
});

test("storage usage is reported for local and remote workspaces", () => {
  const html = read("index.html");
  const mainSource = read("main.js");
  const rendererSource = read("renderer.js");
  assert.match(html, /id="storageUsageText"/);
  assert.match(mainSource, /fsp\.statfs/);
  assert.match(mainSource, /os\.statvfs/);
  assert.match(mainSource, /storageUsedBytes/);
  assert.match(rendererSource, /storageUsageText\.textContent/);
});

test("opened output files remain available in the Files panel", () => {
  const rendererSource = read("renderer.js");
  const styles = read("styles.css");
  assert.match(rendererSource, /openedOutputPaths/);
  assert.match(rendererSource, /className\s*=\s*"opened-output-files"/);
  assert.match(rendererSource, /previewWorkspaceFile\(entry\.workspaceId,\s*entry\.relativePath\)/);
  assert.match(styles, /\.opened-output-files/);
});

test("the macOS titlebar, calendar, battery, and agent-face mode button are wired", () => {
  const html = read("index.html");
  const mainSource = read("main.js");
  const rendererSource = read("renderer.js");
  assert.match(mainSource, /trafficLightPosition:\s*\{\s*x:\s*14,\s*y:\s*16\s*\}/);
  assert.match(html, /id="calendarPopover"/);
  assert.match(html, /id="titlebarBatteryCharge"/);
  assert.match(rendererSource, /titlebarBatteryCharge\.hidden\s*=\s*!charging/);
  assert.match(html, /class="pixel-mode-agent-face"/);
});

test("workspace handoff is a functional command-palette action", () => {
  const rendererSource = read("renderer.js");
  const preloadSource = read("preload.js");
  const source = extractFunction(rendererSource, "copyWorkspaceHandoff");
  assert.match(source, /checklist/);
  assert.match(source, /relevantFiles/);
  assert.match(source, /api\.writeClipboardText/);
  assert.match(rendererSource, /Copy workspace handoff/);
  assert.match(preloadSource, /writeClipboardText/);
});

test("light appearance keeps agent names and the workspace surface readable", () => {
  const styles = read("styles.css");
  assert.match(styles, /html\[data-appearance-mode="light"\] \.agent-name-input,[\s\S]*?color:\s*#182232\s*!important/);
  assert.match(styles, /html\[data-appearance-mode="light"\] \.agent-stage,[\s\S]*?background:\s*#eef2f7/);
});

test("the release metadata and application icon are complete", () => {
  const packageJson = JSON.parse(read("package.json"));
  assert.equal(packageJson.version, "0.2.0");
  assert.equal(packageJson.productName, "BsCode");
  assert.equal(packageJson.scripts.test, "node tests/run.mjs");
  assert.ok(fs.statSync(path.join(projectRoot, "assets/app-icon.png")).size > 100_000);
  assert.ok(fs.statSync(path.join(projectRoot, "assets/AppIcon.icns")).size > 100_000);
});

let failures = 0;
for (const { name, run } of tests) {
  try {
    await run();
    console.log(`✓ ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`✗ ${name}`);
    console.error(error?.stack || error);
  }
}

console.log(`\n${tests.length - failures}/${tests.length} regression checks passed`);
if (failures) process.exitCode = 1;
