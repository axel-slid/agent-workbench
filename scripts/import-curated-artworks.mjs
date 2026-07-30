#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

export const ARTWORK_MANIFEST_SCHEMA_VERSION = 1;
export const ARTWORK_WIDTH = 2560;
export const ARTWORK_HEIGHT = 1440;
export const THUMBNAIL_WIDTH = 320;
export const THUMBNAIL_HEIGHT = 180;

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const supportedMotions = new Set([
  "clouds",
  "mist",
  "water",
  "stars",
  "fireflies",
  "dust",
  "light"
]);
const supportedRightsStatuses = new Set(["cc0", "public-domain"]);
const idPattern = /^[a-z][a-z0-9-]*$/;
const sha256Pattern = /^[a-f0-9]{64}$/;
const hexColorPattern = /^#[a-f0-9]{6}$/i;

function usage() {
  return `Import a curated, museum-sourced Cinematic artwork gallery.

Usage:
  node scripts/import-curated-artworks.mjs --manifest <file> [options]

Options:
  --output <directory>       Dedicated generated gallery directory.
                             Default: .artwork-import/<manifest-name>
  --cache <directory>        Download cache. Default: .cache/artwork-imports
  --magick <executable>      ImageMagick executable. Default: MAGICK_BIN or magick
  --duplicate-distance <n>   Reject dHash distances at or below n. Default: 3
  --max-bytes <n>            Maximum source download size. Default: 157286400
  --require-pinned           Require expectedSourceSha256 on every artwork.
  --refresh                  Redownload sources instead of using the local cache.
  --force                    Atomically replace an existing output directory.
  --verify                   Verify an already-generated output; do not download.
  --dry-run                  Validate curation and provenance only; do not download.
  --help                     Show this help.

The importer never edits assets/scenes or renderer.js implicitly. Point --output
at a staging directory, inspect the generated catalog and LICENSES.md, then make
the generated gallery part of the app in a separate reviewed change.
`;
}

function fail(message) {
  throw new Error(message);
}

function requiredString(value, label) {
  if (typeof value !== "string" || !value.trim()) fail(`${label} must be a non-empty string.`);
  return value.trim();
}

function optionalString(value, label) {
  if (value === undefined || value === null || value === "") return "";
  return requiredString(value, label);
}

function uniqueStrings(value, label) {
  if (!Array.isArray(value) || !value.length) fail(`${label} must contain at least one hostname.`);
  const normalized = value.map((item, index) => (
    requiredString(item, `${label}[${index}]`).toLowerCase().replace(/\.$/, "")
  ));
  if (new Set(normalized).size !== normalized.length) fail(`${label} contains duplicate hostnames.`);
  return normalized;
}

function safeHttpsUrl(value, label) {
  const source = requiredString(value, label);
  let parsed;
  try {
    parsed = new URL(source);
  } catch {
    fail(`${label} must be a valid URL.`);
  }
  if (parsed.protocol !== "https:") fail(`${label} must use HTTPS.`);
  if (parsed.username || parsed.password) fail(`${label} must not contain credentials.`);
  return parsed;
}

export function hostnameAllowed(hostname, allowedHosts) {
  const actual = String(hostname || "").toLowerCase().replace(/\.$/, "");
  return allowedHosts.some((host) => actual === host || actual.endsWith(`.${host}`));
}

function approvedUrl(value, label, allowedHosts) {
  const parsed = safeHttpsUrl(value, label);
  if (!hostnameAllowed(parsed.hostname, allowedHosts)) {
    fail(`${label} uses unapproved host ${parsed.hostname}; expected ${allowedHosts.join(", ")}.`);
  }
  return parsed.href;
}

function normalizeTarget(target = {}) {
  const width = Number(target.width ?? ARTWORK_WIDTH);
  const height = Number(target.height ?? ARTWORK_HEIGHT);
  const quality = Number(target.quality ?? 84);
  const thumbnailWidth = Number(target.thumbnailWidth ?? THUMBNAIL_WIDTH);
  const thumbnailHeight = Number(target.thumbnailHeight ?? THUMBNAIL_HEIGHT);
  const thumbnailQuality = Number(target.thumbnailQuality ?? 76);
  if (width !== ARTWORK_WIDTH || height !== ARTWORK_HEIGHT) {
    fail(`target must remain ${ARTWORK_WIDTH} × ${ARTWORK_HEIGHT}.`);
  }
  if (thumbnailWidth !== THUMBNAIL_WIDTH || thumbnailHeight !== THUMBNAIL_HEIGHT) {
    fail(`thumbnail target must remain ${THUMBNAIL_WIDTH} × ${THUMBNAIL_HEIGHT}.`);
  }
  if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
    fail("target.quality must be an integer from 1 to 100.");
  }
  if (!Number.isInteger(thumbnailQuality) || thumbnailQuality < 1 || thumbnailQuality > 100) {
    fail("target.thumbnailQuality must be an integer from 1 to 100.");
  }
  if (target.format !== undefined && target.format !== "webp") {
    fail("target.format must be webp.");
  }
  return {
    width,
    height,
    format: "webp",
    quality,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailQuality
  };
}

