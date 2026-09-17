require('dotenv').config();

const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT;

app.use(requestLogger);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.send('My Week 2 API!');
});

app.post('/user', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Both name and email are required.'
    });
  }

  res.send(`Hello, ${name}!`);
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User ${id} profile`);
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});