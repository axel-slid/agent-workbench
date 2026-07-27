const api = window.agentWorkbench;

const commandPaletteBackdrop = document.getElementById("commandPaletteBackdrop");
const commandPaletteInput = document.getElementById("commandPaletteInput");
const commandPaletteResults = document.getElementById("commandPaletteResults");
const commandCenter = document.getElementById("commandCenter");
const workspaceList = document.getElementById("workspaceList");
const addWorkspaceButton = document.getElementById("addWorkspaceButton");
const workspaceAddMenu = document.getElementById("workspaceAddMenu");
const addLocalWorkspaceOption = document.getElementById("addLocalWorkspaceOption");
const addSshWorkspaceOption = document.getElementById("addSshWorkspaceOption");
const closeWorkspacePickerButton = document.getElementById("closeWorkspacePickerButton");
const workspaceSourceStep = document.getElementById("workspaceSourceStep");
const workspaceLayoutStep = document.getElementById("workspaceLayoutStep");
const workspaceAgentsStep = document.getElementById("workspaceAgentsStep");
const workspaceStepIndicators = Array.from(document.querySelectorAll("[data-workspace-step-indicator]"));
const workspaceSetupFolderName = document.getElementById("workspaceSetupFolderName");
const workspaceSetupFolderPath = document.getElementById("workspaceSetupFolderPath");
const workspaceLayoutSummary = document.getElementById("workspaceLayoutSummary");
const workspaceLayoutOptions = Array.from(document.querySelectorAll("[data-layout-count]"));
const workspaceSetupBackButton = document.getElementById("workspaceSetupBackButton");
const workspaceSetupNextButton = document.getElementById("workspaceSetupNextButton");
const workspaceAgentsBackButton = document.getElementById("workspaceAgentsBackButton");
const workspaceSetupFinishButton = document.getElementById("workspaceSetupFinishButton");
const workspaceAgentPreview = document.getElementById("workspaceAgentPreview");
const activityButtons = Array.from(document.querySelectorAll("[data-activity]"));
const sidebarViews = Array.from(document.querySelectorAll("[data-sidebar-view]"));
const agentSidebarList = document.getElementById("agentSidebarList");
const artifactSidebarList = document.getElementById("artifactSidebarList");
const activeWorkspaceName = document.getElementById("activeWorkspaceName");
const workspaceStatusDot = document.getElementById("workspaceStatusDot");
const fileTree = document.getElementById("fileTree");
const fileEmpty = document.getElementById("fileEmpty");
const collapseFolderTreeButton = document.getElementById("collapseFolderTreeButton");
const newFileButton = document.getElementById("newFileButton");
const newFolderButton = document.getElementById("newFolderButton");
const agentGrid = document.getElementById("agentGrid");
const newCodexButton = document.getElementById("newCodexButton");
const newClaudeButton = document.getElementById("newClaudeButton");
const openCodeButton = document.getElementById("openCodeButton");
const pixelModeButton = document.getElementById("pixelModeButton");
const pixelModeView = document.getElementById("pixelModeView");
const pixelModeFrame = document.getElementById("pixelModeFrame");
const pixelAgentRosterCount = document.getElementById("pixelAgentRosterCount");
const pixelAgentRosterList = document.getElementById("pixelAgentRosterList");
const artifactList = document.getElementById("artifactList");
const artifactPreview = document.getElementById("artifactPreview");
const outputViewer = document.getElementById("outputViewer");
const outputViewerTitle = document.getElementById("outputViewerTitle");
const outputViewerContent = document.getElementById("outputViewerContent");
const closeOutputViewerButton = document.getElementById("closeOutputViewerButton");
const refreshArtifactsButton = document.getElementById("refreshArtifactsButton");
const toggleOutputButton = document.getElementById("toggleOutputButton");
const toggleArtifactListButton = document.getElementById("toggleArtifactListButton");
const closeOutputPanelButton = document.getElementById("closeOutputPanelButton");
const codexUsageText = document.getElementById("codexUsageText");
const codexUsageMeter = document.getElementById("codexUsageMeter");
const footerStatus = document.getElementById("footerStatus");
const toast = document.getElementById("toast");
const fileResizeHandle = document.getElementById("fileResizeHandle");
const artifactResizeHandle = document.getElementById("artifactResizeHandle");
const workspaceEditorTabs = document.getElementById("workspaceEditorTabs");
const toggleFilesButton = document.getElementById("toggleFilesButton");
const openSettingsButton = document.getElementById("openSettingsButton");
const notificationButton = document.getElementById("notificationButton");
const notificationBadge = document.getElementById("notificationBadge");
const titlebarTime = document.getElementById("titlebarTime");
const titlebarBattery = document.getElementById("titlebarBattery");
const titlebarBatteryFill = document.getElementById("titlebarBatteryFill");
const titlebarBatteryText = document.getElementById("titlebarBatteryText");
const settingsOverlay = document.getElementById("settingsOverlay");
const closeSettingsButton = document.getElementById("closeSettingsButton");
const settingsTitle = document.getElementById("settingsTitle");
const settingsSearchInput = document.getElementById("settingsSearchInput");
const settingsWorkspacePath = document.getElementById("settingsWorkspacePath");
const settingsCodexUsage = document.getElementById("settingsCodexUsage");
const settingsDefaultLayout = document.getElementById("settingsDefaultLayout");
const settingsRememberWidths = document.getElementById("settingsRememberWidths");
const settingsDefaultAgent = document.getElementById("settingsDefaultAgent");
const settingsAutoPreview = document.getElementById("settingsAutoPreview");
const settingsShowTldr = document.getElementById("settingsShowTldr");
const settingsRecentFilesLimit = document.getElementById("settingsRecentFilesLimit");
const settingsTerminalFontSize = document.getElementById("settingsTerminalFontSize");
const settingsTerminalFontSizeValue = document.getElementById("settingsTerminalFontSizeValue");
const settingsTerminalScrollback = document.getElementById("settingsTerminalScrollback");
const settingsTerminalCursorBlink = document.getElementById("settingsTerminalCursorBlink");
const settingsAutoOpenOutput = document.getElementById("settingsAutoOpenOutput");
const settingsCompactOutputs = document.getElementById("settingsCompactOutputs");
const settingsMetricsInterval = document.getElementById("settingsMetricsInterval");
const settingsReduceMotion = document.getElementById("settingsReduceMotion");
const settingsNavItems = Array.from(document.querySelectorAll("[data-settings-target]"));
const settingsPages = Array.from(document.querySelectorAll("[data-settings-page]"));
const appearanceCategories = Array.from(document.querySelectorAll(".appearance-category"));
let themeOptions = Array.from(document.querySelectorAll(".theme-option"));
const pdfOptions = Array.from(document.querySelectorAll(".pdf-option"));
const sshModalBackdrop = document.getElementById("sshModalBackdrop");
const workspaceRemoveBackdrop = document.getElementById("workspaceRemoveBackdrop");
const closeWorkspaceRemoveButton = document.getElementById("closeWorkspaceRemoveButton");
const cancelWorkspaceRemoveButton = document.getElementById("cancelWorkspaceRemoveButton");
const confirmWorkspaceRemoveButton = document.getElementById("confirmWorkspaceRemoveButton");
const workspaceRemoveName = document.getElementById("workspaceRemoveName");
const workspaceRemoveDetail = document.getElementById("workspaceRemoveDetail");
const closeSshDialogButton = document.getElementById("closeSshDialogButton");
const cancelSshButton = document.getElementById("cancelSshButton");
const connectSshButton = document.getElementById("connectSshButton");
const sshKnownHostSelect = document.getElementById("sshKnownHostSelect");
const sshUserInput = document.getElementById("sshUserInput");
const sshHostInput = document.getElementById("sshHostInput");
const sshPathInput = document.getElementById("sshPathInput");
const sshStatus = document.getElementById("sshStatus");
const sshAuthTerminalShell = document.getElementById("sshAuthTerminalShell");
const sshAuthTerminal = document.getElementById("sshAuthTerminal");
const metricSource = document.getElementById("metricSource");
const cpuUsageText = document.getElementById("cpuUsageText");
const memoryUsageText = document.getElementById("memoryUsageText");
const gpuMetrics = document.getElementById("gpuMetrics");
const spotifyNowPlaying = document.getElementById("spotifyNowPlaying");
const spotifyPreviousButton = document.getElementById("spotifyPreviousButton");
const spotifyPlayPauseButton = document.getElementById("spotifyPlayPauseButton");
const spotifyNextButton = document.getElementById("spotifyNextButton");
const spotifyTrackName = document.getElementById("spotifyTrackName");
const spotifyTrackDetail = document.getElementById("spotifyTrackDetail");

let workspaces = [];
let activeWorkspaceId = null;
let fileNodes = [];
const expandedFilePaths = new Set();
let artifacts = [];
let activeArtifactPath = "";
let activeOutputArtifact = null;
let selectedFilePath = "";
let selectedFileKind = "directory";
let refreshTimer = null;
let toastTimer = null;
let currentSidebarView = "explorer";
let pendingWorkspaceSetup = null;
let pendingWorkspaceLayout = 4;
let pendingWorkspaceRemoval = null;
let sshOpenedFromWorkspaceSetup = false;
let sshAuthSession = null;
let systemMetricsTimer = null;
let spotifyTimer = null;
let titlebarClockTimer = null;
let powerStatusTimer = null;
let etaTimer = null;
let spotifyRefreshBusy = false;
let pixelModeEnabled = false;
let pixelFrameReady = false;
let unreadAgentNotifications = 0;
const pixelKnownAgentIds = new Set();
const pendingSshAuthExits = new Map();
const pendingSshAuthData = new Map();
let commandPaletteSelection = 0;
let visiblePaletteCommands = [];

