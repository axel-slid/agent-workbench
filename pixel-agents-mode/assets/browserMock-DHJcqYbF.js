const CHARACTER_DIRECTIONS = ["down", "up", "right"];
const PET_FRAME_HEIGHT = 32;
const PET_FRAME_WIDTH = 16;
const PET_SIDE_FRAME_WIDTH = 32;

let mockPayload = null;

function rgbaToHex(red, green, blue, alpha) {
  if (alpha < 2) return "";
  const rgb = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`.toUpperCase();
  return alpha >= 255 ? rgb : `${rgb}${alpha.toString(16).padStart(2, "0").toUpperCase()}`;
}

function getPixel(png, x, y) {
  const offset = (y * png.width + x) * 4;
  return [
    png.data[offset],
    png.data[offset + 1],
    png.data[offset + 2],
    png.data[offset + 3],
  ];
}

function readSprite(png, width, height, offsetX = 0, offsetY = 0) {
  const sprite = [];
  for (let y = 0; y < height; y += 1) {
    const row = [];
    for (let x = 0; x < width; x += 1) {
      row.push(rgbaToHex(...getPixel(png, offsetX + x, offsetY + y)));
    }
    sprite.push(row);
  }
  return sprite;
}

// Official Pixel Agents pets use three 32px cells on the last row. Several
// community pets pack those same three poses more tightly, so a fixed crop can
// include the end of one pose and the start of the next. Detect the three
// visible silhouettes and normalize only the non-standard atlases back to the
// 32px runtime contract.
function petSideColumnRuns(png) {
  const occupied = [];
  for (let x = 0; x < png.width; x += 1) {
    let hasPixel = false;
    for (let y = PET_FRAME_HEIGHT * 2; y < PET_FRAME_HEIGHT * 3; y += 1) {
      if (getPixel(png, x, y)[3] >= 2) {
        hasPixel = true;
        break;
      }
    }
    occupied.push(hasPixel);
  }

  const runs = [];
  let start = -1;
  for (let x = 0; x <= occupied.length; x += 1) {
    if (occupied[x] && start < 0) start = x;
    if ((!occupied[x] || x === occupied.length) && start >= 0) {
      runs.push({ start, end: x - 1 });
      start = -1;
    }
  }
  return runs;
}

function normalizedPetSideFrame(png, run) {
  const width = run.end - run.start + 1;
  const source = readSprite(
    png,
    width,
    PET_FRAME_HEIGHT,
    run.start,
    PET_FRAME_HEIGHT * 2,
  );
  const frame = Array.from(
    { length: PET_FRAME_HEIGHT },
    () => Array(PET_SIDE_FRAME_WIDTH).fill(""),
  );
  const offsetX = Math.max(0, Math.floor((PET_SIDE_FRAME_WIDTH - width) / 2));
  for (let y = 0; y < PET_FRAME_HEIGHT; y += 1) {
    for (let x = 0; x < Math.min(width, PET_SIDE_FRAME_WIDTH); x += 1) {
      frame[y][offsetX + x] = source[y][x];
    }
  }
  return frame;
}

function petSideFrames(png) {
  const runs = petSideColumnRuns(png);
  const usesStandardCells = runs.length === 3 && runs.every(
    (run, frame) =>
      run.start >= frame * PET_SIDE_FRAME_WIDTH
      && run.end < (frame + 1) * PET_SIDE_FRAME_WIDTH,
  );

  if (runs.length === 3 && !usesStandardCells) {
    return runs.map((run) => normalizedPetSideFrame(png, run));
  }

  return Array.from({ length: 3 }, (_, frame) =>
    readSprite(
      png,
      PET_SIDE_FRAME_WIDTH,
      PET_FRAME_HEIGHT,
      frame * PET_SIDE_FRAME_WIDTH,
      PET_FRAME_HEIGHT * 2,
    ));
}

async function decodePng(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch PNG: ${url} (${response.status})`);
  const bitmap = await createImageBitmap(await response.blob());
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Failed to create 2d canvas context for PNG decode");
  }
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  return { width: canvas.width, height: canvas.height, data: image.data };
}

function indexedAssetPath(kind, value) {
  return value.startsWith(`${kind}/`) ? value : `${kind}/${value}`;
}

async function decodeCharacters(index) {
  const characters = [];
  for (const relativePath of index.characters) {
    const png = await decodePng(`./assets/${indexedAssetPath("characters", relativePath)}`);
    const directions = { down: [], up: [], right: [] };
    CHARACTER_DIRECTIONS.forEach((direction, directionIndex) => {
      for (let frame = 0; frame < 7; frame += 1) {
        directions[direction].push(readSprite(png, 16, 32, frame * 16, directionIndex * 32));
      }
    });
    characters.push(directions);
  }
  return characters;
}

async function decodeFloors(index) {
  const floors = [];
  for (const relativePath of index.floors) {
    const png = await decodePng(`./assets/${indexedAssetPath("floors", relativePath)}`);
    floors.push(readSprite(png, 16, 16));
  }
  return floors;
}

async function decodeWalls(index) {
  const wallSets = [];
  for (const relativePath of index.walls) {
    const png = await decodePng(`./assets/${indexedAssetPath("walls", relativePath)}`);
    const set = [];
    for (let mask = 0; mask < 16; mask += 1) {
      set.push(readSprite(png, 16, 32, (mask % 4) * 16, Math.floor(mask / 4) * 32));
    }
    wallSets.push(set);
  }
  return wallSets;
}

