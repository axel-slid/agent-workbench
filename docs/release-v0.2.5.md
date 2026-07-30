# BsCode 0.2.5

BsCode 0.2.5 makes the Cinematic artwork gallery immediately recognizable and
adds Vincent van Gogh's *The Starry Night*.

## Highlights

- Adds a high-resolution, public-domain scan of *The Starry Night* from
  Wikimedia Commons, tied to MoMA's authoritative collection record.
- Pins the exact 3840-pixel source with SHA-256 and ships reviewed 2560 × 1440
  and 320 × 180 WebP derivatives.
- Places *The Starry Night*, Monet, Seurat, Hokusai, and the other featured
  masterworks at the start of the gallery instead of burying them below the
  first viewport.
- Adds a compact Featured badge so the newest museum works are easy to find.
- Expands the source-pinned Cinematic manifest to 46 works and the complete
  local gallery to 61 works.

## macOS Apple Silicon

This release contains the native arm64 macOS build. It is ad-hoc signed but not
notarized. After moving `BsCode.app` to Applications, run:

```bash
xattr -dr com.apple.quarantine /Applications/BsCode.app
```

Then open BsCode normally.

## Provenance

The painting is identified by
[MoMA's collection record](https://www.moma.org/collection/works/79802). The
bundled derivative comes from the
[Wikimedia Commons public-domain scan](https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg).
Its source and generated hashes are recorded in
[`assets/scenes/catalog.json`](../assets/scenes/catalog.json).
