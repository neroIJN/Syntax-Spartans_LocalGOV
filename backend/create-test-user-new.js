const bcrypt = require('bcryptjs');
const MySQLUser = require('./models/MySQLUser');
const { initializeMySQLDatabase } = require('./config/database');

async function createTestUser() {
    try {
        await initializeMySQLDatabase();
        console.log('✅ MySQL Database connection established successfully.');

        // Hash the password
        const hashedPassword = await bcrypt.hash('testuser123', 10);

        // Create the test user
        const user = await MySQLUser.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            password: hashedPassword,
            nicNumber: '123456789V',
            phoneNumber: '+94771234567',
            address: '123 Test Street, Colombo',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            userType: 'citizen',
            isEmailVerified: true,
            isActive: true
        });

        console.log('✅ Test user created successfully:', {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });

        console.log('\n📋 Test User Credentials:');
        console.log('Email: test@example.com');
        console.log('Password: testuser123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating test user:', error);
        process.exit(1);
    }
}

createTestUser();
