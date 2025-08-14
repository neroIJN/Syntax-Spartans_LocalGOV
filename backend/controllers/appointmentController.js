const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const User = require('../models/User');

// @desc    Get all appointments for logged in user
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = { citizen: req.user.id };
    
    if (status && status !== 'all') {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('service', 'name category department')
      .populate('officer', 'firstName lastName email')
      .sort({ appointmentDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      count: appointments.length,
      total,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      },
      data: appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      citizen: req.user.id
    })
    .populate('service', 'name category department requiredDocuments fees')
    .populate('officer', 'firstName lastName email phone');

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
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const {
      serviceId,
      appointmentDate,
      timeSlot,
      locationName,
      locationAddress,
      description
    } = req.body;

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check if time slot is available
    const existingAppointment = await Appointment.findOne({
      service: serviceId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Time slot is already booked'
      });
    }

    // Generate queue number
    const appointmentCount = await Appointment.countDocuments({
      appointmentDate: {
        $gte: new Date(appointmentDate).setHours(0, 0, 0, 0),
        $lt: new Date(appointmentDate).setHours(23, 59, 59, 999)
      },
      status: { $ne: 'cancelled' }
    });

    const appointment = await Appointment.create({
      citizen: req.user.id,
      service: serviceId,
      appointmentDate,
      timeSlot,
      department: service.department,
      location: {
        name: locationName,
        address: locationAddress
      },
      description,
      queueNumber: appointmentCount + 1,
      estimatedWaitTime: (appointmentCount * 30) // 30 minutes per appointment
    });

    await appointment.populate('service', 'name category department');

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during appointment creation'
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findOne({
      _id: req.params.id,
      citizen: req.user.id
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

    const { appointmentDate, timeSlot, description } = req.body;

    // If rescheduling, add to history
    if (appointmentDate && appointmentDate !== appointment.appointmentDate.toISOString()) {
      appointment.rescheduleHistory.push({
        oldDate: appointment.appointmentDate,
        newDate: new Date(appointmentDate),
        reason: req.body.rescheduleReason || 'Citizen requested',
        rescheduledBy: req.user.id
      });
      appointment.status = 'rescheduled';
    }

    const fieldsToUpdate = {
      appointmentDate: appointmentDate || appointment.appointmentDate,
      timeSlot: timeSlot || appointment.timeSlot,
      description: description || appointment.description
    };

    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    ).populate('service', 'name category department');

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during appointment update'
    });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      citizen: req.user.id
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

    appointment.status = 'cancelled';
    appointment.cancellationReason = req.body.reason || 'Cancelled by citizen';
    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during appointment cancellation'
    });
  }
};

// @desc    Get available time slots
// @route   GET /api/appointments/slots/:serviceId/:date
// @access  Private
const getAvailableSlots = async (req, res) => {
  try {
    const { serviceId, date } = req.params;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const appointmentDate = new Date(date);
    const dayName = appointmentDate.toLocaleLowerCase('en-us', { weekday: 'long' });

    // Get service's available slots for the day
    const daySlots = service.availableSlots.find(slot => slot.day === dayName);
    
    if (!daySlots) {
      return res.json({
        success: true,
        data: [],
        message: 'No slots available for this day'
      });
    }

    // Generate time slots
    const slots = [];
    const startTime = daySlots.startTime; // e.g., "09:00"
    const endTime = daySlots.endTime; // e.g., "17:00"
    const slotDuration = daySlots.slotDuration || 30;

    // Get already booked slots
    const bookedAppointments = await Appointment.find({
      service: serviceId,
      appointmentDate: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59, 999)
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    const bookedSlots = bookedAppointments.map(apt => apt.timeSlot);

    // Generate available slots (simplified logic)
    const timeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({
      success: true,
      data: availableSlots
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAvailableSlots
};
