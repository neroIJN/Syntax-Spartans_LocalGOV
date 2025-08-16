const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MySQLAppointment = sequelize.define('Appointment', {
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
  serviceName: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  department: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  timeSlot: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'),
    defaultValue: 'pending'
  },
  location: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  queueNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  estimatedWaitTime: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('low', 'normal', 'high', 'urgent'),
    defaultValue: 'normal'
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  officerNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'appointments',
  timestamps: true,
  indexes: [
    {
      fields: ['userId', 'appointmentDate']
    },
    {
      fields: ['status', 'appointmentDate']
    },
    {
      fields: ['appointmentDate']
    }
  ]
});

module.exports = MySQLAppointment;
