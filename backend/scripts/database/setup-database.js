const mysql = require('mysql2/promise');
require('dotenv').config();

const setupDatabase = async () => {
  try {
    console.log('🔍 Setting up MySQL Database...\n');

    // Connect to MySQL without specifying database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`✅ Database '${process.env.DB_NAME}' created or already exists`);

    // Close connection
    await connection.end();
    console.log('✅ Database setup completed successfully!');
    
    console.log('\n🚀 Now you can run the backend server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('\n🔧 Please check:');
    console.error('1. MySQL is running on your system');
    console.error('2. Your MySQL credentials in .env file are correct');
    console.error('3. The MySQL user has CREATE DATABASE permissions');
    process.exit(1);
  }
};

setupDatabase();
