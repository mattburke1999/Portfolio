const CACHE_NAME = "games-v1";

const PRECACHE_URLS = [
  "games/fruit-merge/assets/index-CGxtAe97.css",
  "games/fruit-merge/assets/index-DbIEdW3L.js",
  "games/fruit-merge/index.html",
  "games/images/fruit-merge.png",
  "games/images/jumper.png",
  "games/images/solitaire.png",
  "games/images/sudoku.png",
  "games/index.html",
  "games/jumper/assets/index-BVxn2pB7.js",
  "games/jumper/assets/index-DX7L0S4t.css",
  "games/jumper/assets/jumper_wasm_bg-DFU07g8j.wasm",
  "games/jumper/index.html",
  "games/solitaire/assets/index-CxK_DShg.js",
  "games/solitaire/assets/index-fLNwAP4M.css",
  "games/solitaire/index.html",
  "games/styles.css",
  "games/sudoku/assets/index-BEW3mIi8.js",
  "games/sudoku/assets/index-BR_ZM9eD.css",
  "games/sudoku/index.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});