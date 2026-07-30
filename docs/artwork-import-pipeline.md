# Curated artwork import pipeline

BsCode's Cinematic gallery accepts named, human-made museum artworks that are
clearly marked Public Domain or CC0. The import pipeline is intentionally
separate from the app: it generates a complete reviewable gallery directory and
never edits the shipped gallery or runtime source implicitly.

## What it produces

For every approved manifest entry, the importer creates:

- a stripped sRGB WebP at exactly 2560 × 1440;
- a lazy-gallery thumbnail at exactly 320 × 180 in `thumbnails/`;
- `catalog.json`, including provenance, rights, dimensions, crop, SHA-256
  digests, and a perceptual hash;
- `catalog.js`, assigning the same data to
  `window.BSCODE_SCENE_CATALOG` for file-protocol Electron startup;
- `LICENSES.md`, a readable attribution ledger; and
- `manifest.lock.json`, the normalized curation input used for the build.

The importer rejects a source that cannot fill 2560 × 1440 without upscaling.
It also rejects animated or multi-page inputs, unapproved redirects, duplicate
IDs/URLs/assets, exact duplicate files, and near-duplicate normalized images.

## Curate a manifest

Copy
[`curated-artworks.example.json`](../assets/scenes/curated-artworks.example.json)
to a working location. The checked-in example deliberately contains no artwork
choices. Its institution registry demonstrates how the source-page host,
original-image host, and open-access policy are independently allowlisted.

Each artwork must explicitly provide:

```json
{
  "id": "stable-lowercase-id",
  "title": "Museum object title",
  "label": "Short gallery label",
  "artist": "Named human artist",
  "date": "Museum-supplied date",
  "detail": "Named human artist · Museum-supplied date",
  "alt": "A concise visual description of the work",
  "humanMade": true,
  "institution": "registered-institution-id",
  "objectId": "museum object identifier",
  "accessionNumber": "optional accession number",
  "sourcePage": "https://approved.museum/object-record",
  "imageUrl": "https://approved.museum/original-image",
  "expectedSourceSha256": "optional but recommended 64-character digest",
  "focalPoint": {
    "x": 0.5,
    "y": 0.5
  },
  "motion": "mist",
  "colors": [
    "#172433",
    "#687c88",
    "#d6d9ce"
  ]
}
```

`motion` must be one of `clouds`, `mist`, `water`, `stars`, `fireflies`,
`dust`, or `light`. Those names select BsCode's subtle transparent atmosphere;
the underlying artwork itself stays fixed.

The first successful import records `sourceSha256` in the generated catalog.
Copy that digest into `expectedSourceSha256`, then use `--require-pinned` for a
reproducible reviewed build.

## Validate without downloading

```sh
npm run art:import -- \
  --manifest assets/scenes/curated-artworks.example.json \
  --dry-run
```

Dry-run validates the schema, human-origin assertion, rights status, URLs,
host allowlists, IDs, assets, crop focus, and palette without touching the
network or output directory.

## Generate a review build

ImageMagick 7 (`magick`) must be installed locally:

```sh
npm run art:import -- \
  --manifest /path/to/reviewed-artworks.json \
  --output /tmp/bscode-curated-gallery \
  --require-pinned
```

Downloads are cached under `.cache/artwork-imports/`. Use `--refresh` to ignore
the cache. The output directory is treated as one generated artifact: an
existing directory is refused unless `--force` is supplied, and replacement is
performed with a sibling backup so a failed rename can be rolled back.

Inspect every crop and attribution in the generated directory before copying
it into `assets/scenes`. The import command does not perform that integration.

## Verify an existing generated gallery

```sh
npm run art:import -- \
  --manifest /path/to/reviewed-artworks.json \
  --output /tmp/bscode-curated-gallery \
  --verify \
  --require-pinned
```

Verification re-checks full images and thumbnails, exact dimensions and format,
catalog hashes, the browser catalog, and duplicate distances without network
access.

Useful safeguards:

- `--duplicate-distance 3` controls the 64-bit difference-hash threshold.
- `--max-bytes 157286400` limits a single museum source download.
- `--magick /path/to/magick` selects a non-default ImageMagick binary.
- `MAGICK_BIN=/path/to/magick` provides the same setting by environment.

