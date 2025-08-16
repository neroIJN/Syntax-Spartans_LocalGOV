const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getDashboardNotifications,
  createNotification,
  getNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
} = require('../controllers/mysqlNotificationController');

const { protectMySQL } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(protectMySQL);

// Dashboard route
router.get('/dashboard', getDashboardNotifications);

// Unread count route
router.get('/unread-count', getUnreadCount);

// Mark all as read route
router.put('/mark-all-read', markAllAsRead);

// CRUD routes
router.route('/')
  .get(getNotifications)
  .post(createNotification);

router.route('/:id')
  .get(getNotification)
  .delete(deleteNotification);

// Mark as read route
router.put('/:id/read', markAsRead);

module.exports = router;
