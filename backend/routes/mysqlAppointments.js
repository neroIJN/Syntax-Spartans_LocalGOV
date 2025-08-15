const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getDashboardAppointments,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  confirmAppointment,
  rescheduleAppointment,
  getAvailableSlots
} = require('../controllers/mysqlAppointmentController');

const { protectMySQL } = require('../middleware/auth');

// Health check route (no auth required)
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Appointments API is working',
    timestamp: new Date().toISOString()
  });
});

// Apply authentication middleware to all other routes
router.use(protectMySQL);

// Dashboard route
router.get('/dashboard', getDashboardAppointments);

// Available slots route
router.get('/slots', getAvailableSlots);

// CRUD routes
router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

// Special action routes
router.put('/:id/confirm', confirmAppointment);
router.put('/:id/reschedule', rescheduleAppointment);

module.exports = router;
