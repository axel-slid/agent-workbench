# BsCode 0.2.2

BsCode 0.2.2 expands Cinematic Mode into a fast, searchable museum-art gallery
without changing its quiet, fixed-camera character.

## Download

The macOS release is packaged natively for Apple Silicon (`arm64`) as
`BsCode-macOS-arm64.zip`.

## Human-made Cinematic gallery

- 52 bundled 2560 × 1440 landscape and architectural artworks.
- Every scene is attributed to a named human artist and an authoritative
  museum object record.
- Every asset is Public Domain or CC0 through The Met Open Access or the Art
  Institute of Chicago Open Access program.
- No AI-generated imagery, stock footage, game art, or uncertain-origin work.
- Search by title, artist, or museum directly in Settings.
- Lazy 320 × 180 thumbnails keep browsing lightweight; only the selected
  master artwork is decoded.
- Existing subtle atmosphere remains localized and camera-free.

## Reproducible artwork pipeline

- Allowlisted museum object and image hosts.
- Explicit human-origin and open-rights validation.
- Source SHA-256 pinning and normalized-image hashes.
- No-upscale 2560 × 1440 crop enforcement.
- Exact and perceptual duplicate rejection.
- Generated thumbnails, catalog, browser catalog, and license ledger.
- Offline verification mode and dedicated regression coverage.

## Validation

- 53/53 core regression checks.
- Curated artwork importer regression passed.
- All 52 masters and thumbnails resolve.
- Search, internal gallery scrolling, attribution, and responsive layout
  visually checked.
- Opening the gallery decodes no 1440p master images.
- Native Apple Silicon package and signature checks must pass before release.

Complete source credits are in
[`assets/scenes/README.md`](../assets/scenes/README.md) and
[`assets/scenes/LICENSES.md`](../assets/scenes/LICENSES.md).