const slots = Array.from({ length: 4 }, () => null);
const sessions = new Map();
const workspaceEtaNodes = new Map();
const pendingTerminalData = new Map();
const MATERIAL_ICON_BASE = "node_modules/material-icon-theme/icons";
const FILE_ICON_NAMES = new Map([
  ["readme.md", "readme.svg"],
  ["license", "license.svg"],
  ["dockerfile", "docker.svg"],
  ["makefile", "makefile.svg"]
]);
const FILE_ICON_EXTENSIONS = new Map([
  [".tex", "tex.svg"], [".ltx", "tex.svg"], [".cls", "latex-class.clone.svg"],
  [".sty", "latex-package.clone.svg"], [".bst", "bibtex-style.svg"], [".bib", "bibliography.svg"],
  [".pdf", "pdf.svg"], [".ppt", "powerpoint.svg"], [".pptx", "powerpoint.svg"],
  [".md", "markdown.svg"], [".txt", "document.svg"], [".log", "log.svg"],
  [".yaml", "yaml.svg"], [".yml", "yaml.svg"], [".json", "json.svg"], [".jsonl", "json.svg"],
  [".js", "javascript.svg"], [".mjs", "javascript.svg"], [".cjs", "javascript.svg"],
  [".jsx", "react.svg"], [".ts", "typescript.svg"], [".tsx", "react_ts.svg"],
  [".css", "css.svg"], [".scss", "sass.svg"], [".html", "html.svg"], [".xml", "xml.svg"],
  [".py", "python.svg"], [".ipynb", "jupyter.svg"], [".r", "r.svg"], [".rs", "rust.svg"],
  [".go", "go.svg"], [".java", "java.svg"], [".c", "c.svg"], [".cc", "cpp.svg"],
  [".cpp", "cpp.svg"], [".h", "c.svg"], [".hpp", "cpp.svg"],
  [".rb", "ruby.svg"], [".php", "php.svg"], [".lua", "lua.svg"], [".toml", "toml.svg"],
  [".ini", "settings.svg"], [".cfg", "settings.svg"], [".sql", "database.svg"],
  [".sh", "console.svg"], [".bash", "console.svg"], [".zsh", "console.svg"], [".fish", "console.svg"],
  [".csv", "table.svg"], [".tsv", "table.svg"], [".zip", "zip.svg"], [".tar", "zip.svg"],
  [".tgz", "zip.svg"], [".gz", "zip.svg"], [".png", "image.svg"], [".jpg", "image.svg"],
  [".jpeg", "image.svg"], [".gif", "image.svg"], [".webp", "image.svg"], [".svg", "svg.svg"]
]);
const FOLDER_ICON_NAMES = new Map([
  ["figures", "folder-images.svg"], ["images", "folder-images.svg"], ["img", "folder-images.svg"],
  ["output", "folder-dist.svg"], ["outputs", "folder-dist.svg"], ["dist", "folder-dist.svg"],
  ["templates", "folder-template.svg"], ["docs", "folder-docs.svg"], ["src", "folder-src.svg"],
  ["test", "folder-test.svg"], ["tests", "folder-test.svg"], ["scripts", "folder-scripts.svg"]
]);
const CODE_KEYWORDS = new Map([
  [".py", "and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield match case"],
  [".java", "abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while true false null record sealed permits"],
  [".js", "async await break case catch class const continue debugger default delete do else export extends false finally for from function get if import in instanceof let new null of return set static super switch this throw true try typeof undefined var void while with yield"],
  [".ts", "abstract any as asserts async await boolean break case catch class const constructor continue declare default delete do else enum export extends false finally for from function get if implements import in infer instanceof interface is keyof let module namespace never new null number object of private protected public readonly require return set static string super switch symbol this throw true try type typeof undefined unique unknown var void while with yield"],
  [".c", "auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while"],
  [".cpp", "alignas alignof and asm auto bool break case catch char class const constexpr continue decltype default delete do double else enum explicit export extern false float for friend goto if inline int long mutable namespace new noexcept not nullptr operator private protected public register reinterpret_cast requires return short signed sizeof static struct switch template this throw true try typedef typeid typename union unsigned using virtual void volatile while"],
  [".rs", "as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while"],
  [".go", "break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var"],
  [".rb", "alias and begin break case class def defined do else elsif end ensure false for if in module next nil not or redo rescue retry return self super then true undef unless until when while yield"],
  [".php", "abstract and array as break callable case catch class clone const continue declare default do echo else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval exit extends final finally fn for foreach function global goto if implements include include_once instanceof insteadof interface isset list match namespace new null or print private protected public readonly require require_once return static switch throw trait true try unset use var while xor yield"],
  [".sh", "case do done elif else esac export fi for function if in local readonly return select then time trap until while"],
  [".sql", "add all alter and any as asc between by case check column constraint create database default delete desc distinct drop else end exists foreign from full group having in index inner insert into is join key left like limit not null on or order outer primary references right row select set table then union unique update values view when where with"],
  [".json", "true false null"],
  [".html", "html head body title meta link script style main header footer section article nav div span p a img svg canvas iframe form input button label table thead tbody tr th td ul ol li"],
  [".css", "inherit initial unset revert auto none block inline flex grid relative absolute fixed sticky hidden visible solid transparent currentColor"],
  [".yaml", "true false null yes no on off"],
  [".toml", "true false"]
]);
for (const extension of [".jsx", ".mjs", ".cjs"]) CODE_KEYWORDS.set(extension, CODE_KEYWORDS.get(".js"));
for (const extension of [".tsx"]) CODE_KEYWORDS.set(extension, CODE_KEYWORDS.get(".ts"));
for (const extension of [".cc", ".hpp", ".h"]) CODE_KEYWORDS.set(extension, CODE_KEYWORDS.get(".cpp"));
for (const extension of [".bash", ".zsh", ".fish"]) CODE_KEYWORDS.set(extension, CODE_KEYWORDS.get(".sh"));
for (const extension of [".htm", ".xml", ".svg"]) CODE_KEYWORDS.set(extension, CODE_KEYWORDS.get(".html"));
for (const extension of [".scss"]) CODE_KEYWORDS.set(extension, CODE_KEYWORDS.get(".css"));
CODE_KEYWORDS.set(".yml", CODE_KEYWORDS.get(".yaml"));
const THEME_PALETTES = {
  "dark-plus": { bg: "#1e1e1e", panel: "#181818", elevated: "#252526", hover: "#2a2d2e", active: "#37373d", border: "#2b2b2b", text: "#cccccc", muted: "#969696", accent: "#3794ff", status: "#007acc", terminal: "#090b0e" },
  monokai: { bg: "#272822", panel: "#1e1f1c", elevated: "#34352e", hover: "#3a3b34", active: "#49483e", border: "#45463d", text: "#f8f8f2", muted: "#a7a79d", accent: "#f92672", status: "#75715e", terminal: "#1c1d1a" },
  "solarized-dark": { bg: "#002b36", panel: "#00242d", elevated: "#073642", hover: "#0b414e", active: "#164e59", border: "#174955", text: "#eee8d5", muted: "#93a1a1", accent: "#2aa198", status: "#268bd2", terminal: "#001f27" },
  dracula: { bg: "#282a36", panel: "#21222c", elevated: "#343746", hover: "#3c3f50", active: "#44475a", border: "#44475a", text: "#f8f8f2", muted: "#b7b7c2", accent: "#bd93f9", status: "#6272a4", terminal: "#191a21" },
  nord: { bg: "#2e3440", panel: "#272c36", elevated: "#3b4252", hover: "#434c5e", active: "#4c566a", border: "#4c566a", text: "#eceff4", muted: "#d8dee9", accent: "#88c0d0", status: "#5e81ac", terminal: "#242933" },
  "gruvbox-dark": { bg: "#282828", panel: "#1d2021", elevated: "#3c3836", hover: "#504945", active: "#665c54", border: "#504945", text: "#ebdbb2", muted: "#bdae93", accent: "#fabd2f", status: "#458588", terminal: "#1b1b1b" },
  "one-dark-pro": { bg: "#282c34", panel: "#21252b", elevated: "#2f343f", hover: "#363b46", active: "#3e4451", border: "#3e4451", text: "#abb2bf", muted: "#828997", accent: "#61afef", status: "#3e4451", terminal: "#1b1e23" },
  "kimbie-dark": { bg: "#221a0f", panel: "#1a140c", elevated: "#362712", hover: "#49371d", active: "#5e4522", border: "#4a3822", text: "#d3af86", muted: "#a89984", accent: "#dc3958", status: "#889b4a", terminal: "#171109" },
  "github-dark": { bg: "#0d1117", panel: "#010409", elevated: "#161b22", hover: "#1f2630", active: "#21262d", border: "#30363d", text: "#e6edf3", muted: "#8b949e", accent: "#58a6ff", status: "#238636", terminal: "#070a0e" },
  "catppuccin-mocha": { bg: "#1e1e2e", panel: "#181825", elevated: "#313244", hover: "#3b3c50", active: "#45475a", border: "#45475a", text: "#cdd6f4", muted: "#a6adc8", accent: "#cba6f7", status: "#89b4fa", terminal: "#11111b" },
  "tokyo-night": { bg: "#1a1b26", panel: "#16161e", elevated: "#24283b", hover: "#2b3048", active: "#343b58", border: "#343b58", text: "#c0caf5", muted: "#9aa5ce", accent: "#7aa2f7", status: "#3d59a1", terminal: "#101014" },
  "ayu-dark": { bg: "#0f1419", panel: "#0b0e14", elevated: "#1b222a", hover: "#222b35", active: "#2d3640", border: "#2d3640", text: "#e6e1cf", muted: "#acb6bf", accent: "#ffb454", status: "#36a3d9", terminal: "#070a0d" },
  palenight: { bg: "#292d3e", panel: "#202331", elevated: "#343849", hover: "#3d4255", active: "#444a5e", border: "#41465a", text: "#a6accd", muted: "#858cab", accent: "#c792ea", status: "#82aaff", terminal: "#1a1c27" },
  "honey-dark": { bg: "#1c1712", panel: "#15110e", elevated: "#312719", hover: "#40331f", active: "#514126", border: "#493a25", text: "#f1e7d0", muted: "#b9a98c", accent: "#e6b450", status: "#b8832f", terminal: "#100d0a" },
  "molten-amber": { bg: "#24150f", panel: "#1a0f0b", elevated: "#3b2118", hover: "#4b2a1d", active: "#5d3423", border: "#543020", text: "#f3ddd2", muted: "#bfa495", accent: "#ff8f40", status: "#c84d2f", terminal: "#120a08" },
  "saffron-night": { bg: "#19160d", panel: "#121008", elevated: "#2d2711", hover: "#3d3516", active: "#4d431b", border: "#443b19", text: "#f1e8c7", muted: "#b5aa83", accent: "#e6b400", status: "#9b7b00", terminal: "#0d0b05" },
  "amber-slate": { bg: "#22262b", panel: "#191c20", elevated: "#30363d", hover: "#39414a", active: "#444d58", border: "#3f4852", text: "#e5e9ee", muted: "#abb3bd", accent: "#d99a32", status: "#577a96", terminal: "#121518" }
};
const APPEARANCE_PALETTES = {
  Light: { bg: "#f3f3f3", panel: "#e8e8e8", elevated: "#ffffff", hover: "#e1e1e1", active: "#d6d6d6", border: "#c8c8c8", text: "#202020", muted: "#616161", accent: "#0067c0", status: "#0078d4", terminal: "#ffffff" },
  "Light Contrast": { bg: "#ffffff", panel: "#f5f5f5", elevated: "#ffffff", hover: "#e4e4e4", active: "#d0d0d0", border: "#5f5f5f", text: "#000000", muted: "#3f3f3f", accent: "#0048d8", status: "#003c9e", terminal: "#ffffff" },
  Transparent: { bg: "#20262d", panel: "rgba(20,24,29,.82)", elevated: "rgba(42,48,56,.82)", hover: "rgba(67,76,87,.72)", active: "rgba(78,89,102,.76)", border: "rgba(150,165,181,.25)", text: "#e5edf5", muted: "#9facb9", accent: "#62c4bd", status: "#397f8f", terminal: "#11161b" },
  Gradient: { bg: "#201a31", panel: "#171522", elevated: "#2e2842", hover: "#3b3452", active: "#4b4265", border: "#49405f", text: "#eeeaf8", muted: "#b0a8c4", accent: "#b58cff", status: "#6a55a5", terminal: "#12101a" },
  "Dark Contrast": { bg: "#000000", panel: "#050505", elevated: "#111111", hover: "#202020", active: "#2d2d2d", border: "#777777", text: "#ffffff", muted: "#d0d0d0", accent: "#00c8ff", status: "#005f87", terminal: "#000000" }
};
Object.assign(THEME_PALETTES, {
  "light-plus": { bg: "#f3f6fa", panel: "#e8edf3", elevated: "#ffffff", hover: "#e1e7ee", active: "#d6dee8", border: "#c5ced9", text: "#20252b", muted: "#616b76", accent: "#007acc", status: "#0078d4" },
  "quiet-light": { bg: "#f6f8fa", panel: "#edf0f4", elevated: "#ffffff", hover: "#e5e9ef", active: "#dce2e9", border: "#cbd2dc", text: "#28313c", muted: "#687485", accent: "#5876a3", status: "#5876a3" },
  "solarized-light": { bg: "#fdf6e3", panel: "#eee8d5", elevated: "#fffaf0", hover: "#e8dfc7", active: "#ded4b9", border: "#c9bea3", text: "#073642", muted: "#657b83", accent: "#268bd2", status: "#2aa198" },
  "catppuccin-latte": { bg: "#eff1f5", panel: "#e6e9ef", elevated: "#ffffff", hover: "#dce0e8", active: "#ccd0da", border: "#bcc0cc", text: "#4c4f69", muted: "#6c6f85", accent: "#8839ef", status: "#1e66f5" },
  "github-light-hc": { bg: "#ffffff", panel: "#f6f8fa", elevated: "#ffffff", hover: "#eaeef2", active: "#d8dee4", border: "#57606a", text: "#1f2328", muted: "#4b5563", accent: "#0969da", status: "#0969da" },
  "cyan-contrast": { bg: "#ffffff", panel: "#eefcfd", elevated: "#ffffff", hover: "#d9f4f6", active: "#c1eaed", border: "#256a72", text: "#082f34", muted: "#365e63", accent: "#007f8b", status: "#007f8b" },
  "amber-contrast": { bg: "#fffdf4", panel: "#fff5d6", elevated: "#ffffff", hover: "#f8e7b7", active: "#edd493", border: "#80591f", text: "#30230f", muted: "#655237", accent: "#9a5b00", status: "#9a5b00" },
  "glass-dark": { bg: "rgba(27,32,39,.92)", panel: "rgba(20,24,29,.82)", elevated: "rgba(52,60,70,.84)", hover: "rgba(77,88,101,.72)", active: "rgba(88,100,115,.78)", border: "rgba(160,177,193,.28)", text: "#e8eef4", muted: "#a4b0bd", accent: "#62c4bd", status: "#397f8f" },
  "glass-ocean": { bg: "rgba(11,35,48,.92)", panel: "rgba(6,28,40,.82)", elevated: "rgba(25,66,82,.82)", hover: "rgba(34,82,99,.74)", active: "rgba(45,99,116,.8)", border: "rgba(79,177,200,.3)", text: "#dff7fb", muted: "#94bdc7", accent: "#41b8d5", status: "#167f99" },
  "glass-violet": { bg: "rgba(37,29,54,.92)", panel: "rgba(28,22,42,.84)", elevated: "rgba(62,49,85,.84)", hover: "rgba(78,61,105,.74)", active: "rgba(91,72,122,.8)", border: "rgba(189,147,249,.3)", text: "#f0e8ff", muted: "#b9a9d1", accent: "#bd93f9", status: "#7957a8" },
  "prism-light": { bg: "#edf4ff", panel: "#e0ebf8", elevated: "#ffffff", hover: "#d9e2f4", active: "#cfdaed", border: "#b7c4db", text: "#242a3a", muted: "#66708a", accent: "#8c63d7", status: "#527acb", gradientA: "#c9e8ff", gradientB: "#eadbff" },
  "sunset-gradient": { bg: "#2c1d35", panel: "#24182d", elevated: "#46304c", hover: "#563b59", active: "#674768", border: "#76506f", text: "#f8e9f0", muted: "#c5a5b6", accent: "#ff9368", status: "#c75579", gradientA: "#7b315d", gradientB: "#ff8a55" },
  "lagoon-gradient": { bg: "#102d38", panel: "#0b252e", elevated: "#20434c", hover: "#28525d", active: "#32636d", border: "#39717b", text: "#e4fbf8", muted: "#9dc5c2", accent: "#38c5b3", status: "#168498", gradientA: "#11475a", gradientB: "#38c5b3" },
  abyss: { bg: "#000c18", panel: "#000711", elevated: "#082039", hover: "#0b2c4d", active: "#103b62", border: "#3976a6", text: "#ffffff", muted: "#b4d5ef", accent: "#00b7ff", status: "#006ca8" },
  "tomorrow-night-blue": { bg: "#001c3d", panel: "#00152e", elevated: "#003064", hover: "#003a78", active: "#06498e", border: "#4b86bd", text: "#ffffff", muted: "#c1d7ee", accent: "#73c7ff", status: "#005da9" },
  "graphite-contrast": { bg: "#050505", panel: "#000000", elevated: "#171717", hover: "#252525", active: "#343434", border: "#8a8a8a", text: "#ffffff", muted: "#d0d0d0", accent: "#d6b4ff", status: "#6e4d9b" }
});
const THEME_CATEGORY_DEFAULTS = {
  Light: "light-plus",
  "Light Contrast": "github-light",
  Transparent: "glass-dark",
  Gradient: "sunset-gradient",
  Dark: "dark-plus",
  "Dark Contrast": "abyss"
};

function hydrateOpenleafThemes() {
  const catalog = Array.isArray(window.OPENLEAF_THEME_CATALOG) ? window.OPENLEAF_THEME_CATALOG : [];
  if (!catalog.length) return;
  const themeGrid = document.getElementById("themeGrid");
  const catalogIds = new Set(catalog.map((entry) => entry.id));
  themeGrid.querySelectorAll(".theme-option").forEach((option) => {
    if (!catalogIds.has(option.dataset.theme)) option.remove();
  });
  for (const entry of catalog) {
    THEME_PALETTES[entry.id] = entry.palette;
    let option = themeGrid.querySelector(`[data-theme="${entry.id}"]`);
    if (!option) {
      option = document.createElement("div");
      option.className = "theme-option";
      option.dataset.theme = entry.id;
      option.setAttribute("role", "button");
      option.tabIndex = 0;
      option.innerHTML = "<i></i><span></span><b>✓</b>";
      themeGrid.appendChild(option);
    }
    option.dataset.category = entry.category;
    option.querySelector("span").textContent = entry.name;
    const chip = option.querySelector("i");
    chip.style.setProperty("--theme-a", entry.palette.bg);
    chip.style.setProperty("--theme-b", entry.palette.accent);
  }
  themeOptions = Array.from(themeGrid.querySelectorAll(".theme-option"));
}

hydrateOpenleafThemes();

function activeWorkspace() {
  return workspaces.find((workspace) => workspace.id === activeWorkspaceId) || null;
}

function remainingEtaSeconds(session, now = Date.now()) {
  if (!session || !Number.isFinite(session.etaDeadline)) return null;
  return Math.max(0, Math.ceil((session.etaDeadline - now) / 1000));
}

