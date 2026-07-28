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
  assert.ok(opaquePalettes >= catalog.length * 0.8, "Most theme backgrounds should be auditable opaque colors");
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
    assert.match(
      rendererSource,
      new RegExp(`${escapeRegExp(variable)}\\.addEventListener\\("(?:input|change)"`),
      `#${id} must persist or apply changes`
    );
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
  assert.match(refreshSource, /setPixelVisibleSessionsForFloor\(floor\)/);
  assert.match(refreshSource, /requestPixelFloorPreview\(floor\)/);
  const setPreviewSource = extractFunction(rendererSource, "setPixelFloorPreview");
  assert.match(setPreviewSource, /localStorage\.setItem\(pixelFloorPreviewKey\(normalizedFloor\),\s*image\)/);
  assert.match(setPreviewSource, /preview\.src\s*=\s*image/);

  assert.match(rendererSource, /className\s*=\s*"pixel-roster-agent"/);
  assert.match(rendererSource, /class="pixel-roster-avatar"/);
  assert.match(rendererSource, /characters\/char_\$\{session\.slotIndex\s*%\s*6\}\.png/);
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

  const pets = assetIndex.pets || [];
  for (const [id, name] of [
    ["claudio", "Claudio"],
    ["gitcat", "Gitcat"],
    ["dog", "Scout"],
    ["lizard", "Pixel"]
  ]) {
    assert.ok(pets.some((pet) => pet.id === id && pet.name === name), `Missing ${name} pet`);
    const petPath = path.join(projectRoot, `pixel-agents-mode/assets/pets/${id}/pet.png`);
    assert.ok(fs.existsSync(petPath), `Missing ${id} pet sprite`);
    const png = fs.readFileSync(petPath);
    assert.equal(png.subarray(1, 4).toString("ascii"), "PNG", `${id} must be a PNG`);
    assert.equal(png.readUInt32BE(16), 96, `${id} sprite width must match upstream topology`);
    assert.equal(png.readUInt32BE(20), 96, `${id} sprite height must match upstream topology`);
  }
  assert.match(bridgeSource, /const petBaseNames\s*=\s*\["Claudio",\s*"Gitcat",\s*"Scout",\s*"Pixel"\]/);
  assert.match(bridgeSource, /const petVariantNames\s*=\s*\["",\s*" Mint",\s*" Amber",\s*" Violet",\s*" Sky",\s*" Rose"\]/);
  const petTypeSource = extractFunction(bridgeSource, "petTypeForFloor");
  const petFixture = {
    selectedPet: "gitcat",
    petNames: Array.from({ length: 24 }, (_, index) => `Pet ${index}`)
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
  assert.match(browserMockSource, /function tintPetFrames\(frames,\s*tint,\s*strength\)/);
  assert.match(browserMockSource, /const variants\s*=\s*\[/);
  for (const id of ["gitcat", "claudio", "dog", "lizard"]) {
    assert.match(html, new RegExp(`<option\\s+value="${id}"`), `Settings must offer ${id}`);
  }
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
  const platformPackager = read("scripts/package-platform.mjs");
  assert.match(platformPackager, /new Set\(\["win32",\s*"linux"\]\)/);
  assert.match(platformPackager, /process\.platform\s*!==\s*targetPlatform/);
  assert.match(platformPackager, /process\.env\.npm_execpath/);
  assert.match(platformPackager, /process\.env\.ComSpec\s*\|\|\s*"cmd\.exe"/);
});

test("workspace tabs keep every agent estimate visible", () => {
  const styles = read("styles.css");
  const rendererSource = read("renderer.js");
  assert.match(rendererSource, /tab\.dataset\.agentCount\s*=\s*String\(count\)/);
  assert.match(rendererSource, /etaGroup\.dataset\.agentCount\s*=\s*String\(count\)/);
  assert.match(rendererSource, /tabTail\.append\(renderedTabs\.at\(-1\),\s*addTabButton\)/);
  assert.match(rendererSource, /activeTab\?\.scrollIntoView\(\{\s*block:\s*"nearest",\s*inline:\s*"nearest"\s*\}\)/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta\s*\{[\s\S]*?display:\s*grid;/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta\s*\{[\s\S]*?flex:\s*0 0 auto;/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta\s*\{[\s\S]*?overflow:\s*visible;/);
  assert.match(styles, /\.workspace-editor-tab \.agent-eta\[data-agent-count="4"\]\s*\{[\s\S]*?repeat\(4,\s*40px\)/);
  assert.match(styles, /\.workspace-editor-tab\[data-agent-count="4"\]\s*\{[\s\S]*?min-width:\s*244px;/);
  assert.match(styles, /\.workspace-editor-tab \.workspace-editor-label\s*\{[\s\S]*?text-overflow:\s*ellipsis;/);
});

test("remote status control opens SSH with the active connection", () => {
  const html = read("index.html");
  const rendererSource = read("renderer.js");
  assert.match(html, /id="remoteStatusButton"[\s\S]*?aria-label="Open remote workspace"/);
  assert.match(rendererSource, /remoteStatusButton\.classList\.toggle\("connected",\s*connectedRemotely\)/);
  assert.match(rendererSource, /openSshDialog\(workspace\?\.type\s*===\s*"ssh"\s*\?\s*workspace\.remote\s*:\s*null,\s*false\)/);
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
