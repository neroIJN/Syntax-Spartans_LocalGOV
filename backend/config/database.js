const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// MySQL Configuration with Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+05:30' // Sri Lankan timezone
  }
);

// Test MySQL connection
const testMySQLConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error.message);
    throw error;
  }
};

// Initialize MySQL database
const initializeMySQLDatabase = async () => {
  try {
    await testMySQLConnection();
    
    // Import models to ensure they are registered
    require('../models/MySQLUser');
    require('../models/MySQLAppointment');
    require('../models/MySQLNotification');
    require('../models/MySQLDocument');
    require('../models/UserPhoto');
    
    // Sync all models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ MySQL Database synchronized successfully.');
  } catch (error) {
    console.error('❌ MySQL Database initialization failed:', error.message);
    throw error;
  }
};

module.exports = {
  sequelize,
  testMySQLConnection,
  initializeMySQLDatabase,
  DataTypes
};
