const { sequelize } = require('./config/database');

async function dropDatabase() {
  console.log('🗑️  Dropping and recreating database...');
  console.log('=======================================');

  try {
    // Drop the database if it exists
    await sequelize.query('DROP DATABASE IF EXISTS localgov_db');
    console.log('✅ Database dropped successfully');

    // Create the database
    await sequelize.query('CREATE DATABASE localgov_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    console.log('✅ Database created successfully');

    console.log('');
    console.log('🚀 Database reset complete!');
    console.log('💡 You can now restart the backend server');

  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

// Run the script
dropDatabase();
