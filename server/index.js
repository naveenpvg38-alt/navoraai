require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Ensure database tables and seed are initialized
require('./database');

const authRoutes = require('./routes/authRoutes');
const planRoutes = require('./routes/planRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'NAVORA AI',
    version: '1.0.0',
    tagline: 'Plan Less. Experience More.',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes with /api prefix
app.use('/api/auth', authRoutes);
app.use('/api', planRoutes);
app.use('/api', profileRoutes);

// Also mount without /api prefix for maximum compatibility with spec Section 34
app.use('/auth', authRoutes);
app.use('/', planRoutes);
app.use('/', profileRoutes);

// Serve static frontend in production if built
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Fallback handler for client SPA in production
app.use((req, res, next) => {
  // If request is for an API route that didn't match, pass 404
  if (req.url.startsWith('/api') || req.url.startsWith('/auth') || req.url.startsWith('/planner')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  // Otherwise serve client SPA index.html if it exists
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      next();
    }
  });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`✦ NAVORA AI Server running on http://localhost:${PORT}`);
  console.log(`✦ Environment: ${process.env.NODE_ENV || 'development'}`);
});
