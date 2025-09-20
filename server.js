const express = require('express');
const cors = require('cors');

// Import routes
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`
  });
});

app.listen(PORT, () => {
  console.log(`✅ News API Server running on port ${PORT}`);
  console.log(`📰 Available endpoints:`);
  console.log(`   GET  /api/search?q={query}`);
  console.log(`   GET  /api/find/title?title={title_text}`);
  console.log(`   GET  /api/find/author?author={author_name}`);
  console.log(`   GET  /api/find/keywords?keywords={keyword1,keyword2}`);
  console.log(`   GET  /api/cache/stats`);
  console.log(`   GET  /api/cache/keys`);
  console.log(`   DELETE /api/cache`);
  console.log(`   DELETE /api/cache/{key}`);
  console.log(`   GET  /health`);
});

module.exports = app;