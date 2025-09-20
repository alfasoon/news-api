const GNEWS_API_KEY = 'cd9ab74138f5f98ceff4043eb470ae95';
const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

class GNewsService {
  constructor() {
    this.apiKey = GNEWS_API_KEY;
    this.baseUrl = GNEWS_BASE_URL;
  }

  // Make HTTP request to GNews API
  async makeRequest(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      
      // Add API key
      url.searchParams.append('apikey', this.apiKey);
      
      // Add other parameters
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });

      console.log(`Making request to: ${url.toString()}`);
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'News-API-Server/1.0.0'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(`API error: ${JSON.stringify(data.errors)}`);
      }

      return data;
    } catch (error) {
      console.error('GNews API request failed:', error);
      throw error;
    }
  }

  // Search for news articles
  async searchNews(query, options = {}) {
    const {
      lang = 'en',
      country = 'us',
      max = 10,
      in: searchIn = 'title,description',
      nullable = null,
      from = null,
      to = null,
      sortby = 'publishedAt',
      page = 1,
      expand = null
    } = options;

    const params = {
      q: query,
      lang,
      country,
      max,
      in: searchIn,
      sortby,
      page
    };

    // Add optional parameters only if they are provided
    if (nullable) params.nullable = nullable;
    if (from) params.from = from;
    if (to) params.to = to;
    if (expand) params.expand = expand;

    const response = await this.makeRequest('/search', params);
    return response.articles || [];
  }

  // Find articles by title
  async findByTitle(title) {
    try {
      // Search for articles and filter by title
      const articles = await this.searchNews(title, { max: 50 });
      
      // Filter articles that contain the title in their title field
      const filteredArticles = articles.filter(article => 
        article.title && 
        article.title.toLowerCase().includes(title.toLowerCase())
      );

      return filteredArticles.slice(0, 10); // Limit to 10 results
    } catch (error) {
      console.error('Error finding articles by title:', error);
      throw error;
    }
  }

  // Find articles by author/source
  async findByAuthor(author) {
    try {
      // Search for articles and filter by author/source
      const articles = await this.searchNews(author, { max: 50 });
      
      // Filter articles that contain the author in their source name
      const filteredArticles = articles.filter(article => 
        article.source && 
        article.source.name && 
        article.source.name.toLowerCase().includes(author.toLowerCase())
      );

      return filteredArticles.slice(0, 10); // Limit to 10 results
    } catch (error) {
      console.error('Error finding articles by author:', error);
      throw error;
    }
  }

  // Find articles by keywords
  async findByKeywords(keywords) {
    try {
      if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error('Keywords must be a non-empty array');
      }

      // Create a search query from keywords
      const query = keywords.join(' ');
      const articles = await this.searchNews(query, { max: 50 });
      
      // Filter articles that contain any of the keywords in title or content
      const filteredArticles = articles.filter(article => {
        const searchText = `${article.title || ''} ${article.content || ''}`.toLowerCase();
        return keywords.some(keyword => 
          searchText.includes(keyword.toLowerCase())
        );
      });

      return filteredArticles.slice(0, 10); // Limit to 10 results
    } catch (error) {
      console.error('Error finding articles by keywords:', error);
      throw error;
    }
  }

  // Get top headlines
  async getTopHeadlines(options = {}) {
    const {
      lang = 'en',
      country = 'us',
      max = 10,
      category = null
    } = options;

    const params = {
      lang,
      country,
      max
    };

    if (category) params.category = category;

    const response = await this.makeRequest('/top-headlines', params);
    return response.articles || [];
  }

  // Get articles by category
  async getArticlesByCategory(category, options = {}) {
    const {
      lang = 'en',
      country = 'us',
      max = 10
    } = options;

    const params = {
      category,
      lang,
      country,
      max
    };

    const response = await this.makeRequest('/top-headlines', params);
    return response.articles || [];
  }
}

module.exports = new GNewsService();