function formatEtaClock(seconds) {
  const value = Math.max(0, Math.ceil(Number(seconds) || 0));
  const minutes = Math.floor(value / 60);
  const remainder = value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function updateCommandCenterStatus() {
  const workspace = activeWorkspace();
  workspaceStatusDot.className = "workspace-status-dot";
  if (!workspace) {
    activeWorkspaceName.textContent = "Choose a workspace · ⌘P";
    commandCenter.title = "Open Command Palette (⌘P)";
    return;
  }

  const workspaceSessions = Array.from(sessions.values()).filter((session) => session.workspaceId === workspace.id);
  const working = workspaceSessions.filter((session) => (session.metadata.status || "working") === "working").length;
  const waiting = workspaceSessions.filter((session) => session.metadata.status === "waiting").length;
  const errors = workspaceSessions.filter((session) => session.metadata.status === "error").length;
  const etas = workspaceSessions
    .filter((session) => (session.metadata.status || "working") === "working")
    .map((session) => remainingEtaSeconds(session))
    .filter((seconds) => Number.isFinite(seconds));
  const workspacePath = remoteWorkspaceLabel(workspace);
  const parts = [
    workspace.name,
    workspacePath,
    `${workspaceSessions.length}/${workspaceLayoutFor(workspace.id)} agents active`
  ];
  if (errors) parts.push(`${errors} error`);
  else if (working) parts.push(`${working} working`);
  else if (waiting) parts.push(`${waiting} waiting`);
  else parts.push("idle");
  if (etas.length) parts.push(`ETA ${formatEtaClock(Math.min(...etas))}`);
  activeWorkspaceName.textContent = parts.join(" · ");
  commandCenter.title = `${parts.join(" · ")} · Open Command Palette (⌘P)`;
  workspaceStatusDot.classList.add(
    errors ? "error" : working ? "working" : waiting ? "waiting" : workspace.available ? "connected" : "offline"
  );
}

function setFooter(message) {
  const workspace = activeWorkspace();
  const workspacePath = workspace ? remoteWorkspaceLabel(workspace) : "";
  footerStatus.textContent = workspacePath || message || "No workspace";
  footerStatus.title = workspacePath || message || "No workspace";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function renderNotificationBell() {
  const count = unreadAgentNotifications;
  notificationBadge.hidden = count === 0;
  notificationBadge.textContent = count > 9 ? "9+" : String(count);
  notificationButton.classList.toggle("has-unread", count > 0);
  notificationButton.title = count
    ? `${count} unread agent ${count === 1 ? "notification" : "notifications"}`
    : "No unread agent notifications";
}

function notifyAgentFinished(session) {
  unreadAgentNotifications += 1;
  renderNotificationBell();
  const workspace = workspaces.find((item) => item.id === session.workspaceId);
  api.notifyAgentFinished({
    agentNumber: String(session.slotIndex + 1).padStart(2, "0"),
    name: session.metadata.name || `${session.kind} agent`,
    tldr: session.metadata.tldr || "Task finished.",
    workspaceName: workspace?.name || ""
  }).catch(() => {});
}

function booleanPreference(key, fallback = true) {
  const value = localStorage.getItem(key);
  return value === null ? fallback : value === "1";
}

function numericPreference(key, fallback, minimum, maximum) {
  const stored = localStorage.getItem(key);
  if (stored === null || stored === "") return fallback;
  const value = Number(stored);
  return Number.isFinite(value) ? Math.max(minimum, Math.min(maximum, value)) : fallback;
}

function makeInteractive(node, handler) {
  node.tabIndex = 0;
  node.addEventListener("click", handler);
  node.addEventListener("keydown", (event) => {
    if (event.target !== node) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handler();
    }
  });
}

function postPixelMessage(message) {
  if (!pixelFrameReady || !pixelModeFrame.contentWindow) return;
  pixelModeFrame.contentWindow.postMessage(message, "*");
}

function activePixelSessions() {
  return Array.from(sessions.values())
    .filter((session) => session.workspaceId === activeWorkspaceId)
    .sort((left, right) => left.slotIndex - right.slotIndex);
}

function renderPixelAgentRoster() {
  const activeSessions = activePixelSessions();
  const workspace = activeWorkspace();
  pixelAgentRosterCount.textContent = `${activeSessions.length}/${workspace ? workspaceLayoutFor(workspace.id) : 4}`;
  pixelAgentRosterList.replaceChildren();
  for (const session of activeSessions) {
    const rawStatus = session.metadata.status || "working";
    const status = rawStatus === "done" ? "idle" : rawStatus;
    const item = document.createElement("button");
    item.className = "pixel-roster-agent";
    item.type = "button";
    item.title = `Open Agent ${String(session.slotIndex + 1).padStart(2, "0")}`;
    item.innerHTML = `
      <span class="pixel-roster-status" data-status="${status}" aria-hidden="true"></span>
      <span class="pixel-roster-number">${String(session.slotIndex + 1).padStart(2, "0")}</span>
      <span class="pixel-roster-copy">
        <strong></strong>
        <small></small>
      </span>
      <span class="pixel-roster-state">${status}</span>
    `;
    item.querySelector(".pixel-roster-copy strong").textContent =
      session.metadata.name || `${session.kind} agent`;
    item.querySelector(".pixel-roster-copy small").textContent =
      session.metadata.tldr || (status === "working" ? "Working…" : "Waiting for work");
    item.addEventListener("click", () => focusAgentWindow(session.slotIndex));
    pixelAgentRosterList.appendChild(item);
  }
}

function syncPixelMode(reset = false) {
  if (!pixelFrameReady) return;
  const workspace = activeWorkspace();
  const activeSessions = activePixelSessions();
  const agents = activeSessions.map((session) => session.slotIndex + 1);
  const nextAgentIds = new Set(agents);
  if (reset) {
    for (const id of pixelKnownAgentIds) {
      if (!nextAgentIds.has(id)) postPixelMessage({ type: "agentClosed", id });
    }
  }
  const folderNames = Object.fromEntries(agents.map((id) => [id, workspace?.name || "Workspace"]));
  postPixelMessage({
    type: "providerCapabilities",
    readingTools: ["Read", "Search", "Grep", "Glob"],
    subagentToolNames: []
  });
  postPixelMessage({
    type: "workspaceFolders",
    folders: workspace ? [{ name: workspace.name, path: workspace.root }] : []
  });
  postPixelMessage({
    type: "existingAgents",
    agents,
    agentMeta: {},
    folderNames,
    externalAgents: {}
  });
  pixelKnownAgentIds.clear();
  for (const id of nextAgentIds) pixelKnownAgentIds.add(id);
  // Pixel Agents buffers restored characters until a layout event. Its mock
  // office loads before our parent bridge replies, so flush against that
  // already-loaded layout without replacing the user's room.
  postPixelMessage({ type: "layoutLoaded", layout: null });
  for (const session of activeSessions) {
    syncPixelSession(session);
  }
  renderPixelAgentRoster();
}

function syncPixelSession(session) {
  if (!pixelFrameReady || session.workspaceId !== activeWorkspaceId) return;
  const id = session.slotIndex + 1;
  const status = session.metadata.status || "working";
  const active = status === "working";
  if (!pixelKnownAgentIds.has(id)) {
    pixelKnownAgentIds.add(id);
    postPixelMessage({
      type: "agentCreated",
      id,
      folderName: activeWorkspace()?.name || "Workspace"
    });
  }
  postPixelMessage({
    type: "agentTeamInfo",
    id,
    agentName: session.metadata.name || `Agent ${String(id).padStart(2, "0")}`,
    teamName: session.kind === "codex" ? "Codex" : session.kind === "claude" ? "Claude" : "Shell",
    isTeamLead: false
  });
  postPixelMessage({
    type: "agentStatus",
    id,
    status: active ? "active" : "waiting",
    awaitingInput: status === "waiting"
  });
  postPixelMessage({ type: "agentToolsClear", id });
  if (active) {
    postPixelMessage({
      type: "agentToolStart",
      id,
      toolId: `agent-workbench-${id}`,
      toolName: "Write",
      status: session.metadata.tldr || session.metadata.name || "Working"
    });
  }
}

function setPixelMode(enabled, { persist = true } = {}) {
  pixelModeEnabled = Boolean(enabled);
  agentGrid.hidden = pixelModeEnabled;
  pixelModeView.hidden = !pixelModeEnabled;
  document.querySelector(".agent-stage").classList.toggle("pixel-mode", pixelModeEnabled);
  pixelModeButton.classList.toggle("active", pixelModeEnabled);
  pixelModeButton.setAttribute("aria-pressed", String(pixelModeEnabled));
  pixelModeButton.title = pixelModeEnabled ? "Terminal mode" : "Pixel mode";
  pixelModeButton.setAttribute("aria-label", pixelModeButton.title);
  if (persist) localStorage.setItem("agentWorkbenchPixelMode", pixelModeEnabled ? "1" : "0");
  if (pixelModeEnabled) syncPixelMode(true);
  else requestAnimationFrame(() => {
    for (const session of activePixelSessions()) {
      try {
        session.fitAddon.fit();
      } catch (error) {
      }
    }
  });
}

function paletteCommands() {
  const commands = [
    { id: "agent-codex", icon: "◉", label: "New Codex agent", detail: "Start in the first empty slot", run: () => startFromToolbar("codex") },
    { id: "agent-claude", icon: "✳", label: "New Claude agent", detail: "Start in the first empty slot", run: () => startFromToolbar("claude") },
    { id: "agent-shell", icon: "›_", label: "New shell", detail: "Start in the first empty slot", run: () => startFromToolbar("shell") },
    { id: "workspace-add", icon: "＋", label: "Add workspace", detail: "Open the workspace setup flow", run: openWorkspaceSetup },
    { id: "file-new", icon: "▱＋", label: "New file", detail: "Create in the selected folder", run: () => beginCreateWorkspaceEntry("file") },
    { id: "folder-new", icon: "▰＋", label: "New folder", detail: "Create in the selected folder", run: () => beginCreateWorkspaceEntry("folder") },
    { id: "workspace-code", icon: "〈〉", label: "Open workspace in VS Code", detail: activeWorkspace() ? activeWorkspace().name : "No workspace selected", run: () => activeWorkspaceId && api.openInCode(activeWorkspaceId) },
    { id: "pixel-mode", icon: "◉", label: pixelModeEnabled ? "Show terminals" : "Show Pixel Mode", detail: "Toggle the Pixel Agents office", run: () => setPixelMode(!pixelModeEnabled) },
    { id: "files-toggle", icon: "↙", label: document.body.classList.contains("files-collapsed") ? "Open files pane" : "Close files pane", detail: "Toggle workspace files", run: () => setFilesCollapsed(!document.body.classList.contains("files-collapsed")) },
    { id: "outputs-toggle", icon: "↗", label: document.body.classList.contains("output-collapsed") ? "Open output pane" : "Close output pane", detail: "Toggle generated output files", run: () => setOutputCollapsed(!document.body.classList.contains("output-collapsed")) },
    { id: "refresh", icon: "↻", label: "Refresh workspace", detail: "Reload files and generated outputs", run: () => refreshWorkspacePanels({ syncRemote: true }) },
    { id: "settings", icon: "⚙", label: "Open settings", detail: "Appearance, workspace, and profile", run: openSettings }
  ];
  for (const workspace of workspaces) {
    commands.push({
      id: `workspace-${workspace.id}`,
      icon: workspace.type === "ssh" ? "⌘" : "▱",
      label: `Switch to ${workspace.name}`,
      detail: remoteWorkspaceLabel(workspace),
      run: () => selectWorkspace(workspace.id)
    });
  }
  return commands;
}

function fuzzyCommandMatch(command, query) {
  if (!query) return true;
  const haystack = `${command.label} ${command.detail}`.toLowerCase();
  let position = 0;
  for (const character of query.toLowerCase()) {
    position = haystack.indexOf(character, position);
    if (position === -1) return false;
    position += 1;
  }
  return true;
}

function renderCommandPalette() {
  const query = commandPaletteInput.value.trim();
  visiblePaletteCommands = paletteCommands().filter((command) => fuzzyCommandMatch(command, query));
  commandPaletteSelection = Math.max(0, Math.min(commandPaletteSelection, visiblePaletteCommands.length - 1));
  commandPaletteResults.innerHTML = "";

  if (!visiblePaletteCommands.length) {
    const empty = document.createElement("div");
    empty.className = "command-palette-empty";
    empty.textContent = "No matching commands";
    commandPaletteResults.appendChild(empty);
    return;
  }

  visiblePaletteCommands.forEach((command, index) => {
    const item = document.createElement("div");
    item.className = "command-palette-item";
    item.classList.toggle("active", index === commandPaletteSelection);
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", String(index === commandPaletteSelection));
    const icon = document.createElement("span");
    icon.className = "command-palette-icon";
    icon.textContent = command.icon;
    const copy = document.createElement("span");
    copy.className = "command-palette-copy";
    const label = document.createElement("strong");
    label.textContent = command.label;
    const detail = document.createElement("small");
    detail.textContent = command.detail;
    copy.append(label, detail);
    item.append(icon, copy);
    item.addEventListener("pointermove", () => {
      if (commandPaletteSelection === index) return;
      commandPaletteSelection = index;
      renderCommandPalette();
    });
    item.addEventListener("click", () => runPaletteCommand(index));
    commandPaletteResults.appendChild(item);
  });
  commandPaletteResults.children[commandPaletteSelection]?.scrollIntoView({ block: "nearest" });
}

function openCommandPalette() {
  commandPaletteSelection = 0;
  commandPaletteInput.value = "";
  commandPaletteBackdrop.hidden = false;
  renderCommandPalette();
  requestAnimationFrame(() => commandPaletteInput.focus());
}

function closeCommandPalette() {
  commandPaletteBackdrop.hidden = true;
}

function runPaletteCommand(index = commandPaletteSelection) {
  const command = visiblePaletteCommands[index];
  if (!command) return;
  closeCommandPalette();
  Promise.resolve(command.run()).catch((error) => showToast(error.message || String(error)));
}

function setWorkspaceAddMenu(open) {
  workspaceAddMenu.hidden = !open;
  addWorkspaceButton.classList.toggle("active", open);
}

function workspaceLayoutMap() {
  try {
    return JSON.parse(localStorage.getItem("agentWorkbenchWorkspaceLayouts") || "{}");
  } catch (error) {
    return {};
  }
}

function saveWorkspaceLayout(workspaceId, count) {
  if (!workspaceId) return;
  const layouts = workspaceLayoutMap();
  layouts[workspaceId] = [1, 2, 4].includes(Number(count)) ? Number(count) : 4;
  localStorage.setItem("agentWorkbenchWorkspaceLayouts", JSON.stringify(layouts));
}

function activeWorkspaceLayout() {
  const saved = Number(workspaceLayoutMap()[activeWorkspaceId]);
  return [1, 2, 4].includes(saved) ? saved : 4;
}

function workspaceLayoutFor(workspaceId) {
  const saved = Number(workspaceLayoutMap()[workspaceId]);
  return [1, 2, 4].includes(saved) ? saved : 4;
}

function workspaceLayoutGridLabel(count) {
  if (count === 1) return "1×1";
  if (count === 2) return "1×2";
  return "2×2";
}

function renderWorkspaceEditorTabs() {
  workspaceEditorTabs.innerHTML = "";
  workspaceEtaNodes.clear();

  for (const workspace of workspaces) {
    const isActive = workspace.id === activeWorkspaceId;
    const count = workspaceLayoutFor(workspace.id);
    const tab = document.createElement("div");
    tab.className = "editor-tab workspace-editor-tab";
    tab.classList.toggle("active", isActive);
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(isActive));
    tab.title = `${remoteWorkspaceLabel(workspace)}\nRight-click to rename`;

    const icon = document.createElement("span");
    icon.className = "workspace-editor-icon";
    icon.textContent = workspace.type === "ssh" ? "⌘" : "▱";
    const label = document.createElement("span");
    label.className = "workspace-editor-label";
    label.textContent = `${workspace.name} · ${workspaceLayoutGridLabel(count)}`;
    tab.append(icon, label);

    const divider = document.createElement("span");
    divider.className = "agent-eta-divider";
    divider.textContent = "·";
    const etaLabel = document.createElement("span");
    etaLabel.className = "agent-eta-label";
    etaLabel.textContent = "ETA";
    const etaGroup = document.createElement("span");
    etaGroup.className = "agent-eta";
    etaGroup.setAttribute("aria-label", `${workspace.name} agent ETAs`);
    for (let index = 0; index < count; index += 1) {
      const eta = document.createElement("span");
      eta.dataset.etaSlot = String(index);
      eta.textContent = `${String(index + 1).padStart(2, "0")} —`;
      etaGroup.appendChild(eta);
    }
    workspaceEtaNodes.set(workspace.id, etaGroup);
    const closeButton = document.createElement("button");
    closeButton.className = "workspace-tab-close";
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.title = `Remove ${workspace.name}`;
    closeButton.setAttribute("aria-label", `Remove ${workspace.name}`);
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openWorkspaceRemoveDialog(workspace);
    });
    tab.append(divider, etaLabel, etaGroup, closeButton);

    makeInteractive(tab, () => selectWorkspace(workspace.id));
    tab.addEventListener("contextmenu", (event) => beginEditorTabRename(event, tab, workspace));
    workspaceEditorTabs.appendChild(tab);
  }
  updateAgentEta();
}

function layoutSummary(count) {
  if (count === 1) return "1 agent · 1×1 grid";
  if (count === 2) return "2 agents · 1×2 grid";
  return "4 agents · 2×2 grid";
}

function applyActiveWorkspaceLayout() {
  const count = activeWorkspaceLayout();
  agentGrid.dataset.layoutCount = String(count);
  renderWorkspaceEditorTabs();
}

function selectPendingWorkspaceLayout(count) {
  pendingWorkspaceLayout = [1, 2, 4].includes(Number(count)) ? Number(count) : 4;
  workspaceLayoutSummary.textContent = layoutSummary(pendingWorkspaceLayout);
  workspaceLayoutOptions.forEach((option) => {
    const active = Number(option.dataset.layoutCount) === pendingWorkspaceLayout;
    option.classList.toggle("active", active);
    option.setAttribute("aria-checked", String(active));
  });
}

function renderWorkspaceAgentPreview() {
  workspaceAgentPreview.innerHTML = "";
  for (let index = 0; index < pendingWorkspaceLayout; index += 1) {
    const card = document.createElement("div");
    card.className = "workspace-agent-preview-card";
    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");
    const providers = document.createElement("div");
    providers.innerHTML = '<img src="assets/openai-blossom.svg" alt=""><img src="assets/claude-symbol.svg" alt=""><i>›_</i>';
    card.append(number, providers);
    workspaceAgentPreview.appendChild(card);
  }
}

function showWorkspaceSetupStep(step) {
  const order = ["source", "layout", "agents"];
  const currentIndex = order.indexOf(step);
  workspaceSourceStep.hidden = step !== "source";
  workspaceLayoutStep.hidden = step !== "layout";
  workspaceAgentsStep.hidden = step !== "agents";
  workspaceStepIndicators.forEach((indicator) => {
    const index = order.indexOf(indicator.dataset.workspaceStepIndicator);
    indicator.classList.toggle("active", index === currentIndex);
    indicator.classList.toggle("complete", index < currentIndex);
    indicator.querySelector("span").textContent = index < currentIndex ? "✓" : String(index + 1);
  });
  if (step === "agents") renderWorkspaceAgentPreview();
}

function openWorkspaceSetup() {
  pendingWorkspaceSetup = null;
  selectPendingWorkspaceLayout(numericPreference("agentWorkbenchDefaultLayout", 4, 1, 4));
  showWorkspaceSetupStep("source");
  setWorkspaceAddMenu(true);
}

async function prepareWorkspaceSetup(workspace) {
  if (!workspace) return;
  pendingWorkspaceSetup = workspace;
  activeWorkspaceId = workspace.id;
  localStorage.setItem("agentWorkbenchActiveWorkspace", workspace.id);
  saveWorkspaceLayout(workspace.id, pendingWorkspaceLayout);
  await loadWorkspaces();
  workspaceSetupFolderName.textContent = workspace.name;
  workspaceSetupFolderPath.textContent = remoteWorkspaceLabel(workspace);
  showWorkspaceSetupStep("layout");
  setWorkspaceAddMenu(true);
}

function finishWorkspaceSetup() {
  if (pendingWorkspaceSetup) {
    saveWorkspaceLayout(pendingWorkspaceSetup.id, pendingWorkspaceLayout);
    applyActiveWorkspaceLayout();
    renderWorkspaceAgentGrid();
    showToast(`Added ${pendingWorkspaceSetup.name}`);
  }
  pendingWorkspaceSetup = null;
  setWorkspaceAddMenu(false);
}

function setSidebarView(view) {
  currentSidebarView = view;
  activityButtons.forEach((button) => button.classList.toggle("active", button.dataset.activity === view));
  sidebarViews.forEach((panel) => {
    panel.hidden = panel.dataset.sidebarView !== view;
  });
  if (view === "workspaces") setWorkspaceAddMenu(true);
  else setWorkspaceAddMenu(false);
  if (view === "agents") renderAgentSidebar();
  if (view === "outputs") renderArtifactSidebar();
  document.querySelector(".output-panel").classList.toggle("attention", view === "outputs");
}

const FILES_CLOSE_ICON = '<svg class="pane-toggle-icon" viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="2.5" width="15" height="15" rx="1.7"/><path d="M12.5 3v14M8.8 7 5.8 10l3 3"/><path class="pane-toggle-dots" d="M15 6.5h.01M15 10h.01M15 13.5h.01"/></svg>';
const OUTPUT_CLOSE_ICON = '<svg class="pane-toggle-icon" viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="2.5" width="15" height="15" rx="1.7"/><path d="M7.5 3v14M11.2 7l3 3-3 3"/><path class="pane-toggle-dots" d="M5 6.5h.01M5 10h.01M5 13.5h.01"/></svg>';
const FILES_COLLAPSED_LABEL = '<span class="pane-collapsed-label">Files</span>';
const OUTPUTS_COLLAPSED_LABEL = '<span class="pane-collapsed-label">Outputs</span>';
const AGENT_MAXIMIZE_ICON = '<svg class="agent-resize-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M7 7 2.5 2.5M2.5 6V2.5H6M11 11l4.5 4.5M12 15.5h3.5V12"/></svg>';
const AGENT_RESTORE_ICON = '<svg class="agent-resize-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M2.5 2.5 7 7M7 3.5V7H3.5M15.5 15.5 11 11M11 14.5V11h3.5"/></svg>';

