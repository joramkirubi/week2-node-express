require('dotenv').config();
const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(requestLogger);       // custom logging middleware (bonus)
app.use(express.json());      // JSON body parsing
app.use(express.static(path.join(__dirname, 'public'))); // serves index.html at GET /

// --- Routes ---

// GET / is handled automatically by express.static above (public/index.html).
// This route gives the plain-text "My Week 2 API!" response the assignment asks for.
app.get('/api', (req, res) => {
  res.send('My Week 2 API!');
});

// POST /user -> accepts { name, email }, responds "Hello, [name]!"
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Both "name" and "email" are required.' });
  }

  res.send(`Hello, ${name}!`);
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User ${id} profile`);
});

// --- 404 handler (for any route not matched above) ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Central error-handling middleware ---
// Catches errors passed via next(err) or thrown in async route handlers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