function normalizeInstitutions(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail("institutions must be an object.");
  }
  const institutions = {};
  for (const [id, raw] of Object.entries(value)) {
    if (!idPattern.test(id)) fail(`Institution id "${id}" is invalid.`);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      fail(`institutions.${id} must be an object.`);
    }
    const sourceHosts = uniqueStrings(raw.sourceHosts, `institutions.${id}.sourceHosts`);
    const imageHosts = uniqueStrings(raw.imageHosts, `institutions.${id}.imageHosts`);
    const license = raw.license || {};
    const status = requiredString(license.status, `institutions.${id}.license.status`);
    if (!supportedRightsStatuses.has(status)) {
      fail(`institutions.${id}.license.status must be cc0 or public-domain.`);
    }
    institutions[id] = {
      id,
      name: requiredString(raw.name, `institutions.${id}.name`),
      sourceHosts,
      imageHosts,
      license: {
        status,
        name: requiredString(license.name, `institutions.${id}.license.name`),
        url: approvedUrl(
          license.url,
          `institutions.${id}.license.url`,
          sourceHosts
        )
      }
    };
  }
  if (!Object.keys(institutions).length) fail("At least one institution is required.");
  return institutions;
}

function normalizeFocalPoint(value, label) {
  const focalPoint = value ?? { x: 0.5, y: 0.5 };
  if (!focalPoint || typeof focalPoint !== "object" || Array.isArray(focalPoint)) {
    fail(`${label} must be an object.`);
  }
  const x = Number(focalPoint.x ?? 0.5);
  const y = Number(focalPoint.y ?? 0.5);
  if (!Number.isFinite(x) || x < 0 || x > 1 || !Number.isFinite(y) || y < 0 || y > 1) {
    fail(`${label}.x and ${label}.y must be between 0 and 1.`);
  }
  return { x, y };
}

function normalizeColors(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    fail(`${label} must contain exactly three six-digit hex colors.`);
  }
  return value.map((color, index) => {
    const normalized = requiredString(color, `${label}[${index}]`).toLowerCase();
    if (!hexColorPattern.test(normalized)) fail(`${label}[${index}] must be a six-digit hex color.`);
    return normalized;
  });
}