function setOutputCollapsed(collapsed) {
  document.body.classList.toggle("output-collapsed", collapsed);
  toggleOutputButton.innerHTML = collapsed ? OUTPUTS_COLLAPSED_LABEL : OUTPUT_CLOSE_ICON;
  toggleOutputButton.title = collapsed ? "Open output pane" : "Close output pane";
  toggleOutputButton.setAttribute("aria-label", toggleOutputButton.title);
  localStorage.setItem("agentWorkbenchOutputCollapsed", collapsed ? "1" : "0");
  requestAnimationFrame(() => {
    for (const session of sessions.values()) {
      try {
        session.fitAddon.fit();
      } catch (error) {
      }
    }
  });
}

function setArtifactListCollapsed(collapsed) {
  document.body.classList.toggle("output-files-collapsed", collapsed);
  toggleArtifactListButton.setAttribute("aria-expanded", collapsed ? "false" : "true");
  toggleArtifactListButton.title = collapsed ? "Expand output files" : "Collapse output files";
  localStorage.setItem("agentWorkbenchOutputFilesCollapsed", collapsed ? "1" : "0");
}

function setFilesCollapsed(collapsed) {
  document.body.classList.toggle("files-collapsed", collapsed);
  toggleFilesButton.innerHTML = collapsed ? FILES_COLLAPSED_LABEL : FILES_CLOSE_ICON;
  toggleFilesButton.title = collapsed ? "Open files pane" : "Close files pane";
  toggleFilesButton.setAttribute("aria-label", toggleFilesButton.title);
  localStorage.setItem("agentWorkbenchFilesCollapsed", collapsed ? "1" : "0");
  requestAnimationFrame(() => {
    for (const session of sessions.values()) {
      try {
        session.fitAddon.fit();
      } catch (error) {
      }
    }
  });
}

function showSettingsPage(page) {
  settingsNavItems.forEach((item) => item.classList.toggle("active", item.dataset.settingsTarget === page));
  settingsPages.forEach((panel) => {
    panel.hidden = panel.dataset.settingsPage !== page;
  });
  settingsTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
  settingsSearchInput.value = "";
  document.querySelectorAll(".settings-controls > *").forEach((row) => {
    row.hidden = false;
  });
  if (page === "appearance") refreshThemeOptionVisibility();
}

function openSettings() {
  const workspace = activeWorkspace();
  settingsWorkspacePath.textContent = workspace ? remoteWorkspaceLabel(workspace) : "No workspace selected";
  settingsCodexUsage.textContent = codexUsageText.textContent;
  showSettingsPage("appearance");
  settingsOverlay.hidden = false;
  requestAnimationFrame(() => settingsSearchInput.focus());
}

function closeSettings() {
  settingsOverlay.hidden = true;
}

function applyPalette(palette, mode) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(palette)) {
    root.style.setProperty(`--theme-${key}`, value);
  }
  root.style.setProperty("--theme-background", palette.background || palette.bg);
  root.style.setProperty("--theme-terminal", palette.bg);
  root.dataset.appearanceMode = mode.toLowerCase().replace(/\s+/g, "-");
  const terminalTheme = terminalThemeFromPalette(palette);
  for (const session of sessions.values()) {
    session.term.options.theme = terminalTheme;
    session.term.refresh(0, Math.max(0, session.term.rows - 1));
  }
  if (sshAuthSession) {
    sshAuthSession.term.options.theme = terminalTheme;
    sshAuthSession.term.refresh(0, Math.max(0, sshAuthSession.term.rows - 1));
  }
}

function themeCategoryForOption(option) {
  return option?.dataset.category || "Dark";
}

function selectedAppearanceCategory() {
  return appearanceCategories.find((category) => category.classList.contains("active"))?.textContent.trim() || "Dark";
}

function refreshThemeOptionVisibility(query = "") {
  const category = selectedAppearanceCategory();
  const normalizedQuery = query.trim().toLowerCase();
  themeOptions.forEach((option) => {
    const matchesCategory = themeCategoryForOption(option) === category;
    const matchesQuery = !normalizedQuery || option.textContent.toLowerCase().includes(normalizedQuery);
    option.hidden = !matchesCategory || !matchesQuery;
  });
}

function selectTheme(theme, { syncCategory = true } = {}) {
  const option = themeOptions.find((candidate) => candidate.dataset.theme === theme);
  const category = themeCategoryForOption(option);
  const palette = THEME_PALETTES[theme] || THEME_PALETTES["dark-plus"];
  themeOptions.forEach((option) => option.classList.toggle("active", option.dataset.theme === theme));
  document.documentElement.dataset.theme = theme;
  applyPalette(palette, category);
  localStorage.setItem("agentWorkbenchTheme", theme);
  localStorage.setItem(`agentWorkbenchTheme:${category}`, theme);
  if (syncCategory) {
    appearanceCategories.forEach((item) => {
      const active = item.textContent.trim() === category;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    localStorage.setItem("agentWorkbenchAppearanceCategory", category);
  }
  refreshThemeOptionVisibility(settingsSearchInput.value);
}

function selectAppearanceCategory(name, persist = true) {
  appearanceCategories.forEach((category) => {
    const active = category.textContent.trim() === name;
    category.classList.toggle("active", active);
    category.setAttribute("aria-selected", String(active));
  });
  const categoryOptions = themeOptions.filter((option) => themeCategoryForOption(option) === name);
  const savedForCategory = localStorage.getItem(`agentWorkbenchTheme:${name}`);
  const preferredTheme = categoryOptions.some((option) => option.dataset.theme === savedForCategory)
    ? savedForCategory
    : THEME_CATEGORY_DEFAULTS[name];
  selectTheme(preferredTheme, { syncCategory: false });
  refreshThemeOptionVisibility();
  if (persist) localStorage.setItem("agentWorkbenchAppearanceCategory", name);
}

function initializeSettings() {
  const initialized = localStorage.getItem("agentWorkbenchThemeSystem") === "1";
  const savedTheme = initialized ? (localStorage.getItem("agentWorkbenchTheme") || "dark-plus") : "dark-plus";
  const availableTheme = themeOptions.some((option) => option.dataset.theme === savedTheme) ? savedTheme : "dark-plus";
  const savedOption = themeOptions.find((option) => option.dataset.theme === availableTheme);
  const savedCategory = initialized
    ? (localStorage.getItem("agentWorkbenchAppearanceCategory") || themeCategoryForOption(savedOption))
    : "Dark";
  localStorage.setItem("agentWorkbenchThemeSystem", "1");
  localStorage.setItem("agentWorkbenchTheme", availableTheme);
  localStorage.setItem("agentWorkbenchAppearanceCategory", savedCategory);
  localStorage.setItem(`agentWorkbenchTheme:${themeCategoryForOption(savedOption)}`, availableTheme);
  selectAppearanceCategory(savedCategory, false);
  const savedPdfMode = localStorage.getItem("agentWorkbenchPdfMode") || "invert";
  pdfOptions.forEach((option) => option.classList.toggle("active", option.dataset.pdfMode === savedPdfMode));
}

function applyTerminalPreferences() {
  const fontSize = numericPreference("agentWorkbenchTerminalFontSize", 9, 8, 16);
  const scrollback = numericPreference("agentWorkbenchTerminalScrollback", 6000, 1000, 10000);
  const cursorBlink = booleanPreference("agentWorkbenchTerminalCursorBlink", true);
  settingsTerminalFontSizeValue.textContent = `${fontSize} px`;
  for (const session of sessions.values()) {
    session.term.options.fontSize = fontSize;
    session.term.options.scrollback = scrollback;
    session.term.options.cursorBlink = cursorBlink;
    try {
      session.fitAddon.fit();
    } catch (error) {
    }
  }
}

function applyWorkbenchPreferences() {
  document.body.classList.toggle("hide-agent-tldr", !booleanPreference("agentWorkbenchShowTldr", true));
  document.body.classList.toggle("compact-output-rows", booleanPreference("agentWorkbenchCompactOutputs", true));
  document.body.classList.toggle("reduce-motion", booleanPreference("agentWorkbenchReduceMotion", false));
  for (const session of sessions.values()) updateAgentMetadata(session, {});
  applyTerminalPreferences();
}

function restartSystemMetricsTimer() {
  if (systemMetricsTimer) clearInterval(systemMetricsTimer);
  const interval = numericPreference("agentWorkbenchMetricsInterval", 5000, 2000, 10000);
  systemMetricsTimer = setInterval(refreshSystemMetrics, interval);
}

function initializeWorkbenchSettings() {
  settingsDefaultLayout.value = String(numericPreference("agentWorkbenchDefaultLayout", 4, 1, 4));
  settingsRememberWidths.checked = booleanPreference("agentWorkbenchRememberWidths", true);
  settingsDefaultAgent.value = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
  settingsAutoPreview.checked = booleanPreference("agentWorkbenchAutoPreview", true);
  settingsShowTldr.checked = booleanPreference("agentWorkbenchShowTldr", true);
  settingsRecentFilesLimit.value = String(numericPreference("agentWorkbenchRecentFilesLimit", 40, 8, 40));
  settingsTerminalFontSize.value = String(numericPreference("agentWorkbenchTerminalFontSize", 9, 8, 16));
  settingsTerminalScrollback.value = String(numericPreference("agentWorkbenchTerminalScrollback", 6000, 1000, 10000));
  settingsTerminalCursorBlink.checked = booleanPreference("agentWorkbenchTerminalCursorBlink", true);
  settingsAutoOpenOutput.checked = booleanPreference("agentWorkbenchAutoOpenOutput", true);
  settingsCompactOutputs.checked = booleanPreference("agentWorkbenchCompactOutputs", true);
  settingsMetricsInterval.value = String(numericPreference("agentWorkbenchMetricsInterval", 5000, 2000, 10000));
  settingsReduceMotion.checked = booleanPreference("agentWorkbenchReduceMotion", false);
  applyWorkbenchPreferences();
}

function terminalColorChannels(value) {
  const source = String(value || "").trim();
  const hex = source.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  if (hex) return hex.slice(1).map((part) => Number.parseInt(part, 16));
  const rgb = source.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (rgb) return rgb.slice(1, 4).map((part) => Math.max(0, Math.min(255, Math.round(Number(part)))));
  const srgb = source.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);
  if (srgb) return srgb.slice(1, 4).map((part) => Math.max(0, Math.min(255, Math.round(Number(part) * 255))));
  return null;
}

function normalizeTerminalColor(value, fallback) {
  const probe = document.createElement("span");
  probe.style.color = value || fallback;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  const channels = terminalColorChannels(computed) || terminalColorChannels(value) || terminalColorChannels(fallback);
  return channels
    ? `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`
    : fallback;
}

function terminalBackgroundColor(value, fallback = "#090b0e") {
  const probe = document.createElement("span");
  probe.style.color = value || fallback;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

  const rgba = computed.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?/i);
  if (rgba) {
    const channels = rgba.slice(1, 4).map((part) => Math.max(0, Math.min(255, Math.round(Number(part)))));
    const alpha = rgba[4]
      ? Math.max(0, Math.min(1, rgba[4].endsWith("%") ? Number(rgba[4].slice(0, -1)) / 100 : Number(rgba[4])))
      : 1;
    return alpha < 1
      ? `rgba(${channels.join(", ")}, ${alpha})`
      : `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  }

  const srgb = computed.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?/i);
  if (srgb) {
    const channels = srgb.slice(1, 4).map((part) => Math.max(0, Math.min(255, Math.round(Number(part) * 255))));
    const alpha = srgb[4]
      ? Math.max(0, Math.min(1, srgb[4].endsWith("%") ? Number(srgb[4].slice(0, -1)) / 100 : Number(srgb[4])))
      : 1;
    return alpha < 1
      ? `rgba(${channels.join(", ")}, ${alpha})`
      : `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  }

  return normalizeTerminalColor(computed || value, fallback);
}

