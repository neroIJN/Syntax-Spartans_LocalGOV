// Simple test script to test the MySQL auth endpoints

async function testLogin() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/mysql/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    const data = await response.json();
    console.log('Login response:', data);

    if (data.token) {
      console.log('Testing token verification...');
      const verifyResponse = await fetch('http://localhost:5000/api/auth/mysql/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`,
        },
      });

      const verifyData = await verifyResponse.json();
      console.log('Verification response:', verifyData);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testLogin();
