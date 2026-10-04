// Smoke test: drives mosaic-button.js with a stub DOM and a manual clock.
// Run with: node mosaic-button.test.mjs
import assert from "node:assert/strict";

const COLS = 40;
const ROWS = 14;

let clock = 0;
const frames = [];
let alphas = [];

const ctx = {
  clearRect: () => (alphas = []),
  fillRect() {
    alphas.push(this.globalAlpha);
  },
};
const canvas = { clientWidth: 480, clientHeight: 160, setAttribute() {}, getContext: () => ctx };
const surface = { prepend() {}, style: { setProperty() {}, removeProperty() {} } };
const handlers = {};
const button = {
  querySelector: () => surface,
  addEventListener: (type, handler) => (handlers[type] = handler),
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 480, height: 160 }),
};

Object.assign(globalThis, {
  matchMedia: () => ({ matches: false }),
  window: { devicePixelRatio: 2 },
  document: { createElement: () => canvas },
  getComputedStyle: () => ({ getPropertyValue: () => "#000" }),
  requestAnimationFrame: (callback) => frames.push(callback),
  ResizeObserver: class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      this.callback();
    }
  },
});
Object.defineProperty(globalThis, "performance", { value: { now: () => clock } });

const { attachMosaic } = await import("./mosaic-button.js");
attachMosaic(button);

function run(ms) {
  for (const end = clock + ms; clock < end && frames.length; ) {
    clock += 16;
    frames.shift()(clock);
  }
}

// Each tile is drawn twice (base, then lit overlay); the overlay alpha is its level.
function brightness(fromCol, toCol) {
  let sum = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = fromCol; col < toCol; col++) sum += alphas[(row * COLS + col) * 2 + 1];
  }
  return sum / (ROWS * (toCol - fromCol));
}

assert.equal(alphas.length / 2, COLS * ROWS, "draws a 40 x 14 grid");
const idleLeft = brightness(0, 12);
const idleRight = brightness(28, 40);

handlers.pointermove({ clientX: 60, clientY: 80 });
run(400);
assert.ok(brightness(0, 12) > idleLeft * 3, "tiles near the pointer light up");
assert.ok(Math.abs(brightness(28, 40) - idleRight) < 0.01, "tiles far from the pointer stay at rest");

handlers.pointerleave();
run(10_000);
assert.ok(Math.abs(brightness(0, 12) - idleLeft) < 0.01, "tiles dim back to rest");
assert.equal(frames.length, 0, "the animation loop sleeps once settled");

handlers.pointerdown({ clientX: 60, clientY: 80 });
handlers.pointerleave();
run(450);
assert.ok(brightness(23, 27) > idleRight * 2, "a press sends a ripple outward");
run(10_000);
assert.equal(frames.length, 0, "the loop sleeps after the ripple leaves");

console.log("mosaic-button: ok");
