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
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// 1. Apply CORS globally
app.use(cors(corsOptions));

// 2. Handle Pre-flight requests immediately for ALL routes
// This MUST be defined before any other middleware or routes
app.options(/(.*)/, cors(corsOptions));

// 3. Body parsing
app.use(express.json());

// 4. Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── ROUTES ──────────────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// ── CATCH-ALL ───────────────────────────────────────────

// This middleware only runs if NONE of the routes above matched.
// We use app.use('/api', ...) to handle 404s for the API specifically.
app.use('/api', (req, res) => {
  res.status(404).json({ 
    message: `Route ${req.method} ${req.originalUrl} not found on this server.` 
  });
});

// ── START SERVER ────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});