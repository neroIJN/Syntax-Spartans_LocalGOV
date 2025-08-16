const { sequelize } = require('./config/database');
const MySQLUser = require('./models/MySQLUser');

const checkUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');

    const user = await MySQLUser.findOne({
      where: {
        email: 'niroshanijn@gmail.com'
      }
    });

    if (user) {
      console.log('User found:', {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified
      });

      // Update user to be email verified
      await user.update({
        isEmailVerified: true
      });
      console.log('User updated: Email verified set to true');

    } else {
      console.log('User not found');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
};

checkUser();
