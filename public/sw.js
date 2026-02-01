/// <reference lib="webworker" />

const CACHE_VERSION = "v3";
const STATIC_CACHE = `samtalekort-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `samtalekort-runtime-${CACHE_VERSION}`;

// Static assets to precache
const STATIC_ASSETS = [
  "/",
  "/spil",
  "/favoritter",
  "/statistik",
  "/manifest.json",
  "/icons/icon.svg",
];

// Files to never cache
const NEVER_CACHE = [
  "/api/",
  "/_next/webpack-hmr",
  "/sw.js",
];

// Install event - precache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("[SW] Precaching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => 
            name.startsWith("samtalekort-") && 
            name !== STATIC_CACHE && 
            name !== RUNTIME_CACHE
          )
          .map((name) => {
            console.log("[SW] Deleting old cache:", name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Helper: Check if URL should never be cached
function shouldNeverCache(url) {
  return NEVER_CACHE.some((path) => url.includes(path));
}

// Helper: Check if request is a navigation request
function isNavigationRequest(request) {
  return request.mode === "navigate";
}

// Helper: Check if request is for a static asset
function isStaticAsset(url) {
  return (
    url.includes("/_next/static/") ||
    url.includes("/icons/") ||
    url.match(/\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/i)
  );
}

// Fetch event - smart caching strategies
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip external requests
  if (!url.startsWith(self.location.origin)) return;

  // Skip requests that should never be cached
  if (shouldNeverCache(url)) return;

  // Strategy: Cache First for static assets (JS, CSS, images)
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request, RUNTIME_CACHE));
    return;
  }

  // Strategy: Stale While Revalidate for navigation/HTML
  if (isNavigationRequest(event.request)) {
    event.respondWith(staleWhileRevalidate(event.request, STATIC_CACHE));
    return;
  }

  // Default: Network First with cache fallback
  event.respondWith(networkFirst(event.request, RUNTIME_CACHE));
});

// Cache First Strategy - great for immutable assets
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return a fallback offline response
    return new Response("Offline", { 
      status: 503, 
      statusText: "Service Unavailable" 
    });
  }
}

// Stale While Revalidate - returns cached version immediately, updates in background
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  // Return cached immediately if available, otherwise wait for network
  return cached || networkPromise || new Response("Offline", { status: 503 });
}

// Network First Strategy - great for dynamic content
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // For navigation requests, return the cached home page
    if (isNavigationRequest(request)) {
      return caches.match("/");
    }

    return new Response("Offline", { 
      status: 503, 
      statusText: "Service Unavailable" 
    });
  }
}

// Handle messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
