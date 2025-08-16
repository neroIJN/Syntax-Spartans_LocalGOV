const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Users route - To be implemented'
  });
});

module.exports = router;
