import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync
} from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SCENE_ROOT = join(ROOT, "assets", "scenes");
const VIDEO_ROOT = join(SCENE_ROOT, "videos");
const PIXABAY_LICENSE_URL = "https://pixabay.com/service/license-summary/";
const EXPECTED_IDS = [
  "blue-hour-lighthouse",
  "forest-pool",
  "mossy-cascade",
  "night-cabin",
  "sunrise-valley",
  "sunset-lake"
];
const VIDEO_EXTENSIONS = new Set([".m4v", ".mov", ".mp4", ".webm"]);
const IGNORED_DIRECTORIES = new Set([
  ".git",
  "dist",
  "node_modules",
  "out",
  "release"
]);

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function sorted(values) {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function assertSafeRelativeAssetPath(path, expectedExtension) {
  assert.equal(typeof path, "string");
  assert.ok(path.length > 0, "asset path must not be empty");
  assert.equal(isAbsolute(path), false, `${path} must be relative`);
  assert.equal(path.split(/[\\/]/u).includes(".."), false, `${path} must stay inside assets/scenes`);
  assert.equal(extname(path).toLowerCase(), expectedExtension);

  const absolutePath = resolve(SCENE_ROOT, path);
  assert.ok(
    absolutePath.startsWith(`${SCENE_ROOT}${sep}`),
    `${path} resolves outside assets/scenes`
  );
  assert.ok(existsSync(absolutePath), `${path} is missing`);
  assert.ok(statSync(absolutePath).isFile(), `${path} is not a file`);
  return absolutePath;
}

function walkVideoFiles(directory, output = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      walkVideoFiles(path, output);
    } else if (entry.isFile() && VIDEO_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      output.push(path);
    }
  }
  return output;
}

function rationalToNumber(value) {
  const [numerator, denominator = "1"] = String(value).split("/");
  return Number(numerator) / Number(denominator);
}

const manifest = readJson(join(SCENE_ROOT, "curated-videos.json"));
const catalog = readJson(join(SCENE_ROOT, "catalog.json"));
const manifestVideos = manifest.videos;
const catalogVideos = catalog.filter((scene) => scene.mediaType === "video");

assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.provider?.name, "Pixabay");
assert.equal(manifest.provider?.licenseName, "Pixabay Content License");
assert.equal(manifest.provider?.licenseUrl, PIXABAY_LICENSE_URL);
assert.deepEqual(sorted(manifestVideos.map(({ id }) => id)), EXPECTED_IDS);
assert.deepEqual(sorted(catalogVideos.map(({ id }) => id)), EXPECTED_IDS);
assert.equal(new Set(catalog.map(({ id }) => id)).size, catalog.length, "catalog IDs must be unique");

const catalogById = new Map(catalogVideos.map((scene) => [scene.id, scene]));
const expectedDerivativeVideoNames = [];
const sourceHashes = new Set();
const sourceFilenames = new Set();
let totalVideoBytes = 0;

