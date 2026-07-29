const api = window.agentWorkbench;

const commandPaletteBackdrop = document.getElementById("commandPaletteBackdrop");
const commandPaletteInput = document.getElementById("commandPaletteInput");
const commandPaletteResults = document.getElementById("commandPaletteResults");
const commandCenter = document.getElementById("commandCenter");
const workspaceBackButton = document.getElementById("workspaceBackButton");
const workspaceForwardButton = document.getElementById("workspaceForwardButton");
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
const mainLayout = document.getElementById("mainLayout");
const sidebarViewTitle = document.getElementById("sidebarViewTitle");
const sidebarViewToggleButton = document.getElementById("sidebarViewToggleButton");
const fileViewActions = Array.from(document.querySelectorAll(".file-view-action"));
const workspaceViewActions = Array.from(document.querySelectorAll(".workspace-view-action"));
const fileTree = document.getElementById("fileTree");
const fileEmpty = document.getElementById("fileEmpty");
const collapseFolderTreeButton = document.getElementById("collapseFolderTreeButton");
const newFileButton = document.getElementById("newFileButton");
const newFolderButton = document.getElementById("newFolderButton");
const agentGrid = document.getElementById("agentGrid");
const openChromeButton = document.getElementById("openChromeButton");
const openOpenleafButton = document.getElementById("openOpenleafButton");
const openCodeButton = document.getElementById("openCodeButton");
const openNotepadButton = document.getElementById("openNotepadButton");
const globalZenButton = document.getElementById("globalZenButton");
const cinematicModeButton = document.getElementById("cinematicModeButton");
const cinematicExitButton = document.getElementById("cinematicExitButton");
const cinematicNextSceneButton = document.getElementById("cinematicNextSceneButton");
const pixelModeButton = document.getElementById("pixelModeButton");
const pixelModeView = document.getElementById("pixelModeView");
const pixelModeFrame = document.getElementById("pixelModeFrame");
const pixelViewLoader = document.getElementById("pixelViewLoader");
const pixelLoaderAnimation = document.getElementById("pixelLoaderAnimation");
const pixelViewLoaderStatus = document.getElementById("pixelViewLoaderStatus");
const pixelFloorLauncher = document.getElementById("pixelFloorLauncher");
const pixelFloorLauncherNumber = document.getElementById("pixelFloorLauncherNumber");
const pixelFloorTaskInput = document.getElementById("pixelFloorTaskInput");
const pixelFloorLauncherButtons = Array.from(document.querySelectorAll(".pixel-floor-launcher-buttons [data-agent-kind]"));
const pixelAgentRosterCount = document.getElementById("pixelAgentRosterCount");
const pixelAgentRosterList = document.getElementById("pixelAgentRosterList");
const pixelAgentClipboard = document.getElementById("pixelAgentClipboard");
const pixelAgentClipboardButton = document.getElementById("pixelAgentClipboardButton");
const pixelAgentClipboardCount = document.getElementById("pixelAgentClipboardCount");
const closePixelAgentClipboardButton = document.getElementById("closePixelAgentClipboardButton");
const pixelAgentDetail = document.getElementById("pixelAgentDetail");
const pixelAgentDetailAvatar = document.getElementById("pixelAgentDetailAvatar");
const pixelAgentDetailName = document.getElementById("pixelAgentDetailName");
const pixelAgentDetailMeta = document.getElementById("pixelAgentDetailMeta");
const pixelAgentDetailTask = document.getElementById("pixelAgentDetailTask");
const pixelAgentDetailChecklist = document.getElementById("pixelAgentDetailChecklist");
const pixelAgentDetailFiles = document.getElementById("pixelAgentDetailFiles");
const closePixelAgentDetailButton = document.getElementById("closePixelAgentDetailButton");
const pixelAgentDetailPrompt = document.getElementById("pixelAgentDetailPrompt");
const pixelAgentDetailSendButton = document.getElementById("pixelAgentDetailSendButton");
const pixelAgentDetailStatusButton = document.getElementById("pixelAgentDetailStatusButton");
const pixelAgentDetailInterruptButton = document.getElementById("pixelAgentDetailInterruptButton");
const pixelAgentDetailTerminalButton = document.getElementById("pixelAgentDetailTerminalButton");
const pixelPetDetail = document.getElementById("pixelPetDetail");
const pixelPetDetailAvatar = document.getElementById("pixelPetDetailAvatar");
const pixelPetDetailName = document.getElementById("pixelPetDetailName");
const pixelPetDetailMeta = document.getElementById("pixelPetDetailMeta");
const pixelPetHpFill = document.getElementById("pixelPetHpFill");
const pixelPetHpText = document.getElementById("pixelPetHpText");
const pixelPetEnergyFill = document.getElementById("pixelPetEnergyFill");
const pixelPetEnergyText = document.getElementById("pixelPetEnergyText");
const pixelPetLevel = document.getElementById("pixelPetLevel");
const pixelPetMood = document.getElementById("pixelPetMood");
const pixelPetSnack = document.getElementById("pixelPetSnack");
const pixelPetHobbies = document.getElementById("pixelPetHobbies");
const pixelPetTrait = document.getElementById("pixelPetTrait");
const pixelPetTalent = document.getElementById("pixelPetTalent");
const closePixelPetDetailButton = document.getElementById("closePixelPetDetailButton");
const pixelFloorList = document.getElementById("pixelFloorList");
const pixelSkyToggleButton = document.getElementById("pixelSkyToggleButton");
const pixelRefreshButton = document.getElementById("pixelRefreshButton");
const pixelExitButton = document.getElementById("pixelExitButton");
const pixelAddFloorButton = document.getElementById("pixelAddFloorButton");
const pixelDeleteFloorButton = document.getElementById("pixelDeleteFloorButton");
let pixelFloorButtons = [];
const runPauseAllButton = document.getElementById("runPauseAllButton");
const quickAddAgentButton = document.getElementById("quickAddAgentButton");
const stopAllAgentsButton = document.getElementById("stopAllAgentsButton");
const retryFailedAgentsButton = document.getElementById("retryFailedAgentsButton");
const askStatusButton = document.getElementById("askStatusButton");
const focusModeButton = document.getElementById("focusModeButton");
const stageAgentCount = document.getElementById("stageAgentCount");
const artifactList = document.getElementById("artifactList");
const artifactPreview = document.getElementById("artifactPreview");
const outputViewer = document.getElementById("outputViewer");
const outputViewerTitle = document.getElementById("outputViewerTitle");
const outputViewerContent = document.getElementById("outputViewerContent");
const closeOutputViewerButton = document.getElementById("closeOutputViewerButton");
const cinematicPromptDock = document.getElementById("cinematicPromptDock");
const cinematicPromptInput = document.getElementById("cinematicPromptInput");
const cinematicPromptSendButton = document.getElementById("cinematicPromptSendButton");
const cinematicMentionMenu = document.getElementById("cinematicMentionMenu");
const cinematicResultsButton = document.getElementById("cinematicResultsButton");
const cinematicResizeReadout = document.getElementById("cinematicResizeReadout");
const refreshArtifactsButton = document.getElementById("refreshArtifactsButton");
const toggleOutputButton = document.getElementById("toggleOutputButton");
const toggleArtifactListButton = document.getElementById("toggleArtifactListButton");
const closeOutputPanelButton = document.getElementById("closeOutputPanelButton");
const outputPathForm = document.getElementById("outputPathForm");
const outputPathInput = document.getElementById("outputPathInput");
const codexUsageText = document.getElementById("codexUsageText");
const codexUsageMeter = document.getElementById("codexUsageMeter");
const remoteStatusButton = document.getElementById("remoteStatusButton");
const remoteStatusLabel = document.getElementById("remoteStatusLabel");
const footerStatus = document.getElementById("footerStatus");
const toast = document.getElementById("toast");
const fileResizeHandle = document.getElementById("fileResizeHandle");
const artifactResizeHandle = document.getElementById("artifactResizeHandle");
const workspaceEditorTabs = document.getElementById("workspaceEditorTabs");
const toggleFilesButton = document.getElementById("toggleFilesButton");
const homeButton = document.getElementById("homeButton");
const homeView = document.getElementById("homeView");
const homeWorkspaceGrid = document.getElementById("homeWorkspaceGrid");
const homeAddWorkspaceButton = document.getElementById("homeAddWorkspaceButton");
const homeCommandPaletteButton = document.getElementById("homeCommandPaletteButton");
const homeReturnWorkspaceButton = document.getElementById("homeReturnWorkspaceButton");
const openSettingsButton = document.getElementById("openSettingsButton");
const notificationButton = document.getElementById("notificationButton");
const notificationBadge = document.getElementById("notificationBadge");
const notificationPanel = document.getElementById("notificationPanel");
const notificationList = document.getElementById("notificationList");
const titlebarTime = document.getElementById("titlebarTime");
const calendarPopover = document.getElementById("calendarPopover");
const calendarMonth = document.getElementById("calendarMonth");
const calendarFullDate = document.getElementById("calendarFullDate");
const calendarGrid = document.getElementById("calendarGrid");
const calendarPreviousMonth = document.getElementById("calendarPreviousMonth");
const calendarNextMonth = document.getElementById("calendarNextMonth");
const titlebarBattery = document.getElementById("titlebarBattery");
const titlebarBatteryFill = document.getElementById("titlebarBatteryFill");
const titlebarBatteryCharge = document.getElementById("titlebarBatteryCharge");
const titlebarBatteryText = document.getElementById("titlebarBatteryText");
const settingsOverlay = document.getElementById("settingsOverlay");
const closeSettingsButton = document.getElementById("closeSettingsButton");
const settingsTitle = document.getElementById("settingsTitle");
const settingsSearchInput = document.getElementById("settingsSearchInput");
const settingsResetDefaultsButton = document.getElementById("settingsResetDefaultsButton");
const settingsRememberWidths = document.getElementById("settingsRememberWidths");
const settingsAutoCollapsePanes = document.getElementById("settingsAutoCollapsePanes");
const settingsCompactTabs = document.getElementById("settingsCompactTabs");
const settingsShowTabEtas = document.getElementById("settingsShowTabEtas");
const settingsDefaultAgent = document.getElementById("settingsDefaultAgent");
const settingsDefaultZen = document.getElementById("settingsDefaultZen");
const settingsAutoPreview = document.getElementById("settingsAutoPreview");
const settingsAgentNotifications = document.getElementById("settingsAgentNotifications");
const settingsRecentFilesLimit = document.getElementById("settingsRecentFilesLimit");
const settingsPixelPets = document.getElementById("settingsPixelPets");
const settingsPixelPetChoice = document.getElementById("settingsPixelPetChoice");
const settingsPixelStatusLabels = document.getElementById("settingsPixelStatusLabels");
const settingsTerminalFontSize = document.getElementById("settingsTerminalFontSize");
const settingsTerminalFontSizeValue = document.getElementById("settingsTerminalFontSizeValue");
const settingsTerminalLineHeight = document.getElementById("settingsTerminalLineHeight");
const settingsTerminalLineHeightValue = document.getElementById("settingsTerminalLineHeightValue");
const settingsTerminalPreview = document.getElementById("settingsTerminalPreview");
const settingsTerminalScrollback = document.getElementById("settingsTerminalScrollback");
const settingsTerminalCursorBlink = document.getElementById("settingsTerminalCursorBlink");
const settingsAutoOpenOutput = document.getElementById("settingsAutoOpenOutput");
const settingsCompactOutputs = document.getElementById("settingsCompactOutputs");
const settingsMetricsInterval = document.getElementById("settingsMetricsInterval");
const settingsReduceMotion = document.getElementById("settingsReduceMotion");
const settingsMusicReactive = document.getElementById("settingsMusicReactive");
const settingsCinematicEffectStrength = document.getElementById("settingsCinematicEffectStrength");
const settingsCinematicEffectStrengthValue = document.getElementById("settingsCinematicEffectStrengthValue");
const settingsCinematicPanelOpacity = document.getElementById("settingsCinematicPanelOpacity");
const settingsCinematicPanelOpacityValue = document.getElementById("settingsCinematicPanelOpacityValue");
const settingsSceneFrameRate = document.getElementById("settingsSceneFrameRate");
const settingsProfileAvatar = document.getElementById("settingsProfileAvatar");
const settingsProfileName = document.getElementById("settingsProfileName");
const settingsProfileNameInput = document.getElementById("settingsProfileNameInput");
const settingsProfileRoleInput = document.getElementById("settingsProfileRoleInput");
const settingsProfileFocusInput = document.getElementById("settingsProfileFocusInput");
const settingsCycleProfileAvatar = document.getElementById("settingsCycleProfileAvatar");
const sceneBackground = document.getElementById("sceneBackground");
const sceneBackgroundCanvas = document.getElementById("sceneBackgroundCanvas");
const musicReactiveOverlay = document.querySelector(".music-reactive-overlay");
const sceneThemeOptions = Array.from(document.querySelectorAll("[data-scene-theme]"));
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
const sshRecentSection = document.getElementById("sshRecentSection");
const sshRecentConnections = document.getElementById("sshRecentConnections");
const sshRecentFoldersSection = document.getElementById("sshRecentFoldersSection");
const sshRecentFolders = document.getElementById("sshRecentFolders");
const sshStatus = document.getElementById("sshStatus");
const sshAuthTerminalShell = document.getElementById("sshAuthTerminalShell");
const sshAuthTerminal = document.getElementById("sshAuthTerminal");
const metricSource = document.getElementById("metricSource");
const cpuUsageText = document.getElementById("cpuUsageText");
const memoryUsageText = document.getElementById("memoryUsageText");
const storageUsageText = document.getElementById("storageUsageText");
const gpuMetrics = document.getElementById("gpuMetrics");
const spotifyNowPlaying = document.getElementById("spotifyNowPlaying");
const spotifyArtwork = document.getElementById("spotifyArtwork");
const spotifyPreviousButton = document.getElementById("spotifyPreviousButton");
const spotifyPlayPauseButton = document.getElementById("spotifyPlayPauseButton");
const spotifyNextButton = document.getElementById("spotifyNextButton");
const spotifyShuffleButton = document.getElementById("spotifyShuffleButton");
const spotifyShuffleState = document.getElementById("spotifyShuffleState");
const spotifyOpenButton = document.getElementById("spotifyOpenButton");
const spotifyTrackName = document.getElementById("spotifyTrackName");
const spotifyTrackDetail = document.getElementById("spotifyTrackDetail");
const notepadBackdrop = document.getElementById("notepadBackdrop");
const closeNotepadButton = document.getElementById("closeNotepadButton");
const notepadSaveState = document.getElementById("notepadSaveState");
const notepadText = document.getElementById("notepadText");
const notepadTodoForm = document.getElementById("notepadTodoForm");
const notepadTodoInput = document.getElementById("notepadTodoInput");
const notepadTodoList = document.getElementById("notepadTodoList");
const notepadSketchCanvas = document.getElementById("notepadSketchCanvas");
const notepadSketchColor = document.getElementById("notepadSketchColor");
const notepadSketchSize = document.getElementById("notepadSketchSize");
const notepadSketchSizeOutput = document.getElementById("notepadSketchSizeOutput");
const notepadSketchPen = document.getElementById("notepadSketchPen");
const notepadSketchEraser = document.getElementById("notepadSketchEraser");
const notepadSketchUndo = document.getElementById("notepadSketchUndo");
const notepadSketchRedo = document.getElementById("notepadSketchRedo");
const notepadSketchClear = document.getElementById("notepadSketchClear");
const notepadSketchSwatches = Array.from(document.querySelectorAll("[data-sketch-color]"));
const notepadSectionButtons = Array.from(document.querySelectorAll("[data-notepad-section]"));
const notepadSections = {
  notes: document.getElementById("notepadNotesSection"),
  todos: document.getElementById("notepadTodosSection"),
  sketch: document.getElementById("notepadSketchSection")
};

let workspaces = [];
let activeWorkspaceId = null;
const remoteConnectionStates = new Map();
let fileNodes = [];
const expandedFilePaths = new Set();
let artifacts = [];
let activeArtifactPath = "";
let activeOutputArtifact = null;
let openedOutputPaths = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem("agentWorkbenchOpenedOutputs") || "[]");
    return Array.isArray(saved) ? saved.slice(0, 20) : [];
  } catch (error) {
    return [];
  }
})();
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
let sshConnectionHistory = [];
let systemMetricsTimer = null;
let spotifyTimer = null;
let titlebarClockTimer = null;
let calendarCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let sceneAnimationFrame = 0;
let sceneLastFrameAt = 0;
let latestSpotifyStatus = null;
let notepadSaveTimer = null;
let notepadSketchDrawing = false;
let notepadSketchLastPoint = null;
let notepadSketchTool = "pen";
let notepadSketchUndoStack = [];
let notepadSketchRedoStack = [];
let notepadActiveSection = "notes";
let notepadTodos = [];
let powerStatusTimer = null;
let etaTimer = null;
let spotifyRefreshBusy = false;
let pixelModeEnabled = false;
let cinematicModeEnabled = false;
let cinematicMentionIndex = 0;
let cinematicMentionChoicesState = [];
let cinematicPaneSize = { width: 600, height: 285 };
let cinematicResizeState = null;
let cinematicResizeFrame = 0;
let cinematicResizeSettleTimer = 0;
let windowResizeFrame = 0;
let windowResizeSettleTimer = 0;
let pixelFrameReady = false;
let pixelViewReady = false;
let pixelWarmupPromise = null;
let activePixelFloor = Number(localStorage.getItem("agentWorkbenchPixelFloor")) || 1;
let pixelFloorCount = Math.max(
  1,
  Math.min(20, Number(localStorage.getItem("agentWorkbenchPixelFloorCount")) || 3)
);
let pixelSkyManualPhase = null;
let pixelBaseLayout = null;
let pixelFurnitureCatalogPromise = null;
let pixelPreviewGenerationBusy = false;
let pixelPreviewRefreshNeeded = true;
let pixelPreviewRefreshTimer = null;
let pixelPreviewRefreshAll = false;
let lastPixelAutoSyncAt = 0;
let pixelLoaderHideTimer = null;
const pixelRoomStates = new Map();
const pixelDirtyPreviewFloors = new Set();
const pixelSessionPreviewSignatures = new Map();
const pendingPixelPreviewRequests = new Map();
let globalCleanMode = localStorage.getItem("agentWorkbenchGlobalCleanMode") === "1";
let selectedAgentId = null;
let selectedPixelDetailAgentId = null;
let pixelPetDetailAnchor = null;
const pixelPetProfiles = [
  {
    id: "claudio",
    species: "Cat",
    hp: 92,
    energy: 68,
    mood: "Curious",
    snack: "Tuna bites",
    hobbies: "Keyboard naps · Window watching",
    trait: "Independent",
    talent: "Bug detection"
  },
  {
    id: "hamster",
    species: "Hamster",
    hp: 76,
    energy: 94,
    mood: "Excited",
    snack: "Sunflower seeds",
    hobbies: "Wheel sprints · Cable tunnels",
    trait: "Resourceful",
    talent: "Cache cleanup"
  },
  {
    id: "dog",
    species: "Dog",
    hp: 100,
    energy: 88,
    mood: "Loyal",
    snack: "Peanut-butter biscuit",
    hobbies: "Walk breaks · Pair debugging",
    trait: "Brave",
    talent: "Regression sniffing"
  },
  {
    id: "lizard",
    species: "Lizard",
    hp: 84,
    energy: 61,
    mood: "Focused",
    snack: "Mealworms",
    hobbies: "Lamp basking · Edge-case spotting",
    trait: "Patient",
    talent: "Thermal monitoring"
  },
  {
    id: "rabbit",
    species: "Rabbit",
    hp: 82,
    energy: 97,
    mood: "Bouncy",
    snack: "Carrot chips",
    hobbies: "Speed runs · Garden hopping",
    trait: "Optimistic",
    talent: "Rapid iteration"
  },
  {
    id: "tortoise",
    species: "Tortoise",
    hp: 120,
    energy: 52,
    mood: "Steady",
    snack: "Dandelion greens",
    hobbies: "Slow walks · Test planning",
    trait: "Unshakable",
    talent: "Long builds"
  },
  {
    id: "frog",
    species: "Frog",
    hp: 78,
    energy: 86,
    mood: "Alert",
    snack: "Fruit flies",
    hobbies: "Puddle jumps · Bug hunting",
    trait: "Adaptable",
    talent: "Bug catching"
  },
  {
    id: "cockatiel",
    species: "Cockatiel",
    hp: 74,
    energy: 91,
    mood: "Chatty",
    snack: "Millet",
    hobbies: "Status calls · Melody loops",
    trait: "Social",
    talent: "Release announcements"
  },
  {
    id: "hedgehog",
    species: "Hedgehog",
    hp: 88,
    energy: 72,
    mood: "Thoughtful",
    snack: "Apple cubes",
    hobbies: "Night reviews · Blanket burrows",
    trait: "Thorough",
    talent: "Sharp code review"
  },
  {
    id: "raccoon",
    species: "Raccoon",
    hp: 90,
    energy: 83,
    mood: "Mischievous",
    snack: "Berry mix",
    hobbies: "Cache raids · Log searching",
    trait: "Clever",
    talent: "Artifact recovery"
  },
  {
    id: "penguin",
    species: "Penguin",
    hp: 96,
    energy: 67,
    mood: "Cool",
    snack: "Silverfish",
    hobbies: "Ice slides · Package bundling",
    trait: "Calm",
    talent: "Cold starts"
  },
  {
    id: "red-panda",
    species: "Red panda",
    hp: 86,
    energy: 79,
    mood: "Cozy",
    snack: "Bamboo shoots",
    hobbies: "Branch climbing · Dusk deploys",
    trait: "Gentle",
    talent: "Branch inspection"
  }
];
const PIXEL_ROOM_DESIGN_VERSION = 4;
const PIXEL_ROOM_THEMES = [
  {
    name: "Code Library",
    topology: "library-aisles",
    palette: [2, 6],
    workstations: "north-row",
    decor: [
      ["DOUBLE_BOOKSHELF", 11, 10], ["DOUBLE_BOOKSHELF", 15, 10],
      ["BOOKSHELF", 18, 10], ["CLOCK", 9, 10], ["SMALL_TABLE_FRONT", 13, 17],
      ["CUSHIONED_CHAIR_FRONT", 14, 18], ["PLANT", 18, 18]
    ]
  },
  {
    name: "Indie Studio",
    topology: "studio-split",
    palette: [4, 5],
    workstations: "north-row",
    decor: [
      ["WHITEBOARD", 11, 10], ["LARGE_PAINTING", 15, 10], ["TABLE_FRONT", 13, 14],
      ["WOODEN_CHAIR_SIDE", 12, 15], ["WOODEN_CHAIR_SIDE:left", 16, 15],
      ["PLANT_2", 18, 18], ["BIN", 1, 20]
    ]
  },
  {
    name: "Sunken Lounge",
    topology: "lounge-bay",
    palette: [3, 8],
    workstations: "side-pods",
    decor: [
      ["SOFA_FRONT", 6, 12], ["SOFA_SIDE", 5, 13], ["SOFA_SIDE:left", 9, 13],
      ["COFFEE_TABLE", 6, 14], ["COFFEE", 7, 14], ["LARGE_PLANT", 17, 11],
      ["SMALL_PAINTING_2", 15, 10]
    ]
  },
  {
    name: "Glass Greenhouse",
    topology: "greenhouse",
    palette: [7, 3],
    workstations: "side-pods",
    decor: [
      ["LARGE_PLANT", 5, 11], ["PLANT", 8, 13], ["PLANT_2", 11, 11],
      ["CACTUS", 15, 12], ["HANGING_PLANT", 18, 10], ["WOODEN_BENCH", 8, 17],
      ["POT", 17, 18]
    ]
  },
  {
    name: "Strategy War Room",
    topology: "war-room",
    palette: [1, 5],
    workstations: "command-wall",
    decor: [
      ["WHITEBOARD", 2, 10], ["LARGE_PAINTING", 15, 10], ["TABLE_FRONT", 8, 14],
      ["WOODEN_CHAIR_SIDE", 7, 15], ["WOODEN_CHAIR_SIDE:left", 12, 15],
      ["CLOCK", 13, 10], ["BIN", 18, 19]
    ]
  },
  {
    name: "Night Owl Café",
    topology: "cafe-counter",
    palette: [6, 3],
    workstations: "window-desks",
    decor: [
      ["TABLE_FRONT", 4, 16], ["WOODEN_CHAIR_SIDE", 3, 17],
      ["WOODEN_CHAIR_SIDE:left", 8, 17], ["SMALL_TABLE_FRONT", 12, 16],
      ["COFFEE", 13, 15], ["COFFEE", 17, 12], ["PLANT_2", 18, 18]
    ]
  },
  {
    name: "Lunar Observatory",
    topology: "observatory",
    palette: [8, 1],
    workstations: "center-island",
    decor: [
      ["LARGE_PAINTING", 8, 10], ["SMALL_PAINTING", 12, 10], ["CLOCK", 16, 10],
      ["TABLE_FRONT", 8, 16], ["CUSHIONED_CHAIR_FRONT", 9, 18],
      ["CACTUS", 2, 18], ["LARGE_PLANT", 18, 18]
    ]
  },
  {
    name: "Maker Garage",
    topology: "maker-lanes",
    palette: [4, 1],
    workstations: "workshop-benches",
    decor: [
      ["WHITEBOARD", 1, 10], ["TABLE_FRONT", 13, 13], ["SMALL_TABLE_SIDE", 17, 14],
      ["BIN", 18, 18], ["POT", 12, 18], ["CLOCK", 16, 10], ["CACTUS", 8, 18]
    ]
  },
  {
    name: "Digital Gallery",
    topology: "gallery-wings",
    palette: [5, 8],
    workstations: "gallery-desk",
    decor: [
      ["LARGE_PAINTING", 2, 10], ["SMALL_PAINTING", 6, 10],
      ["LARGE_PAINTING", 11, 10], ["SMALL_PAINTING_2", 16, 10],
      ["CUSHIONED_BENCH", 8, 16], ["PLANT", 1, 18], ["PLANT_2", 18, 18]
    ]
  },
  {
    name: "Recording Loft",
    topology: "recording-booth",
    palette: [3, 6],
    workstations: "north-row",
    decor: [
      ["SOFA_FRONT", 3, 15], ["COFFEE_TABLE", 3, 17], ["SMALL_TABLE_SIDE", 14, 14],
      ["CUSHIONED_CHAIR_SIDE:left", 17, 14], ["LARGE_PAINTING", 14, 10],
      ["HANGING_PLANT", 18, 10], ["COFFEE", 5, 17]
    ]
  },
  {
    name: "Retro Arcade",
    topology: "arcade-grid",
    palette: [8, 4],
    workstations: "arcade-banks",
    decor: [
      ["SMALL_PAINTING", 2, 10], ["SMALL_PAINTING_2", 5, 10],
      ["SMALL_PAINTING", 14, 10], ["SMALL_PAINTING_2", 17, 10],
      ["CUSHIONED_BENCH", 8, 18], ["COFFEE", 10, 18], ["BIN", 18, 19]
    ]
  },
  {
    name: "Zen Garden",
    topology: "zen-courtyard",
    palette: [7, 2],
    workstations: "quiet-corners",
    decor: [
      ["WOODEN_BENCH", 8, 14], ["LARGE_PLANT", 5, 12], ["PLANT", 14, 12],
      ["PLANT_2", 16, 17], ["POT", 10, 18], ["SMALL_PAINTING", 9, 10],
      ["HANGING_PLANT", 18, 10]
    ]
  },
  {
    name: "Breaking Newsroom",
    topology: "newsroom",
    palette: [1, 4],
    workstations: "news-desk",
    decor: [
      ["WHITEBOARD", 1, 10], ["CLOCK", 6, 10], ["LARGE_PAINTING", 14, 10],
      ["TABLE_FRONT", 7, 17], ["WOODEN_CHAIR_SIDE", 6, 18],
      ["WOODEN_CHAIR_SIDE:left", 11, 18], ["PLANT_2", 18, 18]
    ]
  },
  {
    name: "Wellness Suite",
    topology: "wellness-suites",
    palette: [5, 7],
    workstations: "quiet-corners",
    decor: [
      ["SOFA_BACK", 3, 15], ["CUSHIONED_BENCH", 14, 15], ["SMALL_TABLE_FRONT", 9, 16],
      ["PLANT", 1, 11], ["LARGE_PLANT", 17, 11], ["POT", 7, 18],
      ["SMALL_PAINTING_2", 9, 10]
    ]
  },
  {
    name: "Robotics Lab",
    topology: "research-cross",
    palette: [4, 8],
    workstations: "workshop-benches",
    decor: [
      ["WHITEBOARD", 11, 10], ["TABLE_FRONT", 12, 15], ["SMALL_TABLE_SIDE", 17, 13],
      ["BIN", 18, 18], ["CACTUS", 1, 18], ["CLOCK", 16, 10],
      ["CUSHIONED_CHAIR_SIDE", 11, 18]
    ]
  },
  {
    name: "Creative Loft",
    topology: "open-loft",
    palette: [6, 5],
    workstations: "center-island",
    decor: [
      ["SOFA_FRONT", 2, 16], ["COFFEE_TABLE", 4, 17], ["LARGE_PAINTING", 13, 10],
      ["DOUBLE_BOOKSHELF", 17, 10], ["HANGING_PLANT", 10, 10],
      ["LARGE_PLANT", 18, 18], ["COFFEE", 5, 17]
    ]
  },
  {
    name: "Deep Archive",
    topology: "archive-stacks",
    palette: [2, 1],
    workstations: "archive-desk",
    decor: [
      ["DOUBLE_BOOKSHELF", 1, 10], ["DOUBLE_BOOKSHELF", 6, 10],
      ["DOUBLE_BOOKSHELF", 11, 10], ["DOUBLE_BOOKSHELF", 16, 10],
      ["BOOKSHELF", 18, 15], ["SMALL_TABLE_FRONT", 13, 18], ["CLOCK", 9, 10]
    ]
  },
  {
    name: "Command Bridge",
    topology: "command-bridge",
    palette: [8, 5],
    workstations: "command-wall",
    decor: [
      ["WHITEBOARD", 8, 10], ["LARGE_PAINTING", 13, 10], ["TABLE_FRONT", 7, 16],
      ["CUSHIONED_CHAIR_SIDE", 6, 17], ["CUSHIONED_CHAIR_SIDE:left", 12, 17],
      ["CLOCK", 18, 10], ["PLANT_2", 1, 18]
    ]
  },
  {
    name: "Golden Sunroom",
    topology: "sunroom",
    palette: [7, 6],
    workstations: "side-pods",
    decor: [
      ["HANGING_PLANT", 2, 10], ["HANGING_PLANT", 10, 10], ["HANGING_PLANT", 18, 10],
      ["SOFA_FRONT", 7, 16], ["COFFEE_TABLE", 8, 18], ["LARGE_PLANT", 17, 16],
      ["SMALL_PAINTING", 14, 10]
    ]
  },
  {
    name: "Rooftop Lookout",
    topology: "rooftop",
    palette: [5, 3],
    workstations: "corner-pods",
    decor: [
      ["WOODEN_BENCH", 7, 17], ["CACTUS", 1, 17], ["LARGE_PLANT", 17, 16],
      ["SMALL_TABLE_FRONT", 13, 16], ["COFFEE", 14, 17],
      ["SMALL_PAINTING_2", 4, 10], ["CLOCK", 15, 10]
    ]
  }
];
// The plans intentionally vary both their occupied footprint and their color
// treatment. The compact official Pixel Agents office, the wider community
// layouts, and Orseni's themed office set are the visual starting points; each
// BsCode floor then gets its own silhouette instead of sharing one shell.
const PIXEL_ROOM_PLANS = [
  {
    key: "compact-library",
    bounds: [2, 18, 6, 20],
    silhouette: "compact-rectangle",
    colors: [{ h: 20, s: 35, b: -100, c: -50 }, { h: 25, s: 48, b: -43, c: -88 }, { h: 33, s: 34, b: -24, c: -62 }]
  },
  {
    key: "offset-studio",
    bounds: [0, 20, 8, 20],
    silhouette: "east-studio-notch",
    colors: [{ h: 214, s: 30, b: -100, c: -55 }, { h: 175, s: 35, b: -30, c: -70 }, { h: 260, s: 30, b: -25, c: -70 }]
  },
  {
    key: "sunken-lounge",
    bounds: [1, 19, 5, 20],
    silhouette: "graduated-bay",
    colors: [{ h: 338, s: 24, b: -82, c: -52 }, { h: 346, s: 42, b: -32, c: -70 }, { h: 188, s: 28, b: -24, c: -62 }]
  },
  {
    key: "greenhouse-wings",
    bounds: [0, 20, 6, 20],
    silhouette: "twin-greenhouse-wings",
    colors: [{ h: 140, s: 30, b: -90, c: -55 }, { h: 80, s: 30, b: -30, c: -70 }, { h: 110, s: 25, b: -20, c: -65 }]
  },
  {
    key: "command-bunker",
    bounds: [2, 18, 7, 20],
    silhouette: "stepped-bunker",
    colors: [{ h: 210, s: 25, b: -100, c: -50 }, { h: 215, s: 20, b: -40, c: -75 }, { h: 30, s: 20, b: -25, c: -60 }]
  },
  {
    key: "corner-cafe",
    bounds: [1, 20, 6, 20],
    silhouette: "cafe-l",
    colors: [{ h: 18, s: 38, b: -88, c: -55 }, { h: 30, s: 44, b: -28, c: -67 }, { h: 195, s: 22, b: -18, c: -54 }]
  },
  {
    key: "lunar-dome",
    bounds: [1, 19, 4, 20],
    silhouette: "observatory-dome",
    colors: [{ h: 235, s: 30, b: -96, c: -58 }, { h: 225, s: 44, b: -34, c: -78 }, { h: 282, s: 32, b: -26, c: -68 }]
  },
  {
    key: "maker-offset",
    bounds: [0, 18, 7, 20],
    silhouette: "offset-workshop",
    colors: [{ h: 205, s: 18, b: -94, c: -48 }, { h: 205, s: 30, b: -32, c: -68 }, { h: 24, s: 48, b: -24, c: -64 }]
  },
  {
    key: "gallery-wings",
    bounds: [1, 19, 5, 20],
    silhouette: "gallery-u",
    colors: [{ h: 284, s: 18, b: -88, c: -50 }, { h: 310, s: 25, b: -25, c: -60 }, { h: 40, s: 20, b: -16, c: -48 }]
  },
  {
    key: "recording-suite",
    bounds: [0, 19, 8, 20],
    silhouette: "recording-j",
    colors: [{ h: 220, s: 26, b: -94, c: -54 }, { h: 208, s: 34, b: -32, c: -72 }, { h: 20, s: 30, b: -22, c: -60 }]
  },
  {
    key: "arcade-t",
    bounds: [2, 18, 5, 20],
    silhouette: "arcade-t",
    colors: [{ h: 282, s: 42, b: -96, c: -60 }, { h: 306, s: 52, b: -28, c: -74 }, { h: 184, s: 46, b: -22, c: -70 }]
  },
  {
    key: "zen-courtyard",
    bounds: [1, 19, 6, 20],
    silhouette: "courtyard-ring",
    colors: [{ h: 86, s: 20, b: -84, c: -45 }, { h: 98, s: 28, b: -22, c: -58 }, { h: 42, s: 32, b: -16, c: -52 }]
  },
  {
    key: "newsroom-wide",
    bounds: [0, 20, 10, 20],
    silhouette: "broadcast-desk",
    colors: [{ h: 210, s: 16, b: -92, c: -48 }, { h: 210, s: 24, b: -28, c: -62 }, { h: 354, s: 42, b: -24, c: -66 }]
  },
  {
    key: "wellness-zigzag",
    bounds: [2, 19, 5, 20],
    silhouette: "wellness-zigzag",
    colors: [{ h: 154, s: 18, b: -84, c: -42 }, { h: 158, s: 25, b: -18, c: -54 }, { h: 332, s: 24, b: -14, c: -48 }]
  },
  {
    key: "robotics-cross",
    bounds: [0, 20, 5, 20],
    silhouette: "research-cross",
    colors: [{ h: 214, s: 28, b: -100, c: -58 }, { h: 202, s: 44, b: -30, c: -72 }, { h: 36, s: 40, b: -22, c: -65 }]
  },
  {
    key: "creative-loft",
    bounds: [1, 20, 7, 20],
    silhouette: "creative-l",
    colors: [{ h: 14, s: 32, b: -90, c: -52 }, { h: 27, s: 44, b: -24, c: -62 }, { h: 190, s: 30, b: -18, c: -56 }]
  },
  {
    key: "deep-archive",
    bounds: [3, 17, 4, 20],
    silhouette: "archive-vault",
    colors: [{ h: 22, s: 35, b: -100, c: -58 }, { h: 28, s: 48, b: -42, c: -84 }, { h: 205, s: 20, b: -28, c: -66 }]
  },
  {
    key: "command-bridge",
    bounds: [0, 20, 6, 20],
    silhouette: "bridge-chevron",
    colors: [{ h: 218, s: 32, b: -100, c: -62 }, { h: 214, s: 46, b: -34, c: -78 }, { h: 174, s: 34, b: -26, c: -67 }]
  },
  {
    key: "sunroom-pavilion",
    bounds: [1, 19, 5, 20],
    silhouette: "sunroom-pavilion",
    colors: [{ h: 42, s: 30, b: -82, c: -45 }, { h: 48, s: 46, b: -16, c: -50 }, { h: 188, s: 28, b: -12, c: -46 }]
  },
  {
    key: "rooftop-terraces",
    bounds: [0, 20, 7, 20],
    silhouette: "rooftop-terraces",
    colors: [{ h: 230, s: 24, b: -96, c: -58 }, { h: 220, s: 34, b: -30, c: -70 }, { h: 16, s: 46, b: -20, c: -62 }]
  }
];
const PIXEL_WORKSTATION_KITS = {
  "north-row": [
    ["DESK_FRONT", 1, 12], ["PC_FRONT_OFF", 2, 12], ["CUSHIONED_BENCH", 2, 14],
    ["DESK_FRONT", 5, 12], ["PC_FRONT_OFF", 6, 12], ["CUSHIONED_BENCH", 6, 14]
  ],
  "side-pods": [
    ["DESK_FRONT", 1, 12], ["PC_FRONT_OFF", 2, 12], ["CUSHIONED_BENCH", 2, 14],
    ["DESK_FRONT", 15, 17], ["PC_FRONT_OFF", 16, 17], ["CUSHIONED_BENCH", 16, 19]
  ],
  "corner-pods": [
    ["DESK_FRONT", 1, 12], ["PC_FRONT_OFF", 2, 12], ["CUSHIONED_BENCH", 2, 14],
    ["DESK_FRONT", 14, 12], ["PC_FRONT_OFF", 15, 12], ["CUSHIONED_BENCH", 15, 14]
  ],
  "command-wall": [
    ["DESK_FRONT", 4, 12], ["PC_FRONT_OFF", 5, 12], ["CUSHIONED_BENCH", 5, 14],
    ["DESK_FRONT", 10, 12], ["PC_FRONT_OFF", 11, 12], ["CUSHIONED_BENCH", 11, 14]
  ],
  "window-desks": [
    ["DESK_FRONT", 1, 12], ["PC_FRONT_OFF", 2, 12], ["CUSHIONED_BENCH", 2, 14],
    ["DESK_FRONT", 14, 12], ["PC_FRONT_OFF", 15, 12], ["CUSHIONED_BENCH", 15, 14]
  ],
  "center-island": [
    ["TABLE_FRONT", 7, 13], ["PC_SIDE", 7, 13], ["WOODEN_CHAIR_SIDE", 6, 14],
    ["TABLE_FRONT", 7, 17], ["PC_SIDE:left", 9, 17], ["WOODEN_CHAIR_SIDE:left", 11, 18]
  ],
  "workshop-benches": [
    ["DESK_FRONT", 2, 12], ["PC_FRONT_OFF", 3, 12], ["CUSHIONED_BENCH", 3, 14],
    ["TABLE_FRONT", 12, 17], ["PC_SIDE", 12, 17], ["WOODEN_CHAIR_SIDE", 11, 18]
  ],
  "gallery-desk": [
    ["DESK_FRONT", 7, 12], ["PC_FRONT_OFF", 8, 12], ["CUSHIONED_BENCH", 8, 14],
    ["SMALL_TABLE_FRONT", 14, 17], ["PC_SIDE:left", 15, 17], ["CUSHIONED_CHAIR_FRONT", 15, 19]
  ],
  "arcade-banks": [
    ["DESK_FRONT", 2, 13], ["PC_FRONT_OFF", 3, 13], ["CUSHIONED_BENCH", 3, 15],
    ["DESK_FRONT", 14, 13], ["PC_FRONT_OFF", 15, 13], ["CUSHIONED_BENCH", 15, 15]
  ],
  "quiet-corners": [
    ["SMALL_TABLE_FRONT", 2, 12], ["PC_SIDE", 2, 12], ["CUSHIONED_CHAIR_FRONT", 3, 14],
    ["SMALL_TABLE_FRONT", 15, 18], ["PC_SIDE:left", 16, 18], ["CUSHIONED_CHAIR_FRONT", 16, 20]
  ],
  "news-desk": [
    ["DESK_FRONT", 2, 12], ["PC_FRONT_OFF", 3, 12], ["CUSHIONED_BENCH", 3, 14],
    ["DESK_FRONT", 8, 12], ["PC_FRONT_OFF", 9, 12], ["CUSHIONED_BENCH", 9, 14]
  ],
  "archive-desk": [
    ["DESK_FRONT", 2, 16], ["PC_FRONT_OFF", 3, 16], ["CUSHIONED_BENCH", 3, 18],
    ["DESK_FRONT", 14, 16], ["PC_FRONT_OFF", 15, 16], ["CUSHIONED_BENCH", 15, 18]
  ]
};
let agentsPaused = false;
let agentNotifications = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem("agentWorkbenchNotifications") || "[]");
    return Array.isArray(saved) ? saved.slice(0, 50) : [];
  } catch (error) {
    return [];
  }
})();
let unreadAgentNotifications = Math.max(
  0,
  Number(localStorage.getItem("agentWorkbenchUnreadNotifications")) || 0
);
let lastTerminalInputAt = 0;
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
  "Dark Contrast": "abyss",
  Pixelized: "pixel-night"
};
const SCENE_THEMES = {
  none: null,
  "copenhagen-moonlight": { label: "Copenhagen Moonlight", detail: "Johan Christian Dahl · 1846", image: "assets/scenes/copenhagen-moonlight.webp", source: "https://www.metmuseum.org/art/collection/search/439343", artist: "Johan Christian Dahl", license: "Public Domain · The Met Open Access", motion: "stars", colors: ["#111826", "#4b5a67", "#c1b69c"] },
  "niagara-falls": { label: "Niagara Falls", detail: "Thomas Cole · 1830", image: "assets/scenes/niagara-falls.webp", source: "https://www.artic.edu/artworks/90048/distant-view-of-niagara-falls", artist: "Thomas Cole", license: "Public Domain · Art Institute of Chicago CC0", motion: "mist", colors: ["#1d2b26", "#718578", "#d4d5c1"] },
  "cotopaxi": { label: "View of Cotopaxi", detail: "Frederic Edwin Church · 1857", image: "assets/scenes/cotopaxi.webp", source: "https://www.artic.edu/artworks/76571/view-of-cotopaxi", artist: "Frederic Edwin Church", license: "Public Domain · Art Institute of Chicago CC0", motion: "clouds", colors: ["#403a31", "#998a6e", "#e7d2a5"] },
  "roman-campagna": { label: "Roman Campagna", detail: "Claude Lorrain · ca. 1639", image: "assets/scenes/roman-campagna.webp", source: "https://www.metmuseum.org/art/collection/search/435906", artist: "Claude Lorrain", license: "Public Domain · The Met Open Access", motion: "water", colors: ["#322d25", "#80745d", "#dac9a2"] },
  "colonnade-ruins": { label: "Colonnade in Ruins", detail: "Hubert Robert · Roman ruins", image: "assets/scenes/colonnade-ruins.webp", source: "https://www.metmuseum.org/art/collection/search/437475", artist: "Hubert Robert", license: "Public Domain · The Met Open Access", motion: "dust", colors: ["#514438", "#a68b66", "#e8d3ac"] },
  "paris-rain": { label: "Paris Street; Rainy Day", detail: "Gustave Caillebotte · 1877", image: "assets/scenes/paris-rain.webp", source: "https://www.artic.edu/artworks/20684/paris-street-rainy-day", artist: "Gustave Caillebotte", license: "Public Domain · Art Institute of Chicago CC0", motion: "water", colors: ["#3a3c3c", "#88877e", "#d0c9bd"] },
  "parthenon-afterlight": { label: "Parthenon Afterlight", detail: "Frederic Edwin Church · 1871", image: "assets/scenes/parthenon-afterlight.webp", source: "https://www.metmuseum.org/art/collection/search/10482", artist: "Frederic Edwin Church", license: "Public Domain · The Met Open Access", motion: "light", colors: ["#564535", "#b98a5f", "#efd9ad"] },
  "arches-in-ruins": { label: "Arches in Ruins", detail: "Hubert Robert · Roman ruins", image: "assets/scenes/arches-in-ruins.webp", source: "https://www.metmuseum.org/art/collection/search/437472", artist: "Hubert Robert", license: "Public Domain · The Met Open Access", motion: "dust", colors: ["#3e352c", "#9d8260", "#e4d1ad"] },
  "tivoli-morning": { label: "Tivoli Morning", detail: "Thomas Cole · Italian landscape", image: "assets/scenes/tivoli-morning.webp", source: "https://www.metmuseum.org/art/collection/search/10500", artist: "Thomas Cole", license: "Public Domain · The Met Open Access", motion: "mist", colors: ["#3a3427", "#8f836b", "#d8c8a6"] },
  "aegean-sea": { label: "The Aegean Sea", detail: "Frederic Edwin Church · ca. 1877", image: "assets/scenes/aegean-sea.webp", source: "https://www.metmuseum.org/art/collection/search/10480", artist: "Frederic Edwin Church", license: "Public Domain · The Met Open Access", motion: "light", colors: ["#302821", "#9a7653", "#e6c983"] },
  "heart-of-andes": { label: "Heart of the Andes", detail: "Frederic Edwin Church · 1859", image: "assets/scenes/heart-of-andes.webp", source: "https://www.metmuseum.org/art/collection/search/10481", artist: "Frederic Edwin Church", license: "Public Domain · The Met Open Access", motion: "mist", colors: ["#223126", "#688260", "#d3d8b7"] },
  "oxbow-storm": { label: "The Oxbow", detail: "Thomas Cole · 1836", image: "assets/scenes/oxbow-storm.webp", source: "https://www.metmuseum.org/art/collection/search/10497", artist: "Thomas Cole", license: "Public Domain · The Met Open Access", motion: "clouds", colors: ["#393a35", "#8e866c", "#d9d1b0"] },
  "mountain-ford": { label: "The Mountain Ford", detail: "Thomas Cole · 1846", image: "assets/scenes/mountain-ford.webp", source: "https://www.metmuseum.org/art/collection/search/10496", artist: "Thomas Cole", license: "Public Domain · The Met Open Access", motion: "fireflies", colors: ["#242820", "#766c4b", "#c9b780"] },
  "catskill-autumn": { label: "Catskill Autumn", detail: "Thomas Cole · 1836–37", image: "assets/scenes/catskill-autumn.webp", source: "https://www.metmuseum.org/art/collection/search/10501", artist: "Thomas Cole", license: "Public Domain · The Met Open Access", motion: "water", colors: ["#2d3425", "#7a7952", "#dfc58c"] },
  "rocky-mountains": { label: "Rocky Mountains", detail: "Albert Bierstadt · 1863", image: "assets/scenes/rocky-mountains.webp", source: "https://www.metmuseum.org/art/collection/search/10154", artist: "Albert Bierstadt", license: "Public Domain · The Met Open Access", motion: "mist", colors: ["#26372f", "#748574", "#d9d5b6"] }
};

