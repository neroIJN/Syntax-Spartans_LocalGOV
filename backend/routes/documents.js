const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all documents for user
// @route   GET /api/documents
// @access  Private
router.get('/', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Documents route - To be implemented'
  });
});

// @desc    Upload document
// @route   POST /api/documents/upload
// @access  Private
router.post('/upload', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Document upload route - To be implemented'
  });
});

module.exports = router;
