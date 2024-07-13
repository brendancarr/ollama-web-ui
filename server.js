const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Proxy requests to Ollama server
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:11434',
  changeOrigin: true,
}));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});