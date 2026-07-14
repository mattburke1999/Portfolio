const CACHE_NAME = "games-v1";

const PRECACHE_URLS = [
  "games/fruit-merge/assets/index-CFjXyIZm.js",
  "games/fruit-merge/assets/index-MzBy2DX-.css",
  "games/fruit-merge/assets/rapier-C4VMFuMK.js",
  "games/fruit-merge/index.html",
  "games/images/fruit-merge.png",
  "games/images/jumper.png",
  "games/images/snake.png",
  "games/images/solitaire.png",
  "games/images/sudoku.png",
  "games/index.html",
  "games/jumper/assets/index-BVxn2pB7.js",
  "games/jumper/assets/index-DX7L0S4t.css",
  "games/jumper/assets/jumper_wasm_bg-DFU07g8j.wasm",
  "games/jumper/index.html",
  "games/manifest.webmanifest",
  "games/snake/assets/index-BFranSZW.css",
  "games/snake/assets/index-CQwL6T8T.js",
  "games/snake/assets/snake_wasm_bg-DiRI00uN.wasm",
  "games/snake/index.html",
  "games/solitaire/assets/index-CxK_DShg.js",
  "games/solitaire/assets/index-fLNwAP4M.css",
  "games/solitaire/index.html",
  "games/styles.css",
  "games/sudoku/assets/index-de1LFZu2.css",
  "games/sudoku/assets/index-rjPl03b4.js",
  "games/sudoku/index.html"
];
// cache font awesome from cdn
PRECACHE_URLS.push("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css");

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});