function blendTerminalColor(first, second, amount = 0.5) {
  const left = terminalColorChannels(first);
  const right = terminalColorChannels(second);
  if (!left || !right) return second;
  const mixed = left.map((channel, index) => Math.round(channel + (right[index] - channel) * amount));
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function terminalThemeFromPalette(palette = null) {
  const styles = getComputedStyle(document.documentElement);
  const colors = palette || {
    bg: styles.getPropertyValue("--theme-bg").trim(),
    terminal: styles.getPropertyValue("--theme-terminal").trim(),
    panel: styles.getPropertyValue("--theme-panel").trim(),
    text: styles.getPropertyValue("--theme-text").trim(),
    muted: styles.getPropertyValue("--theme-muted").trim(),
    accent: styles.getPropertyValue("--theme-accent").trim(),
    active: styles.getPropertyValue("--theme-active").trim()
  };
  const background = terminalBackgroundColor(colors.bg || colors.terminal, "#090b0e");
  const foreground = normalizeTerminalColor(colors.text, "#c7ced7");
  const accent = normalizeTerminalColor(colors.accent, "#79d7a7");
  const muted = normalizeTerminalColor(colors.muted, "#7e8794");
  const selection = normalizeTerminalColor(colors.active, "#29463a");
  return {
    background,
    foreground,
    cursor: accent,
    cursorAccent: background,
    selectionBackground: selection,
    black: blendTerminalColor(background, "#000000", 0.3),
    red: blendTerminalColor(accent, "#ff5f6d", 0.68),
    green: blendTerminalColor(accent, "#62d98b", 0.58),
    yellow: blendTerminalColor(accent, "#f2c55c", 0.68),
    blue: blendTerminalColor(accent, "#66a8ff", 0.62),
    magenta: blendTerminalColor(accent, "#c58cff", 0.58),
    cyan: blendTerminalColor(accent, "#58d4dc", 0.58),
    white: foreground,
    brightBlack: muted,
    brightRed: blendTerminalColor(accent, "#ff8892", 0.78),
    brightGreen: blendTerminalColor(accent, "#8ce6a8", 0.72),
    brightYellow: blendTerminalColor(accent, "#ffe08a", 0.76),
    brightBlue: blendTerminalColor(accent, "#91c3ff", 0.72),
    brightMagenta: blendTerminalColor(accent, "#d7adff", 0.7),
    brightCyan: blendTerminalColor(accent, "#8fe8ed", 0.68),
    brightWhite: "#ffffff"
  };
}

function remoteWorkspaceLabel(workspace) {
  if (!workspace || workspace.type !== "ssh" || !workspace.remote) return workspace ? workspace.root : "";
  const remote = workspace.remote;
  const target = remote.user ? `${remote.user}@${remote.host}` : remote.host;
  return `${target}:${remote.root || remote.path || "~"}`;
}

async function openSshDialog() {
  sshOpenedFromWorkspaceSetup = true;
  setWorkspaceAddMenu(false);
  cleanupSshAuthentication();
  sshStatus.textContent = "";
  sshStatus.className = "ssh-status";
  sshModalBackdrop.hidden = false;
  sshKnownHostSelect.innerHTML = '<option value="">Choose a known host…</option>';
  try {
    const result = await api.listSshHosts();
    for (const host of result.hosts || []) {
      const option = document.createElement("option");
      option.value = host;
      option.textContent = host;
      sshKnownHostSelect.appendChild(option);
    }
  } catch (error) {
  }
  requestAnimationFrame(() => sshHostInput.focus());
}

function closeSshDialog(returnToSetup = false) {
  cleanupSshAuthentication();
  sshModalBackdrop.hidden = true;
  connectSshButton.disabled = false;
  if (returnToSetup && sshOpenedFromWorkspaceSetup) {
    showWorkspaceSetupStep("source");
    setWorkspaceAddMenu(true);
  }
  if (returnToSetup) sshOpenedFromWorkspaceSetup = false;
}

function cleanupSshAuthentication() {
  if (sshAuthSession && !sshAuthSession.exited) {
    api.killSshAuthentication(sshAuthSession.id).catch(() => {});
  }
  if (sshAuthSession) {
    try {
      sshAuthSession.observer.disconnect();
      sshAuthSession.term.dispose();
    } catch (error) {
    }
  }
  sshAuthSession = null;
  sshAuthTerminal.innerHTML = "";
  sshAuthTerminalShell.hidden = true;
}

async function runSshAuthentication(remote) {
  cleanupSshAuthentication();
  sshAuthTerminalShell.hidden = false;
  const descriptor = await api.startSshAuthentication(remote, { cols: 96, rows: 9 });
  if (descriptor.reused) {
    sshAuthTerminalShell.hidden = true;
    return;
  }
  const term = new Terminal({
    allowProposedApi: false,
    allowTransparency: true,
    convertEol: true,
    cursorBlink: true,
    fontFamily: '"SFMono-Regular", "SF Mono", Menlo, Consolas, monospace',
    fontSize: 10,
    lineHeight: 1.2,
    rows: 9,
    scrollback: 600,
    theme: terminalThemeFromPalette()
  });
  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(sshAuthTerminal);
  term.onData((data) => api.writeSshAuthentication(descriptor.id, data));
  term.onResize(({ cols, rows }) => api.resizeSshAuthentication(descriptor.id, cols, rows));
  const observer = new ResizeObserver(() => {
    try {
      fitAddon.fit();
    } catch (error) {
    }
  });
  observer.observe(sshAuthTerminal);
  term.writeln(`\x1b[38;5;214m${descriptor.commandLabel}\x1b[0m`);

  const queuedData = pendingSshAuthData.get(descriptor.id) || [];
  queuedData.forEach((data) => term.write(data));
  pendingSshAuthData.delete(descriptor.id);

  const exitResult = await new Promise((resolve) => {
    sshAuthSession = { id: descriptor.id, term, fitAddon, observer, exited: false, resolve };
    requestAnimationFrame(() => {
      try {
        fitAddon.fit();
        term.focus();
      } catch (error) {
      }
    });
    if (pendingSshAuthExits.has(descriptor.id)) {
      const pending = pendingSshAuthExits.get(descriptor.id);
      pendingSshAuthExits.delete(descriptor.id);
      resolve(pending);
    }
  });

  if (Number(exitResult && exitResult.code) !== 0) {
    throw new Error("SSH authentication did not complete. Check the terminal prompt and your SSH key, then try again.");
  }
}

function formatSshConnectionError(error) {
  const message = String(error && error.message ? error.message : error || "");
  if (/Permission denied\s*\(publickey/i.test(message)) {
    return "SSH authentication was rejected. Check the authentication terminal and confirm the correct key or account.";
  }
  if (/Could not resolve hostname/i.test(message)) return "The SSH server could not be resolved. Check the host or your SSH config.";
  if (/Connection timed out|Operation timed out/i.test(message)) return "The SSH connection timed out. Check the server, VPN, and network.";
  if (/Remote path is not a directory/i.test(message)) {
    const match = message.match(/Remote path is not a directory:[^\r\n]*/i);
    return match ? match[0] : "The remote path is not a directory.";
  }
  return message
    .replace(/^Error invoking remote method '[^']+':\s*/i, "")
    .replace(/^Error:\s*/i, "")
    .split("\n")[0]
    .trim() || "SSH connection failed.";
}

function parseSshTarget(value) {
  const raw = String(value || "").trim();
  const at = raw.lastIndexOf("@");
  return at > 0 ? { user: raw.slice(0, at), host: raw.slice(at + 1) } : { user: "", host: raw };
}

async function connectSshWorkspace() {
  const remote = {
    user: sshUserInput.value.trim(),
    host: sshHostInput.value.trim(),
    path: sshPathInput.value.trim() || "~"
  };
  if (!remote.host) {
    sshStatus.textContent = "Enter a server first.";
    sshStatus.className = "ssh-status error";
    return;
  }
  connectSshButton.disabled = true;
  sshStatus.textContent = "Authenticating SSH connection…";
  sshStatus.className = "ssh-status";
  try {
    await runSshAuthentication(remote);
    sshStatus.textContent = "Authentication succeeded. Verifying the remote path and mirroring files…";
    const workspace = await api.connectSshWorkspace(remote);
    closeSshDialog(false);
    sshOpenedFromWorkspaceSetup = false;
    await prepareWorkspaceSetup(workspace);
    refreshSystemMetrics();
  } catch (error) {
    sshStatus.textContent = formatSshConnectionError(error);
    sshStatus.className = "ssh-status error";
    connectSshButton.disabled = false;
  }
}

async function loadWorkspaces({ preserveSelection = true } = {}) {
  workspaces = await api.listWorkspaces();
  const stored = localStorage.getItem("agentWorkbenchActiveWorkspace");
  if (!preserveSelection || !workspaces.some((workspace) => workspace.id === activeWorkspaceId)) {
    activeWorkspaceId = workspaces.some((workspace) => workspace.id === stored)
      ? stored
      : workspaces[0] && workspaces[0].id;
  }
  renderWorkspaces();
  renderWorkspaceAgentGrid();
  await refreshWorkspacePanels();
}

function renderWorkspaces() {
  workspaceList.innerHTML = "";
  for (const workspace of workspaces) {
    const item = document.createElement("div");
    item.className = "workspace-item";
    item.classList.toggle("active", workspace.id === activeWorkspaceId);
    item.classList.toggle("remote", workspace.type === "ssh");
    item.setAttribute("role", "tab");
    item.setAttribute("aria-selected", String(workspace.id === activeWorkspaceId));
    item.title = `${remoteWorkspaceLabel(workspace)}\nRight-click to rename`;

    const avatar = document.createElement("span");
    avatar.className = "workspace-avatar";
    avatar.textContent = workspace.type === "ssh" ? "⌘" : "▱";

    const copy = document.createElement("span");
    copy.className = "workspace-copy";
    const name = document.createElement("strong");
    name.textContent = workspace.name;
    const root = document.createElement("span");
    root.textContent = remoteWorkspaceLabel(workspace);
    copy.append(name, root);
    item.append(avatar, copy);
    makeInteractive(item, () => selectWorkspace(workspace.id));
    item.addEventListener("contextmenu", (event) => beginWorkspaceRename(event, item, workspace));
    workspaceList.appendChild(item);
  }

  const workspace = activeWorkspace();
  updateCommandCenterStatus();
  newCodexButton.disabled = !workspace;
  newClaudeButton.disabled = !workspace;
  openCodeButton.disabled = !workspace;
  newFileButton.disabled = !workspace;
  newFolderButton.disabled = !workspace;
  settingsWorkspacePath.textContent = workspace ? remoteWorkspaceLabel(workspace) : "No workspace selected";
  renderWorkspaceEditorTabs();
  setFooter("No workspace");
}

function beginWorkspaceRename(event, item, workspace) {
  event.preventDefault();
  event.stopPropagation();
  if (item.classList.contains("renaming")) return;
  item.classList.add("renaming");

  const copy = item.querySelector(".workspace-copy");
  const nameNode = copy.querySelector("strong");
  const input = document.createElement("input");
  input.className = "workspace-rename-input";
  input.type = "text";
  input.maxLength = 64;
  input.value = workspace.name;
  input.setAttribute("aria-label", `Rename ${workspace.name}`);
  nameNode.replaceWith(input);
  let finished = false;

  const restore = () => {
    if (!input.isConnected) return;
    input.replaceWith(nameNode);
    item.classList.remove("renaming");
  };

  const commit = async () => {
    if (finished) return;
    finished = true;
    const nextName = input.value.trim();
    if (!nextName || nextName === workspace.name) {
      restore();
      return;
    }
    try {
      await api.renameWorkspace(workspace.id, nextName);
      workspace.name = nextName;
      renderWorkspaces();
      showToast(`Renamed to ${nextName}`);
    } catch (error) {
      restore();
      showToast(error.message || String(error));
    }
  };

  input.addEventListener("keydown", (keyEvent) => {
    keyEvent.stopPropagation();
    if (keyEvent.key === "Enter") {
      keyEvent.preventDefault();
      commit();
    } else if (keyEvent.key === "Escape") {
      keyEvent.preventDefault();
      finished = true;
      restore();
    }
  });
  input.addEventListener("blur", commit);
  requestAnimationFrame(() => {
    input.focus();
    input.select();
  });
}

function beginEditorTabRename(event, tab, workspace) {
  event.preventDefault();
  event.stopPropagation();
  if (tab.classList.contains("renaming")) return;
  tab.classList.add("renaming");

  const label = tab.querySelector(".workspace-editor-label");
  const input = document.createElement("input");
  input.className = "workspace-editor-rename-input";
  input.type = "text";
  input.maxLength = 64;
  input.value = workspace.name;
  input.setAttribute("aria-label", `Rename ${workspace.name}`);
  label.replaceWith(input);
  let finished = false;

  const restore = () => {
    if (!input.isConnected) return;
    input.replaceWith(label);
    tab.classList.remove("renaming");
  };
  const commit = async () => {
    if (finished) return;
    finished = true;
    const nextName = input.value.trim();
    if (!nextName || nextName === workspace.name) {
      restore();
      return;
    }
    try {
      await api.renameWorkspace(workspace.id, nextName);
      workspace.name = nextName;
      renderWorkspaces();
      showToast(`Renamed to ${nextName}`);
    } catch (error) {
      restore();
      showToast(error.message || String(error));
    }
  };

  input.addEventListener("click", (clickEvent) => clickEvent.stopPropagation());
  input.addEventListener("keydown", (keyEvent) => {
    keyEvent.stopPropagation();
    if (keyEvent.key === "Enter") {
      keyEvent.preventDefault();
      commit();
    } else if (keyEvent.key === "Escape") {
      keyEvent.preventDefault();
      finished = true;
      restore();
    }
  });
  input.addEventListener("blur", commit);
  requestAnimationFrame(() => {
    input.focus();
    input.select();
  });
}

function openWorkspaceRemoveDialog(workspace) {
  pendingWorkspaceRemoval = workspace;
  const agentCount = Array.from(sessions.values()).filter((session) => session.workspaceId === workspace.id).length;
  workspaceRemoveName.textContent = workspace.name;
  workspaceRemoveDetail.textContent = agentCount
    ? `This removes the tab and stops ${agentCount} open ${agentCount === 1 ? "agent" : "agents"}.`
    : "This removes the workspace tab from Agent Workbench.";
  workspaceRemoveBackdrop.hidden = false;
  requestAnimationFrame(() => confirmWorkspaceRemoveButton.focus());
}

function closeWorkspaceRemoveDialog() {
  pendingWorkspaceRemoval = null;
  workspaceRemoveBackdrop.hidden = true;
  confirmWorkspaceRemoveButton.disabled = false;
}

async function confirmWorkspaceRemoval() {
  const workspace = pendingWorkspaceRemoval;
  if (!workspace) return;
  confirmWorkspaceRemoveButton.disabled = true;
  try {
    const workspaceSessions = Array.from(sessions.values()).filter((session) => session.workspaceId === workspace.id);
    for (const session of workspaceSessions) {
      try {
        await stopAgent(session.id);
      } catch (error) {
      }
    }
    await api.removeWorkspace(workspace.id);
    const layouts = workspaceLayoutMap();
    delete layouts[workspace.id];
    localStorage.setItem("agentWorkbenchWorkspaceLayouts", JSON.stringify(layouts));
    if (activeWorkspaceId === workspace.id) localStorage.removeItem("agentWorkbenchActiveWorkspace");
    closeWorkspaceRemoveDialog();
    await loadWorkspaces({ preserveSelection: false });
    if (activeWorkspaceId) localStorage.setItem("agentWorkbenchActiveWorkspace", activeWorkspaceId);
    showToast(`Removed ${workspace.name}`);
  } catch (error) {
    confirmWorkspaceRemoveButton.disabled = false;
    showToast(error.message || String(error));
  }
}

async function selectWorkspace(workspaceId) {
  if (workspaceId === activeWorkspaceId) return;
  closeOutputViewer();
  expandedFilePaths.clear();
  activeWorkspaceId = workspaceId;
  selectedFilePath = "";
  selectedFileKind = "directory";
  localStorage.setItem("agentWorkbenchActiveWorkspace", workspaceId);
  renderWorkspaces();
  renderWorkspaceAgentGrid();
  activeArtifactPath = "";
  resetArtifactPreview();
  await refreshWorkspacePanels();
  refreshSystemMetrics();
  syncPixelMode(true);
}

async function addWorkspace() {
  const workspace = await api.addWorkspace();
  if (!workspace) return;
  await prepareWorkspaceSetup(workspace);
}

async function refreshWorkspacePanels({ syncRemote = false } = {}) {
  const workspace = activeWorkspace();
  if (!workspace) {
    fileNodes = [];
    artifacts = [];
    renderFileTree();
    renderArtifacts();
    return;
  }
  setFooter(`Loading ${workspace.name}…`);
  if (syncRemote && workspace.type === "ssh") {
    setFooter(`Syncing ${workspace.name} over SSH…`);
    await api.syncWorkspace(workspace.id);
  }
  const [nextFiles, nextArtifacts] = await Promise.all([
    api.listFiles(workspace.id),
    api.listArtifacts(workspace.id)
  ]);
  fileNodes = nextFiles;
  artifacts = nextArtifacts;
  renderFileTree();
  renderArtifacts();
  setFooter(`${workspace.name} · ${artifacts.length} outputs`);
}

function renderFileTree() {
  fileTree.innerHTML = "";
  fileEmpty.hidden = Boolean(activeWorkspace());
  if (!activeWorkspace()) {
    fileEmpty.textContent = "Add a workspace to browse its files.";
  }
  fileNodes.forEach((node) => fileTree.appendChild(createFileTreeNode(node, 0)));
}

function selectFileTreeRow(row, node) {
  fileTree.querySelectorAll(".file-tree-row.selected").forEach((candidate) => candidate.classList.remove("selected"));
  row.classList.add("selected");
  selectedFilePath = node.relativePath;
  selectedFileKind = node.type;
}

function selectedFileParentPath() {
  if (!selectedFilePath) return "";
  if (selectedFileKind === "directory") return selectedFilePath;
  const parts = selectedFilePath.split("/");
  parts.pop();
  return parts.join("/");
}

function beginCreateWorkspaceEntry(kind) {
  if (!activeWorkspace()) {
    showToast("Open a workspace first.");
    return;
  }
  fileTree.querySelector(".file-create-row")?.remove();
  const parentPath = selectedFileParentPath();
  const row = document.createElement("div");
  row.className = "file-create-row";
  const icon = document.createElement("img");
  icon.src = `${MATERIAL_ICON_BASE}/${kind === "folder" ? "folder.svg" : "file.svg"}`;
  icon.alt = "";
  const input = document.createElement("input");
  input.type = "text";
  input.spellcheck = false;
  input.autocomplete = "off";
  input.placeholder = kind === "folder" ? "folder name" : "file name";
  input.setAttribute("aria-label", kind === "folder" ? "New folder name" : "New file name");
  row.append(icon, input);
  fileTree.prepend(row);

  let committing = false;
  const cancel = () => row.remove();
  const commit = async () => {
    if (committing) return;
    const name = input.value.trim();
    if (!name) {
      cancel();
      return;
    }
    committing = true;
    input.disabled = true;
    try {
      const created = await api.createWorkspaceEntry(activeWorkspaceId, parentPath, kind, name);
      selectedFilePath = created.relativePath;
      selectedFileKind = kind === "folder" ? "directory" : "file";
      await refreshWorkspacePanels();
      showToast(`${kind === "folder" ? "Folder" : "File"} created`);
      if (kind === "file") previewWorkspaceFile(activeWorkspaceId, created.relativePath);
    } catch (error) {
      committing = false;
      input.disabled = false;
      input.setAttribute("aria-invalid", "true");
      showToast(error.message || String(error));
      input.focus();
      input.select();
    }
  };
  input.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      commit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    }
  });
  requestAnimationFrame(() => input.focus());
}

function createFileTreeNode(node, depth) {
  const wrapper = document.createElement("div");
  wrapper.className = "file-tree-node";
  const row = document.createElement("div");
  row.className = `file-tree-row ${node.type}${node.artifact ? " artifact" : ""}`;
  row.setAttribute("role", "treeitem");
  row.classList.toggle("selected", node.relativePath === selectedFilePath);
  row.style.paddingLeft = `${4 + Math.min(depth, 12) * 12}px`;
  row.title = node.relativePath;

  const disclosure = document.createElement("span");
  disclosure.className = "file-disclosure";
  if (node.type === "directory") {
    disclosure.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>';
  }
  const icon = document.createElement("span");
  icon.className = "file-icon";
  const image = document.createElement("img");
  image.src = `${MATERIAL_ICON_BASE}/${node.type === "directory" ? folderIconName(node) : fileIconName(node)}`;
  image.alt = "";
  icon.appendChild(image);
  const name = document.createElement("span");
  name.textContent = node.name;
  row.append(disclosure, icon, name);
  wrapper.appendChild(row);
  row.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    selectFileTreeRow(row, node);
    api.showFileMenu(activeWorkspaceId, node.relativePath);
  });

  if (node.type === "directory") {
    const children = document.createElement("div");
    children.className = "file-tree-children";
    for (const child of node.children || []) children.appendChild(createFileTreeNode(child, depth + 1));
    const expanded = expandedFilePaths.has(node.relativePath);
    children.hidden = !expanded;
    disclosure.classList.toggle("expanded", expanded);
    makeInteractive(row, () => {
      selectFileTreeRow(row, node);
      const shouldExpand = children.hidden;
      children.hidden = !shouldExpand;
      disclosure.classList.toggle("expanded", shouldExpand);
      if (shouldExpand) expandedFilePaths.add(node.relativePath);
      else expandedFilePaths.delete(node.relativePath);
    });
    wrapper.appendChild(children);
  } else {
    makeInteractive(row, () => {
      selectFileTreeRow(row, node);
      previewWorkspaceFile(activeWorkspaceId, node.relativePath);
    });
  }
  return wrapper;
}

