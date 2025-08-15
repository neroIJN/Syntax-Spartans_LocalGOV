const { initializeMySQLDatabase } = require('./config/database');
const MySQLAppointment = require('./models/MySQLAppointment');

async function checkAppointments() {
  console.log('🔍 Checking Current Appointments...');
  console.log('===================================');

  try {
    // Initialize MySQL Database
    await initializeMySQLDatabase();
    console.log('✅ MySQL Database connected successfully');

    // Get all appointments
    const appointments = await MySQLAppointment.findAll({
      order: [['createdAt', 'DESC']]
    });

    if (appointments.length === 0) {
      console.log('📋 No appointments found in database');
      console.log('💡 Create some appointments from the frontend to test!');
    } else {
      console.log(`📋 Found ${appointments.length} appointments:`);
      console.log('');
      
      appointments.forEach((apt, index) => {
        console.log(`${index + 1}. Appointment ID: ${apt.id}`);
        console.log(`   Service Name: "${apt.serviceName}"`);
        console.log(`   Department: "${apt.department}"`);
        console.log(`   Date: ${apt.appointmentDate}`);
        console.log(`   Time Slot: "${apt.timeSlot}"`);
        console.log(`   Status: ${apt.status}`);
        console.log(`   Location: "${apt.location}"`);
        console.log(`   User ID: ${apt.userId}`);
        console.log('   ---');
      });
    }

  } catch (error) {
    console.error('❌ Error checking appointments:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
checkAppointments();
