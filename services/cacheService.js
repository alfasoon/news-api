class InMemoryCache {
  constructor(defaultTTL = 300) {
    this.cache = new Map();
    this.defaultTTL = defaultTTL; // 5 minutes default
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0
    };
  }

  // Generate cache key from URL and query params
  generateKey(url, query = {}) {
    const sortedQuery = Object.keys(query)
      .sort()
      .map(key => `${key}=${query[key]}`)
      .join('&');
    
    return sortedQuery ? `${url}?${sortedQuery}` : url;
  }

  // Set cache entry with TTL
  set(key, value, ttl = this.defaultTTL) {
    const expiresAt = Date.now() + (ttl * 1000);
    
    this.cache.set(key, {
      value,
      expiresAt,
      createdAt: Date.now()
    });
    
    this.stats.sets++;
    console.log(`Cache SET: ${key} (TTL: ${ttl}s)`);
  }

  // Get cached value if not expired
  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      console.log(`Cache MISS: ${key}`);
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.stats.misses++;
      console.log(`Cache EXPIRED: ${key}`);
      return null;
    }

    this.stats.hits++;
    console.log(`Cache HIT: ${key}`);
    return entry.value;
  }

  // Delete cache entry
  delete(key) {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.stats.deletes++;
      console.log(`Cache DELETE: ${key}`);
    }
    return deleted;
  }

  // Clear all cache entries
  clear() {
    const size = this.cache.size;
    this.cache.clear();
    console.log(`Cache CLEARED: ${size} entries removed`);
  }

  // Get cache statistics
  getStats() {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests * 100).toFixed(2) : 0;
    
    return {
      size: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
      sets: this.stats.sets,
      deletes: this.stats.deletes,
      hitRate: `${hitRate}%`,
      totalRequests
    };
  }

  /**
   * Clean expired entries
   * @returns {number} Number of entries cleaned
   */
  cleanExpired() {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`Cache CLEANUP: ${cleaned} expired entries removed`);
    }
    
    return cleaned;
  }

  // Get all cache keys
  getKeys() {
    return Array.from(this.cache.keys());
  }

  // Check if key exists and is not expired
  has(key) {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  // Get cache entry with metadata
  getWithMetadata(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    return {
      value: entry.value,
      createdAt: entry.createdAt,
      expiresAt: entry.expiresAt,
      ttl: Math.max(0, Math.floor((entry.expiresAt - Date.now()) / 1000))
    };
  }
}

// Create singleton instance
const cache = new InMemoryCache();

// Clean expired entries every 5 minutes
setInterval(() => {
  cache.cleanExpired();
}, 5 * 60 * 1000);

module.exports = cache;