function fileIconName(node) {
  const name = String(node.name || "").toLowerCase();
  if (FILE_ICON_NAMES.has(name)) return FILE_ICON_NAMES.get(name);
  if (name.endsWith(".tar.gz")) return "zip.svg";
  const extension = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  return FILE_ICON_EXTENSIONS.get(extension) || "file.svg";
}

function folderIconName(node) {
  return FOLDER_ICON_NAMES.get(String(node.name || "").toLowerCase()) || "folder.svg";
}

function renderArtifacts() {
  artifactList.innerHTML = "";
  if (!artifacts.length) {
    renderArtifactSidebar();
    return;
  }

  for (const artifact of artifacts) {
    artifactList.appendChild(createArtifactItem(artifact));
  }
  renderArtifactSidebar();
}

function createAgentBrand(kind) {
  const mark = document.createElement("span");
  mark.className = `artifact-agent-mark ${kind || "imported"}`;
  if (kind === "codex" || kind === "claude") {
    const image = document.createElement("img");
    image.className = "brand-symbol";
    image.src = kind === "codex" ? "assets/openai-blossom.svg" : "assets/claude-symbol.svg";
    image.alt = "";
    mark.appendChild(image);
  } else {
    mark.textContent = kind === "shell" ? ">" : "·";
  }
  return mark;
}

function createArtifactItem(artifact, { compact = false } = {}) {
  const item = document.createElement("div");
  item.className = `artifact-item${compact ? " compact" : ""}`;
  item.classList.toggle("active", artifact.relativePath === activeArtifactPath);
  item.setAttribute("role", "button");
  item.title = artifact.relativePath;

  const thumb = document.createElement("span");
  thumb.className = `artifact-thumb ${artifact.kind}`;
  const iconImage = document.createElement("img");
  iconImage.src = `${MATERIAL_ICON_BASE}/${fileIconName(artifact)}`;
  iconImage.alt = "";
  thumb.appendChild(iconImage);

  const copy = document.createElement("span");
  copy.className = "artifact-copy";
  const name = document.createElement("strong");
  name.textContent = artifact.name;
  const detail = document.createElement("span");
  detail.className = "artifact-detail";
  const owner = document.createElement("span");
  owner.className = "artifact-owner";
  owner.append(createAgentBrand(artifact.agentKind));
  if (artifact.agentNumber) {
    const ownerNumber = document.createElement("span");
    ownerNumber.className = "artifact-agent-number";
    ownerNumber.textContent = String(artifact.agentNumber).padStart(2, "0");
    owner.appendChild(ownerNumber);
  }
  const ownerName = document.createElement("span");
  ownerName.textContent = artifact.agentName || "Imported";
  owner.appendChild(ownerName);
  const meta = document.createElement("span");
  meta.className = "artifact-meta";
  meta.textContent = `${formatBytes(artifact.size)} · ${timeAgo(artifact.modifiedAt)}`;
  detail.append(owner, meta);
  copy.append(name, detail);
  item.append(thumb, copy);
  makeInteractive(item, () => previewWorkspaceFile(activeWorkspaceId, artifact.relativePath));
  return item;
}

function renderArtifactSidebar() {
  if (!artifactSidebarList) return;
  artifactSidebarList.innerHTML = "";
  if (!artifacts.length) {
    artifactSidebarList.innerHTML = '<div class="sidebar-note">No generated files yet.</div>';
    return;
  }
  artifacts.forEach((artifact) => artifactSidebarList.appendChild(createArtifactItem(artifact, { compact: true })));
}

function resetArtifactPreview() {
  artifactPreview.innerHTML = `
    <div class="preview-empty">
      <strong>Outputs</strong>
    </div>
  `;
}

function escapeCodeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightedCodeHtml(source, extension) {
  const keywordSource = CODE_KEYWORDS.get(extension);
  if (!keywordSource) return escapeCodeHtml(source);
  const hashComments = [".py", ".rb", ".sh", ".bash", ".zsh", ".fish", ".yaml", ".yml", ".toml"].includes(extension);
  const sqlComments = extension === ".sql";
  const markupComments = [".html", ".htm", ".xml", ".svg"].includes(extension);
  const commentPattern = markupComments
    ? "<!--[\\s\\S]*?-->"
    : hashComments
      ? "#[^\\n]*"
      : sqlComments
        ? "--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/"
        : "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/";
  const stringPattern = "\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`";
  const numberPattern = "\\b(?:0x[\\da-fA-F]+|\\d+(?:\\.\\d+)?)\\b";
  const keywordPattern = keywordSource.trim().split(/\s+/).join("|");
  const matcher = new RegExp(`(${commentPattern})|(${stringPattern})|(${numberPattern})|\\b(${keywordPattern})\\b`, "gm");
  let output = "";
  let cursor = 0;
  for (const match of source.matchAll(matcher)) {
    output += escapeCodeHtml(source.slice(cursor, match.index));
    const tokenClass = match[1]
      ? "syntax-comment"
      : match[2]
        ? "syntax-string"
        : match[3]
          ? "syntax-number"
          : "syntax-keyword";
    output += `<span class="${tokenClass}">${escapeCodeHtml(match[0])}</span>`;
    cursor = match.index + match[0].length;
  }
  output += escapeCodeHtml(source.slice(cursor));
  return output;
}

function renderOutputContent(container, artifact, { expanded = false } = {}) {
  container.replaceChildren();
  if (artifact.kind === "image") {
    const image = document.createElement("img");
    image.src = artifact.dataUrl;
    image.alt = artifact.name;
    container.appendChild(image);
    return;
  }
  if (artifact.kind === "pdf" || [".html", ".htm"].includes(artifact.extension)) {
    const frame = document.createElement("iframe");
    frame.src = artifact.fileUrl;
    frame.title = artifact.name;
    container.appendChild(frame);
    return;
  }
  if (artifact.kind === "text") {
    const pre = document.createElement("pre");
    if (CODE_KEYWORDS.has(artifact.extension)) {
      pre.className = `syntax-code language-${artifact.extension.slice(1)}`;
      pre.innerHTML = highlightedCodeHtml(artifact.text, artifact.extension);
    } else {
      pre.textContent = artifact.text;
    }
    container.appendChild(pre);
    return;
  }

  const empty = document.createElement("div");
  empty.className = "preview-empty";
  const icon = document.createElement("span");
  icon.className = "preview-icon";
  icon.textContent = artifact.extension.replace(".", "").toUpperCase() || "FILE";
  const label = document.createElement("strong");
  label.textContent = expanded
    ? "This file type cannot be displayed inside Agent Workbench."
    : "No in-app preview available";
  empty.append(icon, label);
  container.appendChild(empty);
}

function openOutputViewer(artifact, workspaceId) {
  activeOutputArtifact = { ...artifact, workspaceId };
  outputViewerTitle.textContent = artifact.name;
  outputViewer.setAttribute("aria-label", `Expanded output: ${artifact.name}`);
  renderOutputContent(outputViewerContent, artifact, { expanded: true });
  outputViewer.hidden = false;
  document.querySelector(".agent-stage").classList.add("output-viewer-active");
  closeOutputViewerButton.focus();
}

function closeOutputViewer() {
  if (!outputViewer) return;
  outputViewer.hidden = true;
  outputViewerContent.replaceChildren();
  document.querySelector(".agent-stage").classList.remove("output-viewer-active");
  activeOutputArtifact = null;
}

async function previewWorkspaceFile(workspaceId, relativePath) {
  if (!workspaceId || !relativePath) return;
  if (workspaceId !== activeWorkspaceId) {
    activeWorkspaceId = workspaceId;
    localStorage.setItem("agentWorkbenchActiveWorkspace", workspaceId);
    renderWorkspaces();
    renderWorkspaceAgentGrid();
    await refreshWorkspacePanels();
  }

  try {
    const artifact = await api.readArtifact(workspaceId, relativePath);
    activeArtifactPath = relativePath;
    renderArtifacts();
    artifactPreview.innerHTML = "";

    const shellNode = document.createElement("div");
    shellNode.className = "artifact-preview-media";
    const toolbar = document.createElement("div");
    toolbar.className = "preview-toolbar";
    const title = document.createElement("strong");
    title.textContent = artifact.name;
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "output-expand-button";
    openButton.innerHTML = `
      <svg class="output-expand-icon" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M6 6 1.5 1.5M1.5 5V1.5H5M10 10l4.5 4.5M11 14.5h3.5V11"/>
      </svg>
    `;
    openButton.title = "Expand output";
    openButton.setAttribute("aria-label", "Expand output");
    openButton.addEventListener("click", () => openOutputViewer(artifact, workspaceId));
    toolbar.append(title, openButton);
    shellNode.appendChild(toolbar);

    const previewContent = document.createElement("div");
    previewContent.className = "artifact-preview-content";
    renderOutputContent(previewContent, artifact);
    shellNode.appendChild(previewContent);
    artifactPreview.appendChild(shellNode);
  } catch (error) {
    showToast(error.message || String(error));
  }
}

function buildAgentSlots() {
  agentGrid.innerHTML = "";
  for (let index = 0; index < slots.length; index += 1) {
    const slot = document.createElement("article");
    slot.className = "agent-slot empty";
    slot.dataset.slot = String(index);
    slot.style.order = String(index);
    renderEmptySlot(slot, index);
    agentGrid.appendChild(slot);
  }
  renderAgentSidebar();
}

function renderWorkspaceAgentGrid() {
  applyActiveWorkspaceLayout();
  const workspaceSessions = Array.from(sessions.values())
    .filter((session) => session.workspaceId === activeWorkspaceId)
    .sort((left, right) => left.slotIndex - right.slotIndex);
  const sessionsBySlot = new Map(workspaceSessions.map((session) => [session.slotIndex, session]));

  agentGrid.classList.remove("has-maximized");
  agentGrid.replaceChildren();
  slots.fill(null);

  for (let index = 0; index < slots.length; index += 1) {
    const session = sessionsBySlot.get(index);
    if (session) {
      session.slot.dataset.slot = String(index);
      session.slot.style.order = String(index);
      slots[index] = session.id;
      agentGrid.appendChild(session.slot);
      continue;
    }

    const slot = document.createElement("article");
    slot.className = "agent-slot empty";
    slot.dataset.slot = String(index);
    slot.style.order = String(index);
    renderEmptySlot(slot, index);
    agentGrid.appendChild(slot);
  }

  updateAgentEta();
  renderAgentSidebar();
  requestAnimationFrame(() => {
    for (const session of workspaceSessions) {
      try {
        session.fitAddon.fit();
      } catch (error) {
      }
    }
  });
}

function renderEmptySlot(slot, index) {
  slot.className = "agent-slot empty";
  slot.innerHTML = "";
  const launcher = document.createElement("div");
  launcher.className = "agent-launcher";
  const number = document.createElement("span");
  number.className = "slot-number";
  number.textContent = String(index + 1).padStart(2, "0");
  const input = document.createElement("textarea");
  input.className = "agent-task-input";
  input.placeholder = `Task for Agent ${String(index + 1).padStart(2, "0")}…`;
  input.rows = 3;
  input.spellcheck = true;
  input.setAttribute("aria-label", `Task for Agent ${String(index + 1).padStart(2, "0")}`);
  const buttons = document.createElement("div");
  buttons.className = "launcher-buttons";
  for (const kind of ["codex", "claude", "shell"]) {
    const button = document.createElement("button");
    button.className = `launcher-button ${kind}`;
    button.type = "button";
    if (kind === "shell") {
      button.textContent = "›_";
    } else {
      const image = document.createElement("img");
      image.className = "brand-symbol";
      image.src = kind === "codex" ? "assets/openai-blossom.svg" : "assets/claude-symbol.svg";
      image.alt = "";
      button.appendChild(image);
    }
    button.title = `Start ${kind}`;
    button.setAttribute("aria-label", `Start ${kind}`);
    button.addEventListener("click", () => startAgent(index, kind, input.value));
    buttons.appendChild(button);
  }
  const resizeTaskInput = () => {
    input.style.height = "auto";
    input.style.height = `${Math.min(96, Math.max(58, input.scrollHeight))}px`;
  };
  input.addEventListener("input", resizeTaskInput);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      const defaultKind = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
      startAgent(index, ["codex", "claude", "shell"].includes(defaultKind) ? defaultKind : "codex", input.value);
    }
  });
  launcher.append(number, input, buttons);
  slot.appendChild(launcher);
  requestAnimationFrame(resizeTaskInput);
  renderAgentSidebar();
}

async function startAgent(slotIndex, kind, task = "") {
  const workspace = activeWorkspace();
  if (!workspace) {
    showToast("Add or select a workspace first.");
    return;
  }
  if (slots[slotIndex]) return;
  const slot = agentGrid.querySelector(`[data-slot="${slotIndex}"]`);
  slot.classList.add("loading");
  setFooter(`Starting ${kind}…`);

  try {
    const descriptor = await api.createAgent(workspace.id, kind, task, slotIndex, { cols: 90, rows: 20 });
    slots[slotIndex] = descriptor.id;
    renderAgentCard(slot, slotIndex, descriptor);
    renderAgentSidebar();
    setFooter(`${descriptor.metadata.name} started in ${workspace.name}`);
  } catch (error) {
    slot.classList.remove("loading");
    showToast(error.message || String(error));
    setFooter("Could not start agent");
  }
}

function renderAgentCard(slot, slotIndex, descriptor) {
  slot.className = "agent-slot";
  slot.innerHTML = `
    <div class="agent-card">
      <header class="agent-card-header">
        <span class="agent-kind"></span>
        <span class="agent-number">${String(slotIndex + 1).padStart(2, "0")}</span>
        <input class="agent-name-input" maxlength="48" aria-label="Agent name">
        <div class="agent-actions">
          <button class="agent-action agent-more" type="button" title="More actions" aria-label="More actions">⋯</button>
          <button class="agent-action agent-maximize" type="button" title="Maximize agent" aria-label="Maximize agent">${AGENT_MAXIMIZE_ICON}</button>
          <button class="agent-action agent-wide" type="button" title="Swap left or right" aria-label="Swap left or right">
            <svg class="agent-swap-icon" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2.5 5.5h11M11 3l2.5 2.5L11 8M15.5 12.5h-11M7 10l-2.5 2.5L7 15"/>
            </svg>
          </button>
          <button class="agent-action agent-tall" type="button" title="Swap up or down" aria-label="Swap up or down">
            <svg class="agent-swap-icon" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M5.5 15.5v-11M3 7l2.5-2.5L8 7M12.5 2.5v11M10 11l2.5 2.5L15 11"/>
            </svg>
          </button>
          <button class="agent-action agent-close" type="button" title="Stop agent" aria-label="Stop agent">×</button>
        </div>
      </header>
      <div class="agent-action-menu" role="menu" hidden>
        <div class="agent-menu-item clear-terminal" role="menuitem" tabindex="0"><span>⌫</span><span>Clear terminal</span></div>
        <div class="agent-menu-item stop-terminal" role="menuitem" tabindex="0"><span>×</span><span>Stop agent</span></div>
      </div>
      <div class="agent-summary">
        <span class="agent-tldr"></span>
      </div>
      <div class="terminal-host"></div>
      <footer class="agent-recent-footer" hidden>
        <div class="recent-files" aria-label="Relevant files reported by this agent"></div>
      </footer>
    </div>
  `;

  const kindBadge = slot.querySelector(".agent-kind");
  kindBadge.classList.add(descriptor.kind);
  if (descriptor.kind === "shell") {
    kindBadge.textContent = ">";
  } else {
    const image = document.createElement("img");
    image.className = "brand-symbol";
    image.src = descriptor.kind === "codex" ? "assets/openai-blossom.svg" : "assets/claude-symbol.svg";
    image.alt = "";
    kindBadge.appendChild(image);
  }
  kindBadge.title = descriptor.kind;
  const nameInput = slot.querySelector(".agent-name-input");
  const tldrNode = slot.querySelector(".agent-tldr");
  const recentFooter = slot.querySelector(".agent-recent-footer");
  const recentFilesNode = slot.querySelector(".recent-files");
  const terminalHost = slot.querySelector(".terminal-host");

  const term = new Terminal({
    allowProposedApi: false,
    allowTransparency: true,
    convertEol: true,
    cursorBlink: booleanPreference("agentWorkbenchTerminalCursorBlink", true),
    fontFamily: '"SFMono-Regular", "SF Mono", Menlo, Consolas, monospace',
    fontSize: numericPreference("agentWorkbenchTerminalFontSize", 9, 8, 16),
    lineHeight: 1.15,
    scrollback: numericPreference("agentWorkbenchTerminalScrollback", 6000, 1000, 10000),
    theme: terminalThemeFromPalette()
  });
  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(terminalHost);
  term.onData((data) => api.writeAgent(descriptor.id, data));
  term.onResize(({ cols, rows }) => api.resizeAgent(descriptor.id, cols, rows));

  const observer = new ResizeObserver(() => {
    try {
      fitAddon.fit();
    } catch (error) {
    }
  });
  observer.observe(terminalHost);

  const session = {
    id: descriptor.id,
    kind: descriptor.kind,
    workspaceId: descriptor.workspaceId,
    slotIndex,
    descriptor,
    metadata: descriptor.metadata,
    slot,
    term,
    fitAddon,
    observer,
    nameInput,
    tldrNode,
    recentFooter,
    recentFilesNode,
    actionMenu: slot.querySelector(".agent-action-menu"),
    lastPreviewFile: "",
    exited: false,
    finishNotified: descriptor.metadata.status === "done"
  };
  sessions.set(descriptor.id, session);
  updateAgentMetadata(session, descriptor.metadata);
  term.writeln(`\x1b[38;5;114m${descriptor.commandLabel}\x1b[0m`);
  term.writeln(`\x1b[38;5;244m${descriptor.cwd}\x1b[0m`);
  const pending = pendingTerminalData.get(descriptor.id) || [];
  pending.forEach((data) => term.write(data));
  pendingTerminalData.delete(descriptor.id);

  nameInput.addEventListener("change", () => api.renameAgent(descriptor.id, nameInput.value));
  nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nameInput.blur();
    }
  });
  slot.querySelector(".agent-close").addEventListener("click", () => stopAgent(descriptor.id));
  slot.querySelector(".agent-more").addEventListener("click", (event) => {
    event.stopPropagation();
    session.actionMenu.hidden = !session.actionMenu.hidden;
  });
  slot.querySelector(".agent-maximize").addEventListener("click", () => toggleAgentLayout(session, "maximized"));
  slot.querySelector(".agent-wide").addEventListener("click", () => swapAgentSlot(session, "horizontal"));
  slot.querySelector(".agent-tall").addEventListener("click", () => swapAgentSlot(session, "vertical"));
  makeInteractive(slot.querySelector(".clear-terminal"), () => {
    term.clear();
    session.actionMenu.hidden = true;
  });
  makeInteractive(slot.querySelector(".stop-terminal"), () => stopAgent(descriptor.id));

  requestAnimationFrame(() => {
    try {
      fitAddon.fit();
      term.focus();
    } catch (error) {
    }
  });
}

