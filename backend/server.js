require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Connect to MongoDB
connectDB();

// ── MIDDLEWARE ──────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000', 
  'http://127.0.0.1:3000', 
  'https://brader-app.vercel.app'
];

const corsOptions = { 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked this origin.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── ROUTES ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// ── CATCH-ALL ───────────────────────────────────────────
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ 
      message: `API Endpoint ${req.method} ${req.originalUrl} not found.` 
    });
  }
  next();
});

// Generic Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// ── START SERVER / EXPORT FOR VERCEL ────────────────────
const PORT = process.env.PORT || 5000;

// Only listen locally. Vercel handles the port dynamically in production.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

// 🚨 THIS IS CRITICAL FOR VERCEL SERVERLESS FUNCTIONS 🚨
module.exports = app;