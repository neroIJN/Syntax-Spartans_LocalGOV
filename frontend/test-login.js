// Login test script
const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing login API...');
    
    const response = await axios.post(
      'http://localhost:5000/api/auth/mysql/login',
      {
        email: 'niroshanijn@gmail.com',
        password: 'password123'
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      }
    );
    
    console.log('Login successful!');
    console.log('Token:', response.data.token);
    console.log('User data:', JSON.stringify(response.data.user, null, 2));
    
    return {
      success: true,
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    console.error('Login test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return {
      success: false,
      error: error.message
    };
  }
}

testLogin();
