import assert from "node:assert/strict";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  ARTWORK_HEIGHT,
  ARTWORK_WIDTH,
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
  assertSafeGeneratedOutput,
  computeCoverCrop,
  generateCatalogJavaScript,
  hammingDistanceHex,
  hostnameAllowed,
  validateCuratedManifest
} from "../scripts/import-curated-artworks.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const institution = {
  name: "Museum fixture",
  sourceHosts: ["museum.example"],
  imageHosts: ["images.museum.example"],
  license: {
    status: "cc0",
    name: "CC0 fixture",
    url: "https://museum.example/open-access"
  }
};

const artwork = {
  id: "human-landscape",
  title: "A Human Landscape",
  label: "Human Landscape",
  artist: "Ada Painter",
  date: "1888",
  detail: "Ada Painter · 1888",
  alt: "A painted valley beneath a quiet sky.",
  humanMade: true,
  institution: "fixture",
  objectId: "object-42",
  accessionNumber: "1888.42",
  sourcePage: "https://museum.example/art/object-42",
  imageUrl: "https://images.museum.example/original/object-42.tif",
  expectedSourceSha256: "a".repeat(64),
  focalPoint: { x: 0.4, y: 0.6 },
  motion: "mist",
  colors: ["#102030", "#506070", "#d0e0f0"]
};

const manifest = {
  schemaVersion: 1,
  target: {
    width: ARTWORK_WIDTH,
    height: ARTWORK_HEIGHT,
    format: "webp",
    quality: 84,
    thumbnailWidth: THUMBNAIL_WIDTH,
    thumbnailHeight: THUMBNAIL_HEIGHT,
    thumbnailQuality: 76
  },
  institutions: { fixture: institution },
  artworks: [artwork]
};

const validated = validateCuratedManifest(manifest, { requirePinned: true });
assert.equal(validated.artworks.length, 1);
assert.equal(validated.artworks[0].asset, "human-landscape.webp");
assert.equal(validated.artworks[0].thumbnail, "thumbnails/human-landscape.webp");
assert.equal(validated.artworks[0].license.status, "cc0");

assert.equal(hostnameAllowed("cdn.images.museum.example", institution.imageHosts), true);
assert.equal(hostnameAllowed("museum.example.evil.test", institution.imageHosts), false);

assert.deepEqual(
  computeCoverCrop(4000, 2000, { x: 0.25, y: 0.5 }),
  { x: 111, y: 0, width: 3555, height: 2000 }
);
assert.deepEqual(
  computeCoverCrop(3000, 4000, { x: 0.5, y: 0.75 }),
  { x: 0, y: 1735, width: 3000, height: 1687 }
);
assert.throws(
  () => computeCoverCrop(2400, 1350),
  /cannot cover 2560 × 1440 without upscaling/
);

assert.equal(hammingDistanceHex("0000000000000000", "0000000000000000"), 0);
assert.equal(hammingDistanceHex("0000000000000000", "ffffffffffffffff"), 64);
assert.throws(() => assertSafeGeneratedOutput("/"), /Refusing to use broad output directory/);

assert.throws(
  () => validateCuratedManifest({
    ...manifest,
    artworks: [{ ...artwork, humanMade: false }]
  }),
  /humanMade must be true/
);
assert.throws(
  () => validateCuratedManifest({
    ...manifest,
    artworks: [{
      ...artwork,
      imageUrl: "https://unapproved.example/object-42.tif"
    }]
  }),
  /unapproved host/
);
assert.throws(
  () => validateCuratedManifest({
    ...manifest,
    artworks: [
      artwork,
      { ...artwork, id: "second-landscape", asset: "second-landscape.webp" }
    ]
  }),
  /Source page .* is duplicated/
);

const browserCatalog = generateCatalogJavaScript([{ id: "fixture", label: "</script>" }]);
assert.match(browserCatalog, /^window\.BSCODE_SCENE_CATALOG = /);
assert.doesNotMatch(browserCatalog, /<\/script>/);
assert.match(browserCatalog, /\\u003c\/script>/);

const dryRun = spawnSync(process.execPath, [
  "scripts/import-curated-artworks.mjs",
  "--manifest",
  "assets/scenes/curated-artworks.example.json",
  "--dry-run"
], {
  cwd: projectRoot,
  encoding: "utf8"
});
assert.equal(dryRun.status, 0, dryRun.stderr || dryRun.stdout);
assert.match(dryRun.stdout, /Validated 0 curated human-made artworks; no network or files used/);

console.log("✓ curated artwork importer validates provenance, crops, duplicates, thumbnails, and browser catalog");
