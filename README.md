# News-api

**News API server with GNews integration, search functionality, and caching**

<p>Version 1.0.0</p>
<p>by alfasoon &lt;alfasoon@gmail.com&gt;</p>

<hr/>

 - Built a custom in-memory caching system (no Redis needed)
 - Uses native fetch API instead of axios for HTTP requests
 - Cache keys are generated from URL paths and query parameters
 - Expired cache entries get cleaned up every 5 minutes automatically
 - Focus on find endpoints - search by title, author, or keywords
 - Comprehensive error handling with descriptive messages and timestamps
 - TODO: Add rate limiting when I have more time


![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-GNews-FF6B6B?style=for-the-badge&logo=api&logoColor=white)
![Cache](https://img.shields.io/badge/Cache-In--Memory-4ECDC4?style=for-the-badge&logo=cache&logoColor=white)


## ⭐ Public Url

https://github.com/alfasoon/news-api

## 📚 Tech Stack

 - Node.js
 - Express.js
 - JavaScript
 - GNews API
 - Custom In-Memory Cache
 - Fetch API
 - CORS


## 📸 Screenshots

N.A

## 📜 Scripts

```sh
start : $ node server.js
dev : $ nodemon server.js
test : $ echo "Error: no test specified" && exit 1

```

## 🔑 Keywords



## 👾 Submit issues at

https://github.com/alfasoon/news-api/issues

## ©️ License

ISC

## Dependencies

 - express : $ ^4.18.2
 - cors : $ ^2.8.5


## Dev Dependencies

 - nodemon : $ ^3.0.1


<img src="https://cdn.dribbble.com/users/2401141/screenshots/5487982/developers-gif-showcase.gif"


## Documentations

 - README.md - Complete API documentation with examples
 - server.js - Main server implementation with all routes
 - services/gnewsService.js - GNews API integration
 - services/cacheService.js - Custom caching system implementation
 - controllers/ - Controller files for different API endpoints
 -   homeController.js - Home and health check endpoints
 -   newsController.js - News search and find operations
 - routes/index.js - Route definitions and middleware setup
 - middleware/cacheMiddleware.js - Cache middleware for API routes
 - 
 - ## 🚀 API Endpoints
 - 
 - ### Base URL
 - &#x60;&#x60;&#x60;
 - http://localhost:3000
 - &#x60;&#x60;&#x60;
 - 
 - ### API Structure
 - This API focuses on **find endpoints** rather than complex advanced search. It provides:
 - - **Basic Search**: Simple news search with essential parameters
 - - **Find Endpoints**: Specialized search by title, author, or keywords
 - - **Cache Management**: Built-in caching system for performance
 - - **Health Monitoring**: Health check endpoint
 - 
 - **Note**: The find endpoints tend to work better than basic search in most cases.
 - 
 - ### Available Endpoints
 - 
 - | Method | Endpoint | Description | Parameters |
 - |--------|----------|-------------|------------|
 - | GET | &#x60;/api/search&#x60; | Search news articles | &#x60;q&#x3D;{query}&#x60;, &#x60;lang&#x3D;{language}&#x60;, &#x60;country&#x3D;{country}&#x60;, &#x60;max&#x3D;{limit}&#x60; |
 - | GET | &#x60;/api/find/title&#x60; | Find articles by title | &#x60;title&#x3D;{title_text}&#x60; |
 - | GET | &#x60;/api/find/author&#x60; | Find articles by author | &#x60;author&#x3D;{author_name}&#x60; |
 - | GET | &#x60;/api/find/keywords&#x60; | Find articles by keywords | &#x60;keywords&#x3D;{keyword1,keyword2}&#x60; |
 - | GET | &#x60;/health&#x60; | Health check endpoint | None |
 - 
 - ### Example Usage
 - 
 - Here are some working examples:
 - 
 - &#x60;&#x60;&#x60;bash
 - # Basic search for news
 - curl &quot;http://localhost:3000/api/search?q&#x3D;technology&amp;lang&#x3D;en&amp;country&#x3D;us&amp;max&#x3D;5&quot;
 - 
 - # Find by title
 - curl &quot;http://localhost:3000/api/find/title?title&#x3D;artificial intelligence&quot;
 - 
 - # Find by author
 - curl &quot;http://localhost:3000/api/find/author?author&#x3D;Reuters&quot;
 - 
 - # Find by keywords
 - curl &quot;http://localhost:3000/api/find/keywords?keywords&#x3D;climate,environment&quot;
 - 
 - # Health check
 - curl &quot;http://localhost:3000/health&quot;
 - &#x60;&#x60;&#x60;
 - 
 - **Note:** All query parameters are replaceable with your desired values.
 - 
 - ### Find Endpoints Examples by Country
 - 
 - Here are some country-specific examples:
 - 
 - #### 🇮🇳 India News Examples
 - &#x60;&#x60;&#x60;bash
 - # Find Indian news by title
 - curl &quot;http://localhost:3000/api/find/title?title&#x3D;India economy&quot;
 - 
 - # Find Indian news by author/source
 - curl &quot;http://localhost:3000/api/find/author?author&#x3D;Times of India&quot;
 - 
 - # Find Indian news by keywords
 - curl &quot;http://localhost:3000/api/find/keywords?keywords&#x3D;india,politics,modi&quot;
 - 
 - # Search Indian news
 - curl &quot;http://localhost:3000/api/search?q&#x3D;india&amp;country&#x3D;in&amp;lang&#x3D;en&amp;max&#x3D;10&quot;
 - &#x60;&#x60;&#x60;
 - 
 - #### 🇨🇳 China News Examples
 - &#x60;&#x60;&#x60;bash
 - # Find Chinese news by title
 - curl &quot;http://localhost:3000/api/find/title?title&#x3D;China technology&quot;
 - 
 - # Find Chinese news by author/source
 - curl &quot;http://localhost:3000/api/find/author?author&#x3D;China Daily&quot;
 - 
 - # Find Chinese news by keywords
 - curl &quot;http://localhost:3000/api/find/keywords?keywords&#x3D;china,economy,beijing&quot;
 - 
 - # Search Chinese news
 - curl &quot;http://localhost:3000/api/search?q&#x3D;china&amp;country&#x3D;cn&amp;lang&#x3D;en&amp;max&#x3D;10&quot;
 - &#x60;&#x60;&#x60;
 - 
 - #### 🇺🇸 US News Examples
 - &#x60;&#x60;&#x60;bash
 - # Find US news by title
 - curl &quot;http://localhost:3000/api/find/title?title&#x3D;America politics&quot;
 - 
 - # Find US news by author/source
 - curl &quot;http://localhost:3000/api/find/author?author&#x3D;CNN&quot;
 - 
 - # Find US news by keywords
 - curl &quot;http://localhost:3000/api/find/keywords?keywords&#x3D;america,technology,california&quot;
 - 
 - # Search US news
 - curl &quot;http://localhost:3000/api/search?q&#x3D;america&amp;country&#x3D;us&amp;lang&#x3D;en&amp;max&#x3D;10&quot;
 - &#x60;&#x60;&#x60;
 - 
 - **Note**: The keywords endpoint typically returns more results than title/author searches.
 - 
 - ### Supported Languages
 - 
 - The API supports multiple languages:
 - 
 - | Language | Code | Language | Code |
 - |----------|------|----------|------|
 - | English | &#x60;en&#x60; | Spanish | &#x60;es&#x60; |
 - | French | &#x60;fr&#x60; | German | &#x60;de&#x60; |
 - | Chinese | &#x60;zh&#x60; | Japanese | &#x60;ja&#x60; |
 - | Arabic | &#x60;ar&#x60; | Russian | &#x60;ru&#x60; |
 - | Portuguese | &#x60;pt&#x60; | Italian | &#x60;it&#x60; |
 - | Dutch | &#x60;nl&#x60; | Swedish | &#x60;sv&#x60; |
 - | Hindi | &#x60;hi&#x60; | Tamil | &#x60;ta&#x60; |
 - | And more... | | | |
 - 
 - ### Supported Countries
 - 
 - Supported countries include:
 - 
 - | Country | Code | Country | Code |
 - |---------|------|---------|------|
 - | United States | &#x60;us&#x60; | United Kingdom | &#x60;gb&#x60; |
 - | Canada | &#x60;ca&#x60; | Australia | &#x60;au&#x60; |
 - | Germany | &#x60;de&#x60; | France | &#x60;fr&#x60; |
 - | Japan | &#x60;jp&#x60; | China | &#x60;cn&#x60; |
 - | India | &#x60;in&#x60; | Brazil | &#x60;br&#x60; |
 - | Spain | &#x60;es&#x60; | Italy | &#x60;it&#x60; |
 - | And more... | | | |
 - 
 - **Note**: Tested with &#x60;us&#x60;, &#x60;in&#x60;, and &#x60;cn&#x60; - other countries should work as well.


<hr/>
Built with ❤️ using Node.js and Express.js
