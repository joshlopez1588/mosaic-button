# Mosaic button

A "Get started" button built as a 40 × 14 field of tiles. Tiles light up under the
pointer and leave a fading trail, the surface leans away from the pointer, and a
press sends a ring of light outward.

**Live demo:** https://joshlopez1588.github.io/mosaic-button/

No dependencies and no build step: one HTML file, one stylesheet, one ES module.

## The challenge

This was built for a YouTube "vibe coder vs senior developer" button challenge.
My comment on the video:

> I decided to join this challenge myself as I was watching YouTube and did it in
> 9 minutes and 26 seconds. I ended up feeding it a video and a photo and just gave
> it about six prompts, but all within the 9 minutes and 26 seconds because it was
> cooking. I used Opus 5. I'm a vibe coder, and I have no idea what I'm doing. This
> is so cool. I would love to join a challenge like this. The video is still going
> on as this comment is coming in lol https://github.com/joshlopez1588/mosaic-button
> Yes devs are cooked.

Every prompt I sent, word for word, plus the method: [PROMPTS.md](PROMPTS.md).

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