export function validateCuratedManifest(raw, { requirePinned = false } = {}) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail("Manifest must be an object.");
  if (raw.schemaVersion !== ARTWORK_MANIFEST_SCHEMA_VERSION) {
    fail(`schemaVersion must be ${ARTWORK_MANIFEST_SCHEMA_VERSION}.`);
  }
  const target = normalizeTarget(raw.target);
  const institutions = normalizeInstitutions(raw.institutions);
  if (!Array.isArray(raw.artworks)) fail("artworks must be an array.");

  const ids = new Set();
  const assets = new Set();
  const sourcePages = new Set();
  const imageUrls = new Set();
  const artworks = raw.artworks.map((entry, index) => {
    const labelPrefix = `artworks[${index}]`;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      fail(`${labelPrefix} must be an object.`);
    }
    const id = requiredString(entry.id, `${labelPrefix}.id`);
    if (!idPattern.test(id)) fail(`${labelPrefix}.id is invalid.`);
    if (ids.has(id)) fail(`Artwork id "${id}" is duplicated.`);
    ids.add(id);

    if (entry.humanMade !== true) {
      fail(`${labelPrefix}.humanMade must be true; generated or uncertain-origin art is not accepted.`);
    }
    const institutionId = requiredString(entry.institution, `${labelPrefix}.institution`);
    const institution = institutions[institutionId];
    if (!institution) fail(`${labelPrefix}.institution references unknown institution "${institutionId}".`);

    const asset = optionalString(entry.asset, `${labelPrefix}.asset`) || `${id}.webp`;
    if (path.basename(asset) !== asset || !/^[a-z][a-z0-9-]*\.webp$/.test(asset)) {
      fail(`${labelPrefix}.asset must be a safe lowercase .webp filename.`);
    }
    if (assets.has(asset)) fail(`Artwork asset "${asset}" is duplicated.`);
    assets.add(asset);

    const sourcePage = approvedUrl(
      entry.sourcePage,
      `${labelPrefix}.sourcePage`,
      institution.sourceHosts
    );
    const imageUrl = approvedUrl(
      entry.imageUrl,
      `${labelPrefix}.imageUrl`,
      institution.imageHosts
    );
    if (sourcePages.has(sourcePage)) fail(`Source page "${sourcePage}" is duplicated.`);
    if (imageUrls.has(imageUrl)) fail(`Source image "${imageUrl}" is duplicated.`);
    sourcePages.add(sourcePage);
    imageUrls.add(imageUrl);

    const expectedSourceSha256 = optionalString(
      entry.expectedSourceSha256,
      `${labelPrefix}.expectedSourceSha256`
    ).toLowerCase();
    if (expectedSourceSha256 && !sha256Pattern.test(expectedSourceSha256)) {
      fail(`${labelPrefix}.expectedSourceSha256 must be a lowercase SHA-256 digest.`);
    }
    if (requirePinned && !expectedSourceSha256) {
      fail(`${labelPrefix}.expectedSourceSha256 is required by --require-pinned.`);
    }

    const motion = requiredString(entry.motion, `${labelPrefix}.motion`);
    if (!supportedMotions.has(motion)) {
      fail(`${labelPrefix}.motion must be one of ${[...supportedMotions].join(", ")}.`);
    }

    const title = requiredString(entry.title, `${labelPrefix}.title`);
    const artist = requiredString(entry.artist, `${labelPrefix}.artist`);
    const date = requiredString(entry.date, `${labelPrefix}.date`);
    const label = optionalString(entry.label, `${labelPrefix}.label`) || title;
    return {
      id,
      label,
      title,
      artist,
      date,
      detail: optionalString(entry.detail, `${labelPrefix}.detail`) || `${artist} · ${date}`,
      alt: requiredString(entry.alt, `${labelPrefix}.alt`),
      humanMade: true,
      institution: institutionId,
      objectId: requiredString(entry.objectId, `${labelPrefix}.objectId`),
      accessionNumber: optionalString(entry.accessionNumber, `${labelPrefix}.accessionNumber`),
      sourcePage,
      imageUrl,
      asset,
      thumbnail: `thumbnails/${id}.webp`,
      expectedSourceSha256,
      focalPoint: normalizeFocalPoint(entry.focalPoint, `${labelPrefix}.focalPoint`),
      motion,
      colors: normalizeColors(entry.colors, `${labelPrefix}.colors`),
      license: institution.license
    };
  });

  return {
    schemaVersion: ARTWORK_MANIFEST_SCHEMA_VERSION,
    target,
    institutions,
    artworks
  };
}

export function computeCoverCrop(
  sourceWidth,
  sourceHeight,
  focalPoint = { x: 0.5, y: 0.5 },
  targetWidth = ARTWORK_WIDTH,
  targetHeight = ARTWORK_HEIGHT
) {
  if (![sourceWidth, sourceHeight, targetWidth, targetHeight].every(
    (value) => Number.isInteger(value) && value > 0
  )) {
    fail("Source and target dimensions must be positive integers.");
  }
  const targetRatio = targetWidth / targetHeight;
  const sourceRatio = sourceWidth / sourceHeight;
  let width;
  let height;
  let x;
  let y;
  if (sourceRatio >= targetRatio) {
    height = sourceHeight;
    width = Math.floor(height * targetRatio);
    x = Math.round((sourceWidth - width) * focalPoint.x);
    y = 0;
  } else {
    width = sourceWidth;
    height = Math.floor(width / targetRatio);
    x = 0;
    y = Math.round((sourceHeight - height) * focalPoint.y);
  }
  if (width < targetWidth || height < targetHeight) {
    fail(
      `Source ${sourceWidth} × ${sourceHeight} cannot cover ${targetWidth} × ${targetHeight} `
      + "without upscaling."
    );
  }
  return { x, y, width, height };
}

export function hammingDistanceHex(first, second) {
  if (!/^[a-f0-9]{16}$/i.test(first) || !/^[a-f0-9]{16}$/i.test(second)) {
    fail("Perceptual hashes must be 16 hex characters.");
  }
  let value = BigInt(`0x${first}`) ^ BigInt(`0x${second}`);
  let count = 0;
  while (value) {
    value &= value - 1n;
    count += 1;
  }
  return count;
}

