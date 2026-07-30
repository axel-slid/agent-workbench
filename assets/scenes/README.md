# Cinematic art catalog

BsCode ships a focused library of 52 human-made, 2560 × 1440 scenery images.
Every scene is a public-domain landscape or architectural painting from The
Metropolitan Museum of Art or the Art Institute of Chicago. There is no stock
footage, AI-generated imagery, game art, CGI spectacle, or whole-image
pan/zoom.

The base artwork stays fixed. A transparent canvas adds one restrained,
scene-specific atmosphere layer: slow clouds, mist, water glints, light, dust,
fireflies, or star twinkles. Those effects run at the configured scene frame
rate, stop when the window is hidden, and turn off completely with Reduce
Motion. Their independently phased motion has no short video seam.

Only 320 × 180 thumbnails are requested while browsing Settings, and only the
selected 2560 × 1440 WebP is decoded as the Cinematic background. The complete
master-art catalog remains under 25 MB, down from the former 146 MB video
bundle.

## Credits and licenses

| Scene | Artist | Source | License |
| --- | --- | --- | --- |
| Copenhagen Harbor by Moonlight | Johan Christian Dahl | [The Met 439343](https://www.metmuseum.org/art/collection/search/439343) | Public Domain / Met Open Access |
| Distant View of Niagara Falls | Thomas Cole | [Art Institute of Chicago 90048](https://www.artic.edu/artworks/90048/distant-view-of-niagara-falls) | Public Domain / CC0 |
| View of Cotopaxi | Frederic Edwin Church | [Art Institute of Chicago 76571](https://www.artic.edu/artworks/76571/view-of-cotopaxi) | Public Domain / CC0 |
| Pastoral Landscape: The Roman Campagna | Claude Lorrain | [The Met 435906](https://www.metmuseum.org/art/collection/search/435906) | Public Domain / Met Open Access |
| A Colonnade in Ruins | Hubert Robert | [The Met 437475](https://www.metmuseum.org/art/collection/search/437475) | Public Domain / Met Open Access |
| Paris Street; Rainy Day | Gustave Caillebotte | [Art Institute of Chicago 20684](https://www.artic.edu/artworks/20684/paris-street-rainy-day) | Public Domain / CC0 |
| Parthenon Afterlight | Frederic Edwin Church | [The Met 10482](https://www.metmuseum.org/art/collection/search/10482) | Public Domain / Met Open Access |
| Arches in Ruins | Hubert Robert | [The Met 437472](https://www.metmuseum.org/art/collection/search/437472) | Public Domain / Met Open Access |
| Tivoli Morning | Thomas Cole | [The Met 10500](https://www.metmuseum.org/art/collection/search/10500) | Public Domain / Met Open Access |
| The Aegean Sea | Frederic Edwin Church | [The Met 10480](https://www.metmuseum.org/art/collection/search/10480) | Public Domain / Met Open Access |
| Heart of the Andes | Frederic Edwin Church | [The Met 10481](https://www.metmuseum.org/art/collection/search/10481) | Public Domain / Met Open Access |
| The Oxbow | Thomas Cole | [The Met 10497](https://www.metmuseum.org/art/collection/search/10497) | Public Domain / Met Open Access |
| The Mountain Ford | Thomas Cole | [The Met 10496](https://www.metmuseum.org/art/collection/search/10496) | Public Domain / Met Open Access |
| Catskill Autumn | Thomas Cole | [The Met 10501](https://www.metmuseum.org/art/collection/search/10501) | Public Domain / Met Open Access |
| Rocky Mountains | Albert Bierstadt | [The Met 10154](https://www.metmuseum.org/art/collection/search/10154) | Public Domain / Met Open Access |

The Metropolitan Museum of Art and the Art Institute of Chicago make the
listed public-domain images available under their Open Access/CC0 programs.
The table above records the original 15-scene collection. The 37-work expansion
and its authoritative object-by-object credits are in
[`LICENSES.md`](LICENSES.md).

`catalog.json` is the machine-readable attribution ledger. Every catalog entry
must have a matching local image, named artist, source page, license, and motion
type.

`catalog.js` contains the same entries for the Electron renderer, and
`thumbnails/<id>.webp` contains a 320 × 180 gallery preview for each full-size
image. Gallery settings load those previews lazily; choosing a scene is what
decodes its 2560 × 1440 artwork.

`curated-artworks.json` is the source-pinned, reproducible manifest for the
37-work expansion. Its source-image SHA-256 values, normalized image hashes,
and crop records are preserved in `catalog.json`.

New artwork must go through the reproducible, museum-host-allowlisted importer
described in
[`docs/artwork-import-pipeline.md`](../../docs/artwork-import-pipeline.md).
The importer refuses uncertain-origin or generated art, non-open rights,
upscaling, unexpected redirects, animated sources, and duplicate images.