function hydrateSceneThemes() {
  const grid = document.querySelector(".scene-theme-grid");
  if (!grid) return;
  grid.replaceChildren();
  sceneThemeOptions.length = 0;
  for (const [id, scene] of Object.entries(SCENE_THEMES)) {
    const option = document.createElement("button");
    option.className = "scene-theme-option";
    option.type = "button";
    option.dataset.sceneTheme = id;
    option.setAttribute("role", "radio");
    option.setAttribute("aria-checked", "false");
    if (scene) {
      option.style.setProperty("--scene-a", scene.colors[0]);
      option.style.setProperty("--scene-b", scene.colors[1]);
      option.style.setProperty("--scene-c", scene.colors[2]);
      option.style.setProperty("--scene-preview", `url("${scene.image}")`);
      option.title = `${scene.label} — ${scene.artist}; ${scene.license}`;
    }
    option.innerHTML = `
      <span class="scene-theme-preview ${scene ? "" : "scene-theme-none"}" aria-hidden="true"></span>
      <strong>${scene?.label || "None"}<small>${scene?.detail || "Theme color"}</small></strong>
      <b aria-hidden="true">✓</b>
    `;
    grid.appendChild(option);
    sceneThemeOptions.push(option);
  }
}

hydrateSceneThemes();

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
  if (session?.etaPaused && Number.isFinite(session.etaPausedSeconds)) {
    return session.etaPausedSeconds;
  }
  if (!session || !Number.isFinite(session.etaDeadline)) return null;
  return Math.max(0, Math.ceil((session.etaDeadline - now) / 1000));
}

function pauseSessionEta(session, now = Date.now()) {
  if (!session || session.etaPaused) return;
  session.etaPaused = true;
  session.etaPausedSeconds = Number.isFinite(session.etaDeadline)
    ? Math.max(0, Math.ceil((session.etaDeadline - now) / 1000))
    : null;
  session.etaDeadline = null;
  for (const etaState of session.checklistEtaState?.values() || []) {
    if (!etaState.countsDown) continue;
    etaState.pausedSeconds = Number.isFinite(etaState.deadline)
      ? Math.max(0, Math.ceil((etaState.deadline - now) / 1000))
      : Number.isFinite(etaState.reportedSeconds)
        ? etaState.reportedSeconds
        : null;
    etaState.deadline = null;
  }
}

function resumeSessionEta(session, now = Date.now()) {
  if (!session?.etaPaused) return;
  session.etaPaused = false;
  session.etaDeadline = Number.isFinite(session.etaPausedSeconds)
    ? now + session.etaPausedSeconds * 1000
    : null;
  session.etaPausedSeconds = null;
  for (const etaState of session.checklistEtaState?.values() || []) {
    if (!etaState.countsDown) continue;
    etaState.deadline = Number.isFinite(etaState.pausedSeconds)
      ? now + etaState.pausedSeconds * 1000
      : null;
    etaState.pausedSeconds = null;
  }
}

function interruptAgentSession(session, { send = true, announce = true } = {}) {
  if (!session || session.exited || session.etaPaused) return false;
  pauseSessionEta(session);
  session.metadata = {
    ...session.metadata,
    status: "waiting",
    state: "waiting",
    currentTask: "Interrupted"
  };
  session.pausedByUser = true;
  if (send) api.writeAgent(session.id, "\u001b");
  updateAgentStatusCard(session);
  renderAgentCleanView(session);
  updateAgentEta();
  updateRuntimeStatus();
  renderAgentSidebar();
  syncPixelSession(session);
  if (announce) showToast(`Interrupted Agent ${session.slotIndex + 1}`);
  return true;
}

function beginAgentTask(session, task) {
  if (!session) return;
  const nextTask = String(task || "").trim().slice(0, 180);
  session.checklistEtaState.clear();
  session.etaPaused = false;
  session.etaPausedSeconds = null;
  session.etaDeadline = null;
  session.lastReportedEtaSeconds = null;
  session.finishNotified = false;
  session.lastPreviewFile = "";
  updateAgentMetadata(session, {
    status: "working",
    state: "planning",
    currentTask: nextTask || "Planning the next task",
    tldr: nextTask || "Preparing a new checklist.",
    etaSeconds: null,
    etaMinutes: null,
    progressPercent: 0,
    checklist: [{ text: "Preparing task checklist", status: "working", etaSeconds: null }],
    relevantFiles: [],
    previewFile: null
  });
  if (session.cleanMode) {
    clearTimeout(session.cleanRenderTimer);
    session.cleanRenderTimer = null;
    renderAgentCleanView(session);
  }
}

function reportedEtaSeconds(metadata) {
  const exact = metadata?.etaSeconds;
  if (exact !== null && exact !== undefined && exact !== "") {
    const seconds = Number(exact);
    if (Number.isFinite(seconds)) return Math.max(0, Math.round(seconds));
  }
  const minutes = metadata?.etaMinutes;
  if (minutes !== null && minutes !== undefined && minutes !== "") {
    const value = Number(minutes);
    if (Number.isFinite(value)) return Math.max(0, Math.round(value * 60));
  }
  return null;
}

function etaDeadlineFromMetadata(metadata, now = Date.now()) {
  const etaSeconds = reportedEtaSeconds(metadata);
  if (!Number.isFinite(etaSeconds) || etaSeconds <= 0) return null;
  const reportedAt = Date.parse(metadata?.updatedAt || "");
  const base = Number.isFinite(reportedAt) ? reportedAt : now;
  return Math.max(now + 1000, base + etaSeconds * 1000);
}

