// Syntax test script
const axios = require('axios');

async function testSyntax() {
  try {
    // 1. Test login API
    console.log('1. Testing login API...');
    const loginResponse = await axios.post(
      'http://localhost:5000/api/auth/mysql/login',
      {
        email: 'test@example.com',
        password: 'password123'
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    console.log('Login successful!');
    console.log(`Token: ${loginResponse.data.token.substring(0, 20)}...`);
    
    // 2. Test frontend routes
    console.log('\n2. Testing frontend routes...');
    const routes = [
      '/auth/login',
      '/dashboard',
      '/citizen/dashboard'
    ];
    
    for (const route of routes) {
      try {
        const response = await axios.get(`http://localhost:3000${route}`, {
          validateStatus: false,
        });
        console.log(`Route: ${route} - Status: ${response.status}`);
      } catch (error) {
        console.log(`Route: ${route} - Error: ${error.message}`);
      }
    }
    
    // 3. Test authentication flow
    console.log('\n3. Testing auth protection...');
    try {
      // Test with token
      const meResponse = await axios.get(
        'http://localhost:5000/api/auth/mysql/me',
        {
          headers: {
            'Authorization': `Bearer ${loginResponse.data.token}`
          }
        }
      );
      console.log('Auth check successful with token');
      console.log('User data:', JSON.stringify(meResponse.data.data || meResponse.data, null, 2));
    } catch (error) {
      console.log('Auth check failed:', error.message);
    }

    console.log('\nTest completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testSyntax();
