const { initializeMySQLDatabase } = require('./config/database');
const MySQLUser = require('./models/MySQLUser');

async function createTestUser() {
  console.log('🔧 Creating Test User...');
  console.log('========================');

  try {
    // Initialize MySQL Database
    await initializeMySQLDatabase();
    console.log('✅ MySQL Database connected successfully');

    // Check if test user already exists
    const existingUser = await MySQLUser.findOne({
      where: { email: 'test@example.com' }
    });

    if (existingUser) {
      console.log('⚠️  Test user already exists:');
      console.log(`   Email: ${existingUser.email}`);
      console.log(`   Name: ${existingUser.firstName} ${existingUser.lastName}`);
      console.log(`   NIC: ${existingUser.nicNumber}`);
      console.log('');
      console.log('You can login with:');
      console.log('   Email: test@example.com');
      console.log('   Password: password123');
      process.exit(0);
    }

    // Create test user
    const testUser = await MySQLUser.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123', // Will be hashed automatically
      nicNumber: '123456789V',
      phoneNumber: '+94771234567',
      address: '123 Test Street, Colombo',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      userType: 'citizen'
    });

    console.log('✅ Test user created successfully!');
    console.log('');
    console.log('Login Details:');
    console.log('==============');
    console.log('Email: test@example.com');
    console.log('Password: password123');
    console.log('');
    console.log('User Info:');
    console.log(`ID: ${testUser.id}`);
    console.log(`Name: ${testUser.firstName} ${testUser.lastName}`);
    console.log(`NIC: ${testUser.nicNumber}`);
    console.log(`Phone: ${testUser.phoneNumber}`);
    console.log('');
    console.log('🚀 You can now test login in the frontend!');

  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
createTestUser();