function formatEtaClock(seconds) {
  const value = Math.max(0, Math.ceil(Number(seconds) || 0));
  const days = Math.floor(value / 86400);
  const hours = Math.floor((value % 86400) / 3600);
  const minutes = Math.floor(value / 60);
  const remainder = value % 60;
  if (days) {
    return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes % 60).padStart(2, "0")}m ${String(remainder).padStart(2, "0")}s`;
  }
  if (hours) {
    return `${hours}h ${String(minutes % 60).padStart(2, "0")}m ${String(remainder).padStart(2, "0")}s`;
  }
  if (minutes) {
    return `${minutes}m ${String(remainder).padStart(2, "0")}s`;
  }
  return `${remainder}s`;
}

function updateCommandCenterStatus() {
  const workspace = activeWorkspace();
  if (!workspace) {
    activeWorkspaceName.textContent = "Choose a workspace";
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
  const locationLabel = workspace.type === "ssh"
    ? `${String(workspace.remote?.root || workspace.remote?.path || workspace.name).split("/").filter(Boolean).pop() || "projects"} [SSH: ${workspace.remote?.host || workspace.name}]`
    : workspacePath;
  const parts = [locationLabel, `${workspaceSessions.length}/${workspaceLayoutFor(workspace.id)} agents`];
  if (errors) parts.push(`${errors} error`);
  else if (working) parts.push(`${working} working`);
  else if (waiting) parts.push(`${waiting} waiting`);
  else parts.push("idle");
  if (etas.length) parts.push(`Eta ${formatEtaClock(Math.min(...etas))}`);
  activeWorkspaceName.textContent = parts.join(" · ");
  commandCenter.title = `${parts.join(" · ")} · Open Command Palette (⌘P)`;
}

function renderRemoteConnectionStatus(workspace = activeWorkspace()) {
  const isRemote = workspace?.type === "ssh" && workspace.remote;
  const connectionState = isRemote
    ? remoteConnectionStates.get(workspace.id) || "disconnected"
    : "local";
  const host = isRemote ? workspace.remote.host || workspace.name || "remote" : "";
  const statusText = connectionState === "connected"
    ? `Connected to ${host}`
    : connectionState === "disconnected"
      ? `Disconnected from ${host}`
      : `Checking ${host}…`;
  const actionText = isRemote ? "Open SSH connections" : "Open remote workspace";
  remoteStatusLabel.textContent = isRemote ? statusText : "";
  remoteStatusButton.classList.toggle("remote", Boolean(isRemote));
  remoteStatusButton.classList.toggle("connected", connectionState === "connected");
  remoteStatusButton.classList.toggle("disconnected", connectionState === "disconnected");
  remoteStatusButton.classList.toggle("checking", connectionState === "checking");
  remoteStatusButton.dataset.connectionState = connectionState;
  remoteStatusButton.title = isRemote ? `${statusText}. ${actionText}` : actionText;
  remoteStatusButton.setAttribute("aria-label", remoteStatusButton.title);
}

function isWorkspaceConnected(workspace) {
  return Boolean(
    workspace
    && (workspace.type !== "ssh" || remoteConnectionStates.get(workspace.id) === "connected")
  );
}

function setRemoteConnectionState(workspaceId, connectionState) {
  if (!workspaceId || !["checking", "connected", "disconnected"].includes(connectionState)) return;
  const previousState = remoteConnectionStates.get(workspaceId);
  remoteConnectionStates.set(workspaceId, connectionState);
  if (workspaceId !== activeWorkspaceId) return;
  renderRemoteConnectionStatus();
  updateWorkspaceActionAvailability();
  if (connectionState === "disconnected") {
    clearDisconnectedWorkspacePanels();
  } else if (connectionState === "connected" && previousState !== "connected") {
    refreshWorkspacePanels().catch((error) => showToast(error.message || String(error)));
  }
}

function setFooter(message) {
  const workspace = activeWorkspace();
  const status = String(message || "").trim();
  footerStatus.textContent = status;
  footerStatus.title = status;
  footerStatus.hidden = !status;
  renderRemoteConnectionStatus(workspace);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function persistNotifications() {
  localStorage.setItem("agentWorkbenchNotifications", JSON.stringify(agentNotifications.slice(0, 50)));
  localStorage.setItem("agentWorkbenchUnreadNotifications", String(unreadAgentNotifications));
}

function formatNotificationTime(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  const today = new Date();
  const sameDay = date.toDateString() === today.toDateString();
  return new Intl.DateTimeFormat([], sameDay
    ? { hour: "numeric", minute: "2-digit" }
    : { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
  ).format(date);
}

function renderNotificationHistory() {
  notificationList.replaceChildren();
  if (!agentNotifications.length) {
    const empty = document.createElement("div");
    empty.className = "notification-empty";
    empty.textContent = "No notifications yet.";
    notificationList.appendChild(empty);
    return;
  }
  for (const notification of agentNotifications) {
    const item = document.createElement("article");
    item.className = `notification-item ${notification.kind || "complete"}`;
    const number = document.createElement("span");
    number.className = "notification-agent-number";
    number.textContent = notification.agentNumber || "—";
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = notification.title || "Agent update";
    const detail = document.createElement("span");
    detail.textContent = notification.detail || "";
    copy.append(title, detail);
    const time = document.createElement("time");
    time.dateTime = notification.timestamp || "";
    time.textContent = formatNotificationTime(notification.timestamp);
    item.append(number, copy, time);
    notificationList.appendChild(item);
  }
}

function renderNotificationBell() {
  const count = unreadAgentNotifications;
  notificationBadge.hidden = count === 0;
  notificationBadge.textContent = count > 9 ? "9+" : String(count);
  notificationButton.classList.toggle("has-unread", count > 0);
  notificationButton.title = count
    ? `${count} unread agent ${count === 1 ? "notification" : "notifications"}`
    : "No unread agent notifications";
  notificationButton.setAttribute("aria-label", notificationButton.title);
}

function recordAgentNotification(session, kind, title, detail) {
  agentNotifications.unshift({
    id: `${Date.now()}-${session?.id || Math.random().toString(36).slice(2)}`,
    kind,
    agentNumber: session ? String(session.slotIndex + 1) : "",
    title,
    detail,
    timestamp: new Date().toISOString()
  });
  agentNotifications = agentNotifications.slice(0, 50);
  unreadAgentNotifications += 1;
  persistNotifications();
  renderNotificationBell();
  if (!notificationPanel.hidden) renderNotificationHistory();
}

function setNotificationPanel(open) {
  const next = Boolean(open);
  notificationPanel.hidden = !next;
  notificationButton.setAttribute("aria-expanded", String(next));
  if (!next) return;
  unreadAgentNotifications = 0;
  persistNotifications();
  renderNotificationBell();
  renderNotificationHistory();
}

function clearAgentNotifications() {
  agentNotifications = [];
  unreadAgentNotifications = 0;
  persistNotifications();
  renderNotificationBell();
  renderNotificationHistory();
  showToast("Notifications cleared.");
}

function notifyAgentFinished(session) {
  recordAgentNotification(
    session,
    "complete",
    `${session.metadata.name || `Agent ${session.slotIndex + 1}`} finished`,
    session.metadata.tldr || "Task finished."
  );
  showToast(`Agent ${session.slotIndex + 1} finished`);
  const workspace = workspaces.find((item) => item.id === session.workspaceId);
  if (booleanPreference("agentWorkbenchAgentNotifications", true)) {
    api.notifyAgentFinished({
      agentNumber: String(session.slotIndex + 1),
      name: session.metadata.name || `${session.kind} agent`,
      tldr: session.metadata.tldr || "Task finished.",
      workspaceName: workspace?.name || ""
    }).catch(() => {});
  }
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

function setPixelViewLoading(loading, status = "Loading the visual view…", { delay = 0 } = {}) {
  if (pixelLoaderHideTimer) clearTimeout(pixelLoaderHideTimer);
  pixelLoaderHideTimer = null;
  if (loading) {
    pixelViewLoaderStatus.textContent = status;
    pixelViewLoader.hidden = false;
    pixelViewLoader.classList.remove("leaving");
    if (!document.body.classList.contains("reduce-motion")) {
      try {
        pixelLoaderAnimation.currentTime = 0;
      } catch (error) {
      }
      pixelLoaderAnimation.play().catch(() => {});
    }
    return;
  }
  pixelViewLoader.classList.add("leaving");
  pixelLoaderHideTimer = setTimeout(() => {
    pixelViewLoader.hidden = true;
    pixelViewLoader.classList.remove("leaving");
    pixelLoaderAnimation.pause();
    pixelLoaderHideTimer = null;
  }, Math.max(180, Number(delay) || 0));
}

function activePixelSessions() {
  return Array.from(sessions.values())
    .filter((session) => session.workspaceId === activeWorkspaceId)
    .sort((left, right) => left.slotIndex - right.slotIndex);
}

function availablePixelAgentSlot() {
  const capacity = activeWorkspace() ? workspaceLayoutFor(activeWorkspaceId) : 4;
  for (let index = 0; index < capacity; index += 1) {
    if (!slots[index]) return index;
  }
  return -1;
}

function renderPixelFloorLauncher() {
  // Agent creation stays in the persistent toolbar. Automatically placing a
  // launcher over an empty room makes the office look blocked by a modal.
  pixelFloorLauncher.hidden = true;
}

async function startPixelFloorAgent(kind) {
  const slotIndex = Number(pixelFloorLauncher.dataset.slot);
  const floor = Number(pixelFloorLauncher.dataset.floor) || activePixelFloor;
  if (!Number.isInteger(slotIndex) || slotIndex < 0 || slots[slotIndex]) return;
  const task = pixelFloorTaskInput.value.trim();
  pixelFloorLauncher.classList.add("loading");
  pixelFloorLauncherButtons.forEach((button) => {
    button.disabled = true;
  });
  try {
    const session = await startAgent(slotIndex, kind, task);
    if (!session) return;
    const assignments = pixelAgentFloorAssignments(session.workspaceId);
    assignments[String(slotIndex + 1)] = floor;
    savePixelAgentFloorAssignments(session.workspaceId, assignments);
    pixelFloorTaskInput.value = "";
    renderPixelFloorLauncher();
    syncPixelMode(true);
  } finally {
    pixelFloorLauncher.classList.remove("loading");
    pixelFloorLauncherButtons.forEach((button) => {
      button.disabled = false;
    });
  }
}

function pixelAgentAssignmentKey(workspaceId) {
  return `agentWorkbenchPixelAgentFloors:${workspaceId || "workspace"}`;
}

function pixelAgentFloorAssignments(workspaceId) {
  try {
    const saved = JSON.parse(localStorage.getItem(pixelAgentAssignmentKey(workspaceId)) || "{}");
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch (error) {
    return {};
  }
}

function savePixelAgentFloorAssignments(workspaceId, assignments) {
  localStorage.setItem(pixelAgentAssignmentKey(workspaceId), JSON.stringify(assignments));
}

function ensurePixelFloorCapacity(requiredFloors) {
  const nextFloorCount = Math.max(
    pixelFloorCount,
    Math.min(20, Math.max(1, Number(requiredFloors) || 1))
  );
  if (nextFloorCount === pixelFloorCount) return false;
  pixelFloorCount = nextFloorCount;
  localStorage.setItem("agentWorkbenchPixelFloorCount", String(pixelFloorCount));
  initializePixelFloors();
  pixelPreviewRefreshNeeded = true;
  if (pixelFrameReady) {
    postPixelMessage({
      type: "houseConfig",
      floors: pixelFloorCount,
      slots: activeWorkspace() ? workspaceLayoutFor(activeWorkspaceId) : 4,
      petsEnabled: booleanPreference("agentWorkbenchPixelPets", true),
      pet: localStorage.getItem("agentWorkbenchPixelPetChoice") || "hamster"
    });
  }
  schedulePixelPreviewRefresh(260, { all: true });
  return true;
}

function reconcilePixelAgentFloorAssignments(workspaceId) {
  const workspaceSessions = Array.from(sessions.values())
    .filter((session) => session.workspaceId === workspaceId)
    .sort((left, right) => left.slotIndex - right.slotIndex);
  if (workspaceId === activeWorkspaceId) ensurePixelFloorCapacity(workspaceSessions.length);
  const assignments = pixelAgentFloorAssignments(workspaceId);
  const activeAssignmentIds = new Set(
    workspaceSessions.map((session) => String(session.slotIndex + 1))
  );
  let changed = false;
  for (const assignmentId of Object.keys(assignments)) {
    if (!activeAssignmentIds.has(assignmentId)) {
      delete assignments[assignmentId];
      changed = true;
    }
  }

  const usedFloors = new Set();
  for (const session of workspaceSessions) {
    const assignmentId = String(session.slotIndex + 1);
    const savedFloor = Number(assignments[assignmentId]);
    let floor = Number.isInteger(savedFloor)
      && savedFloor >= 1
      && savedFloor <= pixelFloorCount
      && !usedFloors.has(savedFloor)
      ? savedFloor
      : 0;
    if (!floor) {
      const start = session.slotIndex % pixelFloorCount;
      for (let offset = 0; offset < pixelFloorCount; offset += 1) {
        const candidate = ((start + offset) % pixelFloorCount) + 1;
        if (!usedFloors.has(candidate)) {
          floor = candidate;
          break;
        }
      }
    }
    if (assignments[assignmentId] !== floor) {
      assignments[assignmentId] = floor;
      changed = true;
    }
    usedFloors.add(floor);
  }
  if (changed) savePixelAgentFloorAssignments(workspaceId, assignments);
  return assignments;
}

function pixelFloorForSession(session) {
  const workspaceId = session?.workspaceId || activeWorkspaceId;
  const assignments = reconcilePixelAgentFloorAssignments(workspaceId);
  const assignmentId = String((Number(session?.slotIndex) || 0) + 1);
  return Math.max(1, Math.min(pixelFloorCount, Number(assignments[assignmentId]) || 1));
}

function pixelSessionsForFloor(floor) {
  const normalizedFloor = Math.max(1, Math.min(pixelFloorCount, Number(floor) || 1));
  const assignments = reconcilePixelAgentFloorAssignments(activeWorkspaceId);
  return activePixelSessions().filter(
    (session) => Number(assignments[String(session.slotIndex + 1)]) === normalizedFloor
  );
}

function reindexPixelAgentFloorsAfterDelete(deletedFloor, nextFloorCount) {
  for (const workspace of workspaces) {
    const assignments = pixelAgentFloorAssignments(workspace.id);
    let changed = false;
    for (const [assignmentId, value] of Object.entries(assignments)) {
      const floor = Number(value);
      if (!Number.isInteger(floor)) continue;
      const nextFloor = floor > deletedFloor
        ? floor - 1
        : floor === deletedFloor
          ? Math.min(deletedFloor, nextFloorCount)
          : floor;
      if (nextFloor !== floor) {
        assignments[assignmentId] = Math.max(1, nextFloor);
        changed = true;
      }
    }
    if (changed) savePixelAgentFloorAssignments(workspace.id, assignments);
  }
}

function pixelSessionPreviewSignature(session) {
  const metadata = session?.metadata || {};
  return JSON.stringify([
    metadata.name || "",
    metadata.status || "",
    metadata.state || "",
    metadata.currentTask || "",
    metadata.tldr || "",
    Number(metadata.progressPercent) || 0,
    Boolean(session?.pausedByUser),
    Boolean(session?.exited)
  ]);
}

function schedulePixelPreviewRefresh(delay = 1500, { all = false } = {}) {
  if (!pixelModeEnabled || !pixelFrameReady) return;
  pixelPreviewRefreshAll = pixelPreviewRefreshAll || all;
  if (pixelPreviewRefreshTimer) clearTimeout(pixelPreviewRefreshTimer);
  pixelPreviewRefreshTimer = setTimeout(() => {
    pixelPreviewRefreshTimer = null;
    const refreshAll = pixelPreviewRefreshAll;
    pixelPreviewRefreshAll = false;
    refreshPixelFloorPreviews({ all: refreshAll });
  }, delay);
}

function queuePixelFloorPreviewRefresh(floor, delay = 1500) {
  const normalizedFloor = Math.max(1, Math.min(pixelFloorCount, Number(floor) || 1));
  if (normalizedFloor !== activePixelFloor) return;
  pixelDirtyPreviewFloors.add(normalizedFloor);
  schedulePixelPreviewRefresh(delay);
}

function notePixelSessionPreviewChange(session) {
  if (!session || session.workspaceId !== activeWorkspaceId) return;
  const signature = pixelSessionPreviewSignature(session);
  const previous = pixelSessionPreviewSignatures.get(session.id);
  pixelSessionPreviewSignatures.set(session.id, signature);
  if (previous !== signature) {
    queuePixelFloorPreviewRefresh(pixelFloorForSession(session));
  }
}

function agentPortraitIndex(session) {
  const stored = Number(session?.metadata?.portraitIndex);
  if (Number.isInteger(stored) && stored >= 0) return stored % 6;
  const originalNumber = Number(session?.metadata?.agentNumber);
  if (Number.isInteger(originalNumber) && originalNumber > 0) return (originalNumber - 1) % 6;
  return Math.max(0, Number(session?.slotIndex) || 0) % 6;
}

function agentPortraitSpriteUrl(session) {
  return `pixel-agents-mode/assets/characters/char_${agentPortraitIndex(session)}.png`;
}

function agentFaceUrl(session) {
  return `assets/agent-face-${agentPortraitIndex(session)}.png`;
}

function applyAgentFace(element, session) {
  if (!element || !session) return;
  element.classList.add("has-agent-face");
  element.textContent = "";
  element.style.backgroundImage = `url("${agentFaceUrl(session)}")`;
  element.title = session.metadata.name || `${session.kind} agent`;
  element.setAttribute("aria-label", element.title);
}

function renderPixelAgentRoster() {
  const activeSessions = activePixelSessions();
  const workspace = activeWorkspace();
  const assignments = workspace
    ? reconcilePixelAgentFloorAssignments(workspace.id)
    : {};
  const now = Date.now();
  pixelAgentRosterCount.textContent = `${activeSessions.length}/${workspace ? workspaceLayoutFor(workspace.id) : 4}`;
  pixelAgentClipboardCount.textContent = String(activeSessions.length);
  pixelAgentClipboardButton.classList.toggle("has-agents", activeSessions.length > 0);
  pixelAgentRosterList.replaceChildren();
  if (!activeSessions.length) {
    const empty = document.createElement("div");
    empty.className = "pixel-clipboard-empty";
    empty.innerHTML = `
      <span class="pixel-coffee-animation" aria-hidden="true">
        <span class="pixel-coffee-cup"><b></b></span>
        <i></i><i></i><i></i>
      </span>
      <strong>Seems pretty empty in here...</strong>
    `;
    pixelAgentRosterList.appendChild(empty);
    return;
  }
  for (const session of activeSessions) {
    const rawStatus = session.metadata.status || "working";
    const status = rawStatus === "done" ? "idle" : rawStatus;
    const assignedFloor = Number(assignments[String(session.slotIndex + 1)]) || 1;
    const item = document.createElement("button");
    item.className = "pixel-roster-agent";
    item.type = "button";
    item.dataset.agentSlot = String(session.slotIndex);
    item.dataset.pixelFloor = String(assignedFloor);
    item.title = `Inspect ${session.metadata.name || `Agent ${session.slotIndex + 1}`} · Floor ${assignedFloor}`;
    item.setAttribute(
      "aria-label",
      `Agent ${session.slotIndex + 1}, ${session.metadata.name || `${session.kind} agent`}, floor ${assignedFloor}, ${status}`
    );
    item.innerHTML = `
      <span class="pixel-roster-eta"></span>
      <span class="pixel-roster-avatar" aria-hidden="true"></span>
      <span class="pixel-roster-copy">
        <strong></strong>
        <small></small>
      </span>
      <span class="pixel-roster-state">floor ${assignedFloor} · ${status}</span>
    `;
    item.querySelector(".pixel-roster-avatar").style.backgroundImage =
      `url("${agentPortraitSpriteUrl(session)}")`;
    item.querySelector(".pixel-roster-eta").textContent = pixelRosterEtaText(session, now);
    item.querySelector(".pixel-roster-copy strong").textContent =
      session.metadata.name || `${session.kind} agent`;
    item.querySelector(".pixel-roster-copy small").textContent =
      session.metadata.tldr || (status === "working" ? "Working…" : "Waiting for work");
    item.addEventListener("click", async () => {
      setPixelAgentClipboard(false);
      await applyPixelFloor(assignedFloor, { showLoader: true });
      openPixelAgentDetail(session);
    });
    pixelAgentRosterList.appendChild(item);
  }
}

function pixelRosterEtaText(session, now = Date.now()) {
  const status = session.metadata.status || "working";
  if (status === "done") return "✓";
  if (status === "error") return "err";
  const seconds = remainingEtaSeconds(session, now);
  return Number.isFinite(seconds) ? formatEtaClock(seconds) : "—";
}

function closePixelPetDetail() {
  pixelPetDetail.hidden = true;
  pixelPetDetailAnchor = null;
  delete pixelPetDetail.dataset.petId;
  delete pixelPetDetail.dataset.anchored;
  delete pixelPetDetail.dataset.anchorSide;
  pixelPetDetail.style.removeProperty("--pixel-pet-left");
  pixelPetDetail.style.removeProperty("--pixel-pet-top");
}

function positionPixelPetDetail(anchor = pixelPetDetailAnchor) {
  if (!anchor || pixelPetDetail.hidden || !pixelModeEnabled) return;
  const viewBounds = pixelModeView.getBoundingClientRect();
  const frameBounds = pixelModeFrame.getBoundingClientRect();
  const panelBounds = pixelPetDetail.getBoundingClientRect();
  const anchorX = frameBounds.left - viewBounds.left
    + Math.max(0, Math.min(1, Number(anchor.x) || 0)) * frameBounds.width;
  const anchorY = frameBounds.top - viewBounds.top
    + Math.max(0, Math.min(1, Number(anchor.y) || 0)) * frameBounds.height;
  const gap = 18;
  const edge = 16;
  let side = "right";
  let left = anchorX + gap;
  if (left + panelBounds.width > pixelModeView.clientWidth - edge) {
    side = "left";
    left = anchorX - panelBounds.width - gap;
  }
  left = Math.max(edge, Math.min(
    pixelModeView.clientWidth - panelBounds.width - edge,
    left
  ));
  const top = Math.max(edge, Math.min(
    pixelModeView.clientHeight - panelBounds.height - edge,
    anchorY - Math.min(86, panelBounds.height * 0.24)
  ));
  pixelPetDetail.style.setProperty("--pixel-pet-left", `${Math.round(left)}px`);
  pixelPetDetail.style.setProperty("--pixel-pet-top", `${Math.round(top)}px`);
  pixelPetDetail.style.setProperty(
    "--pixel-pet-pointer-top",
    `${Math.round(Math.max(28, Math.min(panelBounds.height - 28, anchorY - top)))}px`
  );
  pixelPetDetail.dataset.anchored = "true";
  pixelPetDetail.dataset.anchorSide = side;
}

function openPixelPetDetail(pet, floor = activePixelFloor, anchor = null) {
  const reportedType = Number(pet?.petType);
  const matchingType = Number.isInteger(reportedType)
    ? reportedType
    : pixelPetProfiles.findIndex((profile) =>
      String(profile.species).toLowerCase() === String(pet?.name || "").toLowerCase()
      || String(profile.id).toLowerCase() === String(pet?.name || "").toLowerCase()
    );
  const petType = Math.max(0, Math.min(pixelPetProfiles.length - 1, matchingType < 0 ? 0 : matchingType));
  const profile = pixelPetProfiles[petType];
  const petName = String(pet?.name || profile.species).trim() || profile.species;
  const normalizedFloor = Math.max(1, Number(floor) || activePixelFloor);
  const level = 2 + ((normalizedFloor + petType) % 8);

  setPixelAgentClipboard(false);
  closePixelAgentDetail();
  pixelPetDetail.hidden = false;
  pixelPetDetailAnchor = anchor
    && Number.isFinite(Number(anchor.x))
    && Number.isFinite(Number(anchor.y))
    ? { x: Number(anchor.x), y: Number(anchor.y) }
    : null;
  pixelPetDetail.dataset.petId = String(pet?.id || profile.id);
  pixelPetDetailAvatar.style.backgroundImage = "none";
  pixelPetDetailAvatar.style.setProperty(
    "--pixel-pet-image",
    `url("pixel-agents-mode/assets/pets/${profile.id}/pet.png")`
  );
  pixelPetDetailName.textContent = petName;
  pixelPetDetailMeta.textContent = `${profile.species} · Floor ${normalizedFloor}`;
  pixelPetHpFill.style.width = `${Math.min(100, profile.hp)}%`;
  pixelPetHpText.textContent = `${profile.hp}/${profile.hp}`;
  pixelPetEnergyFill.style.width = `${profile.energy}%`;
  pixelPetEnergyText.textContent = `${profile.energy}%`;
  pixelPetLevel.textContent = String(level);
  pixelPetMood.textContent = profile.mood;
  pixelPetSnack.textContent = profile.snack;
  pixelPetHobbies.textContent = profile.hobbies;
  pixelPetTrait.textContent = profile.trait;
  pixelPetTalent.textContent = profile.talent;
  if (pixelPetDetailAnchor) {
    requestAnimationFrame(() => positionPixelPetDetail());
  }
}

function closePixelAgentDetail() {
  selectedPixelDetailAgentId = null;
  pixelAgentDetail.hidden = true;
}

function renderPixelAgentDetail(session) {
  if (!session || session.workspaceId !== activeWorkspaceId) {
    closePixelAgentDetail();
    return;
  }
  selectedPixelDetailAgentId = session.id;
  pixelAgentDetail.hidden = false;
  pixelAgentDetail.dataset.agentSlot = String(session.slotIndex);
  pixelAgentDetailAvatar.style.backgroundImage = `url("${agentFaceUrl(session)}")`;
  pixelAgentDetailName.textContent = session.metadata.name || `${session.kind} agent`;
  const state = normalizedAgentState(session.metadata);
  const eta = pixelRosterEtaText(session);
  pixelAgentDetailMeta.textContent = `${session.runtimeModel || session.metadata.model || (
    session.kind === "codex" ? "Codex" : session.kind === "claude" ? "Claude" : "Shell"
  )} · ${state} · ${eta}`;
  pixelAgentDetailTask.textContent =
    session.metadata.currentTask || session.metadata.tldr || "Waiting for a task.";

  pixelAgentDetailChecklist.replaceChildren();
  const checklist = normalizedAgentChecklist(session.metadata);
  if (!checklist.length) {
    const empty = document.createElement("small");
    empty.textContent = state === "waiting" ? "Ready for work." : "Waiting for checklist…";
    pixelAgentDetailChecklist.appendChild(empty);
  } else {
    checklist.slice(0, 6).forEach((entry) => {
      const row = document.createElement("div");
      row.className = `pixel-agent-detail-check ${entry.status}`;
      const marker = document.createElement("span");
      marker.setAttribute("aria-hidden", "true");
      const text = document.createElement("span");
      text.textContent = entry.text;
      const itemEta = document.createElement("small");
      itemEta.textContent = entry.status === "done"
        ? "done"
        : Number.isFinite(entry.etaSeconds)
          ? formatEtaClock(entry.etaSeconds)
          : entry.status;
      row.append(marker, text, itemEta);
      pixelAgentDetailChecklist.appendChild(row);
    });
  }

  pixelAgentDetailFiles.replaceChildren();
  const files = Array.isArray(session.metadata.relevantFiles)
    ? session.metadata.relevantFiles.slice(0, 4)
    : [];
  for (const relativePath of files) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(relativePath).split("/").pop() || relativePath;
    button.title = relativePath;
    button.addEventListener("click", () => previewWorkspaceFile(session.workspaceId, relativePath));
    pixelAgentDetailFiles.appendChild(button);
  }
}

function openPixelAgentDetail(session) {
  setPixelAgentClipboard(false);
  closePixelPetDetail();
  renderPixelAgentDetail(session);
  requestAnimationFrame(() => pixelAgentDetailPrompt.focus());
}

function sendPixelAgentDetailInstruction() {
  const session = sessions.get(selectedPixelDetailAgentId);
  const message = pixelAgentDetailPrompt.value.trim();
  if (!session || !message) return;
  if (!writeAgentInstruction(session, message)) return;
  lastTerminalInputAt = Date.now();
  resumeSessionEta(session);
  session.pausedByUser = false;
  beginAgentTask(session, message);
  updateRuntimeStatus();
  pixelAgentDetailPrompt.value = "";
  renderPixelAgentDetail(session);
  showToast(`Sent to Agent ${session.slotIndex + 1}`);
}

async function refreshPixelView({ notify = true } = {}) {
  if (!pixelModeEnabled || !pixelFrameReady || pixelRefreshButton.disabled) return;
  pixelRefreshButton.disabled = true;
  pixelRefreshButton.classList.add("refreshing");
  try {
    syncPixelAppearance();
    await applyPixelFloor(activePixelFloor, { persist: false, showLoader: false });
    setPixelVisibleSessionsForFloor(activePixelFloor);
    for (const session of pixelSessionsForFloor(activePixelFloor)) {
      postPixelSessionDetails(session);
    }
    renderPixelAgentRoster();
    renderPixelFloorLauncher();
    pixelDirtyPreviewFloors.add(activePixelFloor);
    await refreshPixelFloorPreviews({ all: true });
    lastPixelAutoSyncAt = Date.now();
    if (notify) showToast("Visual view refreshed");
  } finally {
    pixelRefreshButton.classList.remove("refreshing");
    pixelRefreshButton.disabled = false;
  }
}

function updatePixelFloorButtons() {
  pixelFloorStack.style.setProperty("--pixel-floor-count", String(pixelFloorCount));
  pixelFloorStack.style.setProperty("--pixel-tower-height", `${Math.min(1090, pixelFloorCount * 82 + 106)}px`);
  pixelFloorStack.dataset.floorCount = String(pixelFloorCount);
  pixelFloorButtons.forEach((button) => {
    const active = Number(button.dataset.pixelFloor) === activePixelFloor;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
  pixelDeleteFloorButton.disabled = pixelFloorCount <= 1;
  pixelDeleteFloorButton.title = pixelFloorCount <= 1
    ? "The tower needs one floor"
    : `Delete floor ${activePixelFloor}`;
  pixelDeleteFloorButton.setAttribute("aria-label", pixelDeleteFloorButton.title);
}

function pixelFloorTexture(floor) {
  const texture = ((Math.max(1, Number(floor) || 1) - 1) * 3 + 1) % 9;
  return `url("pixel-agents-mode/assets/floors/floor_${texture}.png")`;
}

function pixelFloorPreviewKey(floor, workspaceId = activeWorkspaceId) {
  const workspaceKey = encodeURIComponent(String(workspaceId || "no-workspace"));
  return `agentWorkbenchPixelPreview:${workspaceKey}:${Math.max(1, Number(floor) || 1)}`;
}

function pixelFloorPreview(floor) {
  const preset = ((Math.max(1, Number(floor) || 1) - 1) % 20) + 1;
  return `assets/tower-previews/floor-${String(preset).padStart(2, "0")}.png?v=4`;
}

function setPixelFloorPreview(floor, image) {
  const normalizedFloor = Math.max(1, Number(floor) || 1);
  const button = pixelFloorButtons.find(
    (candidate) => Number(candidate.dataset.pixelFloor) === normalizedFloor
  );
  const preview = button?.querySelector(".pixel-floor-room img");
  if (preview) preview.src = pixelFloorPreview(normalizedFloor);
  const pending = pendingPixelPreviewRequests.get(normalizedFloor);
  if (pending) {
    clearTimeout(pending.timeout);
    pendingPixelPreviewRequests.delete(normalizedFloor);
    pending.resolve(true);
  }
  return true;
}

function requestPixelFloorPreview(floor = activePixelFloor) {
  if (!pixelFrameReady) return Promise.resolve(false);
  const normalizedFloor = Math.max(1, Math.min(pixelFloorCount, Number(floor) || 1));
  const previous = pendingPixelPreviewRequests.get(normalizedFloor);
  if (previous) {
    clearTimeout(previous.timeout);
    previous.resolve(false);
  }
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      if (pendingPixelPreviewRequests.get(normalizedFloor)?.resolve !== resolve) return;
      pendingPixelPreviewRequests.delete(normalizedFloor);
      resolve(false);
    }, 700);
    pendingPixelPreviewRequests.set(normalizedFloor, { resolve, timeout });
    postPixelMessage({ type: "captureFloorPreview", floor: normalizedFloor });
  });
}

function waitForPixelPreview(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function refreshPixelFloorPreviewsForWorkspaceSwitch() {
  pixelPreviewRefreshNeeded = true;
  pixelDirtyPreviewFloors.clear();
  pixelSessionPreviewSignatures.clear();
  pixelRoomStates.clear();
  // Previews are real captures of a visited floor. Keep them per workspace
  // instead of replacing inactive floors with a generic office every time the
  // user changes tabs.
  pixelFloorButtons.forEach(decoratePixelFloorButton);
  if (pixelModeEnabled && pixelFrameReady) {
    schedulePixelPreviewRefresh(260, { all: true });
  }
}

async function refreshPixelFloorPreviews({ all = false } = {}) {
  if (!pixelModeEnabled || !pixelFrameReady) return;
  // Floor artwork is bundled as 20 pre-rendered PNGs. Refreshing the tower must
  // never load hidden layouts or move the live iframe through every floor.
  const floors = all
    ? Array.from({ length: pixelFloorCount }, (_, index) => index + 1)
    : [activePixelFloor];
  pixelDirtyPreviewFloors.clear();
  pixelPreviewGenerationBusy = true;
  pixelPreviewRefreshNeeded = false;
  try {
    for (const floor of floors) {
      const button = pixelFloorButtons.find(
        (candidate) => Number(candidate.dataset.pixelFloor) === floor
      );
      if (button) decoratePixelFloorButton(button);
    }
  } finally {
    pixelPreviewGenerationBusy = false;
  }
}

function decoratePixelFloorButton(button) {
  const floor = Number(button.dataset.pixelFloor);
  const room = button.querySelector(".pixel-floor-room");
  const preview = room?.querySelector("img");
  let summary = room?.querySelector(".pixel-floor-summary");
  if (room && !summary) {
    summary = document.createElement("small");
    summary.className = "pixel-floor-summary";
    room.appendChild(summary);
  }
  const roomState = pixelRoomStates.get(floor);
  const floorSessions = activeWorkspaceId ? pixelSessionsForFloor(floor) : [];
  const agentCount = floorSessions.length;
  const petCount = Array.isArray(roomState?.pets) ? roomState.pets.length : 0;
  const detail = roomState
    ? ` · ${agentCount} ${agentCount === 1 ? "agent" : "agents"} · ${petCount} ${petCount === 1 ? "pet" : "pets"}`
    : "";
  button.title = `Open floor ${floor}${detail}`;
  button.setAttribute("aria-label", button.title);
  if (room) room.style.setProperty("--pixel-floor-texture", pixelFloorTexture(floor));
  if (preview) preview.src = pixelFloorPreview(floor);
  if (summary) {
    const agentLabel = roomState
      ? agentCount === 1
        ? "1 agent"
        : `${agentCount} agents`
      : agentCount === 1
        ? "1 agent"
        : `${agentCount} agents`;
    const petName = roomState?.pets?.[0]?.name || "";
    summary.textContent = [agentLabel, petName].filter(Boolean).join(" · ");
  }
}

function createPixelFloorButton(floor) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.pixelFloor = String(floor);
  button.innerHTML = `
    <span class="pixel-floor-elevator">${floor}</span>
    <span class="pixel-floor-room">
      <img src="${pixelFloorPreview(floor)}" alt="">
      <small class="pixel-floor-summary">0 agents</small>
    </span>
  `;
  decoratePixelFloorButton(button);
  return button;
}

function bindPixelFloorButton(button) {
  decoratePixelFloorButton(button);
  button.addEventListener("click", () => applyPixelFloor(button.dataset.pixelFloor));
}

function initializePixelFloors() {
  pixelFloorList.replaceChildren();
  for (let floor = pixelFloorCount; floor >= 1; floor -= 1) {
    pixelFloorList.appendChild(createPixelFloorButton(floor));
  }
  pixelFloorButtons = Array.from(pixelFloorList.querySelectorAll("[data-pixel-floor]"));
  pixelFloorButtons.forEach(bindPixelFloorButton);
  activePixelFloor = Math.max(1, Math.min(pixelFloorCount, activePixelFloor));
  updatePixelFloorButtons();
}

function addPixelFloor() {
  if (pixelFloorCount >= 20) {
    showToast("The tower is full.");
    return;
  }
  pixelFloorCount += 1;
  localStorage.setItem("agentWorkbenchPixelFloorCount", String(pixelFloorCount));
  const button = createPixelFloorButton(pixelFloorCount);
  pixelFloorList.prepend(button);
  bindPixelFloorButton(button);
  pixelFloorButtons = Array.from(pixelFloorList.querySelectorAll("[data-pixel-floor]"));
  postPixelMessage({
    type: "houseConfig",
    floors: pixelFloorCount,
    slots: activeWorkspace() ? workspaceLayoutFor(activeWorkspaceId) : 4,
    petsEnabled: booleanPreference("agentWorkbenchPixelPets", true),
    pet: localStorage.getItem("agentWorkbenchPixelPetChoice") || "hamster"
  });
  pixelPreviewRefreshNeeded = true;
  applyPixelFloor(pixelFloorCount);
  schedulePixelPreviewRefresh(120);
  button.scrollIntoView({ block: "nearest" });
  showToast(`Floor ${pixelFloorCount} added.`);
}

function deletePixelFloor() {
  if (pixelFloorCount <= 1) {
    showToast("The tower needs at least one floor.");
    return;
  }
  const agentCounts = new Map();
  for (const session of sessions.values()) {
    agentCounts.set(session.workspaceId, (agentCounts.get(session.workspaceId) || 0) + 1);
  }
  const requiredFloorCount = Math.max(1, ...agentCounts.values());
  if (pixelFloorCount <= requiredFloorCount) {
    showToast("Each active agent needs its own floor.");
    return;
  }
  const floor = activePixelFloor;
  localStorage.removeItem(`agentWorkbenchPixelLayout:${floor}`);
  localStorage.removeItem(pixelFloorPreviewKey(floor));
  for (let nextFloor = floor + 1; nextFloor <= pixelFloorCount; nextFloor += 1) {
    const layout = localStorage.getItem(`agentWorkbenchPixelLayout:${nextFloor}`);
    const destination = `agentWorkbenchPixelLayout:${nextFloor - 1}`;
    if (layout) localStorage.setItem(destination, layout);
    else localStorage.removeItem(destination);
    const preview = localStorage.getItem(pixelFloorPreviewKey(nextFloor));
    if (preview) localStorage.setItem(pixelFloorPreviewKey(nextFloor - 1), preview);
    else localStorage.removeItem(pixelFloorPreviewKey(nextFloor - 1));
  }
  localStorage.removeItem(`agentWorkbenchPixelLayout:${pixelFloorCount}`);
  localStorage.removeItem(pixelFloorPreviewKey(pixelFloorCount));
  const shiftedRoomStates = new Map();
  for (const [stateFloor, state] of pixelRoomStates) {
    if (stateFloor < floor) shiftedRoomStates.set(stateFloor, state);
    else if (stateFloor > floor) shiftedRoomStates.set(stateFloor - 1, state);
  }
  pixelRoomStates.clear();
  for (const [stateFloor, state] of shiftedRoomStates) {
    pixelRoomStates.set(stateFloor, state);
  }
  reindexPixelAgentFloorsAfterDelete(floor, pixelFloorCount - 1);
  pixelFloorCount -= 1;
  localStorage.setItem("agentWorkbenchPixelFloorCount", String(pixelFloorCount));
  for (const workspace of workspaces) reconcilePixelAgentFloorAssignments(workspace.id);
  activePixelFloor = Math.min(floor, pixelFloorCount);
  initializePixelFloors();
  postPixelMessage({
    type: "houseConfig",
    floors: pixelFloorCount,
    slots: activeWorkspace() ? workspaceLayoutFor(activeWorkspaceId) : 4,
    petsEnabled: booleanPreference("agentWorkbenchPixelPets", true),
    pet: localStorage.getItem("agentWorkbenchPixelPetChoice") || "hamster"
  });
  pixelPreviewRefreshNeeded = true;
  applyPixelFloor(activePixelFloor);
  schedulePixelPreviewRefresh(120);
  showToast(`Floor ${floor} deleted.`);
}

function isPixelRoomDivider(topology, column, row) {
  const doorwayRow = row === 14 || row === 15;
  switch (topology) {
    case "library-aisles":
      return [7, 13].includes(column) && row <= 13;
    case "studio-split":
      return (column === 8 && !doorwayRow) || (row === 17 && column > 8 && column < 19 && ![13, 14].includes(column));
    case "lounge-bay":
      return column === 13 && !doorwayRow;
    case "greenhouse":
      return ((column === 6 || column === 14) && row >= 12 && row <= 17 && row !== 15)
        || (row === 12 && column > 6 && column < 14 && ![9, 10].includes(column));
    case "war-room":
      return row === 16 && column >= 4 && column <= 15 && ![9, 10].includes(column);
    case "cafe-counter":
      return (row === 14 && column >= 12 && column < 19 && column !== 15)
        || (column === 12 && row < 14 && row !== 12);
    case "observatory":
      return ((column === 4 || column === 16) && row <= 14 && row !== 13)
        || (row === 13 && (column < 4 || column > 16));
    case "maker-lanes":
      return column === 10 && !doorwayRow;
    case "gallery-wings":
      return ([6, 13].includes(column) && row <= 15 && row !== 13);
    case "recording-booth":
      return (column === 13 && row <= 17 && row !== 15)
        || (row === 17 && column >= 13 && column < 19 && column !== 16);
    case "arcade-grid":
      return row === 17 && (column <= 6 || column >= 13) && ![3, 16].includes(column);
    case "zen-courtyard":
      return ((column === 7 || column === 13) && row >= 13 && row <= 18 && row !== 16)
        || ((row === 13 || row === 18) && column > 7 && column < 13 && column !== 10);
    case "newsroom":
      return row === 16 && column >= 6 && column <= 18 && ![11, 12].includes(column);
    case "wellness-suites":
      return ([6, 13].includes(column) && !doorwayRow);
    case "research-cross":
      return (column === 10 && !doorwayRow)
        || (row === 16 && column > 10 && column < 19 && ![14, 15].includes(column));
    case "open-loft":
      return (column === 15 && row <= 13) || (row === 18 && column <= 5);
    case "archive-stacks":
      return [5, 10, 15].includes(column) && row >= 11 && row <= 15 && row !== 13;
    case "command-bridge":
      return row === 15 && column >= 3 && column <= 16 && ![8, 9, 10, 11].includes(column);
    case "sunroom":
      return (column === 5 && row <= 12) || (column === 15 && row <= 12);
    case "rooftop":
      return row === 18 && (column <= 3 || column >= 17);
    default:
      return false;
  }
}

function pixelRoomFootprintContains(plan, column, row) {
  const [left, right, top, bottom] = plan.bounds;
  if (column < left || column > right || row < top || row > bottom) return false;
  const depth = row - top;
  const middle = Math.round((left + right) / 2);

  switch (plan.silhouette) {
    case "compact-rectangle":
      return true;
    case "east-studio-notch":
      return depth >= 4 || column <= right - 4;
    case "graduated-bay":
      if (depth <= 2) return column >= left + 5 && column <= right - 5;
      if (depth <= 5) return column >= left + 2 && column <= right - 2;
      return true;
    case "twin-greenhouse-wings":
      return depth >= 6 || column <= left + 5 || column >= right - 5;
    case "stepped-bunker":
      if (depth < 3) return column >= left + 4 && column <= right - 4;
      if (depth < 7) return column >= left + 2 && column <= right - 2;
      return true;
    case "cafe-l":
      return depth >= 5 || column <= right - 6;
    case "observatory-dome": {
      const inset = Math.max(0, 4 - Math.floor(depth / 2));
      return column >= left + inset && column <= right - inset;
    }
    case "offset-workshop":
      if (depth < 5) return column >= left + 3;
      if (depth < 8) return column >= left + 1;
      return true;
    case "gallery-u":
      return depth >= 7 || column <= left + 4 || column >= right - 4;
    case "recording-j":
      return depth >= 5 || column >= left + 5;
    case "arcade-t":
      return depth > 6 || (column >= middle - 4 && column <= middle + 4);
    case "courtyard-ring":
      return !(
        depth >= 4
        && depth <= 8
        && column >= middle - 3
        && column <= middle + 3
      );
    case "broadcast-desk":
      return depth >= 2 || (column >= left + 3 && column <= right - 3);
    case "wellness-zigzag":
      if (depth < 5) return column <= right - 3;
      if (depth < 10) return column >= left + 3;
      return true;
    case "research-cross":
      if (depth < 5) return column >= middle - 4 && column <= middle + 4;
      if (depth < 9) return true;
      return column >= middle - 6 && column <= middle + 6;
    case "creative-l":
      return depth >= 5 || column >= left + 5;
    case "archive-vault":
      if (depth < 3) return column >= left + 3 && column <= right - 3;
      return depth < 12 || (column >= left + 2 && column <= right - 2);
    case "bridge-chevron": {
      const inset = depth < 5 ? 5 - depth : Math.max(0, depth - 11);
      return column >= left + inset && column <= right - inset;
    }
    case "sunroom-pavilion":
      if (depth < 4) return column >= middle - 4 && column <= middle + 4;
      if (depth < 8) return column <= left + 6 || column >= right - 6;
      return true;
    case "rooftop-terraces":
      if (depth < 4) return column >= left + 6;
      if (depth < 8) return column >= left + 3 && column <= right - 2;
      return true;
    default:
      return true;
  }
}

function pixelRoomFloorTile(themeIndex, theme, column, row) {
  const [primary, secondary] = theme.palette;
  switch (themeIndex % 10) {
    case 0: return column < 10 ? primary : secondary;
    case 1: return row < 16 ? primary : secondary;
    case 2: return column < 13 && row < 17 ? primary : secondary;
    case 3: return column >= 7 && column <= 13 ? secondary : primary;
    case 4: return row >= 14 && row <= 17 ? secondary : primary;
    case 5: return column + row > 28 ? secondary : primary;
    case 6: return (column < 5 || column > 15) ? secondary : primary;
    case 7: return Math.floor(column / 4) % 2 ? secondary : primary;
    case 8: return (column + Math.floor(row / 2)) % 4 === 0 ? secondary : primary;
    default: return row % 3 === 0 ? secondary : primary;
  }
}

function pixelRoomTileColor(plan, theme, tile) {
  if (tile === 255) return null;
  if (tile === 0) return { ...plan.colors[0] };
  return {
    ...(tile === theme.palette[0] ? plan.colors[1] : plan.colors[2])
  };
}

function pixelFurnitureTypeId(type) {
  return String(type || "").split(":")[0];
}

async function pixelFurnitureCatalog() {
  if (!pixelFurnitureCatalogPromise) {
    pixelFurnitureCatalogPromise = fetch("pixel-agents-mode/assets/furniture-catalog.json")
      .then((response) => response.json())
      .then((items) => new Map(items.map((item) => [item.id, item])))
      .catch(() => new Map());
  }
  return pixelFurnitureCatalogPromise;
}

function pixelFurnitureFits(
  layout,
  column,
  row,
  width,
  height,
  preferWall,
  occupied,
  clearance = 0
) {
  const firstTile = layout.tiles[row * layout.cols + column];
  if (preferWall ? firstTile !== 0 : firstTile === 0 || firstTile === 255 || firstTile === undefined) {
    return false;
  }
  for (let offsetRow = 0; offsetRow < height; offsetRow += 1) {
    for (let offsetColumn = 0; offsetColumn < width; offsetColumn += 1) {
      const nextColumn = column + offsetColumn;
      const nextRow = row + offsetRow;
      if (nextColumn < 0 || nextColumn >= layout.cols || nextRow < 0 || nextRow >= layout.rows) {
        return false;
      }
      const tile = layout.tiles[nextRow * layout.cols + nextColumn];
      if (tile === 255 || tile === undefined || (!preferWall && tile === 0)) return false;
      if (occupied.has(`${nextColumn},${nextRow}`)) return false;
    }
  }
  for (let checkRow = row - clearance; checkRow < row + height + clearance; checkRow += 1) {
    for (let checkColumn = column - clearance; checkColumn < column + width + clearance; checkColumn += 1) {
      if (occupied.has(`${checkColumn},${checkRow}`)) return false;
    }
  }
  return true;
}

function reservePixelFurnitureFootprint(occupied, column, row, width, height) {
  for (let offsetRow = 0; offsetRow < height; offsetRow += 1) {
    for (let offsetColumn = 0; offsetColumn < width; offsetColumn += 1) {
      occupied.add(`${column + offsetColumn},${row + offsetRow}`);
    }
  }
}

function nearestPixelRoomFurnitureSpot(
  layout,
  targetColumn,
  targetRow,
  preferWall,
  occupied,
  width = 1,
  height = 1,
  clearance = 0
) {
  const candidates = [];
  for (let row = 0; row < layout.rows; row += 1) {
    for (let column = 0; column < layout.cols; column += 1) {
      if (!pixelFurnitureFits(
        layout,
        column,
        row,
        width,
        height,
        preferWall,
        occupied,
        clearance
      )) continue;
      candidates.push({
        column,
        row,
        score:
          Math.abs(column - targetColumn)
          + Math.abs(row - targetRow) * 1.35
      });
    }
  }
  candidates.sort((first, second) => first.score - second.score);
  return candidates[0] || null;
}

function buildPixelRoomFurniture(floor, theme, plan, layout, furnitureCatalog) {
  const pieces = [
    ...(PIXEL_WORKSTATION_KITS[theme.workstations] || PIXEL_WORKSTATION_KITS["north-row"]),
    ...theme.decor
  ];
  const [left, right, top, bottom] = plan.bounds;
  const occupied = new Set();
  const wallMounted = /BOOKSHELF|PAINTING|CLOCK|WHITEBOARD|HANGING_PLANT/;
  const placed = [];
  pieces.forEach(([type, col, row], index) => {
    const descriptor = furnitureCatalog.get(pixelFurnitureTypeId(type)) || {};
    if (descriptor.canPlaceOnSurfaces) return;
    const preferWall = wallMounted.test(type);
    const width = Math.max(1, Number(descriptor.footprintW) || 1);
    const height = Math.max(1, Number(descriptor.footprintH) || 1);
    const clearance = !preferWall && (descriptor.isDesk || width > 1 || height > 1) ? 1 : 0;
    const horizontalRange = Math.max(1, right - left - 2);
    const verticalRange = Math.max(1, bottom - top - 2);
    const targetColumn = Math.round(
      left + 1 + ((Math.max(1, Math.min(18, col)) - 1) / 17) * horizontalRange
    );
    const targetRow = preferWall
      ? top
      : Math.round(
          top + 1 + ((Math.max(11, Math.min(20, row)) - 11) / 9) * verticalRange
        );
    const spot = nearestPixelRoomFurnitureSpot(
      layout,
      targetColumn,
      targetRow,
      preferWall,
      occupied,
      width,
      height,
      clearance
    );
    const fallbackSpot = spot || nearestPixelRoomFurnitureSpot(
      layout,
      targetColumn,
      targetRow,
      preferWall,
      occupied,
      width,
      height,
      0
    );
    if (!fallbackSpot) return;
    reservePixelFurnitureFootprint(
      occupied,
      fallbackSpot.column,
      fallbackSpot.row,
      width,
      height
    );
    placed.push({
      uid: `f${floor}-${theme.topology}-${index + 1}`,
      type,
      col: fallbackSpot.column,
      row: fallbackSpot.row
    });
  });
  return placed;
}

function buildPixelRoomLayout(baseLayout, floor, furnitureCatalog = new Map()) {
  const themeIndex = (Math.max(1, Number(floor) || 1) - 1) % PIXEL_ROOM_THEMES.length;
  const theme = PIXEL_ROOM_THEMES[themeIndex];
  const plan = PIXEL_ROOM_PLANS[themeIndex];
  const layout = JSON.parse(JSON.stringify(baseLayout));
  layout.workbenchFloor = floor;
  layout.workbenchRoomTheme = theme.name;
  layout.workbenchRoomTopology = theme.topology;
  layout.workbenchRoomPlan = plan.key;
  layout.workbenchRoomDesignVersion = PIXEL_ROOM_DESIGN_VERSION;
  layout.tiles = Array(layout.cols * layout.rows).fill(255);
  layout.tileColors = Array(layout.tiles.length).fill(null);
  for (let row = 0; row < layout.rows; row += 1) {
    for (let column = 0; column < layout.cols; column += 1) {
      if (!pixelRoomFootprintContains(plan, column, row)) continue;
      const outsideWall =
        !pixelRoomFootprintContains(plan, column, row - 1)
        || !pixelRoomFootprintContains(plan, column - 1, row)
        || !pixelRoomFootprintContains(plan, column + 1, row);
      const divider = isPixelRoomDivider(theme.topology, column, row);
      const tile = outsideWall || divider
        ? 0
        : pixelRoomFloorTile(themeIndex, theme, column, row);
      const index = row * layout.cols + column;
      layout.tiles[index] = tile;
      layout.tileColors[index] = pixelRoomTileColor(plan, theme, tile);
    }
  }
  layout.furniture = buildPixelRoomFurniture(floor, theme, plan, layout, furnitureCatalog);
  delete layout.carpetTiles;
  delete layout.areaTiles;
  layout.areas = [];
  layout.areaMappings = {};
  return layout;
}

async function pixelLayoutForFloor(floor) {
  const saved = localStorage.getItem(`agentWorkbenchPixelLayout:${floor}`);
  if (saved) {
    try {
      const savedLayout = JSON.parse(saved);
      if (savedLayout.workbenchRoomDesignVersion === PIXEL_ROOM_DESIGN_VERSION) {
        savedLayout.workbenchFloor = floor;
        return savedLayout;
      }
    } catch (error) {
    }
  }
  if (!pixelBaseLayout) {
    const response = await fetch("pixel-agents-mode/assets/default-layout-1.json");
    pixelBaseLayout = await response.json();
  }
  return buildPixelRoomLayout(pixelBaseLayout, floor, await pixelFurnitureCatalog());
}

async function applyPixelFloor(floor, { persist = true, showLoader = false } = {}) {
  const previousFloor = activePixelFloor;
  activePixelFloor = Math.max(1, Math.min(pixelFloorCount, Number(floor) || 1));
  if (activePixelFloor !== previousFloor) closePixelPetDetail();
  const requestedFloor = activePixelFloor;
  if (persist) localStorage.setItem("agentWorkbenchPixelFloor", String(activePixelFloor));
  updatePixelFloorButtons();
  renderPixelFloorLauncher({ focus: pixelModeEnabled });
  if (!pixelFrameReady) return;
  if (showLoader && pixelModeEnabled) {
    setPixelViewLoading(true, `Opening floor ${requestedFloor}…`);
  }
  try {
    const layout = await pixelLayoutForFloor(requestedFloor);
    if (requestedFloor !== activePixelFloor) return;
    postPixelMessage({ type: "layoutLoaded", layout });
    await waitForPixelPreview(60);
    if (requestedFloor !== activePixelFloor) return;
    setPixelVisibleSessionsForFloor(requestedFloor);
    pixelPreviewRefreshNeeded = true;
    schedulePixelPreviewRefresh(90);
    if (showLoader) setPixelViewLoading(false, "", { delay: 180 });
  } catch (error) {
    if (showLoader) setPixelViewLoading(false);
    showToast("Could not open that floor.");
  }
}

function traversePixelTower(direction) {
  const nextFloor = Math.max(
    1,
    Math.min(pixelFloorCount, activePixelFloor + (direction > 0 ? 1 : -1))
  );
  if (nextFloor === activePixelFloor) return;
  applyPixelFloor(nextFloor);
  const button = pixelFloorButtons.find(
    (candidate) => Number(candidate.dataset.pixelFloor) === nextFloor
  );
  button?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function syncPixelMode(reset = false, { showLoader = true } = {}) {
  if (!pixelFrameReady) return;
  syncPixelAppearance();
  postPixelMessage({ type: "pixelModeVisibility", active: pixelModeEnabled });
  const workspace = activeWorkspace();
  const activeSessions = activePixelSessions();
  ensurePixelFloorCapacity(activeSessions.length);
  const visibleSessions = pixelSessionsForFloor(activePixelFloor);
  const agents = visibleSessions.map((session) => session.slotIndex + 1);
  const nextAgentIds = new Set(agents);
  for (const id of pixelKnownAgentIds) {
    if (!nextAgentIds.has(id)) postPixelMessage({ type: "agentClosed", id });
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
    type: "houseConfig",
    floors: pixelFloorCount,
    slots: workspace ? workspaceLayoutFor(workspace.id) : 4,
    petsEnabled: booleanPreference("agentWorkbenchPixelPets", true),
    pet: localStorage.getItem("agentWorkbenchPixelPetChoice") || "hamster"
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
  const floorReady = applyPixelFloor(activePixelFloor, { persist: false, showLoader });
  for (const session of activeSessions) {
    notePixelSessionPreviewChange(session);
  }
  renderPixelAgentRoster();
  renderPixelFloorLauncher();
  return floorReady;
}

function warmPixelView() {
  if (!pixelFrameReady) return Promise.resolve(false);
  if (pixelViewReady) return Promise.resolve(true);
  if (pixelWarmupPromise) return pixelWarmupPromise;
  pixelWarmupPromise = (async () => {
    try {
      await syncPixelMode(true, { showLoader: false });
      pixelViewReady = true;
      if (pixelModeEnabled) setPixelViewLoading(false, "", { delay: 120 });
      return true;
    } finally {
      pixelWarmupPromise = null;
    }
  })();
  return pixelWarmupPromise;
}

function postPixelSessionDetails(session) {
  if (!pixelFrameReady) return;
  const id = session.slotIndex + 1;
  const status = session.metadata.status || "working";
  const communicating = /collaborat|meeting|code review|pairing|communicat/i.test(
    `${session.metadata.currentTask || ""} ${session.metadata.tldr || ""}`
  );
  const active = status === "working" && !communicating;
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
    agentName: session.metadata.name || `Agent ${id}`,
    teamName: `${
      session.kind === "codex" ? "Codex" : session.kind === "claude" ? "Claude" : "Shell"
    } · Eta ${pixelRosterEtaText(session)}`,
    isTeamLead: false
  });
  postPixelMessage({
    type: "agentStatus",
    id,
    status: status === "error" ? "error" : active ? "active" : "waiting",
    awaitingInput: status === "waiting" || communicating
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
  postPixelMessage({
    type: "agentEta",
    id,
    eta: pixelRosterEtaText(session),
    etaSeconds: remainingEtaSeconds(session),
    name: session.metadata.name || `Agent ${id}`,
    team: session.kind === "codex" ? "Codex" : session.kind === "claude" ? "Claude" : "Shell",
    status: status === "done" ? "done" : active ? "active" : status,
    tldr: session.metadata.tldr || (active ? "Working…" : "Waiting for work"),
    present: true
  });
  const speech = status === "error"
    ? "I hit an error."
    : status === "done"
      ? `Done — ${session.metadata.tldr || "ready for more."}`
      : communicating
        ? "Syncing with the team."
        : status === "waiting"
          ? "Ready for more."
          : session.metadata.currentTask || session.metadata.tldr || "Working on it.";
  const speechKey = `${status}:${speech}`;
  if (speechKey !== session.pixelSpeechKey) {
    session.pixelSpeechKey = speechKey;
    postPixelMessage({
      type: "agentSpeech",
      id,
      text: speech.slice(0, 58),
      duration: status === "done" || status === "error" ? 5.2 : 4.2
    });
  }
}

function setPixelVisibleSessionsForFloor(floor) {
  if (!pixelFrameReady) return;
  const visibleSessions = pixelSessionsForFloor(floor);
  const nextAgentIds = new Set(visibleSessions.map((session) => session.slotIndex + 1));
  for (const id of Array.from(pixelKnownAgentIds)) {
    if (nextAgentIds.has(id)) continue;
    postPixelMessage({ type: "agentClosed", id });
    pixelKnownAgentIds.delete(id);
  }
  for (const session of visibleSessions) postPixelSessionDetails(session);
}

function syncPixelSession(session) {
  notePixelSessionPreviewChange(session);
  if (
    !pixelFrameReady
    || session.workspaceId !== activeWorkspaceId
    || pixelFloorForSession(session) !== activePixelFloor
  ) {
    return;
  }
  postPixelSessionDetails(session);
}

function setPixelAgentClipboard(open) {
  const next = Boolean(open);
  if (next) closePixelPetDetail();
  pixelAgentClipboard.hidden = !next;
  pixelAgentClipboardButton.setAttribute("aria-expanded", String(next));
  pixelAgentClipboardButton.classList.toggle("active", next);
  if (next) renderPixelAgentRoster();
}

function setPixelMode(enabled, { persist = true } = {}) {
  if (enabled && !homeView.hidden) {
    showToast("Open a workspace before entering Pixel mode.");
    return;
  }
  pixelModeEnabled = Boolean(enabled);
  document.body.classList.toggle("pixel-mode-active", pixelModeEnabled);
  agentGrid.hidden = pixelModeEnabled;
  pixelModeView.hidden = false;
  pixelModeView.classList.toggle("background-warm", !pixelModeEnabled);
  pixelModeView.setAttribute("aria-hidden", String(!pixelModeEnabled));
  document.querySelector(".agent-stage").classList.toggle("pixel-mode", pixelModeEnabled);
  pixelModeButton.classList.toggle("active", pixelModeEnabled);
  pixelModeButton.setAttribute("aria-pressed", String(pixelModeEnabled));
  pixelModeButton.title = pixelModeEnabled ? "Terminal mode" : "Pixel mode";
  pixelModeButton.setAttribute("aria-label", pixelModeButton.title);
  if (persist) localStorage.setItem("agentWorkbenchPixelMode", pixelModeEnabled ? "1" : "0");
  if (pixelFrameReady) {
    postPixelMessage({ type: "pixelModeVisibility", active: pixelModeEnabled });
  }
  if (pixelModeEnabled) {
    if (!pixelViewReady) {
      setPixelViewLoading(true, "Building the visual view…");
      warmPixelView();
    } else {
      syncPixelMode(true, { showLoader: false });
      setPixelViewLoading(false);
    }
  }
  else {
    if (pixelPreviewRefreshTimer) clearTimeout(pixelPreviewRefreshTimer);
    pixelPreviewRefreshTimer = null;
    setPixelAgentClipboard(false);
    closePixelAgentDetail();
    closePixelPetDetail();
    requestAnimationFrame(() => {
      for (const session of activePixelSessions()) {
        try {
          fitTerminalPreservingScroll(session);
        } catch (error) {
        }
      }
    });
  }
  if (pixelModeEnabled && (pixelPreviewRefreshNeeded || pixelDirtyPreviewFloors.size > 0)) {
    schedulePixelPreviewRefresh(160);
  }
  renderPixelFloorLauncher({ focus: pixelModeEnabled });
}

function normalizedAgentState(metadata = {}) {
  const status = String(metadata.status || "working").toLowerCase();
  if (status === "done") return "complete";
  if (status === "error") return "failed";
  if (status === "waiting") return "waiting";
  const explicit = String(metadata.state || "").toLowerCase();
  if (["planning", "coding", "waiting", "failed", "complete"].includes(explicit)) return explicit;
  return Number(metadata.progressPercent) < 12 ? "planning" : "coding";
}

function agentStateLabel(state, metadata = {}) {
  if (state === "planning") return "Planning";
  if (state === "coding") return "Running";
  if (state === "waiting" || state === "complete") return "Idle";
  if (state === "failed") return "Failed";
  return "Idle";
}

function formatElapsedClock(startedAt, now = Date.now()) {
  const started = Date.parse(startedAt || "");
  const seconds = Number.isFinite(started) ? Math.max(0, Math.floor((now - started) / 1000)) : 0;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function formatCompactNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  if (number >= 1000000) return `${(number / 1000000).toFixed(number >= 10000000 ? 0 : 1)}m`;
  if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1)}k`;
  return String(Math.round(number));
}

