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

// These refinements are deliberately kept in the importer instead of patched
// into the generated catalog. Packaging regenerates the Openleaf catalog, so
// the audited contrast and softened light surfaces must be reproducible.
const AUDITED_PALETTE_OVERRIDES = {
  "light-plus": {
    background: "linear-gradient(135deg, #e5ebf2, #edf1f5 62%, #e3e9f0)",
    bg: "#e9edf3",
    panel: "rgba(243, 246, 249, 0.96)",
    elevated: "rgba(249, 250, 252, 0.98)",
    hover: "rgba(224, 231, 239, 0.98)",
    active: "rgba(211, 221, 232, 0.98)",
    border: "rgba(72, 82, 96, 0.38)",
    muted: "#596575",
    accent: "#0067ad",
    terminal: "#f4f6f8",
    gradientA: "#e5ebf2",
    gradientB: "#edf1f5"
  },
  "quiet-light": {
    background: "linear-gradient(135deg, #edf1f5, #f3f5f7 64%, #e8edf2)",
    bg: "#eef1f4",
    panel: "rgba(245, 247, 249, 0.96)",
    elevated: "rgba(250, 251, 252, 0.98)",
    hover: "rgba(225, 231, 237, 0.98)",
    active: "rgba(213, 221, 229, 0.98)",
    border: "rgba(75, 85, 99, 0.37)",
    muted: "#5f6977",
    accent: "#4c668d",
    terminal: "#f5f6f8",
    gradientA: "#edf1f5",
    gradientB: "#f3f5f7"
  },
  "solarized-light": {
    panel: "rgba(247, 240, 220, 0.96)",
    elevated: "rgba(255, 249, 232, 0.98)",
    hover: "rgba(233, 225, 204, 0.98)",
    active: "rgba(221, 211, 184, 0.98)",
    border: "rgba(88, 110, 117, 0.4)",
    muted: "#586e75",
    accent: "#126fa6",
    terminal: "#f9f2df"
  },
  "catppuccin-latte": {
    background: "linear-gradient(135deg, #e9ebf1, #f0f1f5 70%, #e2e5ec)",
    bg: "#e9ebf1",
    panel: "rgba(241, 242, 246, 0.96)",
    elevated: "rgba(248, 248, 251, 0.98)",
    hover: "rgba(220, 224, 233, 0.98)",
    active: "rgba(205, 211, 223, 0.98)",
    border: "rgba(76, 79, 105, 0.4)",
    muted: "#626579",
    accent: "#1658d1",
    terminal: "#f1f2f6",
    gradientA: "#e9ebf1",
    gradientB: "#f0f1f5"
  },
  "min-light": {
    background: "linear-gradient(135deg, #eef1f4, #f5f6f8 72%, #e6ebf0)",
    bg: "#eef1f4",
    panel: "rgba(246, 247, 249, 0.96)",
    elevated: "rgba(251, 251, 252, 0.98)",
    hover: "rgba(225, 230, 235, 0.98)",
    active: "rgba(212, 219, 226, 0.98)",
    border: "rgba(74, 85, 104, 0.38)",
    muted: "#5d6878",
    accent: "#0067ad",
    terminal: "#f6f7f8",
    gradientA: "#eef1f4",
    gradientB: "#f5f6f8"
  },
  "honey-light": {
    background: "linear-gradient(135deg, #f6ecd7, #fbf2e2 72%, #ead7b6)",
    bg: "#f6ecd7",
    panel: "rgba(251, 243, 228, 0.96)",
    elevated: "rgba(255, 249, 237, 0.98)",
    hover: "rgba(234, 220, 194, 0.98)",
    active: "rgba(222, 206, 176, 0.98)",
    border: "rgba(122, 82, 27, 0.45)",
    muted: "#6c593f",
    accent: "#a75400",
    terminal: "#fbf4e7",
    gradientA: "#f6ecd7",
    gradientB: "#fbf2e2"
  },
  "marigold-paper": {
    background: "linear-gradient(135deg, #f5e6b8, #f9edc8 68%, #e7c782)",
    bg: "#f5e6b8",
    panel: "rgba(251, 239, 202, 0.96)",
    elevated: "rgba(255, 246, 216, 0.98)",
    hover: "rgba(234, 215, 157, 0.98)",
    active: "rgba(222, 201, 133, 0.98)",
    border: "rgba(126, 73, 14, 0.5)",
    muted: "#6f4f20",
    accent: "#8d5200",
    terminal: "#fbf3d9",
    gradientA: "#f5e6b8",
    gradientB: "#f9edc8"
  },
  "butterscotch-light": {
    background: "linear-gradient(135deg, #f6eadb, #fbf1e4 70%, #e6c59b)",
    bg: "#f6eadb",
    panel: "rgba(251, 242, 231, 0.96)",
    elevated: "rgba(255, 248, 239, 0.98)",
    hover: "rgba(234, 217, 196, 0.98)",
    active: "rgba(221, 201, 175, 0.98)",
    border: "rgba(112, 67, 20, 0.48)",
    muted: "#684c31",
    accent: "#9b4b08",
    terminal: "#fbf4eb",
    gradientA: "#f6eadb",
    gradientB: "#fbf1e4"
  },
  "saffron-paper": {
    background: "linear-gradient(135deg, #f6edc8, #faf3d4 66%, #e8cf75)",
    bg: "#f6edc8",
    panel: "rgba(251, 244, 216, 0.96)",
    elevated: "rgba(255, 249, 230, 0.98)",
    hover: "rgba(234, 220, 169, 0.98)",
    active: "rgba(221, 204, 141, 0.98)",
    border: "rgba(105, 71, 20, 0.48)",
    muted: "#624914",
    accent: "#825b00",
    terminal: "#fbf6e4",
    gradientA: "#f6edc8",
    gradientB: "#faf3d4"
  },
  "pastel-amber-hc": { accent: "#a95300" },
  "glass-light": { gradientA: "#e7effa", gradientB: "#c9d6e8" },
  "glass-dark": { gradientA: "#111827", gradientB: "#253044" },
  "glass-mocha": { gradientA: "#1e1e2e", gradientB: "#45475a" },
  "glass-ocean": { gradientA: "#062433", gradientB: "#0e5263" },
  "glass-violet": { gradientA: "#21163b", gradientB: "#5b3f80" },
  "glass-forest": { gradientA: "#09291f", gradientB: "#185f47" },
  "glass-amber": { gradientA: "#30210a", gradientB: "#74500d" },
  "prism-light": {
    background: "radial-gradient(circle at 14% 12%, rgba(103, 48, 197, 0.16), transparent 30%), radial-gradient(circle at 84% 8%, rgba(14, 116, 144, 0.14), transparent 28%), linear-gradient(135deg, #edf2f8, #e4ecf7 58%, #eee6f5)",
    bg: "#e8edf5",
    panel: "rgba(242, 245, 249, 0.95)",
    elevated: "rgba(249, 249, 252, 0.98)",
    hover: "rgba(224, 224, 239, 0.98)",
    active: "rgba(211, 209, 231, 0.98)",
    border: "rgba(76, 64, 128, 0.43)",
    muted: "#566176",
    accent: "#6730c5",
    terminal: "#f2f4f8",
    gradientA: "#edf2f8",
    gradientB: "#eee6f5"
  },
  "frosted-candy": {
    background: "radial-gradient(circle at 18% 16%, rgba(169, 37, 104, 0.15), transparent 30%), radial-gradient(circle at 90% 18%, rgba(13, 148, 136, 0.14), transparent 30%), linear-gradient(135deg, #f5edf2, #e8f4f0 54%, #e9edf6)",
    bg: "#edf2f5",
    panel: "rgba(245, 247, 249, 0.95)",
    elevated: "rgba(251, 249, 251, 0.98)",
    hover: "rgba(237, 218, 230, 0.98)",
    active: "rgba(228, 202, 219, 0.98)",
    border: "rgba(128, 67, 111, 0.43)",
    muted: "#59687a",
    accent: "#a92568",
    terminal: "#f5f4f6",
    gradientA: "#f5edf2",
    gradientB: "#e8f4f0"
  },
  monokai: { accent: "#ff4f8b" },
  "solarized-dark": { accent: "#49a9e8" },
  "one-dark-pro": { muted: "#9299a6" },
  "kimbie-dark": { muted: "#a77d4f", accent: "#ed5672" }
};