async function decodeCarpets(index) {
  const carpetSets = [];
  for (const relativePath of index.carpets || []) {
    const png = await decodePng(`./assets/${indexedAssetPath("carpets", relativePath)}`);
    const set = [];
    for (let mask = 0; mask < 16; mask += 1) {
      set.push(readSprite(png, 16, 16, (mask % 4) * 16, Math.floor(mask / 4) * 16));
    }
    carpetSets.push(set);
  }
  return carpetSets;
}

async function decodeFurniture(catalog) {
  const sprites = {};
  for (const item of catalog) {
    const png = await decodePng(`./assets/${item.furniturePath}`);
    sprites[item.id] = readSprite(png, item.width, item.height);
  }
  return sprites;
}

function petFrames(png) {
  const frames = {
    walkDown: [],
    idleDown: [],
    walkUp: [],
    idleUp: [],
    walkRight: [],
  };
  const sideFrames = petSideFrames(png);
  for (let frame = 0; frame < 3; frame += 1) {
    frames.walkDown.push(
      readSprite(png, PET_FRAME_WIDTH, PET_FRAME_HEIGHT, frame * PET_FRAME_WIDTH, 0),
    );
    frames.idleDown.push(
      readSprite(png, PET_FRAME_WIDTH, PET_FRAME_HEIGHT, (frame + 3) * PET_FRAME_WIDTH, 0),
    );
    frames.walkUp.push(
      readSprite(
        png,
        PET_FRAME_WIDTH,
        PET_FRAME_HEIGHT,
        frame * PET_FRAME_WIDTH,
        PET_FRAME_HEIGHT,
      ),
    );
    frames.idleUp.push(
      readSprite(
        png,
        PET_FRAME_WIDTH,
        PET_FRAME_HEIGHT,
        (frame + 3) * PET_FRAME_WIDTH,
        PET_FRAME_HEIGHT,
      ),
    );
    frames.walkRight.push(sideFrames[frame]);
  }
  return frames;
}

async function decodePets(index) {
  const pets = [];
  const petNames = [];
  for (const descriptor of index.pets || []) {
    const base = `./assets/pets/${descriptor.id}`;
    const [manifest, png] = await Promise.all([
      fetch(`${base}/manifest.json`).then((response) => response.json()),
      decodePng(`${base}/pet.png`),
    ]);
    if (png.width !== 96 || png.height !== 96) continue;
    pets.push(petFrames(png));
    petNames.push(manifest.name || descriptor.name || descriptor.id);
  }
  return { pets, petNames };
}

export async function initBrowserMock() {
  console.log("[BrowserMock] Loading the bundled Pixel Agents assets…");
  const [assetIndex, furnitureCatalog] = await Promise.all([
    fetch("./assets/asset-index.json").then((response) => response.json()),
    fetch("./assets/furniture-catalog.json").then((response) => response.json()),
  ]);
  const [
    characters,
    floorSprites,
    wallSets,
    carpetSets,
    furnitureSprites,
    petPayload,
    layout,
  ] = await Promise.all([
    decodeCharacters(assetIndex),
    decodeFloors(assetIndex),
    decodeWalls(assetIndex),
    decodeCarpets(assetIndex),
    decodeFurniture(furnitureCatalog),
    decodePets(assetIndex),
    assetIndex.defaultLayout
      ? fetch(`./assets/${assetIndex.defaultLayout}`).then((response) => response.json())
      : null,
  ]);
  mockPayload = {
    characters,
    floorSprites,
    wallSets,
    carpetSets,
    furnitureCatalog,
    furnitureSprites,
    pets: petPayload.pets,
    petNames: petPayload.petNames,
    layout,
  };
  console.log(
    `[BrowserMock] Ready — ${characters.length} agents, ${floorSprites.length} floors, ` +
      `${carpetSets.length} carpets, ${petPayload.pets.length} walking pets`,
  );
}

export function dispatchMockMessages() {
  if (!mockPayload) return;
  const dispatch = (data) => window.dispatchEvent(new MessageEvent("message", { data }));
  dispatch({ type: "characterSpritesLoaded", characters: mockPayload.characters });
  dispatch({ type: "petSpritesLoaded", pets: mockPayload.pets, petNames: mockPayload.petNames });
  dispatch({ type: "floorTilesLoaded", sprites: mockPayload.floorSprites });
  dispatch({ type: "wallTilesLoaded", sets: mockPayload.wallSets });
  dispatch({ type: "carpetTilesLoaded", sets: mockPayload.carpetSets });
  dispatch({
    type: "furnitureAssetsLoaded",
    catalog: mockPayload.furnitureCatalog,
    sprites: mockPayload.furnitureSprites,
  });
  dispatch({ type: "layoutLoaded", layout: mockPayload.layout });
  dispatch({
    type: "settingsLoaded",
    soundEnabled: false,
    extensionVersion: "1.4.0",
    lastSeenVersion: "1.4",
    hooksEnabled: false,
    hooksInfoShown: true,
    alwaysShowLabels: false,
  });
  console.log("[BrowserMock] Bundled assets dispatched");
}
