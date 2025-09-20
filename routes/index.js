const express = require('express');
const router = express.Router();

// Import controllers
const homeController = require('../controllers/homeController');
const newsController = require('../controllers/newsController');

// Import middleware
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Home routes
router.get('/', homeController.getInfo);
router.get('/health', homeController.healthCheck);

// News API routes
router.get('/api/search', cacheMiddleware, newsController.searchNews);
router.get('/api/find/title', cacheMiddleware, newsController.findByTitle);
router.get('/api/find/author', cacheMiddleware, newsController.findByAuthor);
router.get('/api/find/keywords', cacheMiddleware, newsController.findByKeywords);


module.exports = router;
