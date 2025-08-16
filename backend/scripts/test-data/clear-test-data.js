const { initializeMySQLDatabase } = require('./config/database');
const MySQLAppointment = require('./models/MySQLAppointment');
const MySQLNotification = require('./models/MySQLNotification');
const MySQLDocument = require('./models/MySQLDocument');

async function clearTestData() {
  console.log('🧹 Clearing Test Data...');
  console.log('========================');

  try {
    // Initialize MySQL Database
    await initializeMySQLDatabase();
    console.log('✅ MySQL Database connected successfully');

    // Clear appointments
    const deletedAppointments = await MySQLAppointment.destroy({
      where: {},
      force: true // Hard delete
    });
    console.log(`🗑️  Deleted ${deletedAppointments} appointments`);

    // Clear notifications
    const deletedNotifications = await MySQLNotification.destroy({
      where: {},
      force: true // Hard delete
    });
    console.log(`🗑️  Deleted ${deletedNotifications} notifications`);

    // Clear documents
    const deletedDocuments = await MySQLDocument.destroy({
      where: {},
      force: true // Hard delete
    });
    console.log(`🗑️  Deleted ${deletedDocuments} documents`);

    console.log('');
    console.log('✅ All test data cleared successfully!');
    console.log('🚀 Ready for fresh testing from frontend!');
    console.log('');
    console.log('Note: User accounts are preserved for login testing.');

  } catch (error) {
    console.error('❌ Error clearing test data:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
clearTestData();
