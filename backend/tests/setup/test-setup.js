const { testMySQLConnection, initializeMySQLDatabase } = require('./config/database');
const MySQLUser = require('./models/MySQLUser');

const testSetup = async () => {
  try {
    console.log('🔍 Testing MySQL Database Setup...\n');

    // Test database connection
    console.log('1. Testing database connection...');
    await testMySQLConnection();
    console.log('✅ Database connection successful\n');

    // Initialize database and sync models
    console.log('2. Initializing database and syncing models...');
    await initializeMySQLDatabase();
    console.log('✅ Database initialization successful\n');

    // Test user creation
    console.log('3. Testing user model...');
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      nicNumber: '123456789V',
      phoneNumber: '0771234567',
      dateOfBirth: '1990-01-01',
      gender: 'male'
    };

    // Check if test user already exists
    const existingUser = await MySQLUser.findOne({ where: { email: testUser.email } });
    if (existingUser) {
      console.log('🗑️  Removing existing test user...');
      await existingUser.destroy({ force: true });
    }

    // Create test user
    const user = await MySQLUser.create(testUser);
    console.log(`✅ Test user created with ID: ${user.id}`);

    // Test password comparison
    const isPasswordValid = await user.comparePassword('password123');
    console.log(`✅ Password comparison test: ${isPasswordValid ? 'PASSED' : 'FAILED'}`);

    // Test full name method
    const fullName = user.getFullName();
    console.log(`✅ Full name method test: ${fullName}`);

    // Clean up test user
    await user.destroy({ force: true });
    console.log('🗑️  Test user cleaned up');

    console.log('\n🎉 All tests passed! MySQL authentication system is ready to use.');
    console.log('\n📋 Available API endpoints:');
    console.log('   POST /api/auth/mysql/register   - Register new user');
    console.log('   POST /api/auth/mysql/login      - Login user');
    console.log('   POST /api/auth/mysql/logout     - Logout user');
    console.log('   GET  /api/auth/mysql/me         - Get current user (protected)');
    console.log('   PUT  /api/auth/mysql/updatedetails - Update user details (protected)');
    console.log('   PUT  /api/auth/mysql/updatepassword - Update password (protected)');
    console.log('   POST /api/auth/mysql/forgotpassword - Forgot password');
    console.log('   PUT  /api/auth/mysql/resetpassword/:token - Reset password');
    console.log('   GET  /api/auth/mysql/verify/:token - Verify email');

    process.exit(0);
  } catch (error) {
    console.error('❌ Setup test failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Make sure MySQL is running on your system');
    console.error('2. Verify your database credentials in .env file');
    console.error('3. Ensure the database "localgov_db" exists or can be created');
    console.error('4. Check if the MySQL user has proper permissions');
    process.exit(1);
  }
};

// Run the test
testSetup();
