# BsCode 0.2.3

BsCode 0.2.3 adds a small, carefully reviewed animated-landscape collection
to Cinematic Mode while preserving the quiet fixed-art gallery and its
performance controls.

## Download

The macOS release is packaged natively for Apple Silicon (`arm64`) as
`BsCode-macOS-arm64.zip`.

After dragging `BsCode.app` into Applications, run this once in Terminal
before the first launch:

```bash
xattr -dr com.apple.quarantine "/Applications/BsCode.app"
```

## Curated animated landscapes

- Six locally bundled scenes from named Pixabay creators.
- Every selection is manually reviewed as human-made and non-AI.
- Application-specific 1280 × 720, 24 fps H.264 derivatives contain no audio.
- Only the selected scene plays, and it pauses outside visible Cinematic Mode.
- Reduce Motion shows a local poster instead of decoding video.
- Existing 52 public-domain museum artworks remain available.

## Performance and provenance

- No scene is streamed from a third-party server at runtime.
- The six derivatives total 28.24 MiB.
- Source, derivative, poster, and thumbnail SHA-256 records are pinned.
- Creator pages and the Pixabay Content License are documented under
  `assets/scenes`.
- Original standalone Pixabay source files are not redistributed.

## Validation

- 53/53 core regression checks.
- Curated artwork importer regression passed.
- All six scene videos passed provenance, SHA-256, H.264, resolution,
  frame-rate, duration, and no-audio verification.
- Native Apple Silicon package and deep code-sign verification passed.

Complete source credits are in
[`assets/scenes/VIDEO_LICENSES.md`](../assets/scenes/VIDEO_LICENSES.md), with
machine-readable provenance in
[`assets/scenes/curated-videos.json`](../assets/scenes/curated-videos.json).
