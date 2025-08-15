const { sequelize } = require('./config/database');
const MySQLNotification = require('./models/MySQLNotification');
const MySQLUser = require('./models/MySQLUser');

async function checkNotifications() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    
    const user = await MySQLUser.findOne({ where: { email: 'niroshanijn@gmail.com' } });
    if (!user) {
      console.log('User not found');
      return;
    }
    
    console.log('User ID:', user.id);
    
    const notifications = await MySQLNotification.findAll({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']]
    });
    
    console.log('Found notifications:', notifications.length);
    notifications.forEach(notif => {
      console.log('- ID:', notif.id, 'Title:', notif.title, 'Read:', notif.isRead, 'Type:', notif.type);
    });
    
    const unreadCount = await MySQLNotification.count({
      where: { userId: user.id, isRead: false }
    });
    console.log('Unread count:', unreadCount);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

checkNotifications();