for (const video of manifestVideos) {
  const scene = catalogById.get(video.id);
  assert.ok(scene, `${video.id} is missing from catalog.json`);

  assert.equal(video.review?.humanMade, true, `${video.id} must be reviewed as human-made`);
  assert.equal(video.review?.aiGenerated, false, `${video.id} must be reviewed as non-AI`);
  assert.equal(scene.humanMade, true, `${video.id} catalog entry must be human-made`);
  assert.equal(scene.aiGenerated, false, `${video.id} catalog entry must be non-AI`);
  assert.equal(scene.institution, "Pixabay");

  assert.equal(video.licenseName, "Pixabay Content License");
  assert.equal(video.licenseUrl, PIXABAY_LICENSE_URL);
  assert.equal(scene.license, video.licenseName);
  assert.equal(scene.licenseUrl, video.licenseUrl);
  assert.equal(scene.rightsStatus, "pixabay-content-license");
  assert.match(video.sourcePage, /^https:\/\/pixabay\.com\/videos\/[a-z0-9-]+\/$/u);
  assert.match(video.sourceCdnUrl, /^https:\/\/cdn\.pixabay\.com\/video\/.+\.mp4$/u);
  assert.equal(scene.source, video.sourcePage);
  assert.equal(scene.sourceAsset, video.sourceCdnUrl);
  assert.equal(scene.sourceSha256, video.sourceSha256);

  assert.equal(scene.asset, video.output.asset);
  assert.equal(scene.poster, video.output.poster);
  assert.equal(scene.thumbnail, video.output.thumbnail);

  const videoPath = assertSafeRelativeAssetPath(video.output.asset, ".mp4");
  const posterPath = assertSafeRelativeAssetPath(video.output.poster, ".webp");
  const thumbnailPath = assertSafeRelativeAssetPath(video.output.thumbnail, ".webp");
  assert.equal(sha256(videoPath), scene.sha256, `${video.id} MP4 SHA-256 mismatch`);
  assert.equal(sha256(posterPath), scene.posterSha256, `${video.id} poster SHA-256 mismatch`);
  assert.equal(
    sha256(thumbnailPath),
    scene.thumbnailSha256,
    `${video.id} thumbnail SHA-256 mismatch`
  );

  assert.equal(scene.width, 1280);
  assert.equal(scene.height, 720);
  assert.equal(scene.frameRate, 24);
  assert.equal(video.derivative?.width, scene.width);
  assert.equal(video.derivative?.height, scene.height);
  assert.equal(video.derivative?.frameRate, scene.frameRate);
  assert.equal(video.derivative?.container, "mp4");
  assert.equal(video.derivative?.videoCodec, "h264");
  assert.equal(video.derivative?.audio, "stripped");

  expectedDerivativeVideoNames.push(video.output.asset.replace(/^videos\//u, ""));
  sourceHashes.add(video.sourceSha256);
  sourceFilenames.add(new URL(video.sourceCdnUrl).pathname.split("/").at(-1));
  totalVideoBytes += statSync(videoPath).size;
}

assert.ok(
  totalVideoBytes < 32 * 1024 * 1024,
  `curated scene videos total ${(totalVideoBytes / 1024 / 1024).toFixed(2)} MiB (limit: 32 MiB)`
);
assert.deepEqual(
  sorted(readdirSync(VIDEO_ROOT).filter((name) => !name.startsWith("."))),
  sorted(expectedDerivativeVideoNames),
  "assets/scenes/videos must contain only the six curated derivatives"
);

const repoVideoFiles = walkVideoFiles(ROOT);
for (const path of repoVideoFiles) {
  assert.equal(
    sourceFilenames.has(path.split(sep).at(-1)),
    false,
    `original Pixabay source video is present in the repo: ${relative(ROOT, path)}`
  );
  assert.equal(
    sourceHashes.has(sha256(path)),
    false,
    `original Pixabay source bytes are present in the repo: ${relative(ROOT, path)}`
  );
}

const ffprobeAvailable =
  spawnSync("ffprobe", ["-version"], { encoding: "utf8", stdio: "pipe" }).status === 0;

if (ffprobeAvailable) {
  for (const video of manifestVideos) {
    const scene = catalogById.get(video.id);
    const videoPath = join(SCENE_ROOT, video.output.asset);
    const probe = JSON.parse(
      execFileSync(
        "ffprobe",
        [
          "-v",
          "error",
          "-show_entries",
          "stream=codec_type,codec_name,width,height,avg_frame_rate,r_frame_rate:format=format_name,duration",
          "-of",
          "json",
          videoPath
        ],
        { encoding: "utf8" }
      )
    );
    const videoStreams = probe.streams.filter(({ codec_type }) => codec_type === "video");
    const audioStreams = probe.streams.filter(({ codec_type }) => codec_type === "audio");

    assert.equal(videoStreams.length, 1, `${video.id} must have exactly one video stream`);
    assert.equal(audioStreams.length, 0, `${video.id} must not contain audio`);
    assert.equal(videoStreams[0].codec_name, "h264", `${video.id} must use H.264`);
    assert.equal(videoStreams[0].width, 1280, `${video.id} width must be 1280`);
    assert.equal(videoStreams[0].height, 720, `${video.id} height must be 720`);
    assert.ok(
      Math.abs(rationalToNumber(videoStreams[0].avg_frame_rate) - 24) < 0.001,
      `${video.id} average frame rate must be 24 fps`
    );
    assert.match(probe.format.format_name, /(?:^|,)mp4(?:,|$)/u, `${video.id} must be MP4`);
    assert.ok(
      Math.abs(Number(probe.format.duration) - scene.durationSeconds) <= 0.15,
      `${video.id} duration differs from catalog by more than 0.15s`
    );
  }
} else {
  console.warn("ffprobe unavailable; skipped codec, dimension, frame-rate, audio, and duration checks.");
}

console.log(
  `Validated ${manifestVideos.length} curated scene videos ` +
    `(${(totalVideoBytes / 1024 / 1024).toFixed(2)} MiB${ffprobeAvailable ? ", ffprobe metadata verified" : ""}).`
);
