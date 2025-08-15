const { initializeMySQLDatabase } = require('./config/database');
const MySQLUser = require('./models/MySQLUser');
const fs = require('fs');
const path = require('path');

async function checkDatabase() {
  console.log('🔍 Checking MySQL Database...');
  console.log('============================');

  try {
    // Initialize MySQL Database
    await initializeMySQLDatabase();
    console.log('✅ MySQL Database connected successfully\n');

    // Check MySQL users
    console.log('📊 Registered Users:');
    console.log('--------------------');
    
    const users = await MySQLUser.findAll({
      attributes: [
        'id', 'firstName', 'lastName', 'email', 'nicNumber', 
        'phoneNumber', 'userType', 'profilePicture', 'isEmailVerified', 
        'isActive', 'createdAt'
      ],
      order: [['createdAt', 'DESC']]
    });

    if (users.length === 0) {
      console.log('❌ No users found in database');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. User ID: ${user.id}`);
        console.log(`   Name: ${user.firstName} ${user.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   NIC: ${user.nicNumber}`);
        console.log(`   Phone: ${user.phoneNumber}`);
        console.log(`   Type: ${user.userType}`);
        console.log(`   Email Verified: ${user.isEmailVerified ? '✅' : '❌'}`);
        console.log(`   Active: ${user.isActive ? '✅' : '❌'}`);
        console.log(`   Created: ${user.createdAt}`);
        
        // Check profile picture
        if (user.profilePicture) {
          const photoPath = path.join(__dirname, 'uploads', user.profilePicture);
          const photoExists = fs.existsSync(photoPath);
          console.log(`   Profile Photo: ${user.profilePicture} ${photoExists ? '✅' : '❌ (file missing)'}`);
          
          if (photoExists) {
            const stats = fs.statSync(photoPath);
            console.log(`   Photo Size: ${(stats.size / 1024).toFixed(2)} KB`);
          }
        } else {
          console.log(`   Profile Photo: ❌ No photo uploaded`);
        }
        
        console.log('   ---');
      });
    }

    console.log('\n📈 Summary:');
    console.log('-----------');
    console.log(`Total Users: ${users.length}`);
    
    const usersWithPhotos = users.filter(user => user.profilePicture).length;
    console.log(`Users with Photos: ${usersWithPhotos}`);
    console.log(`Users without Photos: ${users.length - usersWithPhotos}`);
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    console.log('\n✅ Database check completed');
    process.exit(0);
  }
}

// Run the check
checkDatabase();
