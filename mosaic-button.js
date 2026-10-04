/**
 * Mosaic button: a canvas tile field that lights up under the pointer, leans
 * away from it, and sends a ring of light outward on press.
 *
 * Each tile holds a brightness level from 0 (resting colour) to 1 (fully lit).
 * Every frame a tile eases towards its target level, quickly when brightening
 * and slowly when dimming, which is what leaves the trail behind the pointer.
 */

// The button is 39.5 tiles wide, so the last column and last row are clipped.
const TILES_ACROSS = 39.5;
const GROUT_RATIO = 0.1; // grout width as a fraction of the tile pitch

const IDLE_LEVEL = 0.3; // brightest a tile gets with no pointer nearby
const GLOW_RADIUS = 6; // tiles; standard deviation of the pointer glow
const FLICKER_RATE = 3; // times per second a glowing tile re-rolls its sparkle
const ATTACK_RATE = 14; // per second; how fast a tile brightens
const RELEASE_RATE = 2.5; // per second; how fast a tile dims
const RIPPLE_SPEED = 45; // tiles per second
const RIPPLE_WIDTH = 2.5; // tiles
const SETTLED = 0.004; // level difference below which a tile counts as at rest

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

export function attachMosaic(button) {
  const surface = button.querySelector(".mosaic__surface");
  const canvas = document.createElement("canvas");
  canvas.className = "mosaic__tiles";
  canvas.setAttribute("aria-hidden", "true");
  surface.prepend(canvas);
  const ctx = canvas.getContext("2d");

  let cols = 0;
  let rows = 0;
  let pitch = 0; // tile size plus grout, in device pixels
  let tileColor = "";
  let litColor = "";
  let idle = new Float32Array(0); // resting level of each tile
  let sparkle = new Float32Array(0); // how strongly each tile answers the glow
  let levels = new Float32Array(0); // current level of each tile

  let pointer = null; // { x, y } in tile units, or null when away
  let ripples = []; // { x, y, born }
  let frame = 0;
  let lastTime = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    pitch = canvas.width / TILES_ACROSS;
    cols = Math.ceil(TILES_ACROSS);
    rows = Math.ceil(canvas.height / pitch);

    if (levels.length !== cols * rows) {
      idle = Float32Array.from({ length: cols * rows }, () => IDLE_LEVEL * Math.random() ** 2);
      sparkle = Float32Array.from(idle, Math.random);
      levels = Float32Array.from(idle);
    }

    const styles = getComputedStyle(button);
    tileColor = styles.getPropertyValue("--tile");
    litColor = styles.getPropertyValue("--tile-lit");
    draw();
  }

  function draw() {
    // Snap to device pixels so the grout stays crisp at any size or zoom.
    const grout = Math.max(1, Math.round(pitch * GROUT_RATIO));
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < levels.length; i++) {
      const col = i % cols;
      const row = (i - col) / cols;
      const x = Math.round(col * pitch);
      const y = Math.round(row * pitch);
      const width = Math.round((col + 1) * pitch) - x - grout;
      const height = Math.round((row + 1) * pitch) - y - grout;

      ctx.globalAlpha = 1;
      ctx.fillStyle = tileColor;
      ctx.fillRect(x, y, width, height);
      ctx.globalAlpha = levels[i];
      ctx.fillStyle = litColor;
      ctx.fillRect(x, y, width, height);
    }
  }

  function targetLevel(i, now) {
    const x = (i % cols) + 0.5;
    const y = Math.floor(i / cols) + 0.5;
    let target = idle[i];

    if (pointer) {
      const distance = Math.hypot(x - pointer.x, y - pointer.y);
      target += sparkle[i] * Math.exp(-(distance ** 2) / (2 * GLOW_RADIUS ** 2));
    }

    for (const ripple of ripples) {
      const radius = ((now - ripple.born) / 1000) * RIPPLE_SPEED;
      const offset = Math.hypot(x - ripple.x, y - ripple.y) - radius;
      const fade = 1 - radius / rippleReach();
      target += fade * Math.exp(-((offset / RIPPLE_WIDTH) ** 2));
    }

    return Math.min(1, target);
  }

  // Distance at which a ripple has left the button from any starting point.
  function rippleReach() {
    return Math.hypot(cols, rows) + RIPPLE_WIDTH;
  }

  function step(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    ripples = ripples.filter(
      (ripple) => ((now - ripple.born) / 1000) * RIPPLE_SPEED < rippleReach(),
    );

    let moving = pointer !== null || ripples.length > 0;
    for (let i = 0; i < levels.length; i++) {
      if (pointer && Math.random() < FLICKER_RATE * dt) sparkle[i] = Math.random();

      const target = targetLevel(i, now);
      const rate = target > levels[i] ? ATTACK_RATE : RELEASE_RATE;
      levels[i] += (target - levels[i]) * (1 - Math.exp(-rate * dt));
      if (Math.abs(target - levels[i]) > SETTLED) moving = true;
    }

    draw();
    // Stop the loop once every tile is at rest; wake() restarts it.
    frame = moving ? requestAnimationFrame(step) : 0;
  }

  function wake() {
    if (frame || reducedMotion.matches) return;
    lastTime = performance.now();
    frame = requestAnimationFrame(step);
  }

  function track(event) {
    const box = button.getBoundingClientRect();
    const u = (event.clientX - box.left) / box.width;
    const v = (event.clientY - box.top) / box.height;

    pointer = { x: u * TILES_ACROSS, y: (v * canvas.height) / pitch };
    surface.style.setProperty("--lean-x", (u * 2 - 1).toFixed(3));
    surface.style.setProperty("--lean-y", (v * 2 - 1).toFixed(3));
    wake();
  }

  function release() {
    pointer = null;
    surface.style.removeProperty("--lean-x");
    surface.style.removeProperty("--lean-y");
    wake();
  }

  function ripple(x, y) {
    ripples.push({ x, y, born: performance.now() });
    wake();
  }

  button.addEventListener("pointermove", track);
  button.addEventListener("pointerdown", (event) => {
    track(event);
    ripple(pointer.x, pointer.y);
  });
  button.addEventListener("pointerleave", release);
  button.addEventListener("pointercancel", release);
  // Keyboard activation has no pointer position, so ripple from the centre.
  button.addEventListener("click", (event) => {
    if (event.detail === 0) ripple(cols / 2, rows / 2);
  });

  new ResizeObserver(resize).observe(canvas);
}
