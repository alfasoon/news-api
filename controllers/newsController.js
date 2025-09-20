const gnewsService = require('../services/gnewsService');
const cache = require('../services/cacheService');

class NewsController {
  // Main search function - handles basic news search
  async searchNews(req, res) {
    try {
      const { q, lang = 'en', country = 'us', max = 10 } = req.query;
      
      if (!q) {
        return res.status(400).json({
          error: 'Query parameter "q" is required'
        });
      }

      const articles = await gnewsService.searchNews(q, { lang, country, max });
      
      const response = {
        query: q,
        totalArticles: articles.length,
        articles: articles,
        cached: false,
        timestamp: new Date().toISOString()
      };

      // Cache the response
      const cacheKey = cache.generateKey(req.path, req.query);
      cache.set(cacheKey, response);
      
      res.json(response);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({
        error: 'Failed to search news articles',
        message: error.message
      });
    }
  }

  // Search for articles by exact title match
  async findByTitle(req, res) {
    try {
      const { title } = req.query;
      
      if (!title) {
        return res.status(400).json({
          error: 'Query parameter "title" is required'
        });
      }

      const articles = await gnewsService.findByTitle(title);
      
      const response = {
        searchType: 'title',
        searchTerm: title,
        totalArticles: articles.length,
        articles: articles,
        cached: false,
        timestamp: new Date().toISOString()
      };

      // Cache the response
      const cacheKey = cache.generateKey(req.path, req.query);
      cache.set(cacheKey, response);
      
      res.json(response);
    } catch (error) {
      console.error('Find by title error:', error);
      res.status(500).json({
        error: 'Failed to find articles by title',
        message: error.message
      });
    }
  }

  // Find articles by author name
  async findByAuthor(req, res) {
    try {
      const { author } = req.query;
      
      if (!author) {
        return res.status(400).json({
          error: 'Query parameter "author" is required'
        });
      }

      const articles = await gnewsService.findByAuthor(author);
      
      const response = {
        searchType: 'author',
        searchTerm: author,
        totalArticles: articles.length,
        articles: articles,
        cached: false,
        timestamp: new Date().toISOString()
      };

      // Cache the response
      const cacheKey = cache.generateKey(req.path, req.query);
      cache.set(cacheKey, response);
      
      res.json(response);
    } catch (error) {
      console.error('Find by author error:', error);
      res.status(500).json({
        error: 'Failed to find articles by author',
        message: error.message
      });
    }
  }

  // Find articles by multiple keywords
  async findByKeywords(req, res) {
    try {
      const { keywords } = req.query;
      
      if (!keywords) {
        return res.status(400).json({
          error: 'Query parameter "keywords" is required'
        });
      }

      const keywordArray = keywords.split(',').map(k => k.trim());
      const articles = await gnewsService.findByKeywords(keywordArray);
      
      const response = {
        searchType: 'keywords',
        searchTerms: keywordArray,
        totalArticles: articles.length,
        articles: articles,
        cached: false,
        timestamp: new Date().toISOString()
      };

      // Cache the response
      const cacheKey = cache.generateKey(req.path, req.query);
      cache.set(cacheKey, response);
      
      res.json(response);
    } catch (error) {
      console.error('Find by keywords error:', error);
      res.status(500).json({
        error: 'Failed to find articles by keywords',
        message: error.message
      });
    }
  }

}

module.exports = new NewsController();
