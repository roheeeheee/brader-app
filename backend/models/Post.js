const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'A post must have a title'],
    trim: true
  },
  body: { 
    type: String, 
    required: [true, 'A post must have content'] 
  },
  image: { 
    type: String, 
    default: '' 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['published', 'removed'], 
    default: 'published' 
  },
  tags: [{
    type: String
  }]
}, { 
  timestamps: true,
  // Ensure virtuals are included when converting to JSON (useful for front-end)
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexing for faster searches on the homepage
postSchema.index({ createdAt: -1 });
postSchema.index({ status: 1 });

module.exports = mongoose.model('Post', postSchema);