function toggleAgentLayout(session, mode) {
  const wasActive = session.slot.classList.contains(mode);
  session.slot.classList.remove("maximized");
  agentGrid.classList.remove("has-maximized");
  if (!wasActive) {
    session.slot.classList.add(mode);
    if (mode === "maximized") agentGrid.classList.add("has-maximized");
  }
  updateAgentMaximizeControls();
  requestAnimationFrame(() => {
    for (const activeSession of sessions.values()) {
      try {
        activeSession.fitAddon.fit();
      } catch (error) {
      }
    }
  });
}

function focusAgentWindow(slotIndex) {
  setPixelMode(false);
  agentGrid.classList.remove("has-maximized");
  for (const candidate of sessions.values()) candidate.slot.classList.remove("maximized");
  const sessionId = slots[slotIndex];
  const session = sessionId ? sessions.get(sessionId) : null;
  if (session) {
    session.slot.classList.add("maximized");
    agentGrid.classList.add("has-maximized");
    updateAgentMaximizeControls();
    requestAnimationFrame(() => {
      try {
        session.fitAddon.fit();
        session.term.focus();
      } catch (error) {
      }
    });
    return;
  }
  updateAgentMaximizeControls();
  agentGrid.querySelector(`[data-slot="${slotIndex}"] .agent-task-input`)?.focus();
}

function updateAgentMaximizeControls() {
  for (const session of sessions.values()) {
    const button = session.slot.querySelector(".agent-maximize");
    if (!button) continue;
    const maximized = session.slot.classList.contains("maximized");
    button.innerHTML = maximized ? AGENT_RESTORE_ICON : AGENT_MAXIMIZE_ICON;
    button.title = maximized ? "Restore agent grid" : "Maximize agent";
    button.setAttribute("aria-label", button.title);
  }
}

function swapAgentSlot(session, axis) {
  const currentIndex = session.slotIndex;
  const targetIndex = axis === "horizontal"
    ? (currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1)
    : (currentIndex < 2 ? currentIndex + 2 : currentIndex - 2);
  const targetSlot = agentGrid.querySelector(`[data-slot="${targetIndex}"]`);
  if (!targetSlot) return;
  const targetId = slots[targetIndex];
  const targetSession = targetId ? sessions.get(targetId) : null;

  session.slot.dataset.slot = String(targetIndex);
  session.slot.style.order = String(targetIndex);
  session.slotIndex = targetIndex;
  session.slot.querySelector(".agent-number").textContent = String(targetIndex + 1).padStart(2, "0");
  targetSlot.dataset.slot = String(currentIndex);
  targetSlot.style.order = String(currentIndex);
  if (targetSession) {
    targetSession.slotIndex = currentIndex;
    targetSession.slot.querySelector(".agent-number").textContent = String(currentIndex + 1).padStart(2, "0");
  } else {
    renderEmptySlot(targetSlot, currentIndex);
  }
  slots[targetIndex] = session.id;
  slots[currentIndex] = targetId || null;
  updateAgentEta();
  renderAgentSidebar();
  syncPixelMode(true);
}

function renderAgentSidebar() {
  if (!agentSidebarList) return;
  agentSidebarList.innerHTML = "";
  for (let index = 0; index < slots.length; index += 1) {
    const id = slots[index];
    const session = id ? sessions.get(id) : null;
    const item = document.createElement("div");
    item.className = `agent-sidebar-item${session ? " active" : ""}`;
    item.setAttribute("role", "button");
    const number = document.createElement("span");
    number.className = "agent-sidebar-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = session ? (session.metadata.name || `${session.kind} agent`) : "Empty slot";
    const status = document.createElement("span");
    status.textContent = session ? (session.metadata.status || "working") : "Ready";
    copy.append(name, status);
    item.append(number, copy);
    makeInteractive(item, () => {
      const slot = agentGrid.querySelector(`[data-slot="${index}"]`);
      if (!slot) return;
      if (session) session.term.focus();
      else slot.querySelector(".agent-task-input")?.focus();
    });
    agentSidebarList.appendChild(item);
  }
}

function updateAgentEta() {
  const now = Date.now();
  for (const workspace of workspaces) {
    const etaGroup = workspaceEtaNodes.get(workspace.id);
    if (!etaGroup) continue;
    const count = workspaceLayoutFor(workspace.id);
    for (let index = 0; index < count; index += 1) {
      const item = etaGroup.querySelector(`[data-eta-slot="${index}"]`);
      if (!item) continue;
      const session = Array.from(sessions.values()).find((candidate) => (
        candidate.workspaceId === workspace.id && candidate.slotIndex === index
      ));
      const prefix = String(index + 1).padStart(2, "0");
      if (!session) {
        item.textContent = `${prefix} —`;
        item.title = `${workspace.name} · Agent ${prefix}: empty`;
        continue;
      }

      const status = session.metadata.status || "working";
      if (status === "done") {
        item.textContent = `${prefix} ✓`;
      } else if (status === "error") {
        item.textContent = `${prefix} err`;
      } else {
        const etaSeconds = remainingEtaSeconds(session, now);
        if (!Number.isFinite(etaSeconds)) {
          item.textContent = `${prefix} …`;
        } else {
          item.textContent = `${prefix} ${formatEtaClock(etaSeconds)}`;
        }
      }
      item.title = `${workspace.name} · ${session.metadata.name || `${session.kind} agent`}: ${item.textContent.slice(3)}`;
    }
  }
  updateCommandCenterStatus();
}

async function openReportedAgentPreview(session, relativePath) {
  const workspace = workspaces.find((item) => item.id === session.workspaceId);
  try {
    if (booleanPreference("agentWorkbenchAutoOpenOutput", true)) setOutputCollapsed(false);
    if (workspace && workspace.type === "ssh") {
      await api.syncWorkspace(session.workspaceId);
    }
    await previewWorkspaceFile(session.workspaceId, relativePath);
  } catch (error) {
    showToast(error.message || String(error));
  }
}

function updateAgentMetadata(session, metadata) {
  const previousStatus = session.metadata?.status || "";
  if (Object.prototype.hasOwnProperty.call(metadata, "etaMinutes")) {
    const etaMinutes = Number(metadata.etaMinutes);
    session.etaDeadline = Number.isFinite(etaMinutes) && etaMinutes > 0
      ? Date.now() + etaMinutes * 60 * 1000
      : null;
  }
  session.metadata = { ...session.metadata, ...metadata };
  const nextStatus = session.metadata.status || "";
  if (nextStatus !== "done") session.finishNotified = false;
  if (nextStatus === "done" && previousStatus !== "done" && !session.finishNotified) {
    session.finishNotified = true;
    notifyAgentFinished(session);
  }
  if (document.activeElement !== session.nameInput) {
    session.nameInput.value = session.metadata.name || `${session.kind} agent`;
  }
  session.tldrNode.textContent = session.metadata.tldr || "Waiting for an update.";
  session.recentFilesNode.innerHTML = "";

  const recentLimit = numericPreference("agentWorkbenchRecentFilesLimit", 40, 8, 40);
  const relevantFiles = Array.isArray(session.metadata.relevantFiles)
    ? session.metadata.relevantFiles.slice(0, recentLimit)
    : [];
  session.recentFooter.hidden = relevantFiles.length === 0;
  for (const relativePath of relevantFiles) {
    const item = document.createElement("div");
    item.className = "recent-file";
    item.setAttribute("role", "button");
    item.title = relativePath;
    const fileName = relativePath.split("/").pop();
    const icon = document.createElement("img");
    icon.className = "relevant-file-icon";
    icon.src = `${MATERIAL_ICON_BASE}/${fileIconName({ name: fileName })}`;
    icon.alt = "";
    const label = document.createElement("span");
    label.className = "relevant-file-name";
    label.textContent = fileName;
    item.append(icon, label);
    makeInteractive(item, () => previewWorkspaceFile(session.workspaceId, relativePath));
    session.recentFilesNode.appendChild(item);
  }
  const previewFile = typeof session.metadata.previewFile === "string"
    ? session.metadata.previewFile.trim()
    : "";
  if (previewFile && previewFile !== session.lastPreviewFile && booleanPreference("agentWorkbenchAutoPreview", true)) {
    session.lastPreviewFile = previewFile;
    openReportedAgentPreview(session, previewFile);
  }
  updateAgentEta();
  renderAgentSidebar();
  syncPixelSession(session);
  renderPixelAgentRoster();
  requestAnimationFrame(() => {
    try {
      session.fitAddon.fit();
    } catch (error) {
    }
  });
}

async function stopAgent(id) {
  const session = sessions.get(id);
  if (!session) return;
  postPixelMessage({ type: "agentClosed", id: session.slotIndex + 1 });
  pixelKnownAgentIds.delete(session.slotIndex + 1);
  await api.killAgent(id);
  session.observer.disconnect();
  session.term.dispose();
  sessions.delete(id);
  slots[session.slotIndex] = null;
  agentGrid.classList.remove("has-maximized");
  renderEmptySlot(session.slot, session.slotIndex);
  updateAgentEta();
  renderAgentSidebar();
  setFooter("Agent stopped");
  syncPixelMode(true);
  renderPixelAgentRoster();
}

function firstEmptySlot() {
  return slots.slice(0, activeWorkspaceLayout()).findIndex((value) => !value);
}

async function startFromToolbar(kind) {
  const slotIndex = firstEmptySlot();
  if (slotIndex === -1) {
    showToast(`All ${activeWorkspaceLayout()} agent slots are in use.`);
    return;
  }
  await startAgent(slotIndex, kind, "");
}

async function refreshUsage() {
  try {
    const usage = await api.getUsage();
    if (usage.codex.available) {
      const remaining = Math.round(usage.codex.remainingPercent);
      codexUsageText.textContent = `${remaining}% left${usage.codex.resetsAt ? ` · resets ${formatReset(usage.codex.resetsAt)}` : ""}`;
      codexUsageMeter.style.width = `${remaining}%`;
    } else {
      codexUsageText.textContent = "Usage unavailable";
      codexUsageMeter.style.width = "0";
    }

    settingsCodexUsage.textContent = codexUsageText.textContent;
  } catch (error) {
    codexUsageText.textContent = "Usage unavailable";
    settingsCodexUsage.textContent = codexUsageText.textContent;
  }
}

async function refreshSystemMetrics() {
  try {
    const metrics = await api.getSystemMetrics(activeWorkspaceId);
    const sourceLabel = metrics.source === "ssh"
      ? `● SSH ${metrics.label}`
      : metrics.source === "ssh-error"
        ? `○ SSH ${metrics.label}`
        : "● Local";
    metricSource.textContent = sourceLabel;
    metricSource.classList.toggle("error", metrics.source === "ssh-error");
    cpuUsageText.textContent = Number.isFinite(metrics.cpuPercent) ? `${Math.round(metrics.cpuPercent)}%` : "—";
    memoryUsageText.textContent = metrics.memoryTotalBytes
      ? `${formatCompactBytes(metrics.memoryUsedBytes)} / ${formatCompactBytes(metrics.memoryTotalBytes)}`
      : "—";
    gpuMetrics.innerHTML = "";
    gpuMetrics.title = metrics.gpuError ? `nvidia-smi: ${metrics.gpuError}` : "";
    for (const gpu of metrics.gpus || []) {
      const item = document.createElement("span");
      item.className = "gpu-metric";
      item.title = [
        gpu.name || `GPU ${gpu.index}`,
        metrics.gpuError ? `nvidia-smi: ${metrics.gpuError}` : ""
      ].filter(Boolean).join("\n");
      const utilization = Number.isFinite(gpu.utilizationPercent)
        ? `${Math.round(gpu.utilizationPercent)}%`
        : "—";
      const memory = Number.isFinite(gpu.memoryUsedMiB) && Number.isFinite(gpu.memoryTotalMiB)
        ? `${formatMiB(gpu.memoryUsedMiB)}/${formatMiB(gpu.memoryTotalMiB)}`
        : Number.isFinite(gpu.memoryTotalMiB)
          ? `—/${formatMiB(gpu.memoryTotalMiB)}`
          : "—";
      item.classList.toggle("muted", !gpu.metricsAvailable && !Number.isFinite(gpu.utilizationPercent));
      item.textContent = `GPU ${gpu.index} · VRAM ${memory} · UTIL ${utilization}`;
      gpuMetrics.appendChild(item);
    }
    if (metrics.source === "ssh" && !(metrics.gpus || []).length) {
      const empty = document.createElement("span");
      empty.className = "gpu-metric muted";
      empty.textContent = "GPU —";
      gpuMetrics.appendChild(empty);
    }
  } catch (error) {
    cpuUsageText.textContent = "—";
    memoryUsageText.textContent = "—";
  }
}

async function refreshSpotifyStatus() {
  if (spotifyRefreshBusy) return;
  spotifyRefreshBusy = true;
  try {
    const status = await api.getSpotifyStatus();
    const hasTrack = Boolean(status.running && status.name);
    spotifyNowPlaying.hidden = !hasTrack;
    if (!hasTrack) return;
    spotifyTrackName.textContent = status.name;
    spotifyTrackName.title = status.name;
    spotifyTrackDetail.textContent = [status.artist, status.album].filter(Boolean).join(" · ");
    spotifyTrackDetail.title = spotifyTrackDetail.textContent;
    const playing = status.state === "playing";
    spotifyNowPlaying.classList.toggle("playing", playing);
    const actionLabel = playing ? "Pause" : "Play";
    spotifyPlayPauseButton.title = actionLabel;
    spotifyPlayPauseButton.setAttribute("aria-label", actionLabel);
  } catch (error) {
    spotifyNowPlaying.hidden = true;
  } finally {
    spotifyRefreshBusy = false;
  }
}

async function controlSpotify(action) {
  try {
    await api.controlSpotify(action);
    setTimeout(refreshSpotifyStatus, 180);
  } catch (error) {
    showToast("Spotify is not available.");
  }
}

function refreshTitlebarTime() {
  const now = new Date();
  const label = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(now);
  titlebarTime.textContent = label;
  titlebarTime.dateTime = now.toISOString();
  titlebarTime.title = now.toLocaleString();
}

async function refreshPowerStatus() {
  const status = await api.getPowerStatus();
  titlebarBattery.hidden = !status.available;
  if (!status.available) return;
  const percent = Math.max(0, Math.min(100, Number(status.percent) || 0));
  titlebarBatteryText.textContent = `${Math.round(percent)}%`;
  titlebarBatteryFill.setAttribute("width", String(10.8 * percent / 100));
  titlebarBattery.classList.toggle("charging", Boolean(status.charging));
  titlebarBattery.title = `${Math.round(percent)}% · ${status.charged ? "charged" : status.charging ? "charging" : "on battery"}`;
}

function formatCompactBytes(value) {
  const bytes = Number(value) || 0;
  return `${(bytes / (1024 ** 3)).toFixed(bytes >= 10 * (1024 ** 3) ? 0 : 1)}G`;
}

function formatMiB(value) {
  const mib = Number(value) || 0;
  return mib >= 1024 ? `${(mib / 1024).toFixed(mib >= 10240 ? 0 : 1)}G` : `${Math.round(mib)}M`;
}

