const cache = require('../services/cacheService');

// Cache middleware - checks cache first, returns cached data if available
const cacheMiddleware = (req, res, next) => {
  const key = cache.generateKey(req.path, req.query);
  const cachedData = cache.get(key);
  
  if (cachedData) {
    return res.json({
      ...cachedData,
      cached: true,
      timestamp: new Date().toISOString()
    });
  }
  
  next();
};

module.exports = cacheMiddleware;
