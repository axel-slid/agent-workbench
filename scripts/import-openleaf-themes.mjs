import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";

function themeCategoryLabel(label) {
  return String(label || "")
    .replace("Light High Contrast", "Light Contrast")
    .replace("Dark High Contrast", "Dark Contrast");
}

function extractThemeSource(appSource) {
  const start = appSource.indexOf("const THEME_PRESETS =");
  const end = appSource.indexOf("const DEFAULT_FILE_WIDTH", start);
  if (start < 0 || end < 0) throw new Error("Could not locate Openleaf theme presets.");
  return `${appSource.slice(start, end)}\nglobalThis.__openleafThemes = THEME_PRESETS;`;
}

function themeGroups(indexSource) {
  const selectStart = indexSource.indexOf('id="settingsThemePreset"');
  const selectEnd = indexSource.indexOf("</select>", selectStart);
  if (selectStart < 0 || selectEnd < 0) throw new Error("Could not locate Openleaf theme categories.");
  const selectSource = indexSource.slice(selectStart, selectEnd);
  const groups = [];
  const groupPattern = /<optgroup label="([^"]+)">([\s\S]*?)<\/optgroup>/g;
  let groupMatch;
  while ((groupMatch = groupPattern.exec(selectSource))) {
    const category = themeCategoryLabel(groupMatch[1]);
    const options = [];
    const optionPattern = /<option value="([^"]+)">([^<]+)<\/option>/g;
    let optionMatch;
    while ((optionMatch = optionPattern.exec(groupMatch[2]))) {
      options.push({ id: optionMatch[1], name: optionMatch[2].trim(), category });
    }
    groups.push(...options);
  }
  return groups;
}

function backgroundStops(background = "") {
  const colors = String(background).match(/#[0-9a-f]{6}/gi) || [];
  return [colors[0] || "", colors[1] || colors[0] || ""];
}

function mapPreset(entry, preset) {
  const colors = preset.colors || {};
  const [gradientA, gradientB] = backgroundStops(preset.background);
  return {
    ...entry,
    palette: {
      background: preset.background || colors["--bg"] || "#1e1e1e",
      bg: colors["--bg"] || colors["--cm-bg"] || "#1e1e1e",
      panel: colors["--panel"] || colors["--glass"] || colors["--bg"] || "#181818",
      elevated: colors["--glass-strong"] || colors["--glass"] || colors["--panel"] || "#252526",
      hover: colors["--glass-strong"] || colors["--glass"] || colors["--panel"] || "#2a2d2e",
      active: colors["--glass-strong"] || colors["--glass"] || colors["--panel"] || "#37373d",
      border: colors["--border-strong"] || colors["--border"] || "#3c3c3c",
      text: colors["--text"] || colors["--cm-text"] || "#cccccc",
      muted: colors["--muted"] || "#969696",
      accent: preset.accent || colors["--blue"] || "#3794ff",
      status: colors["--blue-dark"] || colors["--blue"] || preset.accent || "#007acc",
      terminal: colors["--cm-bg"] || colors["--bg"] || "#1e1e1e",
      gradientA,
      gradientB
    }
  };
}

export async function buildOpenleafThemeCatalog(appRoot) {
  const openleafRoot = process.env.OPENLEAF_ROOT || path.join(
    os.homedir(),
    "Downloads",
    "personal_projects",
    "coding_projects",
    "openleaf"
  );
  const appPath = path.join(openleafRoot, "app.js");
  const indexPath = path.join(openleafRoot, "index.html");
  const outputPath = path.join(appRoot, "assets", "openleaf-themes.js");
  if (!fs.existsSync(appPath) || !fs.existsSync(indexPath)) {
    if (!fs.existsSync(outputPath)) throw new Error(`Openleaf source was not found at ${openleafRoot}.`);
    return;
  }

  const [appSource, indexSource] = await Promise.all([
    fsp.readFile(appPath, "utf8"),
    fsp.readFile(indexPath, "utf8")
  ]);
  const context = {};
  vm.runInNewContext(extractThemeSource(appSource), context, { timeout: 1000 });
  const presets = context.__openleafThemes || {};
  const catalog = themeGroups(indexSource)
    .filter((entry) => presets[entry.id])
    .map((entry) => mapPreset(entry, presets[entry.id]));
  const output = `window.OPENLEAF_THEME_CATALOG = ${JSON.stringify(catalog, null, 2)};\n`;
  await fsp.writeFile(outputPath, output, "utf8");
  console.log(`Imported ${catalog.length} Openleaf themes`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const appRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  buildOpenleafThemeCatalog(appRoot).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