function formatReset(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function formatBytes(value) {
  const bytes = Number(value) || 0;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function timeAgo(value) {
  const elapsed = Date.now() - new Date(value).getTime();
  if (!Number.isFinite(elapsed) || elapsed < 0) return "now";
  if (elapsed < 60000) return "now";
  if (elapsed < 3600000) return `${Math.floor(elapsed / 60000)}m ago`;
  if (elapsed < 86400000) return `${Math.floor(elapsed / 3600000)}h ago`;
  return `${Math.floor(elapsed / 86400000)}d ago`;
}

function setupPanelResizing() {
  const root = document.documentElement;
  const savedFiles = Number(localStorage.getItem("agentWorkbenchFilesWidth"));
  const savedArtifacts = Number(localStorage.getItem("agentWorkbenchArtifactsWidth"));
  const rememberWidths = booleanPreference("agentWorkbenchRememberWidths", true);
  if (rememberWidths && savedFiles) root.style.setProperty("--files-width", `${Math.max(170, Math.min(380, savedFiles))}px`);
  if (rememberWidths && savedArtifacts) root.style.setProperty("--artifacts-width", `${Math.max(200, Math.min(500, savedArtifacts))}px`);

  const attach = (handle, property, storageKey, direction, min, max, collapsedClass, setCollapsed) => {
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      if (document.body.classList.contains(collapsedClass)) setCollapsed(false);
      const startX = event.clientX;
      const current = Number.parseFloat(getComputedStyle(root).getPropertyValue(property));
      const collapseThreshold = min - 30;
      let rawNext = current;
      document.body.classList.add("is-resizing");

      const move = (moveEvent) => {
        rawNext = current + (moveEvent.clientX - startX) * direction;
        handle.classList.toggle("collapse-ready", rawNext <= collapseThreshold);
        if (rawNext <= collapseThreshold) return;
        const next = Math.max(min, Math.min(max, rawNext));
        root.style.setProperty(property, `${next}px`);
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        document.body.classList.remove("is-resizing");
        handle.classList.remove("collapse-ready");
        if (rawNext <= collapseThreshold) {
          setCollapsed(true);
          return;
        }
        setCollapsed(false);
        const value = Number.parseFloat(getComputedStyle(root).getPropertyValue(property));
        if (booleanPreference("agentWorkbenchRememberWidths", true)) {
          localStorage.setItem(storageKey, String(Math.round(value)));
        }
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
  };

  attach(fileResizeHandle, "--files-width", "agentWorkbenchFilesWidth", 1, 170, 380, "files-collapsed", setFilesCollapsed);
  attach(artifactResizeHandle, "--artifacts-width", "agentWorkbenchArtifactsWidth", -1, 200, 500, "output-collapsed", setOutputCollapsed);
}

function scheduleWorkspaceRefresh(payload) {
  if (payload.workspaceId !== activeWorkspaceId) return;
  if (payload.remoteSyncError) {
    showToast(`SSH connected, but file sync failed: ${payload.remoteSyncError}`);
  }
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => refreshWorkspacePanels().catch(() => {}), 350);
}

activityButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    setSidebarView(button.dataset.activity);
  });
});
addWorkspaceButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (workspaceAddMenu.hidden) openWorkspaceSetup();
  else setWorkspaceAddMenu(false);
});
closeWorkspacePickerButton.addEventListener("click", () => setWorkspaceAddMenu(false));
workspaceAddMenu.addEventListener("click", (event) => {
  if (event.target === workspaceAddMenu) setWorkspaceAddMenu(false);
});
makeInteractive(addLocalWorkspaceOption, addWorkspace);
makeInteractive(addSshWorkspaceOption, openSshDialog);
workspaceLayoutOptions.forEach((option) => makeInteractive(option, () => selectPendingWorkspaceLayout(Number(option.dataset.layoutCount))));
workspaceSetupBackButton.addEventListener("click", () => showWorkspaceSetupStep("source"));
workspaceSetupNextButton.addEventListener("click", () => {
  if (!pendingWorkspaceSetup) return;
  saveWorkspaceLayout(pendingWorkspaceSetup.id, pendingWorkspaceLayout);
  showWorkspaceSetupStep("agents");
});
workspaceAgentsBackButton.addEventListener("click", () => showWorkspaceSetupStep("layout"));
workspaceSetupFinishButton.addEventListener("click", finishWorkspaceSetup);
makeInteractive(commandCenter, openCommandPalette);
commandPaletteInput.addEventListener("input", () => {
  commandPaletteSelection = 0;
  renderCommandPalette();
});
commandPaletteInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    commandPaletteSelection = Math.min(visiblePaletteCommands.length - 1, commandPaletteSelection + 1);
    renderCommandPalette();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    commandPaletteSelection = Math.max(0, commandPaletteSelection - 1);
    renderCommandPalette();
  } else if (event.key === "Enter") {
    event.preventDefault();
    runPaletteCommand();
  } else if (event.key === "Escape") {
    event.preventDefault();
    closeCommandPalette();
  }
});
commandPaletteBackdrop.addEventListener("click", (event) => {
  if (event.target === commandPaletteBackdrop) closeCommandPalette();
});
refreshArtifactsButton.addEventListener("click", () => refreshWorkspacePanels());
toggleOutputButton.addEventListener("click", () => setOutputCollapsed(!document.body.classList.contains("output-collapsed")));
toggleArtifactListButton.addEventListener("click", () => setArtifactListCollapsed(!document.body.classList.contains("output-files-collapsed")));
closeOutputPanelButton.addEventListener("click", () => setOutputCollapsed(true));
closeOutputViewerButton.addEventListener("click", closeOutputViewer);
toggleFilesButton.addEventListener("click", () => setFilesCollapsed(!document.body.classList.contains("files-collapsed")));
collapseFolderTreeButton.addEventListener("click", () => {
  expandedFilePaths.clear();
  renderFileTree();
});
closeWorkspaceRemoveButton.addEventListener("click", closeWorkspaceRemoveDialog);
cancelWorkspaceRemoveButton.addEventListener("click", closeWorkspaceRemoveDialog);
confirmWorkspaceRemoveButton.addEventListener("click", confirmWorkspaceRemoval);
workspaceRemoveBackdrop.addEventListener("click", (event) => {
  if (event.target === workspaceRemoveBackdrop) closeWorkspaceRemoveDialog();
});
newFileButton.addEventListener("click", () => beginCreateWorkspaceEntry("file"));
newFolderButton.addEventListener("click", () => beginCreateWorkspaceEntry("folder"));
newCodexButton.addEventListener("click", () => startFromToolbar("codex"));
newClaudeButton.addEventListener("click", () => startFromToolbar("claude"));
openCodeButton.addEventListener("click", async () => {
  if (activeWorkspaceId) await api.openInCode(activeWorkspaceId);
});
pixelModeButton.addEventListener("click", () => setPixelMode(!pixelModeEnabled));
spotifyPreviousButton.addEventListener("click", () => controlSpotify("previous"));
spotifyPlayPauseButton.addEventListener("click", () => controlSpotify("playpause"));
spotifyNextButton.addEventListener("click", () => controlSpotify("next"));
notificationButton.addEventListener("click", () => {
  unreadAgentNotifications = 0;
  renderNotificationBell();
  showToast("Agent notifications cleared.");
});
openSettingsButton.addEventListener("click", openSettings);
closeSettingsButton.addEventListener("click", closeSettings);
settingsOverlay.addEventListener("click", (event) => {
  if (event.target === settingsOverlay) closeSettings();
});
settingsNavItems.forEach((item) => makeInteractive(item, () => showSettingsPage(item.dataset.settingsTarget)));
appearanceCategories.forEach((category) => makeInteractive(category, () => selectAppearanceCategory(category.textContent.trim())));
themeOptions.forEach((option) => makeInteractive(option, () => selectTheme(option.dataset.theme)));
pdfOptions.forEach((option) => makeInteractive(option, () => {
  pdfOptions.forEach((item) => item.classList.toggle("active", item === option));
  localStorage.setItem("agentWorkbenchPdfMode", option.dataset.pdfMode);
}));
settingsDefaultLayout.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchDefaultLayout", settingsDefaultLayout.value);
});
settingsRememberWidths.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchRememberWidths", settingsRememberWidths.checked ? "1" : "0");
});
settingsDefaultAgent.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchDefaultAgent", settingsDefaultAgent.value);
});
settingsAutoPreview.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchAutoPreview", settingsAutoPreview.checked ? "1" : "0");
});
settingsShowTldr.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchShowTldr", settingsShowTldr.checked ? "1" : "0");
  applyWorkbenchPreferences();
});
settingsRecentFilesLimit.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchRecentFilesLimit", settingsRecentFilesLimit.value);
  applyWorkbenchPreferences();
});
settingsTerminalFontSize.addEventListener("input", () => {
  localStorage.setItem("agentWorkbenchTerminalFontSize", settingsTerminalFontSize.value);
  applyTerminalPreferences();
});
settingsTerminalScrollback.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchTerminalScrollback", settingsTerminalScrollback.value);
  applyTerminalPreferences();
});
settingsTerminalCursorBlink.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchTerminalCursorBlink", settingsTerminalCursorBlink.checked ? "1" : "0");
  applyTerminalPreferences();
});
settingsAutoOpenOutput.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchAutoOpenOutput", settingsAutoOpenOutput.checked ? "1" : "0");
});
settingsCompactOutputs.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchCompactOutputs", settingsCompactOutputs.checked ? "1" : "0");
  applyWorkbenchPreferences();
});
settingsMetricsInterval.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchMetricsInterval", settingsMetricsInterval.value);
  restartSystemMetricsTimer();
});
settingsReduceMotion.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchReduceMotion", settingsReduceMotion.checked ? "1" : "0");
  applyWorkbenchPreferences();
});
settingsSearchInput.addEventListener("input", () => {
  const query = settingsSearchInput.value.trim().toLowerCase();
  if (!document.querySelector('[data-settings-page="appearance"]').hidden) {
    refreshThemeOptionVisibility(query);
    return;
  }
  const activePage = settingsPages.find((page) => !page.hidden);
  activePage?.querySelectorAll(".settings-controls > *").forEach((row) => {
    row.hidden = Boolean(query) && !row.textContent.toLowerCase().includes(query);
  });
});
closeSshDialogButton.addEventListener("click", () => closeSshDialog(true));
cancelSshButton.addEventListener("click", () => closeSshDialog(true));
connectSshButton.addEventListener("click", connectSshWorkspace);
sshKnownHostSelect.addEventListener("change", () => {
  if (!sshKnownHostSelect.value) return;
  const target = parseSshTarget(sshKnownHostSelect.value);
  if (target.user) sshUserInput.value = target.user;
  sshHostInput.value = target.host;
});
sshModalBackdrop.addEventListener("click", (event) => {
  if (event.target === sshModalBackdrop) closeSshDialog(true);
});
document.addEventListener("click", (event) => {
  if (!workspaceAddMenu.contains(event.target) && event.target !== addWorkspaceButton) setWorkspaceAddMenu(false);
  for (const session of sessions.values()) {
    if (!session.actionMenu.contains(event.target) && !session.slot.querySelector(".agent-more").contains(event.target)) {
      session.actionMenu.hidden = true;
    }
  }
});

window.addEventListener("message", (event) => {
  if (event.source !== pixelModeFrame.contentWindow) return;
  const envelope = event.data;
  if (!envelope || envelope.source !== "agent-workbench-pixel-mode" || !envelope.message) return;
  const message = envelope.message;
  if (message.type === "webviewReady") {
    pixelFrameReady = true;
    syncPixelMode(true);
    return;
  }
  if (message.type === "launchAgent") {
    const kind = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
    startFromToolbar(["codex", "claude", "shell"].includes(kind) ? kind : "codex");
    return;
  }
  if (message.type === "focusAgent") {
    const session = activePixelSessions().find((candidate) => candidate.slotIndex + 1 === Number(message.id));
    if (session) focusAgentWindow(session.slotIndex);
    return;
  }
  if (message.type === "closeAgent") {
    const session = activePixelSessions().find((candidate) => candidate.slotIndex + 1 === Number(message.id));
    if (session) stopAgent(session.id);
    return;
  }
  if (message.type === "saveLayout" && message.layout) {
    localStorage.setItem("agentWorkbenchPixelLayout", JSON.stringify(message.layout));
    return;
  }
  if (message.type === "saveAgentSeats" && message.seats) {
    localStorage.setItem("agentWorkbenchPixelSeats", JSON.stringify(message.seats));
    return;
  }
  if (["setSoundEnabled", "setAlwaysShowLabels", "setShowAreas"].includes(message.type)) {
    localStorage.setItem(`agentWorkbenchPixel:${message.type}`, message.enabled ? "1" : "0");
  }
});

api.onAgentData(({ id, data }) => {
  const session = sessions.get(id);
  if (session) {
    session.term.write(data);
  } else {
    const pending = pendingTerminalData.get(id) || [];
    pending.push(data);
    pendingTerminalData.set(id, pending.slice(-120));
  }
});
api.onAgentExit(({ id, code, signal }) => {
  const session = sessions.get(id);
  if (!session) return;
  session.exited = true;
  const previousStatus = session.metadata.status || "";
  const finalStatus = code === 0 && !signal ? "done" : "error";
  session.metadata.status = finalStatus;
  session.metadata.etaMinutes = 0;
  session.term.writeln("");
  session.term.writeln(`\x1b[38;5;244m[process exited: ${signal || code || 0}]\x1b[0m`);
  updateAgentEta();
  renderAgentSidebar();
  syncPixelSession(session);
  if (finalStatus === "done" && previousStatus !== "done" && !session.finishNotified) {
    session.finishNotified = true;
    notifyAgentFinished(session);
  }
});
api.onAgentMetadata((metadata) => {
  const session = sessions.get(metadata.id);
  if (session) updateAgentMetadata(session, metadata);
});
api.onSshAuthenticationData(({ id, data }) => {
  if (sshAuthSession && sshAuthSession.id === id) {
    sshAuthSession.term.write(data);
    return;
  }
  const pending = pendingSshAuthData.get(id) || [];
  pending.push(data);
  pendingSshAuthData.set(id, pending.slice(-80));
});
api.onSshAuthenticationExit((payload) => {
  if (sshAuthSession && sshAuthSession.id === payload.id) {
    sshAuthSession.exited = true;
    const resolve = sshAuthSession.resolve;
    sshAuthSession.resolve = null;
    if (resolve) resolve(payload);
    return;
  }
  pendingSshAuthExits.set(payload.id, payload);
});
api.onWorkspaceChanged(scheduleWorkspaceRefresh);

window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && /^[1-4]$/.test(event.key)) {
    event.preventDefault();
    focusAgentWindow(Number(event.key) - 1);
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "p") {
    event.preventDefault();
    if (commandPaletteBackdrop.hidden) openCommandPalette();
    else closeCommandPalette();
    return;
  }
  if (event.key === "Escape") {
    if (!workspaceRemoveBackdrop.hidden) {
      closeWorkspaceRemoveDialog();
      return;
    }
    if (!outputViewer.hidden) {
      closeOutputViewer();
      return;
    }
    if (!commandPaletteBackdrop.hidden) {
      closeCommandPalette();
      return;
    }
    if (!settingsOverlay.hidden) {
      closeSettings();
      return;
    }
    if (!sshModalBackdrop.hidden) {
      closeSshDialog(true);
      return;
    }
    setWorkspaceAddMenu(false);
    for (const session of sessions.values()) session.actionMenu.hidden = true;
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (!workspaces.length) return;
    const currentIndex = Math.max(0, workspaces.findIndex((workspace) => workspace.id === activeWorkspaceId));
    selectWorkspace(workspaces[(currentIndex + 1) % workspaces.length].id);
  }
});

window.addEventListener("beforeunload", () => {
  if (spotifyTimer) clearInterval(spotifyTimer);
  if (titlebarClockTimer) clearInterval(titlebarClockTimer);
  if (powerStatusTimer) clearInterval(powerStatusTimer);
  if (etaTimer) clearInterval(etaTimer);
  for (const session of sessions.values()) session.observer.disconnect();
});

async function initialize() {
  buildAgentSlots();
  initializeSettings();
  initializeWorkbenchSettings();
  setFilesCollapsed(localStorage.getItem("agentWorkbenchFilesCollapsed") === "1");
  setOutputCollapsed(localStorage.getItem("agentWorkbenchOutputCollapsed") === "1");
  setArtifactListCollapsed(localStorage.getItem("agentWorkbenchOutputFilesCollapsed") === "1");
  setupPanelResizing();
  setSidebarView("explorer");
  renderNotificationBell();
  await loadWorkspaces();
  setPixelMode(localStorage.getItem("agentWorkbenchPixelMode") === "1", { persist: false });
  await refreshUsage();
  await refreshSystemMetrics();
  refreshTitlebarTime();
  await refreshPowerStatus();
  await refreshSpotifyStatus();
  setInterval(refreshUsage, 60000);
  titlebarClockTimer = setInterval(refreshTitlebarTime, 15000);
  powerStatusTimer = setInterval(refreshPowerStatus, 60000);
  etaTimer = setInterval(updateAgentEta, 1000);
  spotifyTimer = setInterval(refreshSpotifyStatus, 5000);
  restartSystemMetricsTimer();
}

initialize().catch((error) => {
  showToast(error.message || String(error));
  setFooter("Initialization failed");
});