function runtimeModelFromTerminal(data) {
  const plain = String(data || "")
    .replace(/\u001b\][^\u0007]*(?:\u0007|\u001b\\)/g, "")
    .replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, "");
  const match = plain.match(/\b(gpt-\d+(?:\.\d+)*(?:-[a-z0-9.-]+)?)\s+(low|medium|high|xhigh|max|ultra)\b/i);
  return match ? `${match[1]} [${match[2].toLowerCase()}]` : "";
}

function queueTerminalOutput(session, data) {
  const chunk = String(data || "");
  if (!session?.term || !chunk) return;
  // xterm's WriteBuffer already preserves PTY ordering, parser state, scroll
  // anchoring, and a render-time budget. Feeding the original chunks into it
  // avoids both giant synchronous parses and corrupting an ANSI sequence by
  // dropping arbitrary backlog bytes.
  session.term.write(chunk);
}

function writeAgentInstruction(session, message) {
  const line = String(message || "").trim();
  if (!session || !line || session.exited || session.pendingAgentSubmitTimer) return false;
  session.term.paste(line);
  session.pendingAgentSubmitTimer = window.setTimeout(() => {
    const current = sessions.get(session.id);
    session.pendingAgentSubmitTimer = null;
    if (!current || current.exited) return;
    current.term.input("\r", true);
  }, 170);
  return true;
}

function fitTerminalPreservingScroll(session) {
  if (!session?.term || !session?.fitAddon || !session?.terminalHost) return false;
  const { width, height } = session.terminalHost.getBoundingClientRect();
  if (
    !session.terminalHost.isConnected
    || width < 80
    || height < 48
    || document.body.classList.contains("cinematic-resizing")
    || document.body.classList.contains("window-resizing")
    || document.body.classList.contains("is-resizing")
  ) {
    return false;
  }
  // BufferService owns ydisp adjustment during scrollback trimming and line
  // reflow. Re-applying an old absolute viewportY makes the screen jump.
  session.fitAddon.fit();
  return true;
}

function scheduleActiveTerminalFits() {
  for (const session of activeWorkspaceSessions()) {
    session.scheduleTerminalFit?.();
  }
}

function settleResponsiveLayout() {
  if (windowResizeFrame) cancelAnimationFrame(windowResizeFrame);
  windowResizeFrame = 0;
  document.body.classList.remove("window-resizing");
  if (cinematicModeEnabled) applyCinematicPaneSize();
  if (!pixelPetDetail.hidden && pixelPetDetailAnchor) positionPixelPetDetail();
  scheduleActiveTerminalFits();
}

function handleWindowResize() {
  document.body.classList.add("window-resizing");
  if (!windowResizeFrame) {
    windowResizeFrame = requestAnimationFrame(() => {
      windowResizeFrame = 0;
      if (cinematicModeEnabled) applyCinematicPaneSize();
      if (!pixelPetDetail.hidden && pixelPetDetailAnchor) positionPixelPetDetail();
    });
  }
  if (windowResizeSettleTimer) window.clearTimeout(windowResizeSettleTimer);
  windowResizeSettleTimer = window.setTimeout(() => {
    windowResizeSettleTimer = 0;
    settleResponsiveLayout();
  }, 140);
}

function updateAgentStatusCard(session, now = Date.now()) {
  if (!session) return;
  const metadata = session.metadata || {};
  const state = normalizedAgentState(metadata);
  const progress = Math.max(0, Math.min(100, Number(metadata.progressPercent) || (state === "complete" ? 100 : 0)));
  if (session.stateChip) {
    session.stateChip.dataset.state = state;
    session.stateChip.textContent = agentStateLabel(state, metadata);
    session.stateChip.hidden = !booleanPreference("agentWorkbenchPixelStatusLabels", true);
  }
  if (!session.statusCard) return;
  session.statusCard.dataset.state = state;
  session.statusCard.querySelector(".agent-state").textContent = state;
  session.statusCard.querySelector(".agent-model").textContent = session.runtimeModel || metadata.model || (
    session.kind === "codex" ? "Codex" : session.kind === "claude" ? "Claude" : "Shell"
  );
  session.statusCard.querySelector(".agent-current-task").textContent =
    metadata.currentTask || metadata.tldr || metadata.name || "Waiting for a task";
  session.statusCard.querySelector(".agent-progress-label").textContent = `${Math.round(progress)}%`;
  session.statusCard.querySelector(".agent-progress-track i").style.width = `${progress}%`;
  session.statusCard.querySelector(".agent-elapsed").textContent = formatElapsedClock(metadata.createdAt, now);
  const tokenValues = [metadata.inputTokens, metadata.outputTokens]
    .filter((value) => value !== null && value !== undefined && value !== "")
    .map(Number)
    .filter(Number.isFinite);
  const totalTokens = tokenValues
    .reduce((total, value) => total + value, 0);
  session.statusCard.querySelector(".agent-tokens").textContent =
    tokenValues.length
      ? formatCompactNumber(totalTokens)
      : "—";
  session.statusCard.querySelector(".agent-cost").textContent =
    metadata.costUsd !== null && metadata.costUsd !== undefined && metadata.costUsd !== ""
      && Number.isFinite(Number(metadata.costUsd))
      ? Number(metadata.costUsd).toFixed(2)
      : "—";
}

function normalizedAgentChecklist(metadata = {}) {
  const checklist = (Array.isArray(metadata.checklist) ? metadata.checklist : [])
    .filter((item) => item && String(item.text || "").trim())
    .map((item) => ({
      text: String(item.text || "").trim().slice(0, 180),
      status: ["pending", "working", "done", "blocked"].includes(String(item.status || "").toLowerCase())
        ? String(item.status).toLowerCase()
        : "pending",
      etaSeconds: Number.isFinite(Number(item.etaSeconds)) && Number(item.etaSeconds) >= 0
        ? Math.round(Number(item.etaSeconds))
        : null
    }))
    .slice(0, 16);
  const firstWorking = checklist.findIndex((item) => item.status === "working");
  checklist.forEach((item, index) => {
    if (item.status === "working" && index !== firstWorking) item.status = "pending";
  });
  if (
    checklist.length
    && firstWorking < 0
    && String(metadata.status || "").toLowerCase() === "working"
  ) {
    const nextIndex = checklist.findIndex((item) => item.status === "pending");
    if (nextIndex >= 0) checklist[nextIndex].status = "working";
  }
  return checklist;
}

function syncChecklistEtaState(session, metadata, now = Date.now()) {
  if (!session?.checklistEtaState) return;
  const checklist = normalizedAgentChecklist(metadata);
  const activeIndex = checklist.findIndex((item) => item.status === "working");
  const next = new Map();
  checklist.forEach((item, index) => {
    const key = `${index}:${item.text}`;
    const previous = session.checklistEtaState.get(key);
    const countsDown = index === activeIndex && item.status === "working";
    const shouldReset = !previous
      || previous.reportedSeconds !== item.etaSeconds
      || previous.status !== item.status
      || previous.countsDown !== countsDown;
    next.set(key, {
      reportedSeconds: item.etaSeconds,
      status: item.status,
      countsDown,
      deadline: !countsDown || !Number.isFinite(item.etaSeconds)
        ? null
        : session.etaPaused
          ? null
        : shouldReset
          ? now + item.etaSeconds * 1000
          : previous.deadline,
      pausedSeconds: session.etaPaused && countsDown
        ? Number.isFinite(previous?.pausedSeconds)
          ? previous.pausedSeconds
          : Number.isFinite(previous?.deadline)
            ? Math.max(0, Math.ceil((previous.deadline - now) / 1000))
            : item.etaSeconds
        : null
    });
  });
  session.checklistEtaState = next;
}

function renderAgentCleanView(session, now = Date.now()) {
  if (!session?.cleanView) return;
  const metadata = session.metadata || {};
  const state = normalizedAgentState(metadata);
  if (session.cleanCurrentTask) {
    session.cleanCurrentTask.querySelector("strong").textContent =
      metadata.currentTask || metadata.tldr || "Waiting for the next request";
    session.cleanCurrentTask.dataset.state = state;
  }
  const etaSeconds = remainingEtaSeconds(session, now);
  if (session.cleanInterruptButton) {
    const unavailable = session.exited || session.etaPaused || state === "complete" || state === "failed";
    session.cleanInterruptButton.disabled = unavailable;
    session.cleanInterruptButton.title = session.etaPaused ? "Agent interrupted" : "Interrupt agent";
    session.cleanInterruptButton.setAttribute("aria-label", session.cleanInterruptButton.title);
  }
  const etaRow = session.cleanEtaText.closest(".agent-clean-eta-row");
  const etaLabel = etaRow?.querySelector("span");
  const hasOutputMessage = state === "complete" || state === "failed";
  etaRow?.classList.toggle("has-output-message", hasOutputMessage);
  if (etaLabel) {
    etaLabel.textContent = state === "failed" ? "Failed" : state === "complete" ? "Done" : "ETA";
  }
  session.cleanEtaText.textContent = hasOutputMessage
    ? metadata.tldr || metadata.currentTask || (state === "failed" ? "The task failed." : "Task complete.")
    : Number.isFinite(etaSeconds)
      ? `${session.etaPaused ? "Ⅱ " : ""}${formatEtaClock(etaSeconds)}`
      : "—";
  session.cleanChecklist.replaceChildren();

  const checklist = normalizedAgentChecklist(metadata);
  if (!checklist.length) {
    const empty = document.createElement("div");
    empty.className = "agent-clean-empty";
    empty.textContent = metadata.status === "waiting"
      ? "Waiting for a task."
      : "Waiting for the agent’s checklist…";
    session.cleanChecklist.appendChild(empty);
  } else {
    const activeIndex = checklist.findIndex((item) => item.status === "working");
    checklist.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = `agent-checklist-item ${item.status}`;
      const marker = document.createElement("span");
      marker.className = "agent-checklist-marker";
      marker.setAttribute("aria-hidden", "true");
      const text = document.createElement("span");
      text.className = "agent-checklist-copy";
      text.textContent = item.text;
      const eta = document.createElement("span");
      eta.className = "agent-checklist-eta";
      const etaState = session.checklistEtaState.get(`${index}:${item.text}`);
      const remaining = Number.isFinite(etaState?.deadline)
        ? Math.max(0, Math.ceil((etaState.deadline - now) / 1000))
        : session.etaPaused && Number.isFinite(etaState?.pausedSeconds)
          ? etaState.pausedSeconds
        : null;
      eta.textContent = item.status === "done"
        ? "done"
        : item.status === "blocked"
          ? "blocked"
          : index === activeIndex && Number.isFinite(remaining)
            ? `${session.etaPaused ? "Ⅱ " : ""}${formatEtaClock(remaining)}`
            : Number.isFinite(item.etaSeconds)
              ? `~${formatEtaClock(item.etaSeconds)}`
              : item.status === "pending"
                ? "queued"
                : "—";
      row.append(marker, text, eta);
      session.cleanChecklist.appendChild(row);
    });
  }

  session.cleanFileList.replaceChildren();
  const relevantFiles = Array.isArray(metadata.relevantFiles)
    ? metadata.relevantFiles.slice(0, 3)
    : [];
  session.cleanFiles.hidden = relevantFiles.length === 0;
  for (const relativePath of relevantFiles) {
    session.cleanFileList.appendChild(createAgentRelevantFile(session, relativePath, "agent-clean-file"));
  }
}

function scheduleAgentCleanRender(session) {
  if (!session?.cleanMode) return;
  clearTimeout(session.cleanRenderTimer);
  const elapsed = Date.now() - lastTerminalInputAt;
  const delay = elapsed < 220 ? 220 - elapsed : 0;
  session.cleanRenderTimer = setTimeout(() => {
    session.cleanRenderTimer = null;
    renderAgentCleanView(session);
  }, delay);
}

function sendAgentCleanInstruction(session) {
  const message = session?.cleanComposeInput?.value.trim();
  if (!session || !message || session.exited) return false;
  if (!writeAgentInstruction(session, message)) return false;
  lastTerminalInputAt = Date.now();
  resumeSessionEta(session);
  session.pausedByUser = false;
  beginAgentTask(session, message);
  updateRuntimeStatus();
  session.cleanComposeInput.value = "";
  session.cleanComposeInput.dispatchEvent(new Event("input", { bubbles: true }));
  showToast(`Sent to ${session.metadata.name || `Agent ${session.slotIndex + 1}`}`);
  return true;
}

function setAgentCleanMode(session, enabled, { focus = true } = {}) {
  if (!session?.slot) return;
  const next = Boolean(enabled);
  session.cleanMode = next;
  session.slot.classList.toggle("clean-mode", next);
  const button = session.slot.querySelector(".agent-clean-toggle");
  button.classList.toggle("active", next);
  button.setAttribute("aria-pressed", String(next));
  button.title = next ? "Terminal view" : "Zen view";
  button.setAttribute("aria-label", next ? "Show terminal view" : "Show Zen view");
  if (next) {
    renderAgentCleanView(session);
    if (focus) session.cleanComposeInput.focus();
  } else {
    requestAnimationFrame(() => {
      try {
        fitTerminalPreservingScroll(session);
        session.term.focus();
      } catch (error) {
      }
    });
  }
}

function setGlobalCleanMode(enabled, { persist = true } = {}) {
  globalCleanMode = Boolean(enabled);
  if (persist) {
    localStorage.setItem("agentWorkbenchGlobalCleanMode", globalCleanMode ? "1" : "0");
  }
  globalZenButton.classList.toggle("active", globalCleanMode);
  globalZenButton.setAttribute("aria-pressed", String(globalCleanMode));
  globalZenButton.title = globalCleanMode ? "Terminal view for all agents" : "Zen view for all agents";
  globalZenButton.setAttribute("aria-label", globalZenButton.title);
  for (const session of sessions.values()) {
    setAgentCleanMode(session, globalCleanMode, { focus: false });
  }
}

function cinematicPaneBounds() {
  const compact = window.innerWidth <= 920;
  // Keep these values in sync with the compact Cinematic CSS so a 2×2 grid
  // always fits exactly inside the available stage after a native resize.
  const horizontalPadding = compact ? 64 : 116;
  const verticalPadding = compact ? 130 : 146;
  const columnGap = compact ? 22 : 30;
  const rowGap = compact ? 22 : 26;
  return {
    minWidth: Math.min(compact ? 340 : 420, Math.max(280, Math.floor((window.innerWidth - horizontalPadding - columnGap) / 2))),
    maxWidth: Math.max(260, Math.floor((window.innerWidth - horizontalPadding - columnGap) / 2)),
    minHeight: Math.min(compact ? 185 : 225, Math.max(160, Math.floor((window.innerHeight - verticalPadding - rowGap) / 2))),
    maxHeight: Math.max(150, Math.floor((window.innerHeight - verticalPadding - rowGap) / 2))
  };
}

function applyCinematicPaneSize(width = cinematicPaneSize.width, height = cinematicPaneSize.height) {
  const bounds = cinematicPaneBounds();
  cinematicPaneSize = {
    width: Math.round(Math.max(bounds.minWidth, Math.min(bounds.maxWidth, Number(width) || 600))),
    height: Math.round(Math.max(bounds.minHeight, Math.min(bounds.maxHeight, Number(height) || 285)))
  };
  document.body.style.setProperty("--cinematic-agent-width", `${cinematicPaneSize.width}px`);
  document.body.style.setProperty("--cinematic-agent-height", `${cinematicPaneSize.height}px`);
  cinematicResizeReadout.querySelector("strong").textContent = `${cinematicPaneSize.width} × ${cinematicPaneSize.height}`;
  return cinematicPaneSize;
}

function loadCinematicPaneSize() {
  const width = Number(localStorage.getItem("agentWorkbenchCinematicPaneWidth")) || 600;
  const height = Number(localStorage.getItem("agentWorkbenchCinematicPaneHeight")) || 285;
  return applyCinematicPaneSize(width, height);
}

function ensureCinematicResizeHandle(slot) {
  if (!slot || slot.querySelector(":scope > .cinematic-agent-resize-handle")) return;
  const handle = document.createElement("button");
  handle.type = "button";
  handle.className = "cinematic-agent-resize-handle";
  handle.title = "Resize all cinematic panes";
  handle.setAttribute("aria-label", "Resize all cinematic panes");
  handle.innerHTML = "<i></i><i></i><i></i>";
  slot.appendChild(handle);
}

function ensureCinematicResizeHandles() {
  agentGrid.querySelectorAll(".agent-slot").forEach(ensureCinematicResizeHandle);
}

function beginCinematicPaneResize(event) {
  const handle = event.target.closest(".cinematic-agent-resize-handle");
  if (!handle || !cinematicModeEnabled) return;
  event.preventDefault();
  event.stopPropagation();
  clearTimeout(cinematicResizeSettleTimer);
  document.body.classList.remove("cinematic-resize-settling");
  cinematicResizeState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    width: cinematicPaneSize.width,
    height: cinematicPaneSize.height,
    clientX: event.clientX,
    clientY: event.clientY
  };
  handle.setPointerCapture?.(event.pointerId);
  document.body.classList.add("cinematic-resizing");
  cinematicResizeReadout.hidden = false;
}

function updateCinematicPaneResize(event) {
  if (!cinematicResizeState || event.pointerId !== cinematicResizeState.pointerId) return;
  cinematicResizeState.clientX = event.clientX;
  cinematicResizeState.clientY = event.clientY;
  if (cinematicResizeFrame) return;
  cinematicResizeFrame = requestAnimationFrame(() => {
    cinematicResizeFrame = 0;
    if (!cinematicResizeState) return;
    applyCinematicPaneSize(
      cinematicResizeState.width + (cinematicResizeState.clientX - cinematicResizeState.startX),
      cinematicResizeState.height + (cinematicResizeState.clientY - cinematicResizeState.startY)
    );
  });
}

function finishCinematicPaneResize(event = {}) {
  if (!cinematicResizeState || (event.pointerId !== undefined && event.pointerId !== cinematicResizeState.pointerId)) return;
  cinematicResizeState = null;
  if (cinematicResizeFrame) cancelAnimationFrame(cinematicResizeFrame);
  cinematicResizeFrame = 0;
  document.body.classList.remove("cinematic-resizing");
  document.body.classList.add("cinematic-resize-settling");
  cinematicResizeReadout.hidden = true;
  localStorage.setItem("agentWorkbenchCinematicPaneWidth", String(cinematicPaneSize.width));
  localStorage.setItem("agentWorkbenchCinematicPaneHeight", String(cinematicPaneSize.height));
  for (const session of activeWorkspaceSessions()) session.scheduleTerminalFit?.();
  cinematicResizeSettleTimer = setTimeout(() => {
    document.body.classList.remove("cinematic-resize-settling");
  }, 520);
}

function setCinematicMode(enabled, { persist = true } = {}) {
  if (enabled && !homeView.hidden) {
    showToast("Open a workspace before entering Cinematic mode.");
    return;
  }
  cinematicModeEnabled = Boolean(enabled);
  if (cinematicModeEnabled && pixelModeEnabled) setPixelMode(false);
  document.body.classList.toggle("cinematic-mode", cinematicModeEnabled);
  cinematicModeButton.classList.toggle("active", cinematicModeEnabled);
  cinematicModeButton.setAttribute("aria-pressed", String(cinematicModeEnabled));
  cinematicModeButton.title = cinematicModeEnabled ? "Exit cinematic mode" : "Cinematic mode";
  cinematicModeButton.setAttribute("aria-label", cinematicModeButton.title);
  cinematicExitButton.hidden = !cinematicModeEnabled;
  cinematicNextSceneButton.hidden = !cinematicModeEnabled;
  cinematicPromptDock.hidden = !cinematicModeEnabled;
  if (!cinematicModeEnabled) closeCinematicMentionMenu();
  if (persist) {
    localStorage.setItem("agentWorkbenchCinematicMode", cinematicModeEnabled ? "1" : "0");
  }
  if (cinematicModeEnabled) {
    loadCinematicPaneSize();
    ensureCinematicResizeHandles();
  } else {
    finishCinematicPaneResize();
  }
  api.setWindowCinematicFullScreen(cinematicModeEnabled).catch(() => {});
  syncSceneBackgroundPlayback();
  refreshTerminalThemes();
  requestAnimationFrame(() => {
    for (const session of activeWorkspaceSessions()) {
      try {
        fitTerminalPreservingScroll(session);
      } catch (error) {
      }
    }
    if (cinematicModeEnabled) cinematicPromptInput.focus();
  });
}

async function submitCinematicPrompt() {
  const rawMessage = cinematicPromptInput.value.trim();
  const workspaceSessions = activeWorkspaceSessions().filter((session) => !session.exited);
  const routing = resolveCinematicMention(rawMessage, workspaceSessions);
  const message = routing.message;
  if (!message) {
    if (routing.explicit) showToast("Add an instruction after the @mention.");
    return;
  }
  const selectedSession = sessions.get(selectedAgentId);
  let target = routing.target || (!routing.explicit && (
    selectedSession?.workspaceId === activeWorkspaceId && !selectedSession.exited
      ? selectedSession
      : workspaceSessions.find((session) => {
        const state = normalizedAgentState(session.metadata);
        return state === "waiting" || state === "idle";
      })
  ));

  cinematicPromptSendButton.disabled = true;
  closeCinematicMentionMenu();
  try {
    if (!target) {
      const requestedSlot = Number.isInteger(routing.slotIndex) && !slots[routing.slotIndex]
        ? routing.slotIndex
        : -1;
      const slotIndex = requestedSlot !== -1 ? requestedSlot : firstEmptySlot();
      if (slotIndex !== -1) {
        const preferredKind = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
        target = await startAgent(
          slotIndex,
          routing.kind || (["codex", "claude", "shell"].includes(preferredKind) ? preferredKind : "codex"),
          message
        );
        if (target) cinematicPromptInput.value = "";
        return;
      }
      target = workspaceSessions[0] || null;
    }
    if (!target) {
      showToast("No available agent slot.");
      return;
    }
    if (!writeAgentInstruction(target, message)) return;
    lastTerminalInputAt = Date.now();
    resumeSessionEta(target);
    target.pausedByUser = false;
    beginAgentTask(target, message);
    updateRuntimeStatus();
    cinematicPromptInput.value = "";
    showToast(`Sent to ${target.metadata.name || `Agent ${target.slotIndex + 1}`}`);
  } finally {
    cinematicPromptSendButton.disabled = false;
    cinematicPromptInput.focus();
  }
}

function resolveCinematicMention(rawMessage, workspaceSessions) {
  const match = rawMessage.match(/^@([a-z0-9_-]+)(?:\s+|$)/i);
  if (!match) return { explicit: false, kind: null, message: rawMessage, slotIndex: null, target: null };
  const token = match[1].toLowerCase();
  const message = rawMessage.slice(match[0].length).trim();
  const selectedSession = sessions.get(selectedAgentId);
  if (["codex", "claude", "shell"].includes(token)) {
    const target = selectedSession?.kind === token && !selectedSession.exited
      ? selectedSession
      : workspaceSessions.find((session) => session.kind === token) || null;
    return { explicit: true, kind: token, message, slotIndex: null, target };
  }
  if (/^[1-4]$/.test(token)) {
    const slotIndex = Number(token) - 1;
    const target = workspaceSessions.find((session) => session.slotIndex === slotIndex) || null;
    return {
      explicit: true,
      kind: target?.kind || null,
      message,
      slotIndex,
      target
    };
  }
  const target = workspaceSessions.find((session) => {
    const name = String(session.metadata.name || "").trim().toLowerCase();
    return name === token;
  }) || null;
  return target
    ? { explicit: true, kind: target.kind, message, slotIndex: target.slotIndex, target }
    : { explicit: false, kind: null, message: rawMessage, slotIndex: null, target: null };
}

function cinematicMentionContext() {
  const cursor = cinematicPromptInput.selectionStart ?? cinematicPromptInput.value.length;
  const beforeCursor = cinematicPromptInput.value.slice(0, cursor);
  const match = beforeCursor.match(/(?:^|\s)@([a-z0-9_-]*)$/i);
  if (!match) return null;
  return {
    cursor,
    query: match[1].toLowerCase(),
    start: beforeCursor.lastIndexOf("@")
  };
}

function cinematicMentionChoices(query = "") {
  const namedChoices = activeWorkspaceSessions()
    .filter((session) => !session.exited && String(session.metadata.name || "").trim())
    .map((session) => ({
      token: String(session.metadata.name).trim().toLowerCase(),
      label: String(session.metadata.name).trim(),
      session
    }));
  const seen = new Set();
  return namedChoices.filter((choice) => {
    if (seen.has(choice.token)) return false;
    seen.add(choice.token);
    return !query
      || choice.token.includes(query)
      || choice.label.toLowerCase().includes(query);
  });
}

function closeCinematicMentionMenu() {
  cinematicMentionMenu.hidden = true;
  cinematicMentionMenu.replaceChildren();
  cinematicMentionChoicesState = [];
  cinematicMentionIndex = 0;
}

function renderCinematicMentionMenu() {
  if (!cinematicModeEnabled || cinematicPromptDock.hidden) {
    closeCinematicMentionMenu();
    return;
  }
  const context = cinematicMentionContext();
  if (!context) {
    closeCinematicMentionMenu();
    return;
  }
  cinematicMentionChoicesState = cinematicMentionChoices(context.query);
  if (!cinematicMentionChoicesState.length) {
    closeCinematicMentionMenu();
    return;
  }
  cinematicMentionIndex = Math.min(cinematicMentionIndex, cinematicMentionChoicesState.length - 1);
  cinematicMentionMenu.replaceChildren(...cinematicMentionChoicesState.map((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cinematic-mention-choice";
    button.dataset.mentionIndex = String(index);
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(index === cinematicMentionIndex));
    button.classList.add("has-profile");
    button.setAttribute("aria-label", `Mention ${choice.label}`);
    const avatar = document.createElement("span");
    avatar.className = "cinematic-mention-avatar";
    applyAgentFace(avatar, choice.session);
    const profile = document.createElement("span");
    profile.className = "cinematic-mention-profile";
    profile.innerHTML = `<span>${escapeHtml(choice.label)}</span>`;
    const state = document.createElement("em");
    state.className = "cinematic-mention-state";
    state.textContent = agentStateLabel(normalizedAgentState(choice.session.metadata), choice.session.metadata);
    button.append(avatar, profile, state);
    return button;
  }));
  cinematicMentionMenu.hidden = false;
}

function insertCinematicMention(index = cinematicMentionIndex) {
  const context = cinematicMentionContext();
  const choice = cinematicMentionChoicesState[index];
  if (!context || !choice) return;
  cinematicPromptInput.setRangeText(`@${choice.token} `, context.start, context.cursor, "end");
  closeCinematicMentionMenu();
  cinematicPromptInput.focus();
}

function activeWorkspaceSessions() {
  return Array.from(sessions.values()).filter((session) => session.workspaceId === activeWorkspaceId);
}

function updateRuntimeStatus(now = Date.now()) {
  const workspaceSessions = activeWorkspaceSessions();
  const capacity = activeWorkspaceLayout();
  stageAgentCount.textContent = `${workspaceSessions.length}/${capacity}`;
  const allPaused = workspaceSessions.length > 0 && workspaceSessions.every((session) => session.pausedByUser);
  agentsPaused = allPaused;
  runPauseAllButton.textContent = allPaused ? "▶" : "Ⅱ";
  runPauseAllButton.title = allPaused ? "Run all agents" : "Pause all agents";
  runPauseAllButton.setAttribute("aria-label", runPauseAllButton.title);
  runPauseAllButton.disabled = workspaceSessions.length === 0;
}

function selectAgentSession(session) {
  selectedAgentId = session?.id || null;
  document.querySelectorAll(".agent-slot.selected").forEach((slot) => slot.classList.remove("selected"));
  if (session?.slot) session.slot.classList.add("selected");
  cinematicPromptInput.placeholder = session
    ? `What’s next for ${session.metadata.name || `Agent ${session.slotIndex + 1}`}?`
    : "What should we work on?";
  updateRuntimeStatus();
}

function toggleRunPauseAll() {
  const workspaceSessions = activeWorkspaceSessions();
  if (!workspaceSessions.length) return;
  const shouldResume = workspaceSessions.every((session) => session.pausedByUser);
  for (const session of workspaceSessions) {
    if (shouldResume) {
      session.pausedByUser = false;
      resumeSessionEta(session);
      writeAgentInstruction(session, "Continue from where you paused.");
      session.metadata = { ...session.metadata, status: "working", state: "coding", currentTask: "Resuming task" };
    } else {
      session.pausedByUser = true;
      pauseSessionEta(session);
      api.writeAgent(session.id, "\u001b");
      session.metadata = { ...session.metadata, status: "waiting", state: "waiting", currentTask: "Paused" };
    }
    updateAgentStatusCard(session);
  }
  updateRuntimeStatus();
  renderAgentSidebar();
  syncPixelMode(true);
}

async function stopAllAgents() {
  const workspaceSessions = activeWorkspaceSessions();
  if (!workspaceSessions.length || !window.confirm("Stop all agents in this workspace?")) return;
  for (const session of [...workspaceSessions]) await stopAgent(session.id);
}

async function retryFailedAgents() {
  const failed = activeWorkspaceSessions().filter((session) => normalizedAgentState(session.metadata) === "failed");
  if (!failed.length) {
    showToast("No failed agents to retry.");
    return;
  }
  for (const session of failed) {
    const retry = {
      slotIndex: session.slotIndex,
      kind: session.kind,
      task: session.metadata.currentTask || session.metadata.tldr || session.metadata.name || ""
    };
    await stopAgent(session.id);
    await startAgent(retry.slotIndex, retry.kind, retry.task);
  }
}

function askAgentsForStatus(targetSession = null) {
  const targets = targetSession ? [targetSession] : activeWorkspaceSessions();
  for (const session of targets) {
    writeAgentInstruction(
      session,
      "Please report a concise status update and refresh all BsCode metadata fields now."
    );
  }
  if (targets.length) showToast(`Asked ${targets.length} ${targets.length === 1 ? "agent" : "agents"} for status.`);
}

function reassignAgentTask(session) {
  const task = window.prompt("Reassign task", session.metadata.currentTask || session.metadata.tldr || "");
  if (!task?.trim()) return;
  if (!writeAgentInstruction(session, task)) return;
  beginAgentTask(session, task.trim());
}

async function duplicateAgent(session) {
  const slotIndex = firstEmptySlot();
  if (slotIndex === -1) {
    showToast("No empty agent slot.");
    return;
  }
  await startAgent(
    slotIndex,
    session.kind,
    session.metadata.currentTask || session.metadata.tldr || session.metadata.name || ""
  );
}

function toggleFocusMode() {
  const active = !document.body.classList.contains("focus-mode");
  document.body.classList.toggle("focus-mode", active);
  focusModeButton.classList.toggle("active", active);
  focusModeButton.title = active ? "Exit focus mode" : "Focus mode";
  focusModeButton.setAttribute("aria-label", focusModeButton.title);
  requestAnimationFrame(() => {
    for (const session of activeWorkspaceSessions()) {
      try {
        fitTerminalPreservingScroll(session);
      } catch (error) {
      }
    }
  });
}

async function copyWorkspaceHandoff() {
  const workspace = activeWorkspace();
  if (!workspace) {
    showToast("Open a workspace first.");
    return;
  }
  const now = new Date();
  const agents = activeWorkspaceSessions();
  const lines = [
    `# ${workspace.name} handoff`,
    "",
    `Generated by BsCode on ${now.toLocaleString()}`,
    `Workspace: ${remoteWorkspaceLabel(workspace)}`,
    "",
    "## Agents",
    "",
    ...(agents.length ? agents.flatMap((session) => {
      const state = normalizedAgentState(session.metadata);
      const eta = remainingEtaSeconds(session);
      const checklist = normalizedAgentChecklist(session.metadata);
      return [
        `### ${session.metadata.name || `Agent ${session.slotIndex + 1}`} — ${agentStateLabel(state, session.metadata)}`,
        "",
        session.metadata.currentTask || session.metadata.tldr || "Waiting for work.",
        Number.isFinite(eta) ? `ETA: ${formatEtaClock(eta)}` : "",
        ...checklist.map((item) => `- [${item.status === "done" ? "x" : " "}] ${item.text} (${item.status})`),
        ...(Array.isArray(session.metadata.relevantFiles) && session.metadata.relevantFiles.length
          ? ["", `Files: ${session.metadata.relevantFiles.join(", ")}`]
          : []),
        ""
      ];
    }) : ["_No active agents._", ""]),
    "## Shared notes",
    "",
    "See `.bscode-notes.md` in the workspace root.",
    ""
  ];
  await api.writeClipboardText(lines.filter((line, index) => line !== "" || lines[index - 1] !== "").join("\n"));
  showToast("Workspace handoff copied.");
}

