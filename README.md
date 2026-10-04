# Mosaic button

A "Get started" button built as a 40 × 14 field of tiles. Tiles light up under the
pointer and leave a fading trail, the surface leans away from the pointer, and a
press sends a ring of light outward.

No dependencies and no build step: one HTML file, one stylesheet, one ES module.

## Run

```sh
python3 -m http.server 5174
```

Then open http://localhost:5174.

## Test

```sh
node mosaic-button.test.mjs
```

## Tuning

- Colours and tilt: custom properties on `.mosaic` in `style.css`.
- Glow size, trail length, ripple speed: constants at the top of `mosaic-button.js`.

The button scales with its container, so the tile count is the same on a phone,
a tablet and a desktop. Touch and keyboard both trigger the ripple, and
`prefers-reduced-motion` turns the tilt and animation off.