const PIXELIZED_THEMES = [
  {
    id: "pixel-night",
    name: "Pixel Night",
    category: "Pixelized",
    palette: {
      background: "linear-gradient(135deg, #111722, #17202d 62%, #10141e)",
      bg: "#141a24",
      panel: "#101620",
      elevated: "#202a38",
      hover: "#283649",
      active: "#34475d",
      border: "#4d6075",
      text: "#e8f0ea",
      muted: "#a4b5ad",
      accent: "#70d7b0",
      status: "#3a9479",
      terminal: "#090e15",
      gradientA: "#111722",
      gradientB: "#223348"
    }
  },
  {
    id: "pixel-plum",
    name: "Pixel Plum",
    category: "Pixelized",
    palette: {
      background: "linear-gradient(135deg, #201728, #30213a 60%, #15131e)",
      bg: "#211928",
      panel: "#18131f",
      elevated: "#342640",
      hover: "#443252",
      active: "#584069",
      border: "#705780",
      text: "#f6ecf8",
      muted: "#c9b5cf",
      accent: "#e59bcf",
      status: "#9a64b0",
      terminal: "#100c14",
      gradientA: "#201728",
      gradientB: "#493153"
    }
  },
  {
    id: "pixel-studio",
    name: "Pixel Studio",
    category: "Pixelized",
    palette: {
      background: "linear-gradient(135deg, #d9e2d2, #cbd9cf 58%, #e4ddc8)",
      bg: "#d6dfd3",
      panel: "#c7d3ca",
      elevated: "#e8eee7",
      hover: "#b8cac0",
      active: "#a7beb3",
      border: "#61796f",
      text: "#1c2a26",
      muted: "#465d55",
      accent: "#1e725e",
      status: "#2b6d60",
      terminal: "#17201d",
      gradientA: "#d9e2d2",
      gradientB: "#e4ddc8"
    }
  }
];

function finalizeCatalog(catalog) {
  const next = catalog.map((theme) => ({
    ...theme,
    palette: {
      ...theme.palette,
      ...(AUDITED_PALETTE_OVERRIDES[theme.id] || {})
    }
  }));
  next.push(...PIXELIZED_THEMES);
  for (const theme of next) {
    const palette = theme.palette;
    if (palette.hover === palette.elevated) {
      palette.hover = `color-mix(in srgb, ${palette.elevated} 88%, ${palette.accent})`;
    }
    if (palette.active === palette.elevated || palette.active === palette.hover) {
      palette.active = `color-mix(in srgb, ${palette.elevated} 76%, ${palette.accent})`;
    }
  }
  return next;
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
  const catalog = finalizeCatalog(themeGroups(indexSource)
    .filter((entry) => presets[entry.id])
    .map((entry) => mapPreset(entry, presets[entry.id])));
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
