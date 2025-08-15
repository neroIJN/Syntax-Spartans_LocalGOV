const MySQLAppointment = require('../models/MySQLAppointment');
const MySQLUser = require('../models/MySQLUser');
const { Op } = require('sequelize');

// @desc    Get all appointments for logged in user
// @route   GET /api/mysql/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, upcoming = false } = req.query;
    
    let whereClause = { userId: req.user.id };
    
    if (status && status !== 'all') {
      whereClause.status = status;
    }

    // If requesting upcoming appointments, filter by future dates
    if (upcoming === 'true') {
      whereClause.appointmentDate = {
        [Op.gte]: new Date()
      };
      whereClause.status = {
        [Op.in]: ['pending', 'confirmed']
      };
    }

    const appointments = await MySQLAppointment.findAndCountAll({
      where: whereClause,
      order: [['appointmentDate', upcoming === 'true' ? 'ASC' : 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });

    res.json({
      success: true,
      count: appointments.rows.length,
      total: appointments.count,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(appointments.count / limit)
      },
      data: appointments.rows
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving appointments'
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/mysql/appointments/:id
// @access  Private
const getAppointment = async (req, res) => {
  try {
    const appointment = await MySQLAppointment.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving appointment'
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/mysql/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const {
      serviceName,
      department,
      appointmentDate,
      timeSlot,
      location,
      description,
      priority = 'normal'
    } = req.body;

    // Check if time slot is available
    const existingAppointment = await MySQLAppointment.findOne({
      where: {
        appointmentDate: new Date(appointmentDate),
        timeSlot,
        status: {
          [Op.in]: ['pending', 'confirmed']
        }
      }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Time slot is already booked'
      });
    }

    // Generate queue number for the day
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const appointmentCount = await MySQLAppointment.count({
      where: {
        appointmentDate: {
          [Op.between]: [startOfDay, endOfDay]
        },
        status: {
          [Op.ne]: 'cancelled'
        }
      }
    });

    const appointment = await MySQLAppointment.create({
      userId: req.user.id,
      serviceName,
      department,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      location,
      description,
      priority,
      queueNumber: appointmentCount + 1,
      estimatedWaitTime: (appointmentCount * 30) // 30 minutes per appointment
    });

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating appointment'
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/mysql/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const appointment = await MySQLAppointment.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Only allow updates if appointment is pending or confirmed
    if (!['pending', 'confirmed'].includes(appointment.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot update appointment in current status'
      });
    }

    const {
      appointmentDate,
      timeSlot,
      description,
      priority
    } = req.body;

    const fieldsToUpdate = {};
    if (appointmentDate) fieldsToUpdate.appointmentDate = new Date(appointmentDate);
    if (timeSlot) fieldsToUpdate.timeSlot = timeSlot;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (priority) fieldsToUpdate.priority = priority;

    await appointment.update(fieldsToUpdate);

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating appointment'
    });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/mysql/appointments/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await MySQLAppointment.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Appointment is already cancelled'
      });
    }

    if (appointment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed appointment'
      });
    }

    await appointment.update({
      status: 'cancelled',
      cancellationReason: req.body.reason || 'Cancelled by citizen'
    });

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error cancelling appointment'
    });
  }
};

// @desc    Get dashboard data (upcoming appointments)
// @route   GET /api/mysql/appointments/dashboard
// @access  Private
const getDashboardAppointments = async (req, res) => {
  try {
    const upcomingAppointments = await MySQLAppointment.findAll({
      where: {
        userId: req.user.id,
        appointmentDate: {
          [Op.gte]: new Date()
        },
        status: {
          [Op.in]: ['pending', 'confirmed']
        }
      },
      order: [['appointmentDate', 'ASC']],
      limit: 5
    });

    res.json({
      success: true,
      data: upcomingAppointments
    });
  } catch (error) {
    console.error('Get dashboard appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving dashboard appointments'
    });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment: cancelAppointment, // Use cancelAppointment for deleteAppointment
  confirmAppointment: updateAppointment, // Use updateAppointment for confirmAppointment  
  rescheduleAppointment: updateAppointment, // Use updateAppointment for rescheduleAppointment
  getAvailableSlots: getAppointments, // Placeholder - use getAppointments for now
  getDashboardAppointments
};
