class HomeController {
  // Get API info and available endpoints
  getInfo(req, res) {
    res.json({
      message: 'News API Server',
      version: '1.0.0',
      author: 'alfasoon',
      endpoints: {
        search: '/api/search?q={query}&lang={language}&country={country}&max={limit}',
        findByTitle: '/api/find/title?title={title_text}',
        findByAuthor: '/api/find/author?author={author_name}',
        findByKeywords: '/api/find/keywords?keywords={keyword1,keyword2}'
      },
      timestamp: new Date().toISOString()
    });
  }

  // Health check endpoint
  healthCheck(req, res) {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }
}

module.exports = new HomeController();