function paletteCommands() {
  const commands = [
    { id: "agent-codex", icon: "◉", label: "New Codex agent", detail: "Start in the first empty slot", run: () => startFromToolbar("codex") },
    { id: "agent-claude", icon: "✳", label: "New Claude agent", detail: "Start in the first empty slot", run: () => startFromToolbar("claude") },
    { id: "agent-shell", icon: "›_", label: "New shell", detail: "Start in the first empty slot", run: () => startFromToolbar("shell") },
    { id: "workspace-add", icon: "＋", label: "Add workspace", detail: "Open the workspace setup flow", run: openWorkspaceSetup },
    { id: "file-new", icon: "▱＋", label: "New file", detail: "Create in the selected folder", run: () => beginCreateWorkspaceEntry("file") },
    { id: "folder-new", icon: "▰＋", label: "New folder", detail: "Create in the selected folder", run: () => beginCreateWorkspaceEntry("folder") },
    { id: "workspace-code", icon: "〈〉", label: "Open workspace in Visual Studio Code", detail: activeWorkspace() ? activeWorkspace().name : "No workspace selected", run: () => activeWorkspaceId && api.openInCode(activeWorkspaceId) },
    { id: "pixel-mode", icon: "◉", label: pixelModeEnabled ? "Show terminals" : "Show Pixel Mode", detail: "Toggle the Pixel Agents office", run: () => setPixelMode(!pixelModeEnabled) },
    { id: "files-toggle", icon: "↙", label: document.body.classList.contains("files-collapsed") ? "Open files pane" : "Close files pane", detail: "Toggle workspace files", run: () => setFilesCollapsed(!document.body.classList.contains("files-collapsed")) },
    { id: "outputs-toggle", icon: "↗", label: document.body.classList.contains("output-collapsed") ? "Open output pane" : "Close output pane", detail: "Toggle generated output files", run: () => setOutputCollapsed(!document.body.classList.contains("output-collapsed")) },
    { id: "refresh", icon: "↻", label: "Refresh workspace", detail: "Reload files and generated outputs", run: () => refreshWorkspacePanels({ syncRemote: true }) },
    { id: "agents-run-pause", icon: agentsPaused ? "▶" : "Ⅱ", label: agentsPaused ? "Run all agents" : "Pause all agents", detail: "Toggle every agent in the active workspace", run: toggleRunPauseAll },
    { id: "agents-stop", icon: "■", label: "Stop all agents", detail: "Stop every agent in the active workspace", run: stopAllAgents },
    { id: "agents-retry", icon: "↻", label: "Retry failed agents", detail: "Restart failed tasks in their current slots", run: retryFailedAgents },
    { id: "agents-status", icon: "?", label: "Ask for status", detail: "Request fresh progress, usage, and ETA metadata", run: () => askAgentsForStatus() },
    { id: "agents-zen", icon: "☷", label: globalCleanMode ? "Show all terminals" : "Zen view for all agents", detail: "Show checklists, ETAs, files, and prompt boxes", run: () => setGlobalCleanMode(!globalCleanMode) },
    { id: "focus-mode", icon: "⌗", label: document.body.classList.contains("focus-mode") ? "Exit focus mode" : "Enter focus mode", detail: "Hide side panels and maximize the workspace", run: toggleFocusMode },
    { id: "handoff-copy", icon: "✦", label: "Copy workspace handoff", detail: "A Markdown standup with every agent, ETA, checklist, and file", run: copyWorkspaceHandoff },
    { id: "settings", icon: "⚙", label: "Open settings", detail: "Appearance, workspace, and profile", run: openSettings }
  ];
  for (const session of activeWorkspaceSessions()) {
    commands.push({
      id: `agent-focus-${session.id}`,
      icon: String(session.slotIndex + 1),
      label: `Open Agent ${session.slotIndex + 1}: ${session.metadata.name || session.kind}`,
      detail: session.metadata.currentTask || session.metadata.tldr || normalizedAgentState(session.metadata),
      run: () => focusAgentWindow(session.slotIndex)
    });
  }
  const addFileCommands = (nodes) => {
    for (const node of nodes || []) {
      if (node.type === "directory") {
        addFileCommands(node.children);
        continue;
      }
      if (commands.length > 180) return;
      commands.push({
        id: `file-${node.relativePath}`,
        icon: "▱",
        label: `Open ${node.name}`,
        detail: node.relativePath,
        run: () => previewWorkspaceFile(activeWorkspaceId, node.relativePath)
      });
    }
  };
  addFileCommands(fileNodes);
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
  const tabAddButton = workspaceEditorTabs.querySelector(".workspace-tab-add");
  if (tabAddButton) {
    tabAddButton.classList.toggle("active", open);
    tabAddButton.setAttribute("aria-expanded", String(Boolean(open)));
  }
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

function renderWorkspaceEditorTabs() {
  workspaceEditorTabs.innerHTML = "";
  workspaceEtaNodes.clear();
  const renderedTabs = [];
  let activeTab = null;

  for (const workspace of workspaces) {
    const isActive = workspace.id === activeWorkspaceId;
    const count = workspaceLayoutFor(workspace.id);
    const tab = document.createElement("div");
    tab.className = "editor-tab workspace-editor-tab";
    tab.classList.toggle("active", isActive);
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(isActive));
    tab.title = `${remoteWorkspaceLabel(workspace)}\nRight-click to rename`;

    const tabShape = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tabShape.classList.add("workspace-tab-shape");
    tabShape.setAttribute("viewBox", "0 0 240 34");
    tabShape.setAttribute("preserveAspectRatio", "none");
    tabShape.setAttribute("aria-hidden", "true");
    tabShape.innerHTML = `
      <path class="workspace-tab-shape-fill" d="M0 34C7 34 10 31 13 26C17 20 18 14 19 9C20 4 25 2 31 2H209C215 2 220 4 221 9C222 14 223 20 227 26C230 31 233 34 240 34Z"/>
      <path class="workspace-tab-shape-edge" d="M0 33.5C7 33.5 10 30.5 13 26C17 20 18 14 19 9C20 4 25 2 31 2H209C215 2 220 4 221 9C222 14 223 20 227 26C230 30.5 233 33.5 240 33.5"/>
      <path class="workspace-tab-shape-baseline" d="M0 33.5H240"/>
    `;
    const label = document.createElement("span");
    label.className = "workspace-editor-label";
    label.textContent = workspace.name;
    tab.append(tabShape, label);

    const etaGroup = document.createElement("span");
    etaGroup.className = "agent-eta";
    etaGroup.hidden = true;
    etaGroup.setAttribute("aria-label", `${workspace.name} running agents`);
    for (let index = 0; index < count; index += 1) {
      const eta = document.createElement("span");
      eta.dataset.etaSlot = String(index);
      eta.hidden = true;
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
    tab.append(etaGroup, closeButton);

    makeInteractive(tab, () => selectWorkspace(workspace.id));
    tab.addEventListener("contextmenu", (event) => beginEditorTabRename(event, tab, workspace));
    workspaceEditorTabs.appendChild(tab);
    renderedTabs.push(tab);
    if (isActive) activeTab = tab;
  }

  const addTabButton = document.createElement("button");
  addTabButton.className = "workspace-tab-add";
  addTabButton.type = "button";
  addTabButton.textContent = "+";
  addTabButton.title = "Add workspace";
  addTabButton.setAttribute("aria-label", "Add workspace");
  addTabButton.setAttribute("aria-expanded", String(!workspaceAddMenu.hidden));
  addTabButton.classList.toggle("active", !workspaceAddMenu.hidden);
  addTabButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openWorkspaceSetup();
  });
  workspaceEditorTabs.appendChild(addTabButton);

  updateAgentEta();
  requestAnimationFrame(() => activeTab?.scrollIntoView({ block: "nearest", inline: "nearest" }));
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
    number.textContent = String(index + 1);
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
  localStorage.setItem("agentWorkbenchLastWorkspace", workspace.id);
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
  currentSidebarView = view === "workspaces" ? "workspaces" : "files";
  const showingWorkspaces = currentSidebarView === "workspaces";
  activityButtons.forEach((button) => button.classList.toggle("active", button.dataset.activity === currentSidebarView));
  sidebarViews.forEach((panel) => {
    panel.hidden = panel.dataset.sidebarView !== currentSidebarView;
  });
  workspaceList.hidden = !showingWorkspaces;
  fileTree.hidden = showingWorkspaces;
  sidebarViewTitle.textContent = showingWorkspaces ? "Workspaces" : "Files";
  sidebarViewToggleButton.title = showingWorkspaces ? "Show files" : "Show workspaces";
  sidebarViewToggleButton.setAttribute("aria-label", sidebarViewToggleButton.title);
  sidebarViewToggleButton.setAttribute("aria-pressed", String(showingWorkspaces));
  sidebarViewToggleButton.innerHTML = `<span class="${!showingWorkspaces ? "active" : ""}">Files</span><span class="${showingWorkspaces ? "active" : ""}">Workspaces</span>`;
  fileViewActions.forEach((button) => {
    button.hidden = showingWorkspaces;
  });
  workspaceViewActions.forEach((button) => {
    button.hidden = !showingWorkspaces;
  });
  updateFileEmptyState();
  setWorkspaceAddMenu(false);
  document.body.classList.toggle("sidebar-workspaces-view", showingWorkspaces);
  localStorage.setItem("agentWorkbenchSidebarView", currentSidebarView);
  document.querySelector(".output-panel").classList.remove("attention");
}

const FILES_CLOSE_ICON = '<svg class="pane-toggle-icon" viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="2.5" width="15" height="15" rx="1.7"/><path d="M12.5 3v14M8.8 7 5.8 10l3 3"/><path class="pane-toggle-dots" d="M15 6.5h.01M15 10h.01M15 13.5h.01"/></svg>';
const OUTPUT_CLOSE_ICON = '<svg class="pane-toggle-icon" viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="2.5" width="15" height="15" rx="1.7"/><path d="M7.5 3v14M11.2 7l3 3-3 3"/><path class="pane-toggle-dots" d="M5 6.5h.01M5 10h.01M5 13.5h.01"/></svg>';
const FILES_COLLAPSED_LABEL = '<span class="pane-collapsed-label">Files</span>';
const OUTPUTS_COLLAPSED_LABEL = '<span class="pane-collapsed-label">Outputs</span>';
const AGENT_MAXIMIZE_ICON = '<svg class="agent-resize-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M7 7 2.5 2.5M2.5 6V2.5H6M11 11l4.5 4.5M12 15.5h3.5V12"/></svg>';
const AGENT_RESTORE_ICON = '<svg class="agent-resize-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M2.5 2.5 7 7M7 3.5V7H3.5M15.5 15.5 11 11M11 14.5V11h3.5"/></svg>';
const AGENT_ZEN_ICON = '<svg class="agent-zen-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="4" cy="5" r="1"/><circle cx="4" cy="10" r="1"/><circle cx="4" cy="15" r="1"/><path d="M7 5h10M7 10h10M7 15h10"/></svg>';
const AGENT_INTERRUPT_ICON = '<svg class="agent-interrupt-icon" viewBox="0 0 18 18" aria-hidden="true"><rect x="4.2" y="4.2" width="9.6" height="9.6" rx="1.3"/></svg>';

