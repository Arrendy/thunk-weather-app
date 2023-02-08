const axios = require('axios');
const express = require('express');

const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=XXX';
const app = express();

app.get('/articles', (req, res) => {
  axios.get(API_URL)
    .then(response => {
      const articles = response.data.articles;
      const structuredData = articles.map(article => {
        return {
          title: article.title,
          source: article.source.name,
          author: article.author,
          description: article.description,
          url: article.url,
          image: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content
        };
      });
      res.json(structuredData);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching data');
    });
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    const search_API_URL = `https://newsapi.org/v2/everything?q=${query}&apiKey=XXX`;

    axios.get(search_API_URL)
      .then(response => {
        const articles = response.data.articles;
        const structuredData = articles.map(article => {
          return {
            title: article.title,
            source: article.source.name,
            author: article.author,
            description: article.description,
            url: article.url,
            image: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content
          };
        });
        res.json(structuredData);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching data');
      });
  });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});