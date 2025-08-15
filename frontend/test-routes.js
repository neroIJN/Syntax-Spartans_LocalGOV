// Route tester script
const axios = require('axios');

// Array of routes to test
const routes = [
  '/auth/login',
  '/dashboard',
  '/citizen/dashboard',
];

// Test each route
async function testRoutes() {
  console.log('Testing routes availability:');
  console.log('----------------------------');
  
  for (const route of routes) {
    try {
      const response = await axios.get(`http://localhost:3000${route}`, {
        validateStatus: false, // Don't throw error on non-2xx status
      });
      
      console.log(`Route: ${route}`);
      console.log(`Status: ${response.status}`);
      console.log(`Redirected: ${response.request.path !== route ? 'Yes, to ' + response.request.path : 'No'}`);
      console.log('----------------------------');
    } catch (error) {
      console.error(`Error testing ${route}:`, error.message);
      console.log('----------------------------');
    }
  }
}

testRoutes();