function parseArguments(argv) {
  const options = {
    manifest: "",
    output: "",
    cache: path.join(projectRoot, ".cache", "artwork-imports"),
    magick: process.env.MAGICK_BIN || "magick",
    duplicateDistance: 3,
    maxBytes: 150 * 1024 * 1024,
    requirePinned: false,
    refresh: false,
    force: false,
    verify: false,
    dryRun: false,
    help: false
  };
  const valueFlags = new Map([
    ["--manifest", "manifest"],
    ["--output", "output"],
    ["--cache", "cache"],
    ["--magick", "magick"],
    ["--duplicate-distance", "duplicateDistance"],
    ["--max-bytes", "maxBytes"]
  ]);
  const booleanFlags = new Map([
    ["--require-pinned", "requirePinned"],
    ["--refresh", "refresh"],
    ["--force", "force"],
    ["--verify", "verify"],
    ["--dry-run", "dryRun"],
    ["--help", "help"],
    ["-h", "help"]
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (booleanFlags.has(flag)) {
      options[booleanFlags.get(flag)] = true;
      continue;
    }
    const key = valueFlags.get(flag);
    if (!key) fail(`Unknown option: ${flag}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) fail(`${flag} requires a value.`);
    options[key] = value;
    index += 1;
  }
  options.duplicateDistance = Number(options.duplicateDistance);
  options.maxBytes = Number(options.maxBytes);
  if (!Number.isInteger(options.duplicateDistance) || options.duplicateDistance < 0 || options.duplicateDistance > 16) {
    fail("--duplicate-distance must be an integer from 0 to 16.");
  }
  if (!Number.isInteger(options.maxBytes) || options.maxBytes < 1_000_000) {
    fail("--max-bytes must be an integer of at least 1000000.");
  }
  if (options.verify && options.dryRun) fail("--verify and --dry-run cannot be used together.");
  return options;
}

function resolveInputPath(value) {
  return path.resolve(process.cwd(), value);
}

function defaultOutputPath(manifestPath) {
  const name = path.basename(manifestPath, path.extname(manifestPath));
  return path.join(projectRoot, ".artwork-import", name);
}

export function assertSafeGeneratedOutput(output) {
  const resolved = path.resolve(output);
  const forbidden = new Set([
    path.parse(resolved).root,
    path.resolve(os.homedir()),
    projectRoot
  ]);
  if (forbidden.has(resolved)) {
    fail(`Refusing to use broad output directory: ${resolved}.`);
  }
  return resolved;
}

async function readManifest(manifestPath, requirePinned) {
  let raw;
  try {
    raw = JSON.parse(await fsp.readFile(manifestPath, "utf8"));
  } catch (error) {
    fail(`Could not read manifest ${manifestPath}: ${error.message}`);
  }
  return validateCuratedManifest(raw, { requirePinned });
}

function runProcess(command, args, { binary = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });
    const stdout = [];
    const stderr = [];
    child.stdout.on("data", (chunk) => stdout.push(chunk));
    child.stderr.on("data", (chunk) => stderr.push(chunk));
    child.on("error", (error) => reject(new Error(`Could not run ${command}: ${error.message}`)));
    child.on("close", (code, signal) => {
      const errorText = Buffer.concat(stderr).toString("utf8").trim();
      if (code !== 0) {
        reject(new Error(
          `${command} ${args.join(" ")} failed (${signal || code}): ${errorText || "no error output"}`
        ));
        return;
      }
      const output = Buffer.concat(stdout);
      resolve(binary ? output : output.toString("utf8"));
    });
  });
}

async function requireImageMagick(command) {
  const version = await runProcess(command, ["-version"]);
  if (!/ImageMagick/i.test(version)) fail(`${command} is not ImageMagick.`);
  return command;
}

async function imageInfo(command, file) {
  const output = await runProcess(command, [
    `${file}[0]`,
    "-auto-orient",
    "-format",
    "%m %w %h",
    "info:"
  ]);
  const match = /^([A-Z0-9]+)\s+(\d+)\s+(\d+)$/i.exec(output.trim());
  if (!match) fail(`Could not identify image dimensions for ${file}.`);
  return { format: match[1].toUpperCase(), width: Number(match[2]), height: Number(match[3]) };
}

async function sourceFrameCount(command, file) {
  const output = await runProcess(command, ["identify", "-format", "%n\n", file]);
  const counts = output.trim().split(/\s+/).filter(Boolean).map(Number);
  if (!counts.length || counts.some((value) => !Number.isInteger(value))) {
    fail(`Could not determine frame count for ${file}.`);
  }
  return Math.max(counts.length, ...counts);
}

async function transformArtwork(command, source, destination, crop, target) {
  await runProcess(command, [
    `${source}[0]`,
    "-auto-orient",
    "-crop",
    `${crop.width}x${crop.height}+${crop.x}+${crop.y}`,
    "+repage",
    "-resize",
    `${target.width}x${target.height}!`,
    "-colorspace",
    "sRGB",
    "-alpha",
    "off",
    "-strip",
    "-define",
    "webp:method=6",
    "-define",
    "webp:thread-level=1",
    "-quality",
    String(target.quality),
    destination
  ]);
}

async function transformThumbnail(command, source, destination, target) {
  await runProcess(command, [
    `${source}[0]`,
    "-resize",
    `${target.thumbnailWidth}x${target.thumbnailHeight}!`,
    "-colorspace",
    "sRGB",
    "-alpha",
    "off",
    "-strip",
    "-define",
    "webp:method=6",
    "-quality",
    String(target.thumbnailQuality),
    destination
  ]);
}

async function sha256File(file) {
  const hash = crypto.createHash("sha256");
  await pipeline(fs.createReadStream(file), new Transform({
    transform(chunk, _encoding, callback) {
      hash.update(chunk);
      callback(null, chunk);
    }
  }), new Transform({
    transform(_chunk, _encoding, callback) {
      callback();
    }
  }));
  return hash.digest("hex");
}

async function perceptualHash(command, file) {
  const pixels = await runProcess(command, [
    `${file}[0]`,
    "-colorspace",
    "Gray",
    "-resize",
    "9x8!",
    "-depth",
    "8",
    "gray:-"
  ], { binary: true });
  if (pixels.length !== 72) fail(`Could not compute the perceptual hash for ${file}.`);
  let hash = 0n;
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      hash <<= 1n;
      if (pixels[y * 9 + x] > pixels[y * 9 + x + 1]) hash |= 1n;
    }
  }
  return hash.toString(16).padStart(16, "0");
}

async function delay(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function downloadOnce(url, destination, allowedHosts, maxBytes) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "image/avif,image/webp,image/png,image/jpeg,image/tiff,*/*;q=0.5",
        "User-Agent": "BsCode-curated-art-import/1.0 (+https://github.com/axel-slid/agent-workbench)"
      }
    });
    if (!response.ok) fail(`Download returned HTTP ${response.status} for ${url}.`);
    if (!response.body) fail(`Download returned no body for ${url}.`);
    const finalUrl = safeHttpsUrl(response.url, "Redirected image URL");
    if (!hostnameAllowed(finalUrl.hostname, allowedHosts)) {
      fail(`Download redirected to unapproved host ${finalUrl.hostname}.`);
    }
    const contentType = String(response.headers.get("content-type") || "").toLowerCase();
    if (contentType && !contentType.startsWith("image/") && contentType !== "application/octet-stream") {
      fail(`Download returned ${contentType}, not an image.`);
    }
    const contentLength = Number(response.headers.get("content-length") || 0);
    if (contentLength > maxBytes) fail(`Download exceeds the ${maxBytes}-byte limit.`);

    let bytes = 0;
    const hash = crypto.createHash("sha256");
    const guard = new Transform({
      transform(chunk, _encoding, callback) {
        bytes += chunk.length;
        if (bytes > maxBytes) {
          callback(new Error(`Download exceeds the ${maxBytes}-byte limit.`));
          return;
        }
        hash.update(chunk);
        callback(null, chunk);
      }
    });
    await pipeline(Readable.fromWeb(response.body), guard, fs.createWriteStream(destination, { flags: "wx" }));
    return {
      bytes,
      contentType,
      finalUrl: finalUrl.href,
      sha256: hash.digest("hex"),
      etag: response.headers.get("etag") || "",
      lastModified: response.headers.get("last-modified") || ""
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function acquireSource(entry, institution, options) {
  await fsp.mkdir(options.cache, { recursive: true });
  const cacheKey = crypto.createHash("sha256").update(entry.imageUrl).digest("hex");
  const sourcePath = path.join(options.cache, `${cacheKey}.source`);
  const metadataPath = path.join(options.cache, `${cacheKey}.json`);
  if (!options.refresh && fs.existsSync(sourcePath)) {
    const sha256 = await sha256File(sourcePath);
    if (entry.expectedSourceSha256 && entry.expectedSourceSha256 !== sha256) {
      fail(`${entry.id}: cached source does not match expectedSourceSha256.`);
    }
    return { file: sourcePath, sha256, cacheHit: true };
  }

  await fsp.rm(sourcePath, { force: true });
  const partial = `${sourcePath}.${process.pid}.${crypto.randomUUID()}.partial`;
  let metadata;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      metadata = await downloadOnce(
        entry.imageUrl,
        partial,
        institution.imageHosts,
        options.maxBytes
      );
      lastError = null;
      break;
    } catch (error) {
      lastError = error;
      await fsp.rm(partial, { force: true });
      if (attempt < 3) await delay(300 * (2 ** (attempt - 1)));
    }
  }
  if (lastError) throw lastError;
  if (entry.expectedSourceSha256 && entry.expectedSourceSha256 !== metadata.sha256) {
    await fsp.rm(partial, { force: true });
    fail(`${entry.id}: source does not match expectedSourceSha256.`);
  }
  await fsp.rename(partial, sourcePath);
  await fsp.writeFile(metadataPath, `${JSON.stringify({
    requestedUrl: entry.imageUrl,
    ...metadata
  }, null, 2)}\n`);
  return { file: sourcePath, sha256: metadata.sha256, cacheHit: false };
}

function checkDuplicate(record, records, threshold) {
  for (const previous of records) {
    if (previous.sourceSha256 === record.sourceSha256) {
      fail(`${record.id} and ${previous.id} use the same source image.`);
    }
    if (previous.sha256 === record.sha256) {
      fail(`${record.id} and ${previous.id} produce the same normalized image.`);
    }
    const distance = hammingDistanceHex(previous.perceptualHash, record.perceptualHash);
    if (distance <= threshold) {
      fail(
        `${record.id} is visually too similar to ${previous.id} `
        + `(perceptual distance ${distance}, threshold ${threshold}).`
      );
    }
  }
}

function catalogEntry(entry, institution, generated) {
  return {
    id: entry.id,
    label: entry.label,
    title: entry.title,
    detail: entry.detail,
    asset: entry.asset,
    thumbnail: entry.thumbnail,
    alt: entry.alt,
    artist: entry.artist,
    date: entry.date,
    humanMade: true,
    institution: institution.name,
    objectId: entry.objectId,
    ...(entry.accessionNumber ? { accessionNumber: entry.accessionNumber } : {}),
    source: entry.sourcePage,
    sourceImage: entry.imageUrl,
    license: entry.license.name,
    licenseUrl: entry.license.url,
    rightsStatus: entry.license.status,
    motion: entry.motion,
    colors: entry.colors,
    width: ARTWORK_WIDTH,
    height: ARTWORK_HEIGHT,
    thumbnailWidth: THUMBNAIL_WIDTH,
    thumbnailHeight: THUMBNAIL_HEIGHT,
    sourceWidth: generated.sourceWidth,
    sourceHeight: generated.sourceHeight,
    sourceSha256: generated.sourceSha256,
    sha256: generated.sha256,
    thumbnailSha256: generated.thumbnailSha256,
    perceptualHash: generated.perceptualHash,
    crop: generated.crop
  };
}

function markdownCell(value) {
  return String(value || "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function generateLicenses(catalog) {
  const rows = catalog.map((entry) => (
    `| ${markdownCell(entry.title)} | ${markdownCell(entry.artist)} | `
    + `${markdownCell(entry.institution)} | [Object](${entry.source}) | `
    + `[${markdownCell(entry.license)}](${entry.licenseUrl}) | ${entry.rightsStatus} |`
  ));
  return `# Cinematic artwork sources and licenses

This file is generated by \`scripts/import-curated-artworks.mjs\`. Every listed
work was explicitly curated as human-made and was downloaded from an approved
museum image host. Generated, uncertain-origin, stock, and non-open artwork is
rejected by the importer.

The normalized WebP files are ${ARTWORK_WIDTH} × ${ARTWORK_HEIGHT}; their gallery
thumbnails are ${THUMBNAIL_WIDTH} × ${THUMBNAIL_HEIGHT}. Source, normalized, and
thumbnail hashes are recorded in \`catalog.json\`.

| Artwork | Artist | Institution | Museum record | License | Status |
| --- | --- | --- | --- | --- | --- |
${rows.length ? rows.join("\n") : "| — | — | — | — | — | — |"}

License links describe each institution's open-access program. Object links are
the authoritative provenance records. The direct image URLs in \`catalog.json\`
are retained for reproducibility and are not substitutes for those records.
`;
}

export function generateCatalogJavaScript(catalog) {
  const payload = JSON.stringify(catalog, null, 2).replace(/</g, "\\u003c");
  return `window.BSCODE_SCENE_CATALOG = ${payload};\n`;
}

async function writeGeneratedGallery(staging, manifest, catalog) {
  await fsp.writeFile(path.join(staging, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`);
  await fsp.writeFile(path.join(staging, "catalog.js"), generateCatalogJavaScript(catalog));
  await fsp.writeFile(path.join(staging, "LICENSES.md"), generateLicenses(catalog));
  const lock = {
    schemaVersion: manifest.schemaVersion,
    target: manifest.target,
    institutions: Object.fromEntries(Object.entries(manifest.institutions).map(([id, institution]) => [
      id,
      {
        name: institution.name,
        sourceHosts: institution.sourceHosts,
        imageHosts: institution.imageHosts,
        license: institution.license
      }
    ])),
    artworks: manifest.artworks.map((entry) => ({
      ...entry,
      license: undefined
    }))
  };
  await fsp.writeFile(
    path.join(staging, "manifest.lock.json"),
    `${JSON.stringify(lock, (_key, value) => value === undefined ? undefined : value, 2)}\n`
  );
}

async function commitGeneratedGallery(staging, output, force) {
  const outputExists = fs.existsSync(output);
  if (outputExists && !force) {
    fail(`Output directory already exists: ${output}. Use --force to replace it atomically.`);
  }
  if (!outputExists) {
    await fsp.rename(staging, output);
    return;
  }
  const backup = `${output}.backup-${process.pid}-${crypto.randomUUID()}`;
  await fsp.rename(output, backup);
  try {
    await fsp.rename(staging, output);
    await fsp.rm(backup, { recursive: true, force: true });
  } catch (error) {
    if (!fs.existsSync(output) && fs.existsSync(backup)) await fsp.rename(backup, output);
    throw error;
  }
}

async function importGallery(manifest, output, options) {
  const command = await requireImageMagick(options.magick);
  const parent = path.dirname(output);
  await fsp.mkdir(parent, { recursive: true });
  const staging = await fsp.mkdtemp(path.join(parent, `.${path.basename(output)}.staging-`));
  const thumbnailDirectory = path.join(staging, "thumbnails");
  await fsp.mkdir(thumbnailDirectory, { recursive: true });
  const catalog = [];
  try {
    for (const entry of manifest.artworks) {
      process.stdout.write(`Importing ${entry.id}… `);
      const institution = manifest.institutions[entry.institution];
      const source = await acquireSource(entry, institution, options);
      const frames = await sourceFrameCount(command, source.file);
      if (frames !== 1) fail(`${entry.id}: animated or multi-page sources are not accepted.`);
      const sourceInfo = await imageInfo(command, source.file);
      const crop = computeCoverCrop(
        sourceInfo.width,
        sourceInfo.height,
        entry.focalPoint,
        manifest.target.width,
        manifest.target.height
      );
      const artworkPath = path.join(staging, entry.asset);
      const thumbnailPath = path.join(staging, entry.thumbnail);
      await transformArtwork(command, source.file, artworkPath, crop, manifest.target);
      await transformThumbnail(command, artworkPath, thumbnailPath, manifest.target);
      const artworkInfo = await imageInfo(command, artworkPath);
      const thumbnailInfo = await imageInfo(command, thumbnailPath);
      if (
        artworkInfo.format !== "WEBP"
        || artworkInfo.width !== ARTWORK_WIDTH
        || artworkInfo.height !== ARTWORK_HEIGHT
      ) {
        fail(`${entry.id}: normalized output is not an exact ${ARTWORK_WIDTH} × ${ARTWORK_HEIGHT} WebP.`);
      }
      if (
        thumbnailInfo.format !== "WEBP"
        || thumbnailInfo.width !== THUMBNAIL_WIDTH
        || thumbnailInfo.height !== THUMBNAIL_HEIGHT
      ) {
        fail(`${entry.id}: thumbnail is not an exact ${THUMBNAIL_WIDTH} × ${THUMBNAIL_HEIGHT} WebP.`);
      }
      const generated = {
        sourceWidth: sourceInfo.width,
        sourceHeight: sourceInfo.height,
        sourceSha256: source.sha256,
        sha256: await sha256File(artworkPath),
        thumbnailSha256: await sha256File(thumbnailPath),
        perceptualHash: await perceptualHash(command, artworkPath),
        crop
      };
      const record = catalogEntry(entry, institution, generated);
      checkDuplicate(record, catalog, options.duplicateDistance);
      catalog.push(record);
      process.stdout.write(`${source.cacheHit ? "cached; " : ""}${sourceInfo.width}×${sourceInfo.height}\n`);
    }
    await writeGeneratedGallery(staging, manifest, catalog);
    await commitGeneratedGallery(staging, output, options.force);
  } catch (error) {
    await fsp.rm(staging, { recursive: true, force: true });
    throw error;
  }
  return catalog;
}

async function verifyGallery(manifest, output, options) {
  const command = await requireImageMagick(options.magick);
  const catalogPath = path.join(output, "catalog.json");
  const catalogJavaScriptPath = path.join(output, "catalog.js");
  const licensesPath = path.join(output, "LICENSES.md");
  const lockPath = path.join(output, "manifest.lock.json");
  const catalog = JSON.parse(await fsp.readFile(catalogPath, "utf8"));
  if (!Array.isArray(catalog)) fail(`${catalogPath} must contain an array.`);
  if (catalog.length !== manifest.artworks.length) {
    fail(`Catalog has ${catalog.length} entries; manifest has ${manifest.artworks.length}.`);
  }
  if (
    !fs.existsSync(catalogJavaScriptPath)
    || !fs.existsSync(licensesPath)
    || !fs.existsSync(lockPath)
  ) {
    fail("Generated catalog.js, LICENSES.md, or manifest.lock.json is missing.");
  }
  if ((await fsp.readFile(catalogJavaScriptPath, "utf8")) !== generateCatalogJavaScript(catalog)) {
    fail("Generated catalog.js does not match catalog.json.");
  }
  const records = [];
  for (const entry of manifest.artworks) {
    const record = catalog.find((item) => item.id === entry.id);
    if (!record) fail(`Catalog entry ${entry.id} is missing.`);
    if (record.thumbnail !== `thumbnails/${entry.id}.webp`) {
      fail(`${entry.id}: thumbnail catalog path is not deterministic.`);
    }
    const artworkPath = path.join(output, entry.asset);
    const thumbnailPath = path.join(output, record.thumbnail);
    const artworkInfo = await imageInfo(command, artworkPath);
    const thumbnailInfo = await imageInfo(command, thumbnailPath);
    if (
      artworkInfo.format !== "WEBP"
      || artworkInfo.width !== ARTWORK_WIDTH
      || artworkInfo.height !== ARTWORK_HEIGHT
    ) {
      fail(`${entry.id}: normalized artwork dimensions or format are invalid.`);
    }
    if (
      thumbnailInfo.format !== "WEBP"
      || thumbnailInfo.width !== THUMBNAIL_WIDTH
      || thumbnailInfo.height !== THUMBNAIL_HEIGHT
    ) {
      fail(`${entry.id}: thumbnail dimensions or format are invalid.`);
    }
    const sha256 = await sha256File(artworkPath);
    const thumbnailSha256 = await sha256File(thumbnailPath);
    const perceptual = await perceptualHash(command, artworkPath);
    if (record.sha256 !== sha256) fail(`${entry.id}: normalized artwork hash does not match catalog.`);
    if (record.thumbnailSha256 !== thumbnailSha256) fail(`${entry.id}: thumbnail hash does not match catalog.`);
    if (record.perceptualHash !== perceptual) fail(`${entry.id}: perceptual hash does not match catalog.`);
    const verified = { ...record, sha256, thumbnailSha256, perceptualHash: perceptual };
    checkDuplicate(verified, records, options.duplicateDistance);
    records.push(verified);
  }
  return records;
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseArguments(argv);
  if (options.help) {
    process.stdout.write(usage());
    return;
  }
  if (!options.manifest) fail("--manifest is required.");
  const manifestPath = resolveInputPath(options.manifest);
  options.cache = resolveInputPath(options.cache);
  const output = assertSafeGeneratedOutput(
    resolveInputPath(options.output || defaultOutputPath(manifestPath))
  );
  const manifest = await readManifest(manifestPath, options.requirePinned);
  if (options.dryRun) {
    process.stdout.write(
      `Validated ${manifest.artworks.length} curated human-made artwork`
      + `${manifest.artworks.length === 1 ? "" : "s"}; no network or files used.\n`
    );
    return;
  }
  if (options.verify) {
    const catalog = await verifyGallery(manifest, output, options);
    process.stdout.write(`Verified ${catalog.length} artwork${catalog.length === 1 ? "" : "s"} in ${output}.\n`);
    return;
  }
  const catalog = await importGallery(manifest, output, options);
  process.stdout.write(
    `Generated ${catalog.length} artwork${catalog.length === 1 ? "" : "s"}, thumbnails, `
    + `catalog, and licenses in ${output}.\n`
  );
}

const invokedAsScript = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedAsScript) {
  main().catch((error) => {
    process.stderr.write(`Artwork import failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}
