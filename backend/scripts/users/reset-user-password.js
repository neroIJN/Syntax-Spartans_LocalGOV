const { initializeMySQLDatabase } = require('./config/database');
const MySQLUser = require('./models/MySQLUser');
const bcrypt = require('bcryptjs');

async function resetUserPassword() {
  console.log('🔧 Resetting User Password...');
  console.log('===============================');

  try {
    // Initialize MySQL Database
    await initializeMySQLDatabase();
    console.log('✅ MySQL Database connected successfully');

    // Find the user
    const user = await MySQLUser.findOne({
      where: { email: 'niroshanijn@gmail.com' }
    });

    if (!user) {
      console.log('❌ User not found');
      process.exit(1);
    }

    // Hash the new password
    const newPassword = 'password123';
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    await user.update({
      password: hashedPassword
    });

    console.log('✅ Password reset successfully!');
    console.log('');
    console.log('Login Details:');
    console.log('==============');
    console.log('Email: niroshanijn@gmail.com');
    console.log('Password: password123');
    console.log('');
    console.log('🚀 You can now test login!');

  } catch (error) {
    console.error('❌ Error resetting password:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
resetUserPassword();
