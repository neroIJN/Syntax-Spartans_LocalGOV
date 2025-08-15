const MySQLNotification = require('../models/MySQLNotification');
const MySQLUser = require('../models/MySQLUser');
const { Op } = require('sequelize');

// @desc    Get all notifications for logged in user
// @route   GET /api/mysql/notifications
// @access  Private
const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10, unread = false } = req.query;
    
    let whereClause = { userId: req.user.id };
    
    if (unread === 'true') {
      whereClause.isRead = false;
    }

    const notifications = await MySQLNotification.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });

    res.json({
      success: true,
      count: notifications.rows.length,
      total: notifications.count,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(notifications.count / limit)
      },
      data: notifications.rows
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving notifications'
    });
  }
};

// @desc    Get dashboard notifications (recent unread)
// @route   GET /api/mysql/notifications/dashboard
// @access  Private
const getDashboardNotifications = async (req, res) => {
  try {
    const recentNotifications = await MySQLNotification.findAll({
      where: {
        userId: req.user.id
      },
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    const unreadCount = await MySQLNotification.count({
      where: {
        userId: req.user.id,
        isRead: false
      }
    });

    res.json({
      success: true,
      data: {
        notifications: recentNotifications,
        unreadCount
      }
    });
  } catch (error) {
    console.error('Get dashboard notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving dashboard notifications'
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/mysql/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const notification = await MySQLNotification.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    await notification.update({
      isRead: true,
      readAt: new Date()
    });

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error marking notification as read'
    });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/mysql/notifications/read-all
// @access  Private
const markAllAsRead = async (req, res) => {
  try {
    await MySQLNotification.update(
      {
        isRead: true,
        readAt: new Date()
      },
      {
        where: {
          userId: req.user.id,
          isRead: false
        }
      }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error marking all notifications as read'
    });
  }
};

// @desc    Create notification (for system use)
// @route   POST /api/mysql/notifications
// @access  Private (Admin only or system)
const createNotification = async (req, res) => {
  try {
    const {
      userId,
      title,
      message,
      type = 'info',
      relatedType,
      relatedId,
      actionUrl,
      priority = 'normal',
      expiresAt
    } = req.body;

    const notification = await MySQLNotification.create({
      userId,
      title,
      message,
      type,
      relatedType,
      relatedId,
      actionUrl,
      priority,
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating notification'
    });
  }
};

// @desc    Delete notification
// @route   DELETE /api/mysql/notifications/:id
// @access  Private
const deleteNotification = async (req, res) => {
  try {
    const notification = await MySQLNotification.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    await notification.destroy();

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting notification'
    });
  }
};

// Helper function to create system notifications
const createSystemNotification = async (userId, title, message, type = 'info', relatedType = null, relatedId = null) => {
  try {
    await MySQLNotification.create({
      userId,
      title,
      message,
      type,
      relatedType,
      relatedId
    });
  } catch (error) {
    console.error('Error creating system notification:', error);
  }
};

module.exports = {
  getNotifications,
  getDashboardNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
  getNotification: async (req, res) => {
    try {
      const notification = await MySQLNotification.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      });

      if (!notification) {
        return res.status(404).json({
          success: false,
          message: 'Notification not found'
        });
      }

      res.json({
        success: true,
        data: notification
      });
    } catch (error) {
      console.error('Get notification error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error retrieving notification'
      });
    }
  },
  deleteNotification,
  getUnreadCount: async (req, res) => {
    try {
      const count = await MySQLNotification.count({
        where: {
          userId: req.user.id,
          isRead: false
        }
      });

      res.json({
        success: true,
        count
      });
    } catch (error) {
      console.error('Get unread count error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error retrieving unread count'
      });
    }
  },
  createSystemNotification
};