function setOutputCollapsed(collapsed) {
  document.body.classList.toggle("output-collapsed", collapsed);
  toggleOutputButton.innerHTML = collapsed ? OUTPUTS_COLLAPSED_LABEL : OUTPUT_CLOSE_ICON;
  toggleOutputButton.title = collapsed ? "Open output pane" : "Close output pane";
  toggleOutputButton.setAttribute("aria-label", toggleOutputButton.title);
  localStorage.setItem("agentWorkbenchOutputCollapsed", collapsed ? "1" : "0");
  requestAnimationFrame(() => {
    for (const session of sessions.values()) {
      try {
        fitTerminalPreservingScroll(session);
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
        fitTerminalPreservingScroll(session);
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
  showSettingsPage("appearance");
  settingsOverlay.hidden = false;
  requestAnimationFrame(() => settingsSearchInput.focus());
}

function closeSettings() {
  settingsOverlay.hidden = true;
}

function currentPixelAppearanceConfig() {
  const root = document.documentElement;
  const computed = getComputedStyle(root);
  const value = (name, fallback) => computed.getPropertyValue(name).trim() || fallback;
  return {
    background: value("--theme-background", value("--theme-bg", "#10141c")),
    bg: value("--theme-bg", "#10141c"),
    panel: value("--theme-panel", "#171d26"),
    elevated: value("--theme-elevated", "#202936"),
    hover: value("--theme-hover", "#293444"),
    active: value("--theme-active", "#334155"),
    border: value("--theme-border", "#465465"),
    text: value("--theme-text", "#eef2f7"),
    muted: value("--theme-muted", "#99a5b3"),
    accent: value("--theme-accent", "#69a8ff"),
    status: value("--theme-status", value("--theme-accent", "#69a8ff")),
    tone: root.dataset.appearanceTone || "dark",
    mode: root.dataset.appearanceMode || "dark",
    theme: root.dataset.theme || "dark-plus"
  };
}

function syncPixelAppearance() {
  if (!pixelFrameReady) return;
  postPixelMessage({
    type: "appearanceConfig",
    appearance: currentPixelAppearanceConfig()
  });
}

function applyPalette(palette, mode, theme = "") {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(palette)) {
    root.style.setProperty(`--theme-${key}`, value);
  }
  root.style.setProperty("--theme-background", palette.background || palette.bg);
  root.style.setProperty("--theme-terminal", palette.terminal || palette.bg);
  root.dataset.appearanceMode = mode.toLowerCase().replace(/\s+/g, "-");
  const lightAppearance = mode.toLowerCase().startsWith("light") || theme === "pixel-studio";
  root.dataset.appearanceTone = lightAppearance ? "light" : "dark";
  root.style.colorScheme = lightAppearance ? "light" : "dark";
  syncPixelAppearance();
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

function selectedSceneTheme() {
  const saved = localStorage.getItem("agentWorkbenchSceneTheme") || "copenhagen-moonlight";
  return Object.prototype.hasOwnProperty.call(SCENE_THEMES, saved) ? saved : "copenhagen-moonlight";
}

function refreshTerminalThemes() {
  const terminalTheme = terminalThemeFromPalette();
  for (const session of sessions.values()) {
    session.term.options.theme = terminalTheme;
    session.term.refresh(0, Math.max(0, session.term.rows - 1));
  }
  if (sshAuthSession) {
    sshAuthSession.term.options.theme = terminalTheme;
    sshAuthSession.term.refresh(0, Math.max(0, sshAuthSession.term.rows - 1));
  }
}

function sceneHash(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function sceneRandom(seed, index) {
  const value = Math.sin((seed + index * 1013) * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function resizeSceneCanvas() {
  const pixelRatio = Math.min(1.25, Math.max(1, window.devicePixelRatio || 1));
  const width = Math.max(1, Math.round(window.innerWidth * pixelRatio));
  const height = Math.max(1, Math.round(window.innerHeight * pixelRatio));
  if (sceneBackgroundCanvas.width === width && sceneBackgroundCanvas.height === height) return;
  sceneBackgroundCanvas.width = width;
  sceneBackgroundCanvas.height = height;
}

function drawSceneMountains(context, width, height, colors, time, seed) {
  for (let layer = 0; layer < 4; layer += 1) {
    const base = height * (0.48 + layer * 0.12);
    const step = Math.max(90, width / 11);
    const points = [];
    for (let x = -step; x <= width + step; x += step) {
      const rise = (0.11 + sceneRandom(seed, layer * 90 + Math.round(x)) * 0.19) * height;
      const sway = Math.sin(time * 0.000055 + x * 0.003 + layer) * 5;
      points.push({ x, y: base - rise + sway });
    }
    context.beginPath();
    context.moveTo(0, height);
    context.lineTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const point = points[index];
      const midpointX = (previous.x + point.x) / 2;
      const midpointY = (previous.y + point.y) / 2;
      context.quadraticCurveTo(previous.x, previous.y, midpointX, midpointY);
    }
    const last = points.at(-1);
    context.lineTo(last.x, last.y);
    context.lineTo(width, height);
    context.closePath();
    context.fillStyle = layer < 2 ? colors[0] : colors[1];
    context.globalAlpha = 0.86 - layer * 0.1;
    context.fill();
  }
  context.globalAlpha = 1;
}

function drawSceneClouds(context, width, height, colors, time, seed, density = 11) {
  for (let index = 0; index < density; index += 1) {
    const speed = 0.006 + sceneRandom(seed, index + 90) * 0.008;
    const x = ((sceneRandom(seed, index) * (width + 360) + time * speed) % (width + 360)) - 180;
    const y = height * (0.08 + sceneRandom(seed, index + 40) * 0.58);
    const size = 34 + sceneRandom(seed, index + 70) * 85;
    const cloudAlpha = 0.1 + sceneRandom(seed, index + 120) * 0.17;
    context.save();
    context.globalAlpha = cloudAlpha;
    context.fillStyle = colors[2];
    context.filter = `blur(${Math.max(5, size * 0.13)}px)`;
    for (let lobe = 0; lobe < 6; lobe += 1) {
      const offset = (lobe - 2.5) * size * 0.48;
      const lift = Math.sin(lobe * 1.7 + index) * size * 0.14;
      context.beginPath();
      context.ellipse(
        x + offset,
        y + lift,
        size * (0.58 + sceneRandom(seed, index * 20 + lobe) * 0.22),
        size * (0.32 + sceneRandom(seed, index * 30 + lobe) * 0.18),
        0,
        0,
        Math.PI * 2
      );
      context.fill();
    }
    context.restore();
  }
}

function drawSceneParticles(context, width, height, colors, time, seed, kind) {
  const count = kind === "rain" || kind === "snow" ? 110 : 42;
  for (let index = 0; index < count; index += 1) {
    const baseX = sceneRandom(seed, index) * width;
    const baseY = sceneRandom(seed, index + 200) * height;
    if (kind === "rain") {
      const x = (baseX + time * 0.04) % width;
      const y = (baseY + time * 0.18) % height;
      context.strokeStyle = `${colors[2]}68`;
      context.lineWidth = 1.4;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x - 9, y + 28);
      context.stroke();
    } else if (kind === "snow") {
      const x = (baseX + Math.sin(time * 0.001 + index) * 28 + width) % width;
      const y = (baseY + time * (0.018 + sceneRandom(seed, index + 400) * 0.02)) % height;
      context.fillStyle = `${colors[2]}bb`;
      context.beginPath();
      context.arc(x, y, 1.4 + sceneRandom(seed, index + 300) * 2.8, 0, Math.PI * 2);
      context.fill();
    } else {
      const x = (baseX + Math.sin(time * 0.0007 + index) * 20 + width) % width;
      const y = (baseY + Math.cos(time * 0.0005 + index * 2) * 16 + height) % height;
      const glow = 0.35 + 0.65 * Math.abs(Math.sin(time * 0.002 + index));
      context.fillStyle = `${colors[2]}${Math.round(glow * 255).toString(16).padStart(2, "0")}`;
      context.beginPath();
      context.arc(x, y, 1.5 + glow * 2.2, 0, Math.PI * 2);
      context.fill();
    }
  }
}

function drawLegacyLivingScene(timestamp = performance.now()) {
  sceneAnimationFrame = 0;
  if (!cinematicModeEnabled || document.visibilityState !== "visible") return;
  const sceneId = document.body.dataset.sceneTheme || selectedSceneTheme();
  const scene = SCENE_THEMES[sceneId];
  if (!scene) return;
  if (scene.src) {
    const reactive = booleanPreference("agentWorkbenchMusicReactive", false)
      && latestSpotifyStatus?.state === "playing";
    const reduceMotion = booleanPreference("agentWorkbenchReduceMotion", false);
    const strength = numericPreference("agentWorkbenchCinematicEffectStrength", 45, 0, 100) / 100;
    const estimatedPosition = Number(latestSpotifyStatus?.position || 0)
      + Math.max(0, Date.now() - Number(latestSpotifyStatus?.retrievedAt || Date.now())) / 1000;
    const beat = reactive && !reduceMotion
      ? Math.pow((Math.sin(estimatedPosition * Math.PI * 3.2) + 1) / 2, 4) * strength
      : 0;
    document.body.style.setProperty("--cinematic-beat", beat.toFixed(3));
    resizeSceneCanvas();
    const context = sceneBackgroundCanvas.getContext("2d", { alpha: true });
    const width = sceneBackgroundCanvas.width;
    const height = sceneBackgroundCanvas.height;
    context.clearRect(0, 0, width, height);
    if (reactive && !reduceMotion) {
      const glow = context.createRadialGradient(
        width * 0.5,
        height * 0.48,
        0,
        width * 0.5,
        height * 0.48,
        Math.max(width, height) * 0.72
      );
      glow.addColorStop(0, `rgba(144, 201, 255, ${0.025 + beat * 0.11})`);
      glow.addColorStop(0.52, `rgba(103, 152, 224, ${0.012 + beat * 0.06})`);
      glow.addColorStop(1, "rgba(4, 8, 14, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      drawSceneParticles(context, width, height, scene.colors, timestamp, sceneHash(sceneId), "glow");
      sceneAnimationFrame = requestAnimationFrame(drawLivingScene);
    }
    return;
  }
  const frameRate = numericPreference("agentWorkbenchSceneFrameRate", 30, 15, 45);
  const interval = 1000 / frameRate;
  if (timestamp - sceneLastFrameAt < interval) {
    sceneAnimationFrame = requestAnimationFrame(drawLivingScene);
    return;
  }
  sceneLastFrameAt = timestamp;
  resizeSceneCanvas();
  const context = sceneBackgroundCanvas.getContext("2d", { alpha: false });
  const width = sceneBackgroundCanvas.width;
  const height = sceneBackgroundCanvas.height;
  const seed = sceneHash(sceneId);
  const reduceMotion = booleanPreference("agentWorkbenchReduceMotion", false);
  const reactive = booleanPreference("agentWorkbenchMusicReactive", false) && latestSpotifyStatus?.state === "playing";
  const strength = numericPreference("agentWorkbenchCinematicEffectStrength", 45, 0, 100) / 100;
  const estimatedPosition = Number(latestSpotifyStatus?.position || 0)
    + Math.max(0, Date.now() - Number(latestSpotifyStatus?.retrievedAt || Date.now())) / 1000;
  const beat = reactive ? Math.pow((Math.sin(estimatedPosition * Math.PI * 3.2) + 1) / 2, 4) * strength : 0;
  document.body.style.setProperty("--cinematic-beat", beat.toFixed(3));
  const motionTime = reduceMotion ? 0 : timestamp * (1 + beat * 0.2);
  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, scene.colors[0]);
  gradient.addColorStop(0.58, scene.colors[1]);
  gradient.addColorStop(1, scene.colors[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  if (["mountains", "clouds", "forest", "solar", "storm", "snow"].includes(scene.type)) {
    drawSceneMountains(context, width, height, scene.colors, motionTime, seed);
  }
  if (["clouds", "architecture", "dream", "solar"].includes(scene.type)) {
    drawSceneClouds(context, width, height, scene.colors, motionTime, seed);
  }
  if (["ocean", "koi", "underwater"].includes(scene.type)) {
    for (let line = 0; line < 18; line += 1) {
      const y = height * (0.42 + line * 0.035);
      context.strokeStyle = `${line % 2 ? scene.colors[2] : scene.colors[1]}${(35 + line * 3).toString(16)}`;
      context.lineWidth = 2 + line * 0.15;
      context.beginPath();
      for (let x = 0; x <= width; x += 24) {
        const wave = Math.sin(x * 0.009 + motionTime * 0.0012 + line * 0.7) * (8 + line * 0.8);
        if (x === 0) context.moveTo(x, y + wave);
        else context.lineTo(x, y + wave);
      }
      context.stroke();
    }
  }
  if (scene.type === "aurora") {
    for (let ribbon = 0; ribbon < 5; ribbon += 1) {
      context.strokeStyle = `${ribbon % 2 ? scene.colors[2] : "#82c8ff"}55`;
      context.lineWidth = height * (0.03 + ribbon * 0.007);
      context.beginPath();
      for (let x = 0; x <= width; x += 24) {
        const y = height * (0.17 + ribbon * 0.055)
          + Math.sin(x * 0.006 + motionTime * 0.00035 + ribbon) * height * 0.08;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
    }
  }
  if (["city", "library", "lava", "architecture", "dream"].includes(scene.type)) {
    for (let index = 0; index < 16; index += 1) {
      const columnWidth = width / 15;
      const buildingHeight = height * (0.16 + sceneRandom(seed, index) * 0.35);
      const x = index * columnWidth - columnWidth * 0.2;
      context.fillStyle = `${scene.colors[0]}e6`;
      context.fillRect(x, height - buildingHeight, columnWidth * 0.78, buildingHeight);
      context.fillStyle = `${scene.colors[2]}${scene.type === "city" ? "9a" : "54"}`;
      for (let row = 0; row < 5; row += 1) {
        context.fillRect(x + columnWidth * 0.18, height - buildingHeight + 16 + row * 28, 5, 9);
      }
    }
  }
  if (scene.type === "retro") {
    context.strokeStyle = `${scene.colors[2]}66`;
    context.lineWidth = 2;
    for (let row = 0; row < 18; row += 1) {
      const y = height * 0.62 + Math.pow(row / 18, 1.8) * height * 0.4;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    for (let column = -12; column <= 12; column += 1) {
      context.beginPath();
      context.moveTo(width / 2, height * 0.62);
      context.lineTo(width / 2 + column * width * 0.09, height);
      context.stroke();
    }
  }
  if (scene.type === "desert") {
    for (let layer = 0; layer < 4; layer += 1) {
      context.fillStyle = `${layer % 2 ? scene.colors[1] : scene.colors[2]}${70 + layer * 28}`;
      context.beginPath();
      context.moveTo(0, height);
      for (let x = 0; x <= width; x += 40) {
        context.lineTo(x, height * (0.58 + layer * 0.09) + Math.sin(x * 0.004 + motionTime * 0.0002 + layer) * 45);
      }
      context.lineTo(width, height);
      context.fill();
    }
  }
  if (["rain", "city", "storm"].includes(scene.type)) drawSceneParticles(context, width, height, scene.colors, motionTime, seed, "rain");
  if (scene.type === "snow") drawSceneParticles(context, width, height, scene.colors, motionTime, seed, "snow");
  if (["meadow", "forest", "library", "underwater", "space", "koi", "lava"].includes(scene.type)) {
    drawSceneParticles(context, width, height, scene.colors, motionTime, seed, "glow");
  }
  if (!reduceMotion) sceneAnimationFrame = requestAnimationFrame(drawLivingScene);
}

function syncLegacySceneBackgroundPlayback() {
  const scene = document.body.dataset.sceneTheme || selectedSceneTheme();
  const config = SCENE_THEMES[scene] || null;
  const active = Boolean(config && cinematicModeEnabled && homeView.hidden);
  const reactive = active && booleanPreference("agentWorkbenchMusicReactive", false);
  document.body.classList.toggle("scene-background-active", active);
  sceneBackground.classList.toggle("active", active);
  if (active) {
    if (sceneBackground.getAttribute("src") !== config.src) {
      sceneBackground.src = config.src;
      sceneBackground.poster = config.poster;
      sceneBackground.load();
    }
    sceneBackground.play().catch(() => {});
  } else {
    sceneBackground.pause();
    sceneBackground.removeAttribute("src");
    sceneBackground.removeAttribute("poster");
    sceneBackground.load();
  }
  sceneBackgroundCanvas.classList.toggle("active", reactive);
  if (sceneAnimationFrame) cancelAnimationFrame(sceneAnimationFrame);
  sceneAnimationFrame = 0;
  if (reactive) {
    sceneLastFrameAt = 0;
    drawLivingScene();
  } else {
    document.body.style.setProperty("--cinematic-beat", "0");
    const context = sceneBackgroundCanvas.getContext("2d", { alpha: true });
    context.clearRect(0, 0, sceneBackgroundCanvas.width, sceneBackgroundCanvas.height);
  }
}

function sceneRgba(hex, alpha) {
  const normalized = String(hex || "#ffffff").replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((character) => `${character}${character}`).join("")
    : normalized.padEnd(6, "f").slice(0, 6);
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function drawAmbientMist(context, width, height, scene, time, seed) {
  for (let index = 0; index < 3; index += 1) {
    const period = 76 + sceneRandom(seed, index + 50) * 53;
    const phase = time / period + sceneRandom(seed, index + 80) * Math.PI * 2;
    const centerX = width * (
      0.18
      + sceneRandom(seed, index) * 0.64
      + Math.sin(phase) * 0.022
    );
    const centerY = height * (0.36 + index * 0.17 + sceneRandom(seed, index + 20) * 0.08);
    const radius = width * (0.24 + sceneRandom(seed, index + 120) * 0.12);
    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, sceneRgba(scene.colors[2], 0.055));
    gradient.addColorStop(0.58, sceneRgba(scene.colors[2], 0.028));
    gradient.addColorStop(1, sceneRgba(scene.colors[2], 0));
    context.save();
    context.scale(1, 0.46);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height / 0.46);
    context.restore();
  }
}

function drawAmbientClouds(context, width, height, scene, time, seed) {
  for (let index = 0; index < 4; index += 1) {
    const period = 92 + sceneRandom(seed, index + 40) * 67;
    const phase = time / period + sceneRandom(seed, index + 90) * Math.PI * 2;
    const centerX = width * (
      0.14
      + sceneRandom(seed, index) * 0.72
      + Math.sin(phase) * 0.018
    );
    const centerY = height * (0.11 + sceneRandom(seed, index + 20) * 0.29);
    const radius = width * (0.14 + sceneRandom(seed, index + 70) * 0.1);
    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, sceneRgba(scene.colors[2], 0.045));
    gradient.addColorStop(0.62, sceneRgba(scene.colors[2], 0.018));
    gradient.addColorStop(1, sceneRgba(scene.colors[2], 0));
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height * 0.62);
  }
}

function drawAmbientWater(context, width, height, scene, time, seed) {
  context.save();
  context.lineCap = "round";
  for (let index = 0; index < 14; index += 1) {
    const period = 18 + sceneRandom(seed, index + 50) * 19;
    const phase = time / period + sceneRandom(seed, index + 110) * Math.PI * 2;
    const centerX = width * (0.1 + sceneRandom(seed, index) * 0.8);
    const y = height * (0.57 + sceneRandom(seed, index + 20) * 0.32);
    const length = width * (0.018 + sceneRandom(seed, index + 70) * 0.055);
    context.strokeStyle = sceneRgba(scene.colors[2], 0.035 + Math.max(0, Math.sin(phase)) * 0.035);
    context.lineWidth = 0.7 + sceneRandom(seed, index + 140) * 1.4;
    context.beginPath();
    context.moveTo(centerX - length, y);
    context.quadraticCurveTo(centerX, y + Math.sin(phase) * 2.5, centerX + length, y);
    context.stroke();
  }
  context.restore();
}

function drawAmbientLights(context, width, height, scene, time, seed, kind) {
  const count = kind === "stars" ? 13 : kind === "fireflies" ? 16 : 20;
  const upper = kind === "stars" ? 0.58 : 0.82;
  const lower = kind === "stars" ? 0.08 : 0.34;
  for (let index = 0; index < count; index += 1) {
    const period = 8 + sceneRandom(seed, index + 90) * 19;
    const phase = time / period + sceneRandom(seed, index + 140) * Math.PI * 2;
    const drift = kind === "dust" ? Math.sin(phase * 0.63) * width * 0.003 : Math.sin(phase) * width * 0.002;
    const x = sceneRandom(seed, index) * width + drift;
    const y = height * (
      lower
      + sceneRandom(seed, index + 30) * (upper - lower)
      + Math.cos(phase * 0.73) * 0.003
    );
    const glow = Math.max(0.08, (Math.sin(phase) + 1) / 2);
    const radius = (kind === "stars" ? 0.8 : 1.1) + glow * (kind === "fireflies" ? 2.2 : 1.4);
    context.fillStyle = sceneRgba(scene.colors[2], 0.035 + glow * (kind === "fireflies" ? 0.12 : 0.075));
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }
}

function drawAmbientLight(context, width, height, scene, time, seed) {
  const phase = time / (83 + sceneRandom(seed, 22) * 41);
  const centerX = width * (0.58 + Math.sin(phase) * 0.012);
  const centerY = height * (0.23 + Math.cos(phase * 0.71) * 0.009);
  const radius = Math.max(width, height) * 0.58;
  const glow = 0.5 + Math.sin(phase * 1.37) * 0.5;
  const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, sceneRgba(scene.colors[2], 0.025 + glow * 0.02));
  gradient.addColorStop(0.54, sceneRgba(scene.colors[1], 0.012));
  gradient.addColorStop(1, sceneRgba(scene.colors[0], 0));
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}

function musicReactivePlaybackActive() {
  return (
    cinematicModeEnabled
    && homeView.hidden
    && !booleanPreference("agentWorkbenchReduceMotion", false)
    && booleanPreference("agentWorkbenchMusicReactive", true)
    && String(latestSpotifyStatus?.state || "").toLowerCase() === "playing"
    && numericPreference("agentWorkbenchCinematicEffectStrength", 60, 0, 100) > 0
  );
}

function musicReactivePulse() {
  if (!musicReactivePlaybackActive()) return 0;
  const strength = numericPreference("agentWorkbenchCinematicEffectStrength", 60, 0, 100) / 100;
  const estimatedPosition = Number(latestSpotifyStatus?.position || 0)
    + Math.max(0, Date.now() - Number(latestSpotifyStatus?.retrievedAt || Date.now())) / 1000;
  // Spotify's desktop bridge exposes playback position but not audio amplitude.
  // Anchor a smooth, consistent pulse to that position so pausing and seeking
  // also pause and seek the atmosphere instead of using an unrelated wall clock.
  const phase = estimatedPosition * Math.PI * 3.2;
  const envelope = Math.pow((Math.sin(phase - Math.PI / 2) + 1) / 2, 3);
  return Math.min(1, envelope * strength);
}

function applyMusicReactivePulse(beat) {
  const active = musicReactivePlaybackActive();
  const pulse = active ? Math.max(0, Math.min(1, Number(beat) || 0)) : 0;
  document.body.classList.toggle("music-reactive-active", active);
  musicReactiveOverlay.style.setProperty("--cinematic-beat", pulse.toFixed(3));
  musicReactiveOverlay.style.setProperty(
    "--cinematic-glow-opacity",
    active ? (0.012 + pulse * 0.048).toFixed(3) : "0"
  );
  musicReactiveOverlay.style.setProperty(
    "--cinematic-pulse-scale",
    "1"
  );
  spotifyNowPlaying.style.setProperty(
    "--cinematic-player-glow",
    "0"
  );
  spotifyNowPlaying.style.setProperty(
    "--cinematic-player-scale",
    "1"
  );
}

function drawMusicReactiveAtmosphere(context, width, height, scene, time, seed, beat) {
  if (beat <= 0.002) return;
  const edgeOpacity = 0.005 + beat * 0.018;
  const edgeGradients = [
    context.createLinearGradient(0, 0, width * 0.1, 0),
    context.createLinearGradient(width, 0, width * 0.9, 0),
    context.createLinearGradient(0, 0, 0, height * 0.09),
    context.createLinearGradient(0, height, 0, height * 0.91)
  ];
  for (const gradient of edgeGradients) {
    gradient.addColorStop(0, sceneRgba(scene.colors[2], edgeOpacity));
    gradient.addColorStop(1, sceneRgba(scene.colors[1], 0));
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }
}

function drawLivingScene(timestamp = performance.now()) {
  sceneAnimationFrame = 0;
  const reduceMotion = booleanPreference("agentWorkbenchReduceMotion", false);
  if (
    reduceMotion
    || !cinematicModeEnabled
    || !homeView.hidden
    || document.visibilityState !== "visible"
  ) {
    applyMusicReactivePulse(0);
    return;
  }
  const sceneId = document.body.dataset.sceneTheme || selectedSceneTheme();
  const scene = SCENE_THEMES[sceneId];
  if (!scene) return;
  const frameRate = numericPreference("agentWorkbenchSceneFrameRate", 24, 15, 30);
  const interval = 1000 / frameRate;
  if (timestamp - sceneLastFrameAt < interval) {
    sceneAnimationFrame = requestAnimationFrame(drawLivingScene);
    return;
  }
  sceneLastFrameAt = timestamp;
  resizeSceneCanvas();
  const context = sceneBackgroundCanvas.getContext("2d", { alpha: true });
  const width = sceneBackgroundCanvas.width;
  const height = sceneBackgroundCanvas.height;
  const seed = sceneHash(sceneId);
  const time = timestamp / 1000;
  context.clearRect(0, 0, width, height);

  if (scene.motion === "clouds") drawAmbientClouds(context, width, height, scene, time, seed);
  if (scene.motion === "mist") drawAmbientMist(context, width, height, scene, time, seed);
  if (scene.motion === "water") drawAmbientWater(context, width, height, scene, time, seed);
  if (scene.motion === "stars") drawAmbientLights(context, width, height, scene, time, seed, "stars");
  if (scene.motion === "fireflies") drawAmbientLights(context, width, height, scene, time, seed, "fireflies");
  if (scene.motion === "dust") drawAmbientLights(context, width, height, scene, time, seed, "dust");
  if (scene.motion === "light") drawAmbientLight(context, width, height, scene, time, seed);

  const beat = musicReactivePulse();
  applyMusicReactivePulse(beat);
  drawMusicReactiveAtmosphere(context, width, height, scene, time, seed, beat);
  sceneAnimationFrame = requestAnimationFrame(drawLivingScene);
}

function syncSceneBackgroundPlayback() {
  const sceneId = document.body.dataset.sceneTheme || selectedSceneTheme();
  const config = SCENE_THEMES[sceneId] || null;
  const active = Boolean(config && cinematicModeEnabled && homeView.hidden);
  const reduceMotion = booleanPreference("agentWorkbenchReduceMotion", false);
  const animate = active && !reduceMotion && document.visibilityState === "visible";
  document.body.classList.toggle("scene-background-active", active);
  sceneBackground.classList.toggle("active", active);
  if (active) {
    if (sceneBackground.getAttribute("src") !== config.image) {
      sceneBackground.src = config.image;
      sceneBackground.decode?.().catch(() => {});
    }
  } else {
    sceneBackground.removeAttribute("src");
  }
  sceneBackgroundCanvas.classList.toggle("active", animate);
  if (sceneAnimationFrame) cancelAnimationFrame(sceneAnimationFrame);
  sceneAnimationFrame = 0;
  const context = sceneBackgroundCanvas.getContext("2d", { alpha: true });
  context.clearRect(0, 0, sceneBackgroundCanvas.width, sceneBackgroundCanvas.height);
  if (animate) {
    sceneLastFrameAt = 0;
    drawLivingScene();
  } else {
    applyMusicReactivePulse(0);
  }
}

function selectSceneTheme(scene, { persist = true } = {}) {
  const selected = Object.prototype.hasOwnProperty.call(SCENE_THEMES, scene) ? scene : "copenhagen-moonlight";
  document.body.dataset.sceneTheme = selected;
  sceneThemeOptions.forEach((option) => {
    const active = option.dataset.sceneTheme === selected;
    option.classList.toggle("active", active);
    option.setAttribute("aria-checked", String(active));
  });
  if (persist) localStorage.setItem("agentWorkbenchSceneTheme", selected);
  syncSceneBackgroundPlayback();
  refreshTerminalThemes();
}

function selectNextSceneTheme() {
  const scenes = Object.keys(SCENE_THEMES).filter((scene) => scene !== "none");
  const current = document.body.dataset.sceneTheme || selectedSceneTheme();
  const currentIndex = scenes.indexOf(current);
  selectSceneTheme(scenes[(currentIndex + 1 + scenes.length) % scenes.length]);
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
  applyPalette(palette, category, theme);
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
  const lineHeight = numericPreference("agentWorkbenchTerminalLineHeight", 1.15, 1, 1.5);
  const scrollback = numericPreference("agentWorkbenchTerminalScrollback", 6000, 1000, 10000);
  const cursorBlink = booleanPreference("agentWorkbenchTerminalCursorBlink", true);
  settingsTerminalFontSizeValue.textContent = `${fontSize} px`;
  settingsTerminalLineHeightValue.textContent = `${lineHeight.toFixed(2)}×`;
  settingsTerminalPreview.style.setProperty("--preview-font-size", `${fontSize}px`);
  settingsTerminalPreview.style.setProperty("--preview-line-height", String(lineHeight));
  for (const session of sessions.values()) {
    session.term.options.fontSize = fontSize;
    session.term.options.lineHeight = lineHeight;
    session.term.options.scrollback = scrollback;
    session.term.options.cursorBlink = cursorBlink;
    try {
      fitTerminalPreservingScroll(session);
    } catch (error) {
    }
  }
}

function resetWorkbenchSettings() {
  const preferenceKeys = [
    "agentWorkbenchTheme",
    "agentWorkbenchThemeSystem",
    "agentWorkbenchAppearanceCategory",
    "agentWorkbenchPdfMode",
    "agentWorkbenchRememberWidths",
    "agentWorkbenchAutoCollapsePanes",
    "agentWorkbenchCompactTabs",
    "agentWorkbenchShowTabEtas",
    "agentWorkbenchDefaultAgent",
    "agentWorkbenchGlobalCleanMode",
    "agentWorkbenchAutoPreview",
    "agentWorkbenchAgentNotifications",
    "agentWorkbenchRecentFilesLimit",
    "agentWorkbenchPixelPets",
    "agentWorkbenchPixelPetChoice",
    "agentWorkbenchPixelStatusLabels",
    "agentWorkbenchTerminalFontSize",
    "agentWorkbenchTerminalLineHeight",
    "agentWorkbenchTerminalScrollback",
    "agentWorkbenchTerminalCursorBlink",
    "agentWorkbenchAutoOpenOutput",
    "agentWorkbenchCompactOutputs",
    "agentWorkbenchMetricsInterval",
    "agentWorkbenchReduceMotion",
    "agentWorkbenchMusicReactive",
    "agentWorkbenchCinematicEffectStrength",
    "agentWorkbenchCinematicPanelOpacity",
    "agentWorkbenchSceneFrameRate",
    "agentWorkbenchSceneTheme"
  ];
  preferenceKeys.forEach((key) => localStorage.removeItem(key));
  Object.keys(localStorage)
    .filter((key) => key.startsWith("agentWorkbenchTheme:"))
    .forEach((key) => localStorage.removeItem(key));
  setGlobalCleanMode(false, { persist: false });
  initializeSettings();
  initializeWorkbenchSettings();
  restartSystemMetricsTimer();
  updateAgentEta();
  syncPixelMode(true);
  showToast("Settings reset to defaults.");
}

function applyWorkbenchPreferences() {
  document.body.classList.toggle("compact-output-rows", booleanPreference("agentWorkbenchCompactOutputs", true));
  document.body.classList.toggle("reduce-motion", booleanPreference("agentWorkbenchReduceMotion", false));
  document.body.classList.toggle("compact-workspace-tabs", booleanPreference("agentWorkbenchCompactTabs", false));
  document.body.classList.toggle("hide-tab-etas", !booleanPreference("agentWorkbenchShowTabEtas", true));
  document.body.classList.toggle("hide-pixel-status-labels", !booleanPreference("agentWorkbenchPixelStatusLabels", true));
  document.documentElement.style.setProperty(
    "--cinematic-panel-opacity",
    String(numericPreference("agentWorkbenchCinematicPanelOpacity", 55, 35, 94) / 100)
  );
  settingsCinematicEffectStrengthValue.textContent =
    `${numericPreference("agentWorkbenchCinematicEffectStrength", 60, 0, 100)}%`;
  settingsCinematicPanelOpacityValue.textContent =
    `${numericPreference("agentWorkbenchCinematicPanelOpacity", 55, 35, 94)}%`;
  syncSceneBackgroundPlayback();
  refreshTerminalThemes();
  for (const session of sessions.values()) updateAgentMetadata(session, {});
  applyTerminalPreferences();
}

function restartSystemMetricsTimer() {
  if (systemMetricsTimer) clearInterval(systemMetricsTimer);
  const interval = numericPreference("agentWorkbenchMetricsInterval", 5000, 2000, 10000);
  systemMetricsTimer = setInterval(refreshSystemMetrics, interval);
}

function initializeWorkbenchSettings() {
  settingsRememberWidths.checked = booleanPreference("agentWorkbenchRememberWidths", true);
  settingsAutoCollapsePanes.checked = booleanPreference("agentWorkbenchAutoCollapsePanes", true);
  settingsCompactTabs.checked = booleanPreference("agentWorkbenchCompactTabs", false);
  settingsShowTabEtas.checked = booleanPreference("agentWorkbenchShowTabEtas", true);
  settingsDefaultAgent.value = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
  settingsDefaultZen.checked = globalCleanMode;
  settingsAutoPreview.checked = booleanPreference("agentWorkbenchAutoPreview", true);
  settingsAgentNotifications.checked = booleanPreference("agentWorkbenchAgentNotifications", true);
  settingsRecentFilesLimit.value = String(numericPreference("agentWorkbenchRecentFilesLimit", 40, 8, 40));
  settingsPixelPets.checked = booleanPreference("agentWorkbenchPixelPets", true);
  settingsPixelPetChoice.value = localStorage.getItem("agentWorkbenchPixelPetChoice") || "hamster";
  settingsPixelPetChoice.disabled = !settingsPixelPets.checked;
  settingsPixelStatusLabels.checked = booleanPreference("agentWorkbenchPixelStatusLabels", true);
  settingsTerminalFontSize.value = String(numericPreference("agentWorkbenchTerminalFontSize", 9, 8, 16));
  settingsTerminalLineHeight.value = String(numericPreference("agentWorkbenchTerminalLineHeight", 1.15, 1, 1.5));
  settingsTerminalScrollback.value = String(numericPreference("agentWorkbenchTerminalScrollback", 6000, 1000, 10000));
  settingsTerminalCursorBlink.checked = booleanPreference("agentWorkbenchTerminalCursorBlink", true);
  settingsAutoOpenOutput.checked = booleanPreference("agentWorkbenchAutoOpenOutput", true);
  settingsCompactOutputs.checked = booleanPreference("agentWorkbenchCompactOutputs", true);
  settingsMetricsInterval.value = String(numericPreference("agentWorkbenchMetricsInterval", 5000, 2000, 10000));
  settingsReduceMotion.checked = booleanPreference("agentWorkbenchReduceMotion", false);
  settingsMusicReactive.checked = booleanPreference("agentWorkbenchMusicReactive", true);
  settingsCinematicEffectStrength.value = String(numericPreference("agentWorkbenchCinematicEffectStrength", 60, 0, 100));
  settingsCinematicPanelOpacity.value = String(numericPreference("agentWorkbenchCinematicPanelOpacity", 55, 35, 94));
  settingsSceneFrameRate.value = String(numericPreference("agentWorkbenchSceneFrameRate", 30, 15, 45));
  const profile = {
    name: localStorage.getItem("agentWorkbenchProfileName") || "Alex",
    role: localStorage.getItem("agentWorkbenchProfileRole") || "",
    focus: localStorage.getItem("agentWorkbenchProfileFocus") || "",
    avatar: numericPreference("agentWorkbenchProfileAvatar", 0, 0, 5)
  };
  settingsProfileNameInput.value = profile.name;
  settingsProfileRoleInput.value = profile.role;
  settingsProfileFocusInput.value = profile.focus;
  settingsProfileName.textContent = profile.name;
  settingsProfileAvatar.src = `assets/agent-face-${profile.avatar}.png`;
  selectSceneTheme(selectedSceneTheme(), { persist: false });
  applyWorkbenchPreferences();
}

function currentUserProfile() {
  return {
    name: localStorage.getItem("agentWorkbenchProfileName") || "Alex",
    role: localStorage.getItem("agentWorkbenchProfileRole") || "",
    focus: localStorage.getItem("agentWorkbenchProfileFocus") || "",
    avatar: numericPreference("agentWorkbenchProfileAvatar", 0, 0, 5)
  };
}

function renderNotepadTodos() {
  notepadTodoList.replaceChildren();
  if (!notepadTodos.length) {
    const empty = document.createElement("p");
    empty.className = "notepad-todo-empty";
    empty.textContent = "Nothing here yet. Add a task above.";
    notepadTodoList.appendChild(empty);
    return;
  }
  for (const todo of notepadTodos) {
    const row = document.createElement("label");
    row.className = "notepad-todo-row";
    row.innerHTML = `<input type="checkbox"><span></span><button type="button" title="Delete task">×</button>`;
    row.querySelector("input").checked = Boolean(todo.done);
    row.querySelector("span").textContent = todo.text;
    row.querySelector("input").addEventListener("change", (event) => {
      todo.done = event.currentTarget.checked;
      queueNotepadSave();
      renderNotepadTodos();
    });
    row.querySelector("button").addEventListener("click", () => {
      notepadTodos = notepadTodos.filter((item) => item !== todo);
      renderNotepadTodos();
      queueNotepadSave();
    });
    notepadTodoList.appendChild(row);
  }
}

function sketchSnapshot() {
  return notepadSketchCanvas.toDataURL("image/png");
}

function updateSketchHistoryControls() {
  notepadSketchUndo.disabled = notepadSketchUndoStack.length === 0;
  notepadSketchRedo.disabled = notepadSketchRedoStack.length === 0;
}

function rememberSketchState() {
  notepadSketchUndoStack.push(sketchSnapshot());
  if (notepadSketchUndoStack.length > 30) notepadSketchUndoStack.shift();
  notepadSketchRedoStack = [];
  updateSketchHistoryControls();
}

function drawSavedSketch(dataUrl) {
  const context = notepadSketchCanvas.getContext("2d");
  context.clearRect(0, 0, notepadSketchCanvas.width, notepadSketchCanvas.height);
  if (!dataUrl) return Promise.resolve();
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      context.globalCompositeOperation = "source-over";
      context.drawImage(image, 0, 0, notepadSketchCanvas.width, notepadSketchCanvas.height);
      resolve();
    };
    image.onerror = resolve;
    image.src = dataUrl;
  });
}

async function undoNotepadSketch() {
  if (!notepadSketchUndoStack.length) return;
  notepadSketchRedoStack.push(sketchSnapshot());
  const previous = notepadSketchUndoStack.pop();
  await drawSavedSketch(previous);
  updateSketchHistoryControls();
  queueNotepadSave();
}

async function redoNotepadSketch() {
  if (!notepadSketchRedoStack.length) return;
  notepadSketchUndoStack.push(sketchSnapshot());
  const next = notepadSketchRedoStack.pop();
  await drawSavedSketch(next);
  updateSketchHistoryControls();
  queueNotepadSave();
}

function setNotepadSketchTool(tool) {
  notepadSketchTool = tool === "eraser" ? "eraser" : "pen";
  const erasing = notepadSketchTool === "eraser";
  notepadSketchPen.classList.toggle("active", !erasing);
  notepadSketchPen.setAttribute("aria-pressed", String(!erasing));
  notepadSketchEraser.classList.toggle("active", erasing);
  notepadSketchEraser.setAttribute("aria-pressed", String(erasing));
  notepadSketchCanvas.classList.toggle("eraser-active", erasing);
}

function selectNotepadSketchColor(color) {
  notepadSketchColor.value = color;
  notepadSketchSwatches.forEach((swatch) => {
    swatch.classList.toggle("active", swatch.dataset.sketchColor.toLowerCase() === color.toLowerCase());
  });
  setNotepadSketchTool("pen");
}

async function saveNotepad() {
  if (!activeWorkspaceId || notepadBackdrop.hidden) return;
  notepadSaveState.textContent = "Saving…";
  try {
    await api.writeWorkspaceNotes(activeWorkspaceId, {
      notes: notepadText.value,
      todos: notepadTodos,
      sketch: notepadSketchCanvas.toDataURL("image/png"),
      profile: currentUserProfile()
    });
    notepadSaveState.textContent = "Saved";
  } catch (error) {
    notepadSaveState.textContent = "Couldn’t save";
    showToast(error.message || String(error));
  }
}

function queueNotepadSave() {
  notepadSaveState.textContent = "Unsaved";
  if (notepadSaveTimer) clearTimeout(notepadSaveTimer);
  notepadSaveTimer = setTimeout(() => saveNotepad(), 450);
}

async function openNotepad() {
  if (!activeWorkspaceId) {
    showToast("Open a workspace to use shared notes.");
    return;
  }
  notepadBackdrop.hidden = false;
  notepadSaveState.textContent = "Loading…";
  const payload = await api.readWorkspaceNotes(activeWorkspaceId);
  notepadText.value = payload?.notes || "";
  notepadTodos = Array.isArray(payload?.todos) ? payload.todos : [];
  renderNotepadTodos();
  await drawSavedSketch(payload?.sketch || "");
  notepadSketchUndoStack = [];
  notepadSketchRedoStack = [];
  updateSketchHistoryControls();
  notepadSaveState.textContent = "Saved";
  requestAnimationFrame(() => notepadText.focus());
}

async function closeNotepad() {
  if (notepadSaveTimer) {
    clearTimeout(notepadSaveTimer);
    notepadSaveTimer = null;
    await saveNotepad();
  }
  notepadBackdrop.hidden = true;
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
  const baseBackground = terminalBackgroundColor(colors.terminal || colors.bg, "#090b0e");
  const background = document.body?.classList.contains("scene-background-active")
    ? "rgba(0, 0, 0, 0)"
    : baseBackground;
  const foreground = normalizeTerminalColor(colors.text, "#c7ced7");
  const accent = normalizeTerminalColor(colors.accent, "#79d7a7");
  const muted = normalizeTerminalColor(colors.muted, "#7e8794");
  const backgroundChannels = terminalColorChannels(baseBackground) || [9, 11, 14];
  const lightBackground = (
    backgroundChannels[0] * 0.2126
    + backgroundChannels[1] * 0.7152
    + backgroundChannels[2] * 0.0722
  ) > 150;
  const ansi = lightBackground
    ? {
        black: "#1f2328",
        red: "#a31515",
        green: "#008000",
        yellow: "#795e26",
        blue: "#0451a5",
        magenta: "#af00db",
        cyan: "#007f7f",
        white: "#5b6169",
        brightBlack: "#6e7781",
        brightRed: "#cd3131",
        brightGreen: "#00a000",
        brightYellow: "#9a6700",
        brightBlue: "#0067c0",
        brightMagenta: "#bc05bc",
        brightCyan: "#008c95",
        brightWhite: "#24292f"
      }
    : {
        black: "#181818",
        red: "#f14c4c",
        green: "#23d18b",
        yellow: "#f5d76e",
        blue: "#3b8eea",
        magenta: "#d670d6",
        cyan: "#29b8db",
        white: "#d8dee9",
        brightBlack: "#7f8791",
        brightRed: "#ff6b6b",
        brightGreen: "#5af2b0",
        brightYellow: "#ffe58a",
        brightBlue: "#6caeff",
        brightMagenta: "#e69be6",
        brightCyan: "#61d9ef",
        brightWhite: "#ffffff"
      };
  return {
    background,
    foreground,
    cursor: accent,
    cursorAccent: background,
    selectionBackground: blendTerminalColor(background, accent, 0.28),
    ...ansi
  };
}

function remoteWorkspaceLabel(workspace) {
  if (!workspace || workspace.type !== "ssh" || !workspace.remote) return workspace ? workspace.root : "";
  const remote = workspace.remote;
  const target = remote.user ? `${remote.user}@${remote.host}` : remote.host;
  return `${target}:${remote.root || remote.path || "~"}`;
}

function setSshFields(connection, folderPath = "") {
  if (!connection) return;
  sshUserInput.value = connection.user || "";
  sshHostInput.value = connection.host || "";
  sshPathInput.value = folderPath || connection.lastPath || "~";
  renderSshRecentFolders();
}

function matchingSshHistoryConnection() {
  const host = sshHostInput.value.trim();
  const user = sshUserInput.value.trim();
  return sshConnectionHistory.find((connection) =>
    connection.host === host && (!user || connection.user === user)
  ) || sshConnectionHistory.find((connection) => connection.host === host);
}

function renderSshRecentFolders() {
  const connection = matchingSshHistoryConnection();
  const paths = Array.isArray(connection?.paths) ? connection.paths : [];
  sshRecentFolders.replaceChildren();
  sshRecentFoldersSection.hidden = paths.length === 0;
  for (const entry of paths) {
    const item = document.createElement("div");
    item.className = "ssh-recent-folder";
    item.setAttribute("role", "button");
    item.tabIndex = 0;
    item.title = `Reconnect to ${connection.target}:${entry.path}`;
    const glyph = document.createElement("span");
    glyph.className = "ssh-recent-folder-glyph";
    glyph.textContent = "▱";
    const copy = document.createElement("span");
    copy.className = "ssh-recent-folder-path";
    copy.textContent = entry.path;
    const age = document.createElement("small");
    age.textContent = entry.lastUsedAt ? timeAgo(entry.lastUsedAt) : "";
    item.append(glyph, copy, age);
    makeInteractive(item, async () => {
      if (connectSshButton.disabled) return;
      setSshFields(connection, entry.path);
      await connectSshWorkspace();
    });
    sshRecentFolders.appendChild(item);
  }
}

function renderSshConnectionHistory() {
  sshRecentConnections.replaceChildren();
  sshRecentSection.hidden = sshConnectionHistory.length === 0;
  for (const connection of sshConnectionHistory) {
    const item = document.createElement("div");
    item.className = "ssh-recent-connection";
    item.setAttribute("role", "button");
    item.tabIndex = 0;
    item.title = `Reconnect to ${connection.target}:${connection.lastPath}`;
    const target = document.createElement("strong");
    target.textContent = connection.target;
    const folder = document.createElement("span");
    folder.textContent = connection.lastPath || "~";
    const age = document.createElement("small");
    age.textContent = connection.lastUsedAt ? timeAgo(connection.lastUsedAt) : "";
    item.append(target, folder, age);
    makeInteractive(item, async () => {
      if (connectSshButton.disabled) return;
      setSshFields(connection);
      await connectSshWorkspace();
    });
    sshRecentConnections.appendChild(item);
  }
  renderSshRecentFolders();
}

async function openSshDialog(prefill = null, openedFromWorkspaceSetup = true) {
  sshOpenedFromWorkspaceSetup = openedFromWorkspaceSetup;
  setWorkspaceAddMenu(false);
  cleanupSshAuthentication();
  sshStatus.textContent = "";
  sshStatus.className = "ssh-status";
  sshModalBackdrop.hidden = false;
  sshKnownHostSelect.innerHTML = '<option value="">Choose a known host…</option>';
  try {
    const result = await api.listSshHosts();
    sshConnectionHistory = Array.isArray(result.recentConnections) ? result.recentConnections : [];
    for (const host of result.hosts || []) {
      const option = document.createElement("option");
      option.value = host;
      option.textContent = host;
      sshKnownHostSelect.appendChild(option);
    }
    if (prefill) {
      setSshFields(prefill, prefill.root || prefill.path || prefill.lastPath || "~");
    } else if (!sshHostInput.value.trim() && sshConnectionHistory[0]) {
      setSshFields(sshConnectionHistory[0]);
    }
    renderSshConnectionHistory();
  } catch (error) {
    sshConnectionHistory = [];
    renderSshConnectionHistory();
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
    convertEol: false,
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
    throw new Error("Secure-shell authentication did not complete. Check the terminal prompt and your key, then try again.");
  }
}

function formatSshConnectionError(error) {
  const message = String(error && error.message ? error.message : error || "");
  if (/Permission denied\s*\(publickey/i.test(message)) {
    return "Secure-shell authentication was rejected. Check the authentication terminal and confirm the correct key or account.";
  }
  if (/Could not resolve hostname/i.test(message)) return "The remote server could not be resolved. Check the host or your secure-shell config.";
  if (/Connection timed out|Operation timed out/i.test(message)) return "The remote connection timed out. Check the server, network tunnel, and network.";
  if (/Remote path is not a directory/i.test(message)) {
    const match = message.match(/Remote path is not a directory:[^\r\n]*/i);
    return match ? match[0] : "The remote path is not a directory.";
  }
  return message
    .replace(/^Error invoking remote method '[^']+':\s*/i, "")
    .replace(/^Error:\s*/i, "")
    .split("\n")[0]
    .trim() || "Remote connection failed.";
}

function parseSshTarget(value) {
  const raw = String(value || "").trim();
  const at = raw.lastIndexOf("@");
  return at > 0 ? { user: raw.slice(0, at), host: raw.slice(at + 1) } : { user: "", host: raw };
}

async function connectSshWorkspace() {
  if (connectSshButton.disabled) return;
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
  sshStatus.textContent = "Authenticating remote connection…";
  sshStatus.className = "ssh-status";
  try {
    await runSshAuthentication(remote);
    sshStatus.textContent = "Authentication succeeded. Verifying the remote path…";
    const workspace = await api.connectSshWorkspace(remote);
    closeSshDialog(false);
    sshOpenedFromWorkspaceSetup = false;
    await prepareWorkspaceSetup(workspace);
    setRemoteConnectionState(workspace.id, "connected");
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
  updateWorkspaceActionAvailability(workspace);
  renderWorkspaceEditorTabs();
  renderHomeView();
  setFooter("No workspace");
}

function updateWorkspaceActionAvailability(workspace = activeWorkspace()) {
  const available = isWorkspaceConnected(workspace);
  openCodeButton.disabled = !available;
  newFileButton.disabled = !available;
  newFolderButton.disabled = !available;
}

function renderHomeView() {
  homeWorkspaceGrid.replaceChildren();
  const recent = [...workspaces]
    .sort((left, right) => String(right.lastOpenedAt || "").localeCompare(String(left.lastOpenedAt || "")))
    .slice(0, 12);
  if (!recent.length) {
    const empty = document.createElement("div");
    empty.className = "home-empty";
    empty.textContent = "Add a workspace to start.";
    homeWorkspaceGrid.appendChild(empty);
    return;
  }
  for (const [index, workspace] of recent.entries()) {
    const card = document.createElement("button");
    card.className = "home-workspace-card";
    card.classList.toggle("active", workspace.id === activeWorkspaceId);
    card.style.setProperty("--home-card-index", String(index));
    card.type = "button";
    card.title = `Open ${workspace.name}`;
    const icon = document.createElement("span");
    icon.className = "home-workspace-icon";
    icon.innerHTML = workspace.type === "ssh"
      ? '<svg viewBox="0 0 18 18" aria-hidden="true"><rect x="2.5" y="3" width="13" height="9" rx="1.5"/><path d="M6 15h6M9 12v3M5.5 7h7"/></svg>'
      : '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2.5 4.5h5l1.4 1.7h6.6v8.3h-13z"/></svg>';
    const copy = document.createElement("span");
    copy.className = "home-workspace-copy";
    const name = document.createElement("strong");
    name.textContent = workspace.name;
    const root = document.createElement("span");
    root.textContent = remoteWorkspaceLabel(workspace);
    const meta = document.createElement("small");
    meta.textContent = workspace.type === "ssh" ? "Remote workspace" : "Local workspace";
    copy.append(name, root, meta);
    card.append(icon, copy);
    makeInteractive(card, () => selectWorkspace(workspace.id));
    homeWorkspaceGrid.appendChild(card);
  }
}

function setHomeView(open) {
  const next = Boolean(open);
  if (next) {
    if (cinematicModeEnabled) setCinematicMode(false, { persist: false });
    if (pixelModeEnabled) setPixelMode(false, { persist: false });
  }
  homeView.hidden = !next;
  homeButton.classList.toggle("active", next);
  homeButton.setAttribute("aria-pressed", String(next));
  cinematicModeButton.disabled = next;
  pixelModeButton.disabled = next;
  mainLayout.inert = next;
  mainLayout.setAttribute("aria-hidden", String(next));
  if (next) {
    closeOutputViewer();
    closeCommandPalette();
    setWorkspaceAddMenu(false);
    renderHomeView();
  } else {
    syncSceneBackgroundPlayback();
  }
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
    : "This removes the workspace tab from BsCode.";
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
  setHomeView(false);
  if (workspaceId === activeWorkspaceId) return;
  closeOutputViewer();
  expandedFilePaths.clear();
  activeWorkspaceId = workspaceId;
  selectedFilePath = "";
  selectedFileKind = "directory";
  localStorage.setItem("agentWorkbenchActiveWorkspace", workspaceId);
  localStorage.setItem("agentWorkbenchLastWorkspace", workspaceId);
  renderWorkspaces();
  renderWorkspaceAgentGrid();
  activeArtifactPath = "";
  resetArtifactPreview();
  await refreshWorkspacePanels();
  refreshSystemMetrics();
  syncPixelMode(true);
  refreshPixelFloorPreviewsForWorkspaceSwitch();
}

async function addWorkspace() {
  const workspace = await api.addWorkspace();
  if (!workspace) return;
  await prepareWorkspaceSetup(workspace);
}

function updateFileEmptyState() {
  const showingWorkspaces = currentSidebarView === "workspaces";
  const workspace = activeWorkspace();
  const disconnected = workspace?.type === "ssh" && !isWorkspaceConnected(workspace);
  fileEmpty.hidden = showingWorkspaces
    ? workspaces.length > 0
    : Boolean(workspace) && !disconnected;
  if (fileEmpty.hidden) return;
  if (showingWorkspaces) {
    fileEmpty.textContent = "Add a workspace to start.";
  } else if (disconnected) {
    const host = workspace.remote?.host || workspace.name || "remote";
    fileEmpty.textContent = `Disconnected from ${host}. Reconnect to browse remote files.`;
  } else {
    fileEmpty.textContent = "Add a workspace to browse its files.";
  }
}

function clearDisconnectedWorkspacePanels() {
  const workspace = activeWorkspace();
  if (!workspace || workspace.type !== "ssh" || isWorkspaceConnected(workspace)) return;
  fileNodes = [];
  artifacts = [];
  selectedFilePath = "";
  selectedFileKind = "directory";
  renderFileTree();
  renderArtifacts();
  resetArtifactPreview();
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
  if (workspace.type === "ssh" && !isWorkspaceConnected(workspace)) {
    clearDisconnectedWorkspacePanels();
    setFooter(`Disconnected from ${workspace.remote?.host || workspace.name}`);
    return;
  }
  setFooter(`Loading ${workspace.name}…`);
  try {
    if (syncRemote && workspace.type === "ssh") {
      setFooter(`Syncing ${workspace.name} remotely…`);
      await api.syncWorkspace(workspace.id);
    }
    const [nextFiles, nextArtifacts] = await Promise.all([
      api.listFiles(workspace.id),
      api.listArtifacts(workspace.id)
    ]);
    if (workspace.id !== activeWorkspaceId) return;
    fileNodes = nextFiles;
    artifacts = nextArtifacts;
    renderFileTree();
    renderArtifacts();
    setFooter(`${workspace.name} · ${artifacts.length} outputs`);
  } catch (error) {
    if (workspace.type !== "ssh") throw error;
    setRemoteConnectionState(workspace.id, "disconnected");
  }
}

function renderFileTree() {
  fileTree.innerHTML = "";
  updateFileEmptyState();
  const workspace = activeWorkspace();
  if (workspace?.type === "ssh" && !isWorkspaceConnected(workspace)) return;
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

function parentPathForFileNode(node) {
  if (node.type === "directory") return node.relativePath;
  const parts = String(node.relativePath || "").split("/");
  parts.pop();
  return parts.join("/");
}

function droppedFilePaths(event) {
  return Array.from(event.dataTransfer?.files || [])
    .map((file) => {
      try {
        return api.pathForDroppedFile(file);
      } catch (error) {
        return "";
      }
    })
    .filter(Boolean);
}

async function importDroppedFiles(event, parentPath = "") {
  event.preventDefault();
  event.stopPropagation();
  document.querySelectorAll(".file-tree-row.drop-target").forEach((row) => row.classList.remove("drop-target"));
  fileTree.classList.remove("drop-active");
  const paths = droppedFilePaths(event);
  if (!paths.length || !activeWorkspaceId) return;
  setFooter(`${activeWorkspace()?.type === "ssh" ? "Uploading" : "Importing"} ${paths.length} item${paths.length === 1 ? "" : "s"}…`);
  try {
    const imported = await api.importWorkspacePaths(activeWorkspaceId, parentPath, paths);
    if (parentPath) expandedFilePaths.add(parentPath);
    if (imported[0]) {
      selectedFilePath = imported[0].relativePath;
      selectedFileKind = imported[0].type;
    }
    await refreshWorkspacePanels();
    showToast(`Imported ${imported.length} item${imported.length === 1 ? "" : "s"}`);
  } catch (error) {
    showToast(error.message || String(error));
    setFooter("Import failed");
  }
}

function agentFileReference(relativePath) {
  const value = String(relativePath || "").replace(/\\/g, "/");
  return /\s/.test(value)
    ? `@"${value.replace(/"/g, '\\"')}"`
    : `@${value}`;
}

function insertTextAtCursor(input, text) {
  const value = String(text || "");
  if (!input || !value) return false;
  const start = Number.isInteger(input.selectionStart) ? input.selectionStart : input.value.length;
  const end = Number.isInteger(input.selectionEnd) ? input.selectionEnd : start;
  const prefix = start > 0 && !/\s$/.test(input.value.slice(0, start)) ? " " : "";
  const suffix = end < input.value.length && !/^\s/.test(input.value.slice(end)) ? " " : "";
  input.setRangeText(`${prefix}${value}${suffix}`, start, end, "end");
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
  return true;
}

function insertAgentFileReferences(slot, slotIndex, imported) {
  const references = imported.map((item) => agentFileReference(item.relativePath)).join(" ");
  if (!references) return;
  const sessionId = slots[slotIndex];
  const session = sessionId ? sessions.get(sessionId) : null;
  if (session?.cleanMode && insertTextAtCursor(session.cleanComposeInput, references)) return;
  if (!session && insertTextAtCursor(slot.querySelector(".agent-task-input"), references)) return;
  if (session) {
    api.writeAgent(session.id, ` ${references}`);
    session.term.focus();
  }
}

function pastedImageFiles(event) {
  const clipboard = event.clipboardData;
  if (!clipboard) return [];
  const files = Array.from(clipboard.files || []).filter((file) => String(file.type || "").startsWith("image/"));
  if (files.length) return files.slice(0, 8);
  return Array.from(clipboard.items || [])
    .filter((item) => item.kind === "file" && String(item.type || "").startsWith("image/"))
    .map((item) => item.getAsFile())
    .filter(Boolean)
    .slice(0, 8);
}

function pastedImageName(file, index) {
  const supplied = String(file.name || "").trim();
  if (supplied && !/^image\.(?:png|jpe?g|gif|webp|svg)$/i.test(supplied)) return supplied;
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `pasted-image-${timestamp}${index ? `-${index + 1}` : ""}`;
}

async function importPastedImagesToAgent(event, slotIndex) {
  const files = pastedImageFiles(event);
  if (!files.length || !activeWorkspaceId) return;
  event.preventDefault();
  event.stopPropagation();
  const slot = event.currentTarget;
  slot.classList.add("agent-paste-target");
  const workspace = activeWorkspace();
  setFooter(`${workspace?.type === "ssh" ? "Uploading" : "Attaching"} ${files.length} pasted image${files.length === 1 ? "" : "s"}…`);
  try {
    const items = await Promise.all(files.map(async (file, index) => ({
      name: pastedImageName(file, index),
      type: file.type,
      data: new Uint8Array(await file.arrayBuffer())
    })));
    const imported = await api.importWorkspaceData(activeWorkspaceId, "", items);
    insertAgentFileReferences(slot, slotIndex, imported);
    if (imported[0]) {
      selectedFilePath = imported[0].relativePath;
      selectedFileKind = imported[0].type;
    }
    await refreshWorkspacePanels();
    showToast(`${imported.length} image${imported.length === 1 ? "" : "s"} attached to Agent ${slotIndex + 1}`);
  } catch (error) {
    showToast(error.message || String(error));
    setFooter("Image paste failed");
  } finally {
    slot.classList.remove("agent-paste-target");
  }
}

async function importDroppedFilesToAgent(event, slotIndex) {
  event.preventDefault();
  event.stopPropagation();
  const slot = event.currentTarget;
  slot.classList.remove("agent-drop-target");
  const paths = droppedFilePaths(event);
  if (!paths.length || !activeWorkspaceId) return;
  const workspace = activeWorkspace();
  setFooter(`${workspace?.type === "ssh" ? "Uploading" : "Importing"} for Agent ${slotIndex + 1}…`);
  try {
    const imported = await api.importWorkspacePaths(activeWorkspaceId, "", paths);
    insertAgentFileReferences(slot, slotIndex, imported);
    if (imported[0]) {
      selectedFilePath = imported[0].relativePath;
      selectedFileKind = imported[0].type;
    }
    await refreshWorkspacePanels();
    showToast(`${imported.length} item${imported.length === 1 ? "" : "s"} added to Agent ${slotIndex + 1}`);
  } catch (error) {
    showToast(error.message || String(error));
    setFooter("Agent file import failed");
  }
}

function enableAgentFileDrop(slot, slotIndex) {
  if (slot.dataset.fileDropReady === "true") return;
  slot.dataset.fileDropReady = "true";
  slot.addEventListener("dragenter", (event) => {
    if (!Array.from(event.dataTransfer?.types || []).includes("Files")) return;
    event.preventDefault();
    event.stopPropagation();
    slot.classList.add("agent-drop-target");
  });
  slot.addEventListener("dragover", (event) => {
    if (!Array.from(event.dataTransfer?.types || []).includes("Files")) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
    slot.classList.add("agent-drop-target");
  });
  slot.addEventListener("dragleave", (event) => {
    if (!slot.contains(event.relatedTarget)) slot.classList.remove("agent-drop-target");
  });
  slot.addEventListener("drop", (event) => {
    const currentSlotIndex = Number(slot.dataset.slot);
    importDroppedFilesToAgent(event, Number.isInteger(currentSlotIndex) ? currentSlotIndex : slotIndex);
  });
  slot.addEventListener("paste", (event) => {
    const currentSlotIndex = Number(slot.dataset.slot);
    importPastedImagesToAgent(event, Number.isInteger(currentSlotIndex) ? currentSlotIndex : slotIndex);
  }, true);
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
    api.showFileMenu(activeWorkspaceId, node.relativePath, node.type);
  });
  const dropParentPath = parentPathForFileNode(node);
  row.addEventListener("dragover", (event) => {
    if (!Array.from(event.dataTransfer?.types || []).includes("Files")) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
    document.querySelectorAll(".file-tree-row.drop-target").forEach((candidate) => {
      if (candidate !== row) candidate.classList.remove("drop-target");
    });
    row.classList.add("drop-target");
  });
  row.addEventListener("dragleave", (event) => {
    if (!row.contains(event.relatedTarget)) row.classList.remove("drop-target");
  });
  row.addEventListener("drop", (event) => importDroppedFiles(event, dropParentPath));

  if (node.type === "directory") {
    const children = document.createElement("div");
    children.className = "file-tree-children";
    for (const child of node.children || []) children.appendChild(createFileTreeNode(child, depth + 1));
    const expanded = expandedFilePaths.has(node.relativePath);
    children.hidden = !expanded;
    disclosure.classList.toggle("expanded", expanded);
    const loadRemoteChildren = async () => {
      if (node.childrenLoaded !== false || row.classList.contains("loading")) return true;
      const workspaceId = activeWorkspaceId;
      row.classList.add("loading");
      row.setAttribute("aria-busy", "true");
      try {
        const nextChildren = await api.listDirectory(workspaceId, node.relativePath);
        if (workspaceId !== activeWorkspaceId) return false;
        node.children = nextChildren;
        node.childrenLoaded = true;
        children.replaceChildren();
        for (const child of nextChildren) {
          children.appendChild(createFileTreeNode(child, depth + 1));
        }
        return true;
      } catch (error) {
        showToast(`Could not list ${node.name}: ${error.message || String(error)}`);
        return false;
      } finally {
        row.classList.remove("loading");
        row.removeAttribute("aria-busy");
      }
    };
    makeInteractive(row, async () => {
      selectFileTreeRow(row, node);
      const shouldExpand = children.hidden;
      if (shouldExpand && !(await loadRemoteChildren())) return;
      children.hidden = !shouldExpand;
      disclosure.classList.toggle("expanded", shouldExpand);
      if (shouldExpand) expandedFilePaths.add(node.relativePath);
      else expandedFilePaths.delete(node.relativePath);
    });
    wrapper.appendChild(children);
    if (expanded && node.childrenLoaded === false) {
      loadRemoteChildren().catch(() => {});
    }
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
    artifactList.innerHTML = '<div class="artifact-session-empty">No files created in this session yet.</div>';
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
    ownerNumber.textContent = String(artifact.agentNumber);
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
    artifactSidebarList.innerHTML = '<div class="sidebar-note">No session files yet.</div>';
    return;
  }
  artifacts.forEach((artifact) => artifactSidebarList.appendChild(createArtifactItem(artifact, { compact: true })));
}

function resetArtifactPreview() {
  activeArtifactPath = "";
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

function escapeHtml(value) {
  return escapeCodeHtml(value)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  if (artifact.kind === "video") {
    const video = document.createElement("video");
    video.src = artifact.fileUrl;
    video.controls = true;
    video.autoplay = false;
    video.playsInline = true;
    video.setAttribute("aria-label", artifact.name);
    container.appendChild(video);
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
  icon.textContent = artifact.extension.replace(".", "").toLowerCase() || "file";
  const label = document.createElement("strong");
  label.textContent = expanded
    ? "This file type cannot be displayed inside BsCode."
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
    syncPixelMode(true);
    refreshPixelFloorPreviewsForWorkspaceSwitch();
  }

  try {
    const artifact = await api.readArtifact(workspaceId, relativePath);
    openedOutputPaths = [
      { workspaceId, relativePath, name: artifact.name },
      ...openedOutputPaths.filter((entry) => (
        entry.workspaceId !== workspaceId || entry.relativePath !== relativePath
      ))
    ].slice(0, 20);
    localStorage.setItem("agentWorkbenchOpenedOutputs", JSON.stringify(openedOutputPaths));
    renderArtifactPreview(artifact, workspaceId, relativePath);
    if (cinematicModeEnabled) openOutputViewer(artifact, workspaceId);
  } catch (error) {
    showToast(error.message || String(error));
  }
}

function renderArtifactPreview(artifact, workspaceId, activePath = "") {
  activeArtifactPath = activePath;
  renderArtifacts();
  artifactPreview.replaceChildren();

  const shellNode = document.createElement("div");
  shellNode.className = "artifact-preview-media";
  const toolbar = document.createElement("div");
  toolbar.className = "preview-toolbar";
  const title = document.createElement("strong");
  title.textContent = artifact.name;
  title.title = artifact.remotePath || artifact.relativePath || artifact.name;
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
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "output-preview-close";
  closeButton.textContent = "×";
  closeButton.title = "Close output";
  closeButton.setAttribute("aria-label", "Close output");
  closeButton.addEventListener("click", resetArtifactPreview);
  const actions = document.createElement("div");
  actions.className = "preview-toolbar-actions";
  actions.append(openButton, closeButton);
  toolbar.append(title, actions);
  shellNode.appendChild(toolbar);

  const previewContent = document.createElement("div");
  previewContent.className = "artifact-preview-content";
  renderOutputContent(previewContent, artifact);
  shellNode.appendChild(previewContent);
  artifactPreview.appendChild(shellNode);
}

async function previewPastedOutputPath() {
  const workspace = activeWorkspace();
  const filePath = outputPathInput.value.trim();
  if (!workspace) {
    showToast("Select a workspace first.");
    return;
  }
  if (!filePath) return;
  outputPathForm.classList.add("loading");
  outputPathInput.disabled = true;
  try {
    const artifact = await api.readPreviewPath(workspace.id, filePath);
    setOutputCollapsed(false);
    renderArtifactPreview(artifact, workspace.id);
    outputPathInput.value = artifact.remotePath || artifact.relativePath || filePath;
  } catch (error) {
    showToast(error.message || String(error));
  } finally {
    outputPathForm.classList.remove("loading");
    outputPathInput.disabled = false;
    outputPathInput.focus();
  }
}

function buildAgentSlots() {
  agentGrid.innerHTML = "";
  for (let index = 0; index < slots.length; index += 1) {
    const slot = document.createElement("article");
    slot.className = "agent-slot empty";
    slot.dataset.slot = String(index);
    slot.dataset.agentNumber = String(index + 1);
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
      session.slot.dataset.agentNumber = String(index + 1);
      session.slot.style.order = String(index);
      slots[index] = session.id;
      agentGrid.appendChild(session.slot);
      continue;
    }

    const slot = document.createElement("article");
    slot.className = "agent-slot empty";
    slot.dataset.slot = String(index);
    slot.dataset.agentNumber = String(index + 1);
    slot.style.order = String(index);
    renderEmptySlot(slot, index);
    agentGrid.appendChild(slot);
  }

  updateAgentEta();
  renderAgentSidebar();
  requestAnimationFrame(() => {
    for (const session of workspaceSessions) {
      try {
        fitTerminalPreservingScroll(session);
      } catch (error) {
      }
    }
  });
}

function renderEmptySlot(slot, index) {
  slot.className = "agent-slot empty";
  slot.dataset.agentNumber = String(index + 1);
  enableAgentFileDrop(slot, index);
  slot.innerHTML = "";
  const launcher = document.createElement("div");
  launcher.className = "agent-launcher";
  const number = document.createElement("span");
  number.className = "slot-number";
  number.textContent = String(index + 1);
  const input = document.createElement("textarea");
  input.className = "agent-task-input";
  input.placeholder = `Task for Agent ${index + 1}…`;
  input.rows = 3;
  input.spellcheck = true;
  input.setAttribute("aria-label", `Task for Agent ${index + 1}`);
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
  input.addEventListener("input", () => {
    lastTerminalInputAt = Date.now();
    resizeTaskInput();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      const defaultKind = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
      startAgent(index, ["codex", "claude", "shell"].includes(defaultKind) ? defaultKind : "codex", input.value);
    }
  });
  launcher.append(number, input, buttons);
  slot.appendChild(launcher);
  ensureCinematicResizeHandle(slot);
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
    artifacts = [];
    activeArtifactPath = "";
    renderArtifacts();
    resetArtifactPreview();
    slots[slotIndex] = descriptor.id;
    renderAgentCard(slot, slotIndex, descriptor);
    selectAgentSession(sessions.get(descriptor.id));
    renderAgentSidebar();
    setFooter(`${descriptor.metadata.name} started in ${workspace.name}`);
    return sessions.get(descriptor.id);
  } catch (error) {
    slot.classList.remove("loading");
    showToast(error.message || String(error));
    setFooter("Could not start agent");
    return null;
  }
}

function renderAgentCard(slot, slotIndex, descriptor) {
  slot.className = "agent-slot";
  slot.dataset.agentNumber = String(slotIndex + 1);
  enableAgentFileDrop(slot, slotIndex);
  slot.innerHTML = `
    <div class="agent-card">
      <header class="agent-card-header">
        <span class="agent-kind"></span>
        <span class="agent-number">${slotIndex + 1}</span>
        <input class="agent-name-input" maxlength="48" aria-label="Agent name">
        <span class="agent-state-chip" data-state="waiting">Idle</span>
        <div class="agent-actions">
          <button class="agent-action agent-more" type="button" title="More actions" aria-label="More actions">⋯</button>
          <button class="agent-action agent-clean-toggle" type="button" title="Zen view" aria-label="Show Zen view" aria-pressed="false">${AGENT_ZEN_ICON}</button>
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
        <div class="agent-menu-item ask-agent-status" role="menuitem" tabindex="0"><span>?</span><span>Ask for status</span></div>
        <div class="agent-menu-item reassign-agent" role="menuitem" tabindex="0"><span>↪</span><span>Reassign task</span></div>
        <div class="agent-menu-item duplicate-agent" role="menuitem" tabindex="0"><span>⧉</span><span>Duplicate agent</span></div>
        <div class="agent-menu-item clear-terminal" role="menuitem" tabindex="0"><span>⌫</span><span>Clear terminal</span></div>
        <div class="agent-menu-item stop-terminal" role="menuitem" tabindex="0"><span>×</span><span>Stop agent</span></div>
      </div>
      <section class="agent-clean-view" aria-label="Agent progress">
        <div class="agent-current-task-indicator" data-state="waiting"><span>Now</span><strong>Waiting for the next request</strong></div>
        <div class="agent-clean-heading">Checklist</div>
        <div class="agent-clean-checklist" aria-label="Agent checklist"></div>
        <div class="agent-clean-eta-row">
          <span>ETA</span>
          <strong class="agent-clean-eta-text">—</strong>
        </div>
        <div class="agent-clean-files" hidden>
          <span>Files</span>
          <div class="agent-clean-file-list"></div>
        </div>
        <div class="agent-clean-compose">
          <textarea rows="3" placeholder="Send another instruction…" aria-label="Send another instruction"></textarea>
          <button class="agent-clean-send" type="button" title="Send instruction" aria-label="Send instruction">↵</button>
          <button class="agent-clean-interrupt" type="button" title="Interrupt agent" aria-label="Interrupt agent">
            ${AGENT_INTERRUPT_ICON}
          </button>
        </div>
      </section>
      <div class="agent-reconnect-banner" hidden>
        <span>Remote connection closed</span>
        <button type="button" title="Reconnect agent" aria-label="Reconnect agent">
          <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M14.5 5.5V2.8l-2 2A5.5 5.5 0 1 0 14 12.5"/><path d="M10.5 5h4v-4"/></svg>
        </button>
      </div>
      <div class="terminal-host"></div>
      <footer class="agent-recent-footer" hidden>
        <div class="recent-files" aria-label="Relevant files reported by this agent"></div>
      </footer>
    </div>
  `;
  ensureCinematicResizeHandle(slot);

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
  applyAgentFace(slot.querySelector(".agent-number"), {
    metadata: descriptor.metadata || {},
    kind: descriptor.kind,
    slotIndex
  });
  const nameInput = slot.querySelector(".agent-name-input");
  const tldrNode = null;
  const statusCard = slot.querySelector(".agent-status-card");
  const stateChip = slot.querySelector(".agent-state-chip");
  const recentFooter = slot.querySelector(".agent-recent-footer");
  const recentFilesNode = slot.querySelector(".recent-files");
  const terminalHost = slot.querySelector(".terminal-host");
  const cleanView = slot.querySelector(".agent-clean-view");
  const cleanChecklist = slot.querySelector(".agent-clean-checklist");
  const cleanCurrentTask = slot.querySelector(".agent-current-task-indicator");
  const cleanEtaText = slot.querySelector(".agent-clean-eta-text");
  const cleanFiles = slot.querySelector(".agent-clean-files");
  const cleanFileList = slot.querySelector(".agent-clean-file-list");
  const cleanComposeInput = slot.querySelector(".agent-clean-compose textarea");
  const cleanSendButton = slot.querySelector(".agent-clean-send");
  const cleanInterruptButton = slot.querySelector(".agent-clean-interrupt");
  const reconnectBanner = slot.querySelector(".agent-reconnect-banner");
  const reconnectButton = reconnectBanner.querySelector("button");

  const term = new Terminal({
    allowProposedApi: false,
    allowTransparency: true,
    convertEol: false,
    cursorBlink: booleanPreference("agentWorkbenchTerminalCursorBlink", true),
    fontFamily: '"SFMono-Regular", "SF Mono", Menlo, Consolas, monospace',
    fontSize: numericPreference("agentWorkbenchTerminalFontSize", 9, 8, 16),
    lineHeight: numericPreference("agentWorkbenchTerminalLineHeight", 1.15, 1, 1.5),
    scrollOnUserInput: true,
    scrollback: numericPreference("agentWorkbenchTerminalScrollback", 6000, 1000, 10000),
    theme: terminalThemeFromPalette()
  });
  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(terminalHost);
  term.onData((data) => {
    lastTerminalInputAt = Date.now();
    if (data.includes("\r") || data.includes("\n")) {
      const task = session.terminalInputBuffer.trim();
      session.terminalInputBuffer = "";
      if (
        task
        && session.kind !== "shell"
        && !task.startsWith("/")
        && !/^(?:y|n|yes|no|c|q|quit|exit)$/i.test(task)
      ) {
        beginAgentTask(session, task);
      }
    } else if (data === "\u007f") {
      session.terminalInputBuffer = session.terminalInputBuffer.slice(0, -1);
    } else if (!/[\u0000-\u001f]/.test(data)) {
      session.terminalInputBuffer = `${session.terminalInputBuffer}${data}`.slice(-2000);
    }
    if (data === "\u001b" || data.includes("\u0003")) {
      interruptAgentSession(session, { send: false, announce: false });
    } else if ((data.includes("\r") || data.includes("\n")) && session.etaPaused) {
      resumeSessionEta(session);
      session.pausedByUser = false;
      session.metadata = {
        ...session.metadata,
        status: "working",
        state: "coding",
        currentTask: session.metadata.currentTask === "Interrupted"
          ? "Resuming task"
          : session.metadata.currentTask
      };
      updateAgentEta();
    }
    api.writeAgent(descriptor.id, data);
  });
  term.onResize(({ cols, rows }) => api.resizeAgent(descriptor.id, cols, rows));

  let terminalFitTimer = 0;
  const scheduleTerminalFit = () => {
    if (terminalFitTimer) window.clearTimeout(terminalFitTimer);
    terminalFitTimer = window.setTimeout(() => {
      terminalFitTimer = 0;
      try {
        fitTerminalPreservingScroll(session);
      } catch (error) {
      }
    }, 90);
  };
  const observer = new ResizeObserver(scheduleTerminalFit);
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
    terminalHost,
    scheduleTerminalFit,
    cancelTerminalFit: () => {
      if (terminalFitTimer) window.clearTimeout(terminalFitTimer);
      terminalFitTimer = 0;
    },
    nameInput,
    tldrNode,
    statusCard,
    stateChip,
    cleanView,
    cleanChecklist,
    cleanCurrentTask,
    cleanEtaText,
    cleanFiles,
    cleanFileList,
    cleanComposeInput,
    cleanSendButton,
    cleanInterruptButton,
    reconnectBanner,
    checklistEtaState: new Map(),
    etaPaused: false,
    etaPausedSeconds: null,
    cleanMode: false,
    recentFooter,
    recentFilesNode,
    actionMenu: slot.querySelector(".agent-action-menu"),
    lastPreviewFile: "",
    exited: false,
    notifiedFailure: false,
    notifiedApproval: false,
    finishNotified: descriptor.metadata.status === "done",
    modelDetectionBuffer: "",
    pendingAgentSubmitTimer: null,
    terminalInputBuffer: ""
  };
  session.runtimeModel = descriptor.metadata.model && !/^(codex|claude|shell)$/i.test(descriptor.metadata.model)
    ? descriptor.metadata.model
    : "";
  sessions.set(descriptor.id, session);
  updateAgentMetadata(session, descriptor.metadata);
  if (globalCleanMode) setAgentCleanMode(session, true, { focus: false });
  term.writeln(`\x1b[38;5;114m${descriptor.commandLabel}\x1b[0m`);
  term.writeln(`\x1b[38;5;244m${descriptor.cwd}\x1b[0m`);
  const pending = pendingTerminalData.get(descriptor.id) || [];
  pending.forEach((data) => queueTerminalOutput(session, data));
  pendingTerminalData.delete(descriptor.id);

  nameInput.addEventListener("change", () => api.renameAgent(descriptor.id, nameInput.value));
  nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nameInput.blur();
    }
  });
  slot.querySelector(".agent-clean-toggle").addEventListener("click", () => {
    setAgentCleanMode(session, !session.cleanMode);
  });
  cleanComposeInput.addEventListener("input", () => {
    lastTerminalInputAt = Date.now();
  });
  cleanComposeInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    event.stopPropagation();
    sendAgentCleanInstruction(session);
  });
  cleanSendButton.addEventListener("click", () => sendAgentCleanInstruction(session));
  cleanInterruptButton.addEventListener("click", () => {
    interruptAgentSession(session);
  });
  reconnectButton.addEventListener("click", () => reconnectAgent(session));
  slot.querySelector(".agent-close").addEventListener("click", () => stopAgent(descriptor.id));
  slot.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button, input, textarea, [role='menuitem']")) return;
    selectAgentSession(session);
  });
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
  makeInteractive(slot.querySelector(".ask-agent-status"), () => {
    askAgentsForStatus(session);
    session.actionMenu.hidden = true;
  });
  makeInteractive(slot.querySelector(".reassign-agent"), () => {
    reassignAgentTask(session);
    session.actionMenu.hidden = true;
  });
  makeInteractive(slot.querySelector(".duplicate-agent"), () => {
    duplicateAgent(session);
    session.actionMenu.hidden = true;
  });
  makeInteractive(slot.querySelector(".stop-terminal"), () => stopAgent(descriptor.id));

  requestAnimationFrame(() => {
    try {
      fitTerminalPreservingScroll(session);
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
        fitTerminalPreservingScroll(activeSession);
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
    selectAgentSession(session);
    session.slot.classList.add("maximized");
    agentGrid.classList.add("has-maximized");
    updateAgentMaximizeControls();
    requestAnimationFrame(() => {
      try {
        fitTerminalPreservingScroll(session);
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
  session.slot.dataset.agentNumber = String(targetIndex + 1);
  session.slot.style.order = String(targetIndex);
  session.slotIndex = targetIndex;
  applyAgentFace(session.slot.querySelector(".agent-number"), session);
  targetSlot.dataset.slot = String(currentIndex);
  targetSlot.dataset.agentNumber = String(currentIndex + 1);
  targetSlot.style.order = String(currentIndex);
  if (targetSession) {
    targetSession.slotIndex = currentIndex;
    applyAgentFace(targetSession.slot.querySelector(".agent-number"), targetSession);
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
    number.textContent = String(index + 1);
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
      if (session) {
        selectAgentSession(session);
        session.term.focus();
      }
      else slot.querySelector(".agent-task-input")?.focus();
    });
    agentSidebarList.appendChild(item);
  }
}

function updateAgentEta() {
  const now = Date.now();
  const typingRecently = now - lastTerminalInputAt < 180;
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
      const prefix = String(index + 1);
      if (!session) {
        item.hidden = true;
        item.classList.remove("has-agent-face");
        item.style.removeProperty("--agent-face");
        item.textContent = "";
        item.title = `${workspace.name} · Agent ${prefix}: empty`;
        item.removeAttribute("aria-label");
        continue;
      }

      const status = session.metadata.status || "working";
      item.hidden = false;
      item.classList.add("has-agent-face");
      item.style.setProperty("--agent-face", `url("${agentFaceUrl(session)}")`);
      let statusText = status;
      if (status === "done") {
        statusText = "done";
      } else if (status === "error") {
        statusText = "error";
      } else {
        const etaSeconds = remainingEtaSeconds(session, now);
        statusText = Number.isFinite(etaSeconds) ? formatEtaClock(etaSeconds) : status;
      }
      item.textContent = booleanPreference("agentWorkbenchShowTabEtas", true)
        ? statusText
        : "";
      item.dataset.status = status;
      item.title = `${workspace.name} · ${session.metadata.name || `${session.kind} agent`}: ${statusText}`;
      item.setAttribute("aria-label", item.title);
    }
    etaGroup.hidden = !Array.from(etaGroup.children).some((item) => !item.hidden);
  }
  for (const session of activePixelSessions()) {
    const eta = pixelAgentRosterList.querySelector(
      `[data-agent-slot="${session.slotIndex}"] .pixel-roster-eta`
    );
    if (eta) eta.textContent = pixelRosterEtaText(session, now);
    if (
      pixelFloorForSession(session) !== activePixelFloor
      || !pixelKnownAgentIds.has(session.slotIndex + 1)
    ) {
      continue;
    }
    postPixelMessage({
      type: "agentEta",
      id: session.slotIndex + 1,
      eta: pixelRosterEtaText(session, now),
      etaSeconds: remainingEtaSeconds(session, now),
      name: session.metadata.name || `Agent ${session.slotIndex + 1}`,
      team: session.kind === "codex" ? "Codex" : session.kind === "claude" ? "Claude" : "Shell",
      status: session.metadata.status === "working" ? "active" : session.metadata.status || "waiting",
      tldr: session.metadata.tldr || "Waiting for work",
      present: true
    });
  }
  if (pixelModeEnabled && pixelFrameReady && now - lastPixelAutoSyncAt >= 5000) {
    lastPixelAutoSyncAt = now;
    setPixelVisibleSessionsForFloor(activePixelFloor);
    for (const session of pixelSessionsForFloor(activePixelFloor)) {
      postPixelSessionDetails(session);
    }
    renderPixelAgentRoster();
    renderPixelFloorLauncher();
    if (pixelPreviewRefreshNeeded || pixelDirtyPreviewFloors.size > 0) {
      schedulePixelPreviewRefresh(350);
    }
  }
  for (const session of sessions.values()) {
    updateAgentStatusCard(session, now);
    if (session.cleanMode && !typingRecently) renderAgentCleanView(session, now);
  }
  if (selectedPixelDetailAgentId) {
    renderPixelAgentDetail(sessions.get(selectedPixelDetailAgentId));
  }
  updateCommandCenterStatus();
  updateRuntimeStatus(now);
}

async function openReportedAgentPreview(session, relativePath) {
  const workspace = workspaces.find((item) => item.id === session.workspaceId);
  try {
    if (booleanPreference("agentWorkbenchAutoOpenOutput", true)) setOutputCollapsed(false);
    await previewWorkspaceFile(session.workspaceId, relativePath);
  } catch (error) {
    showToast(error.message || String(error));
  }
}

function createAgentRelevantFile(session, relativePath, className = "recent-file") {
  const item = document.createElement("div");
  item.className = className;
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
  return item;
}

function updateAgentMetadata(session, metadata) {
  const previousStatus = session.metadata?.status || "";
  const recentFooterWasHidden = session.recentFooter.hidden;
  const nextMetadata = { ...session.metadata, ...metadata };
  syncChecklistEtaState(session, nextMetadata);
  const nextStatus = nextMetadata.status || "";
  const etaWasReported = Object.prototype.hasOwnProperty.call(metadata, "etaSeconds")
    || Object.prototype.hasOwnProperty.call(metadata, "etaMinutes");
  const nextReportedEta = reportedEtaSeconds(nextMetadata);
  if (nextStatus === "done" || nextStatus === "error") {
    session.etaPaused = false;
    session.etaPausedSeconds = null;
    session.etaDeadline = null;
    session.lastReportedEtaSeconds = null;
  } else if (session.etaPaused) {
    session.etaDeadline = null;
  } else if (nextStatus !== "working") {
    session.etaDeadline = null;
    session.lastReportedEtaSeconds = null;
  } else if (etaWasReported && Number.isFinite(nextReportedEta)) {
    if (
      nextReportedEta !== session.lastReportedEtaSeconds
      || !Number.isFinite(session.etaDeadline)
    ) {
      session.etaDeadline = etaDeadlineFromMetadata(nextMetadata);
    }
    session.lastReportedEtaSeconds = nextReportedEta;
  }
  session.metadata = nextMetadata;
  updateAgentStatusCard(session);
  scheduleAgentCleanRender(session);
  const agentState = normalizedAgentState(session.metadata);
  if (agentState === "failed" && !session.notifiedFailure) {
    session.notifiedFailure = true;
    recordAgentNotification(
      session,
      "failed",
      `${session.metadata.name || `Agent ${session.slotIndex + 1}`} failed`,
      session.metadata.tldr || session.metadata.currentTask || "The agent stopped with an error."
    );
    showToast(`Agent ${session.slotIndex + 1} failed`);
  } else if (agentState !== "failed") {
    session.notifiedFailure = false;
  }
  const needsApproval = /approval|permission/i.test(
    `${session.metadata.currentTask || ""} ${session.metadata.tldr || ""}`
  );
  if (needsApproval && !session.notifiedApproval) {
    session.notifiedApproval = true;
    recordAgentNotification(
      session,
      "approval",
      `${session.metadata.name || `Agent ${session.slotIndex + 1}`} needs approval`,
      session.metadata.currentTask || session.metadata.tldr || "An approval is waiting."
    );
    showToast(`Agent ${session.slotIndex + 1} needs approval`);
  } else if (!needsApproval) {
    session.notifiedApproval = false;
  }
  if (nextStatus !== "done") session.finishNotified = false;
  if (nextStatus === "done" && previousStatus !== "done" && !session.finishNotified) {
    session.finishNotified = true;
    notifyAgentFinished(session);
  }
  if (document.activeElement !== session.nameInput) {
    session.nameInput.value = session.metadata.name || `${session.kind} agent`;
  }
  if (session.tldrNode) {
    session.tldrNode.textContent = session.metadata.tldr || "Waiting for an update.";
  }
  session.recentFilesNode.innerHTML = "";

  const recentLimit = numericPreference("agentWorkbenchRecentFilesLimit", 40, 8, 40);
  const relevantFiles = Array.isArray(session.metadata.relevantFiles)
    ? session.metadata.relevantFiles.slice(0, recentLimit)
    : [];
  session.recentFooter.hidden = relevantFiles.length === 0;
  for (const relativePath of relevantFiles) {
    session.recentFilesNode.appendChild(createAgentRelevantFile(session, relativePath));
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
  if (recentFooterWasHidden !== session.recentFooter.hidden) {
    requestAnimationFrame(() => {
      try {
        fitTerminalPreservingScroll(session);
      } catch (error) {
      }
    });
  }
}

async function stopAgent(id) {
  const session = sessions.get(id);
  if (!session) return;
  const assignedFloor = pixelFloorForSession(session);
  session.stoppingByUser = true;
  session.notifiedFailure = true;
  session.finishNotified = true;
  if (session.pendingAgentSubmitTimer) window.clearTimeout(session.pendingAgentSubmitTimer);
  session.pendingAgentSubmitTimer = null;
  session.cancelTerminalFit?.();
  postPixelMessage({ type: "agentClosed", id: session.slotIndex + 1 });
  pixelKnownAgentIds.delete(session.slotIndex + 1);
  await api.killAgent(id);
  session.observer.disconnect();
  session.term.dispose();
  sessions.delete(id);
  pixelSessionPreviewSignatures.delete(id);
  reconcilePixelAgentFloorAssignments(session.workspaceId);
  if (selectedAgentId === id) selectedAgentId = null;
  slots[session.slotIndex] = null;
  agentGrid.classList.remove("has-maximized");
  renderEmptySlot(session.slot, session.slotIndex);
  updateAgentEta();
  renderAgentSidebar();
  setFooter("Agent stopped");
  syncPixelMode(true);
  queuePixelFloorPreviewRefresh(assignedFloor, 180);
  renderPixelAgentRoster();
}

async function reconnectAgent(session) {
  if (!session?.exited || !session.descriptor?.remote) return;
  const { slotIndex, kind } = session;
  const unfinishedTask = ["complete", "waiting"].includes(normalizedAgentState(session.metadata))
    ? ""
    : String(session.metadata.currentTask || session.metadata.tldr || "").trim();
  session.reconnectBanner.hidden = true;
  setFooter(`Reconnecting Agent ${slotIndex + 1}…`);
  await stopAgent(session.id);
  const reconnectTask = unfinishedTask
    ? `The remote connection was interrupted. Inspect the workspace and resume this task: ${unfinishedTask}`
    : "";
  await startAgent(slotIndex, kind, reconnectTask);
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

  } catch (error) {
    codexUsageText.textContent = "Usage unavailable";
  }
}

async function refreshSystemMetrics() {
  const requestedWorkspaceId = activeWorkspaceId;
  const requestedWorkspace = activeWorkspace();
  gpuMetrics.replaceChildren();
  gpuMetrics.removeAttribute("title");
  try {
    const metrics = await api.getSystemMetrics(requestedWorkspaceId);
    if (requestedWorkspace?.type === "ssh") {
      setRemoteConnectionState(
        requestedWorkspaceId,
        metrics.source === "ssh" ? "connected" : "disconnected"
      );
    }
    if (requestedWorkspaceId !== activeWorkspaceId) return;
    const sourceLabel = metrics.source === "ssh"
      ? `Remote ${metrics.label}`
      : metrics.source === "ssh-error"
        ? `Remote ${metrics.label} unavailable`
        : "Local";
    metricSource.textContent = sourceLabel;
    metricSource.classList.toggle("error", metrics.source === "ssh-error");
    metricSource.title = metrics.source === "ssh-error" ? metrics.error || "Remote metrics unavailable" : "";
    if (metrics.source === "ssh-error") {
      cpuUsageText.textContent = "—";
      memoryUsageText.textContent = "—";
      storageUsageText.textContent = "—";
      const unavailable = document.createElement("span");
      unavailable.className = "gpu-metric muted";
      unavailable.textContent = "GPU unavailable";
      gpuMetrics.appendChild(unavailable);
      return;
    }
    cpuUsageText.textContent = Number.isFinite(metrics.cpuPercent) ? `${Math.round(metrics.cpuPercent)}%` : "—";
    memoryUsageText.textContent = metrics.memoryTotalBytes
      ? `${formatCompactBytes(metrics.memoryUsedBytes)} / ${formatCompactBytes(metrics.memoryTotalBytes)}`
      : "—";
    storageUsageText.textContent = metrics.storageTotalBytes
      ? `${formatCompactBytes(metrics.storageUsedBytes)} / ${formatCompactBytes(metrics.storageTotalBytes)}`
      : "—";
    for (const gpu of metrics.gpus || []) {
      const item = document.createElement("span");
      item.className = "gpu-metric";
      const users = Array.isArray(gpu.users) ? gpu.users.filter(Boolean) : [];
      const processes = Array.isArray(gpu.processes)
        ? [...gpu.processes].sort(
            (left, right) => (Number(right.memoryUsedMiB) || 0) - (Number(left.memoryUsedMiB) || 0)
          )
        : [];
      const userMemory = new Map();
      for (const process of processes) {
        const user = process.user || "unknown";
        const total = userMemory.get(user) || 0;
        userMemory.set(user, total + (Number(process.memoryUsedMiB) || 0));
      }
      for (const user of users) {
        if (!userMemory.has(user)) userMemory.set(user, null);
      }
      const userLines = Array.from(userMemory.entries())
        .sort((left, right) => (Number(right[1]) || 0) - (Number(left[1]) || 0))
        .map(([user, memoryUsedMiB]) => (
          `User: ${user} · Memory used: ${Number.isFinite(memoryUsedMiB) ? formatMiB(memoryUsedMiB) : "—"}`
        ));
      const utilization = Number.isFinite(gpu.utilizationPercent)
        ? `${Math.round(gpu.utilizationPercent)}%`
        : "—";
      const memoryUsed = Number.isFinite(gpu.memoryUsedMiB)
        ? formatMiB(gpu.memoryUsedMiB)
        : "—";
      const gpuTooltip = [
        userLines.length ? userLines.join("\n") : `User: None · Memory used: ${memoryUsed}`,
        `Utilization: ${utilization}`
      ].join("\n");
      item.dataset.tooltip = gpuTooltip;
      item.tabIndex = 0;
      item.setAttribute("aria-label", gpuTooltip);
      item.classList.toggle("muted", !gpu.metricsAvailable && !Number.isFinite(gpu.utilizationPercent));
      item.textContent = `GPU ${gpu.index} · memory ${memoryUsed} · usage ${utilization}`;
      gpuMetrics.appendChild(item);
    }
    if (metrics.source === "ssh" && !(metrics.gpus || []).length) {
      const empty = document.createElement("span");
      empty.className = "gpu-metric muted";
      empty.textContent = "GPU —";
      gpuMetrics.appendChild(empty);
    }
  } catch (error) {
    if (requestedWorkspace?.type === "ssh") {
      setRemoteConnectionState(requestedWorkspaceId, "disconnected");
    }
    if (requestedWorkspaceId !== activeWorkspaceId) return;
    cpuUsageText.textContent = "—";
    memoryUsageText.textContent = "—";
    storageUsageText.textContent = "—";
    gpuMetrics.replaceChildren();
    const unavailable = document.createElement("span");
    unavailable.className = "gpu-metric muted";
    unavailable.textContent = "GPU unavailable";
    unavailable.setAttribute("aria-label", `GPU metrics unavailable: ${error.message || error}`);
    gpuMetrics.appendChild(unavailable);
  }
}

function setSpotifyShuffleState(shuffling, { available = true } = {}) {
  const shuffle = available && Boolean(shuffling);
  const state = available ? (shuffle ? "on" : "off") : "unavailable";
  const visibleState = available ? (shuffle ? "ON" : "OFF") : "—";
  const actionLabel = shuffle
    ? "Shuffle is on. Turn shuffle off"
    : available
      ? "Shuffle is off. Turn shuffle on"
      : "Shuffle is unavailable";
  spotifyShuffleButton.classList.toggle("active", shuffle);
  spotifyShuffleButton.dataset.shuffleState = state;
  spotifyShuffleButton.setAttribute("aria-pressed", String(shuffle));
  spotifyShuffleButton.title = actionLabel;
  spotifyShuffleButton.setAttribute("aria-label", actionLabel);
  spotifyShuffleState.textContent = visibleState;
}

async function refreshSpotifyStatus() {
  if (spotifyRefreshBusy) return;
  spotifyRefreshBusy = true;
  try {
    const status = await api.getSpotifyStatus();
    latestSpotifyStatus = { ...status, retrievedAt: Date.now() };
    const hasTrack = Boolean(status.running && status.name);
    spotifyNowPlaying.hidden = false;
    spotifyNowPlaying.classList.toggle("no-track", !hasTrack);
    if (!hasTrack) {
      spotifyTrackName.textContent = "Spotify";
      spotifyTrackName.title = "Spotify";
      spotifyTrackDetail.textContent = "Open Spotify";
      spotifyTrackDetail.title = "Open Spotify";
      spotifyArtwork.hidden = true;
      spotifyNowPlaying.classList.remove("playing");
      document.body.classList.remove("music-playing");
      setSpotifyShuffleState(false);
      return;
    }
    if (spotifyTrackName.textContent !== status.name) spotifyTrackName.textContent = status.name;
    spotifyTrackName.title = status.name;
    requestAnimationFrame(() => {
      const clip = spotifyTrackName.closest(".spotify-track-name-clip");
      if (!clip) return;
      const overflow = Math.max(0, spotifyTrackName.scrollWidth - clip.clientWidth);
      clip.classList.toggle("scrolling", overflow > 6);
      spotifyTrackName.style.setProperty("--spotify-scroll-distance", `${Math.ceil(overflow)}px`);
      spotifyTrackName.style.setProperty("--spotify-scroll-duration", `${Math.min(16, Math.max(7, 6 + overflow / 24))}s`);
    });
    const rawDuration = Number(status.duration);
    const durationSeconds = rawDuration > 10000 ? rawDuration / 1000 : rawDuration;
    const positionSeconds = Number(status.position);
    const remainingSeconds = Number.isFinite(durationSeconds) && Number.isFinite(positionSeconds)
      ? Math.max(0, durationSeconds - positionSeconds)
      : null;
    const remainingLabel = Number.isFinite(remainingSeconds)
      ? `−${formatEtaClock(remainingSeconds)}`
      : "";
    spotifyTrackDetail.textContent = [status.artist, status.album, remainingLabel].filter(Boolean).join(" · ");
    spotifyTrackDetail.title = spotifyTrackDetail.textContent;
    const artworkUrl = String(status.artworkUrl || "").trim();
    spotifyArtwork.hidden = !artworkUrl;
    if (artworkUrl && spotifyArtwork.src !== artworkUrl) spotifyArtwork.src = artworkUrl;
    const playing = status.state === "playing";
    spotifyNowPlaying.classList.toggle("playing", playing);
    document.body.classList.toggle("music-playing", playing);
    const actionLabel = playing ? "Pause" : "Play";
    spotifyPlayPauseButton.title = actionLabel;
    spotifyPlayPauseButton.setAttribute("aria-label", actionLabel);
    setSpotifyShuffleState(status.shuffling);
  } catch (error) {
    spotifyNowPlaying.hidden = false;
    spotifyNowPlaying.classList.add("no-track");
    spotifyArtwork.hidden = true;
    spotifyTrackName.textContent = "Spotify";
    spotifyTrackDetail.textContent = "Open Spotify";
    document.body.classList.remove("music-playing");
    setSpotifyShuffleState(false, { available: false });
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

async function openApplicationShortcut(application, label) {
  try {
    await api.openApplication(application);
  } catch (error) {
    showToast(`${label} is not available.`);
  }
}

function timeBasedPixelSkyPhase(now = new Date()) {
  const hour = now.getHours() + now.getMinutes() / 60;
  if (hour >= 5 && hour < 8) return "sunrise";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "sunset";
  return "night";
}

function applyPixelSkyPhase(now = new Date()) {
  const automaticPhase = timeBasedPixelSkyPhase(now);
  const skyPhase = pixelSkyManualPhase || automaticPhase;
  const phases = ["sunrise", "day", "sunset", "night"];
  const nextPhase = phases[(Math.max(0, phases.indexOf(skyPhase)) + 1) % phases.length];
  pixelModeView.dataset.skyPhase = skyPhase;
  pixelModeView.dataset.skySource = pixelSkyManualPhase ? "manual" : "time";
  pixelSkyToggleButton.dataset.skyPhase = skyPhase;
  pixelSkyToggleButton.setAttribute("aria-pressed", String(Boolean(pixelSkyManualPhase)));
  pixelSkyToggleButton.title = `Tower sky: ${skyPhase}. Switch to ${nextPhase}. Double-click for local time.`;
  pixelSkyToggleButton.setAttribute("aria-label", pixelSkyToggleButton.title);
}

function togglePixelSkyPhase() {
  const visiblePhase = pixelModeView.dataset.skyPhase || timeBasedPixelSkyPhase();
  const phases = ["sunrise", "day", "sunset", "night"];
  const currentIndex = Math.max(0, phases.indexOf(visiblePhase));
  pixelSkyManualPhase = phases[(currentIndex + 1) % phases.length];
  applyPixelSkyPhase();
}

function refreshTitlebarTime() {
  const now = new Date();
  const label = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(now);
  titlebarTime.textContent = label;
  titlebarTime.dateTime = now.toISOString();
  titlebarTime.title = now.toLocaleString();
  applyPixelSkyPhase(now);
}

function renderCalendar(cursor = calendarCursor, today = new Date()) {
  calendarCursor = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  calendarMonth.textContent = new Intl.DateTimeFormat([], { month: "long", year: "numeric" }).format(calendarCursor);
  const isCurrentMonth =
    calendarCursor.getFullYear() === today.getFullYear()
    && calendarCursor.getMonth() === today.getMonth();
  calendarFullDate.textContent = isCurrentMonth
    ? new Intl.DateTimeFormat([], {
    weekday: "long", month: "long", day: "numeric"
    }).format(today)
    : `${new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 0).getDate()} days`;
  calendarGrid.replaceChildren();
  const first = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth(), 1);
  const days = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 0).getDate();
  for (let index = 0; index < first.getDay(); index += 1) {
    calendarGrid.appendChild(document.createElement("span"));
  }
  for (let day = 1; day <= days; day += 1) {
    const cell = document.createElement("b");
    cell.textContent = String(day);
    cell.classList.toggle("today", isCurrentMonth && day === today.getDate());
    calendarGrid.appendChild(cell);
  }
}

async function refreshPowerStatus() {
  const status = await api.getPowerStatus();
  titlebarBattery.hidden = !status.available;
  if (!status.available) return;
  const percent = Math.max(0, Math.min(100, Number(status.percent) || 0));
  titlebarBatteryFill.setAttribute("width", String(19 * percent / 100));
  const charging = Boolean(status.charging);
  const charged = Boolean(status.charged);
  titlebarBatteryText.textContent = `${Math.round(percent)}%`;
  titlebarBattery.classList.toggle("charging", charging);
  titlebarBattery.classList.toggle("charged", charged);
  titlebarBatteryCharge.hidden = !charging;
  const stateLabel = charged ? "charged" : charging ? "charging" : "on battery";
  titlebarBattery.title = `${Math.round(percent)}% · ${stateLabel}`;
  titlebarBattery.setAttribute("aria-label", `${Math.round(percent)} percent, ${stateLabel}`);
}

function formatCompactBytes(value) {
  const bytes = Number(value) || 0;
  return `${(bytes / (1024 ** 3)).toFixed(bytes >= 10 * (1024 ** 3) ? 0 : 1)} GiB`;
}

function formatMiB(value) {
  const mib = Number(value) || 0;
  return mib >= 1024 ? `${(mib / 1024).toFixed(mib >= 10240 ? 0 : 1)} GiB` : `${Math.round(mib)} MiB`;
}

function formatReset(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function formatBytes(value) {
  if (!Number.isFinite(Number(value))) return "remote";
  const bytes = Number(value) || 0;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;
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

  const attach = (handle, collapsedTab, property, storageKey, direction, min, max, collapsedClass, setCollapsed) => {
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      if (document.body.classList.contains(collapsedClass)) setCollapsed(false);
      const startX = event.clientX;
      const current = Number.parseFloat(getComputedStyle(root).getPropertyValue(property));
      const collapseThreshold = min - 30;
      let rawNext = current;
      let liveCollapsed = false;
      document.body.classList.add("is-resizing");

      const move = (moveEvent) => {
        rawNext = current + (moveEvent.clientX - startX) * direction;
        const shouldCollapse = booleanPreference("agentWorkbenchAutoCollapsePanes", true)
          && rawNext <= collapseThreshold;
        handle.classList.toggle("collapse-ready", shouldCollapse);
        if (shouldCollapse !== liveCollapsed) {
          liveCollapsed = shouldCollapse;
          setCollapsed(liveCollapsed);
          document.body.classList.add("is-resizing");
        }
        if (shouldCollapse) return;
        const next = Math.max(min, Math.min(max, rawNext));
        root.style.setProperty(property, `${next}px`);
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        document.body.classList.remove("is-resizing");
        handle.classList.remove("collapse-ready");
        if (
          booleanPreference("agentWorkbenchAutoCollapsePanes", true)
          && rawNext <= collapseThreshold
        ) {
          if (!liveCollapsed) setCollapsed(true);
          scheduleActiveTerminalFits();
          return;
        }
        if (liveCollapsed) setCollapsed(false);
        const value = Number.parseFloat(getComputedStyle(root).getPropertyValue(property));
        if (booleanPreference("agentWorkbenchRememberWidths", true)) {
          localStorage.setItem(storageKey, String(Math.round(value)));
        }
        scheduleActiveTerminalFits();
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });

    let suppressTabClick = false;
    collapsedTab.addEventListener("click", (event) => {
      if (!suppressTabClick) return;
      suppressTabClick = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
    collapsedTab.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || !document.body.classList.contains(collapsedClass)) return;
      const startX = event.clientX;
      let dragging = false;

      const move = (moveEvent) => {
        const outwardDistance = (moveEvent.clientX - startX) * direction;
        if (!dragging && outwardDistance > 6) {
          dragging = true;
          suppressTabClick = true;
          setCollapsed(false);
          document.body.classList.add("is-resizing");
        }
        if (!dragging) return;
        moveEvent.preventDefault();
        const next = Math.max(min, Math.min(max, min + outwardDistance));
        root.style.setProperty(property, `${next}px`);
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        if (!dragging) return;
        document.body.classList.remove("is-resizing");
        setCollapsed(false);
        window.setTimeout(() => {
          suppressTabClick = false;
        }, 0);
        const value = Number.parseFloat(getComputedStyle(root).getPropertyValue(property));
        if (booleanPreference("agentWorkbenchRememberWidths", true)) {
          localStorage.setItem(storageKey, String(Math.round(value)));
        }
        scheduleActiveTerminalFits();
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
  };

  attach(fileResizeHandle, toggleFilesButton, "--files-width", "agentWorkbenchFilesWidth", 1, 170, 380, "files-collapsed", setFilesCollapsed);
  attach(artifactResizeHandle, toggleOutputButton, "--artifacts-width", "agentWorkbenchArtifactsWidth", -1, 200, 500, "output-collapsed", setOutputCollapsed);
}

function scheduleWorkspaceRefresh(payload) {
  if (payload.workspaceId !== activeWorkspaceId) return;
  if (payload.remoteSyncError) {
    console.warn("Legacy remote mirror failed:", payload.remoteSyncError);
  }
  clearTimeout(refreshTimer);
  const refreshWhenIdle = () => {
    const timeSinceInput = Date.now() - lastTerminalInputAt;
    if (timeSinceInput < 700) {
      refreshTimer = setTimeout(refreshWhenIdle, 700 - timeSinceInput);
      return;
    }
    refreshWorkspacePanels().catch(() => {});
  };
  refreshTimer = setTimeout(refreshWhenIdle, 900);
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
remoteStatusButton.addEventListener("click", () => {
  const workspace = activeWorkspace();
  openSshDialog(workspace?.type === "ssh" ? workspace.remote : null, false)
    .catch((error) => showToast(error.message || String(error)));
});
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
outputPathForm.addEventListener("submit", (event) => {
  event.preventDefault();
  previewPastedOutputPath();
});
toggleOutputButton.addEventListener("click", () => setOutputCollapsed(!document.body.classList.contains("output-collapsed")));
toggleArtifactListButton.addEventListener("click", () => setArtifactListCollapsed(!document.body.classList.contains("output-files-collapsed")));
closeOutputPanelButton.addEventListener("click", () => setOutputCollapsed(true));
closeOutputViewerButton.addEventListener("click", closeOutputViewer);
toggleFilesButton.addEventListener("click", () => setFilesCollapsed(!document.body.classList.contains("files-collapsed")));
sidebarViewToggleButton.addEventListener("click", () => {
  setSidebarView(currentSidebarView === "workspaces" ? "files" : "workspaces");
});
collapseFolderTreeButton.addEventListener("click", () => {
  expandedFilePaths.clear();
  renderFileTree();
});
fileTree.addEventListener("dragover", (event) => {
  if (!Array.from(event.dataTransfer?.types || []).includes("Files")) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  fileTree.classList.add("drop-active");
});
fileTree.addEventListener("dragleave", (event) => {
  if (!fileTree.contains(event.relatedTarget)) fileTree.classList.remove("drop-active");
});
fileTree.addEventListener("drop", (event) => importDroppedFiles(event, ""));
closeWorkspaceRemoveButton.addEventListener("click", closeWorkspaceRemoveDialog);
cancelWorkspaceRemoveButton.addEventListener("click", closeWorkspaceRemoveDialog);
confirmWorkspaceRemoveButton.addEventListener("click", confirmWorkspaceRemoval);
workspaceRemoveBackdrop.addEventListener("click", (event) => {
  if (event.target === workspaceRemoveBackdrop) closeWorkspaceRemoveDialog();
});
newFileButton.addEventListener("click", () => beginCreateWorkspaceEntry("file"));
newFolderButton.addEventListener("click", () => beginCreateWorkspaceEntry("folder"));
openChromeButton.addEventListener("click", () => openApplicationShortcut("chrome", "Google Chrome"));
openOpenleafButton.addEventListener("click", () => openApplicationShortcut("openleaf", "Openleaf"));
spotifyOpenButton.addEventListener("click", () => openApplicationShortcut("spotify", "Spotify"));
openCodeButton.addEventListener("click", async () => {
  if (activeWorkspaceId) await api.openInCode(activeWorkspaceId);
});
openNotepadButton.addEventListener("click", () => openNotepad().catch((error) => showToast(error.message || String(error))));
closeNotepadButton.addEventListener("click", () => closeNotepad());
notepadBackdrop.addEventListener("click", (event) => {
  if (event.target === notepadBackdrop) closeNotepad();
});
notepadText.addEventListener("input", queueNotepadSave);
notepadSectionButtons.forEach((button) => button.addEventListener("click", () => {
  notepadActiveSection = button.dataset.notepadSection;
  notepadSectionButtons.forEach((item) => item.classList.toggle("active", item === button));
  for (const [name, section] of Object.entries(notepadSections)) {
    section.hidden = name !== notepadActiveSection;
  }
  if (notepadActiveSection === "sketch") requestAnimationFrame(() => notepadSketchCanvas.focus());
}));
notepadTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = notepadTodoInput.value.trim();
  if (!text) return;
  notepadTodos.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, done: false });
  notepadTodoInput.value = "";
  renderNotepadTodos();
  queueNotepadSave();
});
notepadSketchCanvas.addEventListener("pointerdown", (event) => {
  rememberSketchState();
  notepadSketchDrawing = true;
  notepadSketchCanvas.focus();
  notepadSketchCanvas.setPointerCapture(event.pointerId);
  const bounds = notepadSketchCanvas.getBoundingClientRect();
  notepadSketchLastPoint = {
    x: (event.clientX - bounds.left) * notepadSketchCanvas.width / bounds.width,
    y: (event.clientY - bounds.top) * notepadSketchCanvas.height / bounds.height
  };
});
notepadSketchCanvas.addEventListener("pointermove", (event) => {
  if (!notepadSketchDrawing || !notepadSketchLastPoint) return;
  const bounds = notepadSketchCanvas.getBoundingClientRect();
  const next = {
    x: (event.clientX - bounds.left) * notepadSketchCanvas.width / bounds.width,
    y: (event.clientY - bounds.top) * notepadSketchCanvas.height / bounds.height
  };
  const context = notepadSketchCanvas.getContext("2d");
  context.globalCompositeOperation = notepadSketchTool === "eraser" ? "destination-out" : "source-over";
  context.strokeStyle = notepadSketchColor.value;
  context.lineWidth = Number(notepadSketchSize.value) * notepadSketchCanvas.width / bounds.width;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(notepadSketchLastPoint.x, notepadSketchLastPoint.y);
  context.lineTo(next.x, next.y);
  context.stroke();
  notepadSketchLastPoint = next;
});
const finishNotepadStroke = () => {
  if (notepadSketchDrawing) queueNotepadSave();
  notepadSketchDrawing = false;
  notepadSketchLastPoint = null;
};
notepadSketchCanvas.addEventListener("pointerup", finishNotepadStroke);
notepadSketchCanvas.addEventListener("pointercancel", finishNotepadStroke);
notepadSketchClear.addEventListener("click", () => {
  rememberSketchState();
  notepadSketchCanvas.getContext("2d").clearRect(0, 0, notepadSketchCanvas.width, notepadSketchCanvas.height);
  queueNotepadSave();
});
notepadSketchPen.addEventListener("click", () => setNotepadSketchTool("pen"));
notepadSketchEraser.addEventListener("click", () => setNotepadSketchTool("eraser"));
notepadSketchSwatches.forEach((swatch) => {
  swatch.addEventListener("click", () => selectNotepadSketchColor(swatch.dataset.sketchColor));
});
notepadSketchColor.addEventListener("input", () => selectNotepadSketchColor(notepadSketchColor.value));
notepadSketchSize.addEventListener("input", () => {
  notepadSketchSizeOutput.value = `${notepadSketchSize.value} px`;
});
notepadSketchUndo.addEventListener("click", () => undoNotepadSketch());
notepadSketchRedo.addEventListener("click", () => redoNotepadSketch());
window.addEventListener("keydown", (event) => {
  if (
    notepadBackdrop.hidden
    || notepadActiveSection !== "sketch"
    || !event.metaKey
    || event.altKey
    || event.key.toLowerCase() !== "z"
  ) return;
  event.preventDefault();
  if (event.shiftKey) {
    redoNotepadSketch();
  } else {
    undoNotepadSketch();
  }
});
cinematicModeButton.addEventListener("click", () => setCinematicMode(!cinematicModeEnabled));
cinematicExitButton.addEventListener("click", () => setCinematicMode(false));
cinematicNextSceneButton.addEventListener("click", selectNextSceneTheme);
agentGrid.addEventListener("pointerdown", beginCinematicPaneResize);
window.addEventListener("pointermove", updateCinematicPaneResize);
window.addEventListener("pointerup", finishCinematicPaneResize);
window.addEventListener("pointercancel", finishCinematicPaneResize);
window.addEventListener("resize", handleWindowResize);
pixelModeButton.addEventListener("click", () => {
  if (!pixelModeEnabled && cinematicModeEnabled) setCinematicMode(false);
  setPixelMode(!pixelModeEnabled);
});
pixelExitButton.addEventListener("click", () => setPixelMode(false));
globalZenButton.addEventListener("click", () => setGlobalCleanMode(!globalCleanMode));
cinematicPromptDock.addEventListener("submit", (event) => {
  event.preventDefault();
  submitCinematicPrompt();
});
cinematicResultsButton.addEventListener("click", async () => {
  if (activeOutputArtifact) {
    outputViewer.hidden = false;
    document.querySelector(".agent-stage").classList.add("output-viewer-active");
    return;
  }
  const latest = artifacts[0] || openedOutputPaths.find((entry) => entry.workspaceId === activeWorkspaceId);
  if (latest?.relativePath) {
    await previewWorkspaceFile(activeWorkspaceId, latest.relativePath);
    return;
  }
  setOutputCollapsed(false);
  showToast("No generated results yet.");
});
cinematicPromptInput.addEventListener("input", () => {
  cinematicMentionIndex = 0;
  renderCinematicMentionMenu();
});
cinematicPromptInput.addEventListener("focus", renderCinematicMentionMenu);
cinematicPromptInput.addEventListener("blur", () => {
  setTimeout(() => {
    if (
      document.activeElement !== cinematicPromptInput
      && !cinematicMentionMenu.matches(":hover")
    ) {
      closeCinematicMentionMenu();
    }
  }, 120);
});
cinematicPromptInput.addEventListener("keydown", (event) => {
  if (cinematicMentionMenu.hidden) return;
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    cinematicMentionIndex = (
      cinematicMentionIndex
      + direction
      + cinematicMentionChoicesState.length
    ) % cinematicMentionChoicesState.length;
    renderCinematicMentionMenu();
    return;
  }
  if (event.key === "Enter" || event.key === "Tab") {
    event.preventDefault();
    insertCinematicMention();
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    closeCinematicMentionMenu();
  }
});
cinematicMentionMenu.addEventListener("pointerdown", (event) => {
  const button = event.target.closest(".cinematic-mention-choice");
  if (!button) return;
  event.preventDefault();
  insertCinematicMention(Number(button.dataset.mentionIndex));
});
cinematicMentionMenu.addEventListener("pointermove", (event) => {
  const button = event.target.closest(".cinematic-mention-choice");
  if (!button) return;
  const nextIndex = Number(button.dataset.mentionIndex);
  if (!Number.isInteger(nextIndex) || nextIndex === cinematicMentionIndex) return;
  cinematicMentionIndex = nextIndex;
  cinematicMentionMenu.querySelectorAll(".cinematic-mention-choice").forEach((choice, index) => {
    choice.setAttribute("aria-selected", String(index === cinematicMentionIndex));
  });
});
sceneThemeOptions.forEach((option) => {
  option.addEventListener("click", () => selectSceneTheme(option.dataset.sceneTheme));
});
pixelAgentClipboardButton.addEventListener("click", () => {
  setPixelAgentClipboard(pixelAgentClipboard.hidden);
});
pixelSkyToggleButton.addEventListener("click", togglePixelSkyPhase);
pixelSkyToggleButton.addEventListener("dblclick", () => {
  pixelSkyManualPhase = null;
  applyPixelSkyPhase();
  showToast("Tower sky follows local time.");
});
closePixelAgentClipboardButton.addEventListener("click", () => setPixelAgentClipboard(false));
closePixelAgentDetailButton.addEventListener("click", closePixelAgentDetail);
closePixelPetDetailButton.addEventListener("click", closePixelPetDetail);
pixelFloorLauncherButtons.forEach((button) => {
  button.addEventListener("click", () => startPixelFloorAgent(button.dataset.agentKind));
});
pixelFloorTaskInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
  event.preventDefault();
  event.stopPropagation();
  const defaultKind = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
  startPixelFloorAgent(["codex", "claude", "shell"].includes(defaultKind) ? defaultKind : "codex");
});
pixelAgentDetailSendButton.addEventListener("click", sendPixelAgentDetailInstruction);
pixelAgentDetailPrompt.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
  event.preventDefault();
  event.stopPropagation();
  sendPixelAgentDetailInstruction();
});
pixelAgentDetailStatusButton.addEventListener("click", () => {
  const session = sessions.get(selectedPixelDetailAgentId);
  if (session) askAgentsForStatus(session);
});
pixelAgentDetailInterruptButton.addEventListener("click", () => {
  const session = sessions.get(selectedPixelDetailAgentId);
  if (session) interruptAgentSession(session);
});
pixelAgentDetailTerminalButton.addEventListener("click", () => {
  const session = sessions.get(selectedPixelDetailAgentId);
  if (session) focusAgentWindow(session.slotIndex);
});
pixelRefreshButton.addEventListener("click", () => refreshPixelView());
pixelAddFloorButton.addEventListener("click", addPixelFloor);
pixelDeleteFloorButton.addEventListener("click", deletePixelFloor);
runPauseAllButton.addEventListener("click", toggleRunPauseAll);
quickAddAgentButton.addEventListener("click", () => {
  const kind = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
  startFromToolbar(["codex", "claude", "shell"].includes(kind) ? kind : "codex");
});
stopAllAgentsButton.addEventListener("click", stopAllAgents);
retryFailedAgentsButton.addEventListener("click", retryFailedAgents);
askStatusButton.addEventListener("click", () => askAgentsForStatus());
focusModeButton.addEventListener("click", toggleFocusMode);
initializePixelFloors();
setGlobalCleanMode(globalCleanMode, { persist: false });
spotifyPreviousButton.addEventListener("click", () => controlSpotify("previous"));
spotifyPlayPauseButton.addEventListener("click", () => controlSpotify("playpause"));
spotifyNextButton.addEventListener("click", () => controlSpotify("next"));
spotifyShuffleButton.addEventListener("click", () => controlSpotify("shuffle"));
spotifyArtwork.addEventListener("error", () => {
  spotifyArtwork.hidden = true;
});
notificationButton.addEventListener("click", () => {
  setNotificationPanel(notificationPanel.hidden);
});
notificationButton.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  event.stopPropagation();
  clearAgentNotifications();
  setNotificationPanel(false);
});
titlebarTime.addEventListener("click", (event) => {
  event.stopPropagation();
  const today = new Date();
  calendarCursor = new Date(today.getFullYear(), today.getMonth(), 1);
  renderCalendar(calendarCursor, today);
  calendarPopover.hidden = !calendarPopover.hidden;
});
calendarPreviousMonth.addEventListener("click", (event) => {
  event.stopPropagation();
  renderCalendar(new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1));
});
calendarNextMonth.addEventListener("click", (event) => {
  event.stopPropagation();
  renderCalendar(new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1));
});
openSettingsButton.addEventListener("click", openSettings);
homeButton.addEventListener("click", () => setHomeView(homeView.hidden));
workspaceBackButton.addEventListener("click", () => setHomeView(true));
workspaceForwardButton.addEventListener("click", async () => {
  const recentId = localStorage.getItem("agentWorkbenchLastWorkspace");
  if (recentId && workspaces.some((workspace) => workspace.id === recentId)) {
    activeWorkspaceId = recentId;
    localStorage.setItem("agentWorkbenchActiveWorkspace", recentId);
    await loadWorkspaces();
  }
  setHomeView(false);
});
homeAddWorkspaceButton.addEventListener("click", () => {
  setHomeView(false);
  setWorkspaceAddMenu(true);
});
homeCommandPaletteButton.addEventListener("click", () => {
  setHomeView(false);
  openCommandPalette();
});
homeReturnWorkspaceButton.addEventListener("click", () => setHomeView(false));
closeSettingsButton.addEventListener("click", closeSettings);
settingsResetDefaultsButton.addEventListener("click", resetWorkbenchSettings);
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
settingsRememberWidths.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchRememberWidths", settingsRememberWidths.checked ? "1" : "0");
});
settingsAutoCollapsePanes.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchAutoCollapsePanes", settingsAutoCollapsePanes.checked ? "1" : "0");
});
settingsCompactTabs.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchCompactTabs", settingsCompactTabs.checked ? "1" : "0");
  applyWorkbenchPreferences();
});
settingsShowTabEtas.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchShowTabEtas", settingsShowTabEtas.checked ? "1" : "0");
  applyWorkbenchPreferences();
  updateAgentEta();
});
settingsDefaultAgent.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchDefaultAgent", settingsDefaultAgent.value);
});
settingsDefaultZen.addEventListener("change", () => {
  setGlobalCleanMode(settingsDefaultZen.checked);
});
settingsAutoPreview.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchAutoPreview", settingsAutoPreview.checked ? "1" : "0");
});
settingsAgentNotifications.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchAgentNotifications", settingsAgentNotifications.checked ? "1" : "0");
});
settingsRecentFilesLimit.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchRecentFilesLimit", settingsRecentFilesLimit.value);
  applyWorkbenchPreferences();
});
settingsPixelPets.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchPixelPets", settingsPixelPets.checked ? "1" : "0");
  settingsPixelPetChoice.disabled = !settingsPixelPets.checked;
  syncPixelMode(true);
  pixelPreviewRefreshNeeded = true;
  schedulePixelPreviewRefresh(260, { all: true });
});
settingsPixelPetChoice.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchPixelPetChoice", settingsPixelPetChoice.value);
  syncPixelMode(true);
  pixelPreviewRefreshNeeded = true;
  schedulePixelPreviewRefresh(260, { all: true });
});
settingsPixelStatusLabels.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchPixelStatusLabels", settingsPixelStatusLabels.checked ? "1" : "0");
  applyWorkbenchPreferences();
});
settingsTerminalFontSize.addEventListener("input", () => {
  localStorage.setItem("agentWorkbenchTerminalFontSize", settingsTerminalFontSize.value);
  applyTerminalPreferences();
});
settingsTerminalLineHeight.addEventListener("input", () => {
  localStorage.setItem("agentWorkbenchTerminalLineHeight", settingsTerminalLineHeight.value);
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
settingsMusicReactive.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchMusicReactive", settingsMusicReactive.checked ? "1" : "0");
  syncSceneBackgroundPlayback();
});
settingsCinematicEffectStrength.addEventListener("input", () => {
  localStorage.setItem("agentWorkbenchCinematicEffectStrength", settingsCinematicEffectStrength.value);
  applyWorkbenchPreferences();
});
settingsCinematicPanelOpacity.addEventListener("input", () => {
  localStorage.setItem("agentWorkbenchCinematicPanelOpacity", settingsCinematicPanelOpacity.value);
  applyWorkbenchPreferences();
});
settingsSceneFrameRate.addEventListener("change", () => {
  localStorage.setItem("agentWorkbenchSceneFrameRate", settingsSceneFrameRate.value);
  syncSceneBackgroundPlayback();
});
function syncProfileSettings() {
  const name = settingsProfileNameInput.value.trim() || "Alex";
  localStorage.setItem("agentWorkbenchProfileName", name);
  localStorage.setItem("agentWorkbenchProfileRole", settingsProfileRoleInput.value.trim());
  localStorage.setItem("agentWorkbenchProfileFocus", settingsProfileFocusInput.value.trim());
  settingsProfileName.textContent = name;
}
[settingsProfileNameInput, settingsProfileRoleInput, settingsProfileFocusInput].forEach((input) => {
  input.addEventListener("input", syncProfileSettings);
});
settingsCycleProfileAvatar.addEventListener("click", () => {
  const next = (numericPreference("agentWorkbenchProfileAvatar", 0, 0, 5) + 1) % 6;
  localStorage.setItem("agentWorkbenchProfileAvatar", String(next));
  settingsProfileAvatar.src = `assets/agent-face-${next}.png`;
});
document.addEventListener("visibilitychange", syncSceneBackgroundPlayback);
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
  const recent = sshConnectionHistory.find((connection) =>
    connection.host === target.host && (!target.user || connection.user === target.user)
  );
  if (recent) setSshFields(recent);
  else {
    if (target.user) sshUserInput.value = target.user;
    sshHostInput.value = target.host;
    renderSshRecentFolders();
  }
});
sshUserInput.addEventListener("input", renderSshRecentFolders);
sshHostInput.addEventListener("input", renderSshRecentFolders);
sshModalBackdrop.addEventListener("click", (event) => {
  if (event.target === sshModalBackdrop) closeSshDialog(true);
});
document.addEventListener("click", (event) => {
  if (!calendarPopover.hidden && !calendarPopover.contains(event.target) && event.target !== titlebarTime) {
    calendarPopover.hidden = true;
  }
  if (!workspaceAddMenu.contains(event.target) && event.target !== addWorkspaceButton) setWorkspaceAddMenu(false);
  if (
    pixelModeEnabled &&
    !pixelAgentClipboard.hidden &&
    !pixelAgentClipboard.contains(event.target) &&
    !pixelAgentClipboardButton.contains(event.target)
  ) {
    setPixelAgentClipboard(false);
  }
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
    warmPixelView();
    return;
  }
  if (message.type === "floorPreview") {
    setPixelFloorPreview(message.floor, message.image);
    return;
  }
  if (message.type === "pixelPetSelected") {
    openPixelPetDetail(message.pet, message.floor, message.anchor);
    return;
  }
  if (message.type === "pixelRoomState") {
    const floor = Math.max(1, Math.min(pixelFloorCount, Number(message.floor) || activePixelFloor));
    pixelRoomStates.set(floor, {
      agents: Array.isArray(message.agents) ? message.agents : [],
      pets: Array.isArray(message.pets) ? message.pets : []
    });
    const button = pixelFloorButtons.find((candidate) => Number(candidate.dataset.pixelFloor) === floor);
    if (button) decoratePixelFloorButton(button);
    return;
  }
  if (message.type === "launchAgent") {
    const kind = localStorage.getItem("agentWorkbenchDefaultAgent") || "codex";
    startFromToolbar(["codex", "claude", "shell"].includes(kind) ? kind : "codex");
    return;
  }
  if (message.type === "focusAgent") {
    const session = activePixelSessions().find((candidate) => candidate.slotIndex + 1 === Number(message.id));
    if (session) openPixelAgentDetail(session);
    return;
  }
  if (message.type === "closeAgent") {
    const session = activePixelSessions().find((candidate) => candidate.slotIndex + 1 === Number(message.id));
    if (session) stopAgent(session.id);
    return;
  }
  if (message.type === "saveLayout" && message.layout) {
    localStorage.setItem(`agentWorkbenchPixelLayout:${activePixelFloor}`, JSON.stringify(message.layout));
    pixelPreviewRefreshNeeded = true;
    schedulePixelPreviewRefresh(110);
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
    session.modelDetectionBuffer = `${session.modelDetectionBuffer || ""}${data}`.slice(-600);
    const runtimeModel = session.kind === "codex"
      ? runtimeModelFromTerminal(session.modelDetectionBuffer)
      : "";
    if (runtimeModel && runtimeModel !== session.runtimeModel) {
      session.runtimeModel = runtimeModel;
      updateAgentStatusCard(session);
    }
    queueTerminalOutput(session, data);
  } else {
    const pending = pendingTerminalData.get(id) || [];
    pending.push(data);
    pendingTerminalData.set(id, pending);
  }
});
api.onAgentExit(({ id, code, signal }) => {
  const session = sessions.get(id);
  if (!session) return;
  session.exited = true;
  const previousStatus = session.metadata.status || "";
  const finalStatus = code === 0 && !signal ? "done" : "error";
  session.metadata.status = finalStatus;
  session.metadata.state = finalStatus === "done" ? "complete" : "failed";
  session.metadata.progressPercent = finalStatus === "done" ? 100 : Number(session.metadata.progressPercent) || 0;
  session.metadata.etaMinutes = 0;
  session.etaPaused = false;
  session.etaPausedSeconds = null;
  session.etaDeadline = null;
  queueTerminalOutput(
    session,
    `\r\n\x1b[38;5;244m[process exited: ${signal || code || 0}]\x1b[0m\r\n`
  );
  session.reconnectBanner.hidden = !(session.descriptor?.remote && finalStatus === "error");
  updateAgentStatusCard(session);
  if (finalStatus === "error" && !session.notifiedFailure) {
    session.notifiedFailure = true;
    recordAgentNotification(
      session,
      "failed",
      `${session.metadata.name || `Agent ${session.slotIndex + 1}`} failed`,
      session.metadata.tldr || "The agent process exited with an error."
    );
    showToast(`Agent ${session.slotIndex + 1} failed`);
  }
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

api.onWindowFullScreen((active) => {
  document.body.classList.toggle("window-full-screen", active);
});
api.onWorkspaceChanged(scheduleWorkspaceRefresh);
api.onWorkspaceMenuAction(async (payload) => {
  if (!payload || payload.workspaceId !== activeWorkspaceId) return;
  if (payload.action === "error") {
    showToast(payload.message || "File action failed");
    return;
  }
  if (payload.action === "duplicated") {
    selectedFilePath = payload.relativePath || "";
    selectedFileKind = payload.isDirectory ? "directory" : "file";
    await refreshWorkspacePanels();
    showToast(`Duplicated ${payload.name || "item"}`);
    return;
  }
  if (payload.action === "new-file" || payload.action === "new-folder") {
    selectedFilePath = payload.parentPath || "";
    selectedFileKind = "directory";
    beginCreateWorkspaceEntry(payload.action === "new-folder" ? "folder" : "file");
    return;
  }
  if (payload.action === "rename") {
    const currentName = String(payload.relativePath || "").split("/").pop();
    const nextName = window.prompt("Rename", currentName);
    if (!nextName || nextName.trim() === currentName) return;
    try {
      const renamed = await api.renameWorkspaceEntry(
        activeWorkspaceId,
        payload.relativePath,
        nextName.trim()
      );
      selectedFilePath = renamed.relativePath;
      selectedFileKind = payload.isDirectory ? "directory" : "file";
      await refreshWorkspacePanels();
      showToast(`Renamed to ${renamed.name}`);
    } catch (error) {
      showToast(error.message || String(error));
    }
  }
});

window.addEventListener("keydown", (event) => {
  const editableTarget = event.target instanceof Element
    && Boolean(event.target.closest("input, textarea, select, [contenteditable='true']"));
  if (
    !homeView.hidden
    && (event.metaKey || event.ctrlKey)
    && !event.shiftKey
    && !event.altKey
    && event.key.toLowerCase() === "o"
  ) {
    event.preventDefault();
    homeAddWorkspaceButton.click();
    return;
  }
  if (
    pixelModeEnabled
    && !editableTarget
    && !event.metaKey
    && !event.ctrlKey
    && !event.altKey
    && !event.shiftKey
    && (event.key === "ArrowUp" || event.key === "ArrowDown")
    && settingsOverlay.hidden
    && notepadBackdrop.hidden
  ) {
    event.preventDefault();
    traversePixelTower(event.key === "ArrowUp" ? 1 : -1);
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.code === "Space") {
    event.preventDefault();
    toggleRunPauseAll();
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "r") {
    event.preventDefault();
    retryFailedAgents();
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "a") {
    event.preventDefault();
    askAgentsForStatus();
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "f") {
    event.preventDefault();
    toggleFocusMode();
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.altKey && event.key.toLowerCase() === "z") {
    event.preventDefault();
    setGlobalCleanMode(!globalCleanMode);
    return;
  }
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
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    event.stopPropagation();
    setCinematicMode(true);
    requestAnimationFrame(() => {
      cinematicPromptInput.focus();
      cinematicPromptInput.select();
    });
    return;
  }
  if (event.key === "Escape") {
    if (!homeView.hidden) {
      event.preventDefault();
      setHomeView(false);
      return;
    }
    if (!notificationPanel.hidden) {
      setNotificationPanel(false);
      return;
    }
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
    if (cinematicModeEnabled) {
      event.preventDefault();
      setCinematicMode(false);
      return;
    }
    setWorkspaceAddMenu(false);
    for (const session of sessions.values()) session.actionMenu.hidden = true;
  }
});

window.addEventListener("beforeunload", () => {
  if (spotifyTimer) clearInterval(spotifyTimer);
  if (titlebarClockTimer) clearInterval(titlebarClockTimer);
  if (powerStatusTimer) clearInterval(powerStatusTimer);
  if (etaTimer) clearInterval(etaTimer);
  if (windowResizeFrame) cancelAnimationFrame(windowResizeFrame);
  if (windowResizeSettleTimer) clearTimeout(windowResizeSettleTimer);
  for (const session of sessions.values()) {
    session.cancelTerminalFit?.();
    session.observer.disconnect();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (notificationPanel.hidden || event.target.closest(".notification-control")) return;
  setNotificationPanel(false);
});

async function initialize() {
  buildAgentSlots();
  initializeSettings();
  initializeWorkbenchSettings();
  setFilesCollapsed(localStorage.getItem("agentWorkbenchFilesCollapsed") === "1");
  setOutputCollapsed(localStorage.getItem("agentWorkbenchOutputCollapsed") === "1");
  setArtifactListCollapsed(localStorage.getItem("agentWorkbenchOutputFilesCollapsed") === "1");
  setupPanelResizing();
  setSidebarView(localStorage.getItem("agentWorkbenchSidebarView") === "workspaces" ? "workspaces" : "files");
  renderNotificationBell();
  refreshTitlebarTime();
  titlebarClockTimer = setInterval(refreshTitlebarTime, 15000);
  powerStatusTimer = setInterval(() => refreshPowerStatus().catch(() => {}), 60000);
  etaTimer = setInterval(updateAgentEta, 1000);
  spotifyTimer = setInterval(refreshSpotifyStatus, 5000);
  setInterval(refreshUsage, 60000);
  restartSystemMetricsTimer();
  const initialPowerStatus = refreshPowerStatus().catch(() => {});
  const initialFullScreenStatus = api.getWindowFullScreen()
    .then((fullScreen) => document.body.classList.toggle("window-full-screen", fullScreen))
    .catch(() => {});
  await loadWorkspaces();
  if (!workspaces.length) setHomeView(true);
  // Workspaces always reopen in the dependable terminal view. Immersive modes
  // are explicit per-session choices and never hijack launch or Home.
  setPixelMode(false, { persist: false });
  setCinematicMode(false, { persist: false });
  refreshUsage();
  refreshSystemMetrics();
  refreshSpotifyStatus();
  await Promise.allSettled([initialPowerStatus, initialFullScreenStatus]);
}

initialize().catch((error) => {
  showToast(error.message || String(error));
  setFooter("Initialization failed");
});
