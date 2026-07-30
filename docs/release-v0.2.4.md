# BsCode 0.2.4

BsCode 0.2.4 keeps Cinematic Mode crisp and lightweight by returning the
gallery to high-resolution, human-made museum artworks. The brief
low-resolution video-scene experiment has been removed from the application,
catalog, tests, documentation, and release package, while eight recognizable
public-domain masterworks expand the static collection to 60 scenes.

## Download

The macOS release is packaged natively for Apple Silicon (`arm64`) as
`BsCode-macOS-arm64.zip`.

After dragging `BsCode.app` into Applications, run this once in Terminal
before the first launch:

```bash
xattr -dr com.apple.quarantine "/Applications/BsCode.app"
```

## Cinematic gallery

- 60 public-domain paintings and architectural works from The Met and the Art
  Institute of Chicago.
- Every full-size scene is 2560 × 1440 and credited to a named artist.
- New highlights include Monet's *Water Lilies* and *Stacks of Wheat*, van
  Gogh's *The Bedroom* and *The Poet's Garden*, Seurat's *A Sunday on La Grande
  Jatte*, Hokusai's *The Great Wave*, Monet's *Gare Saint-Lazare*, and
  Whistler's *Nocturne: Blue and Gold—Southampton Water*.
- Restrained local clouds, mist, water, light, dust, firefly, or star effects
  add atmosphere without moving or scaling the artwork.
- No video scenes, GIF loops, stock footage, or network-loaded backgrounds.
- Only the selected WebP is decoded; Reduce Motion disables atmosphere.

## Validation

- 53 core regression checks.
- Curated artwork importer regression.
- Catalog/runtime parity and no-video safeguards.
- Native Apple Silicon package and deep code-sign verification.
