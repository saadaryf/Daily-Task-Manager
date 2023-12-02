const CACHE_NAME = 'my-static-site-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/svg/', // Include the folder itself in the cache
  // Add other files to cache
];

// Add individual SVG files inside the "svg" folder
const svgFiles = [
  '/svg/bookmark.svg',
  '/svg/pen-clip.svg',
  '/svg/plus.svg',
  '/svg/trash.svg',
  // Add other SVG files
];

// Concatenate the SVG files with the main cache array
const allUrlsToCache = urlsToCache.concat(svgFiles);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(allUrlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
