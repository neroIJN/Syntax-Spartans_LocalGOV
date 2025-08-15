const mongoose = require('mongoose');

const userPhotoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  cloudinaryUrl: {
    type: String // If using Cloudinary for cloud storage
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
userPhotoSchema.index({ userId: 1, isActive: 1 });
userPhotoSchema.index({ email: 1, isActive: 1 });

module.exports = mongoose.model('UserPhoto', userPhotoSchema);
