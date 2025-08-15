const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
router.get('/', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Notifications route - To be implemented'
  });
});

module.exports = router;
