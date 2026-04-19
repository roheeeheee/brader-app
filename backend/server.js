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

// 1. Apply CORS globally
app.use(cors(corsOptions));

// 2. Body parsing
app.use(express.json());

// 3. Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── ROUTES ──────────────────────────────────────────────

// Explicitly handle all OPTIONS requests before routes to ensure they don't 405
app.options('*', cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// ── CATCH-ALL ───────────────────────────────────────────

// This middleware only runs if NONE of the routes above matched.
// We use a broader match that avoids the PathError in Node 22 while 
// ensuring we don't return 405 for valid but slow-loading routes.
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ 
      message: `API Route ${req.method} ${req.path} not found.` 
    });
  }
  next();
});

// ── START SERVER ────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});