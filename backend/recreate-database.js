const { sequelize } = require('./config/database');

async function dropDatabase() {
  console.log('🗑️  Dropping and recreating database...');
  console.log('=====================================');

  try {
    // Drop the database
    await sequelize.query('DROP DATABASE IF EXISTS localgov_db');
    console.log('✅ Database dropped successfully');

    // Create the database
    await sequelize.query('CREATE DATABASE localgov_db');
    console.log('✅ Database created successfully');

    console.log('');
    console.log('🚀 Database is now clean and ready!');
    console.log('💡 Restart the server to initialize fresh database schema.');

  } catch (error) {
    console.error('❌ Error recreating database:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

// Run the script
dropDatabase();
