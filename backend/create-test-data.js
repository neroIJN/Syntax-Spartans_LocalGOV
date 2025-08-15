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

    // Add free service appointments
    const appointment3 = await MySQLAppointment.create({
      userId: user.id,
      serviceName: 'Community Health Consultation',
      department: 'Public Health Department',
      appointmentDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      timeSlot: '9:00 AM',
      status: 'confirmed',
      location: 'Health Center',
      description: 'Free health consultation and basic medical advice',
      queueNumber: 5,
      estimatedWaitTime: 15
    });

    const appointment4 = await MySQLAppointment.create({
      userId: user.id,
      serviceName: 'Legal Aid Consultation',
      department: 'Legal Aid Commission',
      appointmentDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      timeSlot: '11:00 AM',
      status: 'confirmed',
      location: 'Legal Aid Office',
      description: 'Free legal advice and consultation',
      queueNumber: 2,
      estimatedWaitTime: 45
    });

    const appointment5 = await MySQLAppointment.create({
      userId: user.id,
      serviceName: 'Social Welfare Benefits Consultation',
      department: 'Social Welfare Department',
      appointmentDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      timeSlot: '1:30 PM',
      status: 'pending',
      location: 'Welfare Office',
      description: 'Consultation about available social welfare programs',
      queueNumber: 8,
      estimatedWaitTime: 30
    });

    const appointment6 = await MySQLAppointment.create({
      userId: user.id,
      serviceName: 'Job Placement Consultation',
      department: 'Employment Services',
      appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      timeSlot: '3:00 PM',
      status: 'confirmed',
      location: 'Employment Center',
      description: 'Free job placement assistance and career guidance',
      queueNumber: 1,
      estimatedWaitTime: 0
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
      title: 'Free Health Consultation Confirmed',
      message: 'Your free community health consultation is confirmed for ' + appointment3.appointmentDate.toDateString() + ' at 9:00 AM',
      type: 'success',
      relatedType: 'appointment',
      relatedId: appointment3.id,
      priority: 'high'
    });

    const notification3 = await MySQLNotification.create({
      userId: user.id,
      title: 'Legal Aid Appointment Ready',
      message: 'Your free legal aid consultation appointment is scheduled. Please bring relevant documents.',
      type: 'info',
      relatedType: 'appointment',
      relatedId: appointment4.id,
      priority: 'normal'
    });

    const notification4 = await MySQLNotification.create({
      userId: user.id,
      title: 'Job Placement Services Available',
      message: 'Your job placement consultation is confirmed. Free career guidance and placement assistance available.',
      type: 'success',
      relatedType: 'appointment',
      relatedId: appointment6.id,
      priority: 'normal'
    });

    const notification5 = await MySQLNotification.create({
      userId: user.id,
      title: 'Document Verification Pending',
      message: 'Your uploaded utility bill document is pending verification by our staff',
      type: 'warning',
      relatedType: 'document',
      priority: 'normal'
    });

    const notification6 = await MySQLNotification.create({
      userId: user.id,
      title: 'New Free Services Available',
      message: 'Additional free consultation services are now available: Agricultural Extension, Environmental Consultation, and more.',
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
