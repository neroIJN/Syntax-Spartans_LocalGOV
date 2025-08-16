const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MySQLNotification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('info', 'warning', 'success', 'error'),
    defaultValue: 'info'
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  readAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  relatedType: {
    type: DataTypes.ENUM('appointment', 'document', 'system', 'payment'),
    allowNull: true
  },
  relatedId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  actionUrl: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('low', 'normal', 'high'),
    defaultValue: 'normal'
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'notifications',
  timestamps: true,
  indexes: [
    {
      fields: ['userId', 'isRead']
    },
    {
      fields: ['userId', 'createdAt']
    },
    {
      fields: ['type']
    },
    {
      fields: ['relatedType', 'relatedId']
    }
  ]
});

module.exports = MySQLNotification;
