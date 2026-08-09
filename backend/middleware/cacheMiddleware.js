// Simple high-performance in-memory cache for GET endpoints
const cacheStore = new Map();

/**
 * Cache middleware for Express GET requests
 * @param {number} durationSeconds - Cache duration in seconds (default 60s)
 */
const cacheMiddleware = (durationSeconds = 60) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = req.originalUrl || req.url;
    const cachedItem = cacheStore.get(key);
    const now = Date.now();

    if (cachedItem && cachedItem.expiry > now) {
      // Set HTTP Caching headers
      res.setHeader(
        "Cache-Control",
        `public, max-age=${durationSeconds}, s-maxage=${durationSeconds * 5}, stale-while-revalidate=600`
      );
      res.setHeader("X-Cache", "HIT");
      return res.status(cachedItem.status).json(cachedItem.body);
    }

    // Intercept res.json to capture response
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      // Store in memory cache if status is 2xx
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheStore.set(key, {
          body,
          status: res.statusCode,
          expiry: Date.now() + durationSeconds * 1000,
        });
      }

      res.setHeader(
        "Cache-Control",
        `public, max-age=${durationSeconds}, s-maxage=${durationSeconds * 5}, stale-while-revalidate=600`
      );
      res.setHeader("X-Cache", "MISS");
      return originalJson(body);
    };

    next();
  };
};

/**
 * Purge cache entries by matching key prefix or substring
 * @param {string} prefix - Key prefix to clear (e.g. "/api/events", "/api/projects")
 */
const clearCache = (prefix = "") => {
  if (!prefix) {
    cacheStore.clear();
    return;
  }
  for (const key of cacheStore.keys()) {
    if (key.includes(prefix)) {
      cacheStore.delete(key);
    }
  }
};

module.exports = { cacheMiddleware, clearCache };
