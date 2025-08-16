const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all services
// @route   GET /api/services
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Services route - To be implemented'
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Single service route - To be implemented'
  });
});

module.exports = router;
