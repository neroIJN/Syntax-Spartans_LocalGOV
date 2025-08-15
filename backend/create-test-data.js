const { sequelize } = require('./config/database');
const MySQLUser = require('./models/MySQLUser');
const MySQLAppointment = require('./models/MySQLAppointment');
const MySQLNotification = require('./models/MySQLNotification');
const MySQLDocument = require('./models/MySQLDocument');

const createTestData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');

    // Find a test user (assuming you have one from previous tests)
    const user = await MySQLUser.findOne({
      where: {
        email: 'niroshanijn@gmail.com'
      }
    });

    if (!user) {
      console.log('No test user found with email niroshanijn@gmail.com');
      console.log('Please create a user first by registering through the frontend');
      return;
    }

    console.log(`Found test user: ${user.firstName} ${user.lastName}`);

    // Create test appointments
    const appointment1 = await MySQLAppointment.create({
      userId: user.id,
      serviceName: 'National ID Renewal',
      department: 'Department of Registration of Persons',
      appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      timeSlot: '10:30 AM',
      status: 'confirmed',
      location: 'Colombo District Office',
      description: 'Renewal of National Identity Card',
      queueNumber: 15,
      estimatedWaitTime: 30
    });

    const appointment2 = await MySQLAppointment.create({
      userId: user.id,
      serviceName: 'Birth Certificate Copy',
      department: 'Registrar General\'s Department',
      appointmentDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      timeSlot: '2:00 PM',
      status: 'pending',
      location: 'Gampaha District Office',
      description: 'Request for certified copy of birth certificate'
    });

    console.log('Created test appointments');

    // Create test notifications
    const notification1 = await MySQLNotification.create({
      userId: user.id,
      title: 'Appointment Confirmed',
      message: 'Your National ID renewal appointment has been confirmed for ' + appointment1.appointmentDate.toDateString(),
      type: 'success',
      relatedType: 'appointment',
      relatedId: appointment1.id,
      priority: 'high'
    });

    const notification2 = await MySQLNotification.create({
      userId: user.id,
      title: 'Document Verification Pending',
      message: 'Your uploaded utility bill document is pending verification by our staff',
      type: 'warning',
      relatedType: 'document',
      priority: 'normal'
    });

    const notification3 = await MySQLNotification.create({
      userId: user.id,
      title: 'New Service Available',
      message: 'Online Driving License Renewal is now available through our digital platform',
      type: 'info',
      relatedType: 'system',
      priority: 'low',
      isRead: true,
      readAt: new Date()
    });

    console.log('Created test notifications');

    // Create test documents
    const document1 = await MySQLDocument.create({
      userId: user.id,
      name: 'National ID Copy',
      originalName: 'national_id_copy.pdf',
      fileName: 'national_id_copy_' + Date.now() + '.pdf',
      fileType: 'PDF',
      mimeType: 'application/pdf',
      fileSize: 2458624, // 2.4 MB
      filePath: '/uploads/documents/national_id_copy_' + Date.now() + '.pdf',
      status: 'verified',
      category: 'identity',
      description: 'Certified copy of National Identity Card',
      verifiedBy: user.id, // Use the same user as verifier for testing
      verifiedAt: new Date()
    });

    const document2 = await MySQLDocument.create({
      userId: user.id,
      name: 'Utility Bill',
      originalName: 'electricity_bill.pdf',
      fileName: 'electricity_bill_' + Date.now() + '.pdf',
      fileType: 'PDF',
      mimeType: 'application/pdf',
      fileSize: 1887436, // 1.8 MB
      filePath: '/uploads/documents/electricity_bill_' + Date.now() + '.pdf',
      status: 'pending',
      category: 'address',
      description: 'Latest electricity bill for address verification'
    });

    const document3 = await MySQLDocument.create({
      userId: user.id,
      name: 'Passport Photo',
      originalName: 'passport_photo.jpg',
      fileName: 'passport_photo_' + Date.now() + '.jpg',
      fileType: 'JPG',
      mimeType: 'image/jpeg',
      fileSize: 876543, // 856 KB
      filePath: '/uploads/documents/passport_photo_' + Date.now() + '.jpg',
      status: 'verified',
      category: 'identity',
      description: 'Passport size photograph',
      verifiedBy: user.id, // Use the same user as verifier for testing
      verifiedAt: new Date()
    });

    console.log('Created test documents');

    console.log('\n✅ Test data created successfully!');
    console.log(`\nTest data summary for user ${user.firstName} ${user.lastName}:`);
    console.log(`- ${await MySQLAppointment.count({ where: { userId: user.id } })} appointments`);
    console.log(`- ${await MySQLNotification.count({ where: { userId: user.id } })} notifications`);
    console.log(`- ${await MySQLDocument.count({ where: { userId: user.id } })} documents`);

  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    await sequelize.close();
  }
};

createTestData();
