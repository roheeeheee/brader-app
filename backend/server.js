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

// Use a REGEX for options to avoid the PathError wildcard crash
app.options(/^(.*)$/, cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// ── CATCH-ALL ───────────────────────────────────────────

// This is the safest way to catch unmatched routes without using '*'
// We place it at the end of the stack.
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ 
      message: `API Route ${req.method} ${req.originalUrl} not found.` 
    });
  }
  // Optional: Handle non-API 404s or serve frontend
  res.status(404).send('Not Found');
});

// ── START SERVER ────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});