const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000/api/auth/mysql';

// Test data
const testUser = {
  firstName: 'Photo',
  lastName: 'Test',
  email: 'phototest@example.com',
  password: 'TestPassword123!',
  nicNumber: '199012345678', // Valid NIC format
  phoneNumber: '+94771234567',
  address: '123 Test Street, Colombo',
  dateOfBirth: '1990-01-01',
  gender: 'male'
};

let authToken = '';

// Create a sample image file for testing
function createTestImage() {
  const testImagePath = path.join(__dirname, 'test-photo.txt');
  const testImageContent = 'This is a test file representing an image for photo upload testing.';
  
  if (!fs.existsSync(testImagePath)) {
    fs.writeFileSync(testImagePath, testImageContent);
    console.log('✅ Test image file created:', testImagePath);
  }
  
  return testImagePath;
}

// Test 1: Register user with photo
async function testRegisterWithPhoto() {
  try {
    console.log('\n🧪 Testing user registration with photo upload...');
    
    const testImagePath = createTestImage();
    const formData = new FormData();
    
    // Add user data
    Object.keys(testUser).forEach(key => {
      formData.append(key, testUser[key]);
    });
    
    // Add photo file
    formData.append('photo', fs.createReadStream(testImagePath), {
      filename: 'test-photo.jpg',
      contentType: 'image/jpeg'
    });
    
    const response = await axios.post(`${BASE_URL}/register`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 10000
    });
    
    console.log('✅ Registration successful:', response.data.message);
    authToken = response.data.token;
    console.log('📝 Auth token saved for subsequent tests');
    
    return response.data;
  } catch (error) {
    console.error('❌ Registration failed:', error.response?.data || error.message);
    throw error;
  }
}

// Test 2: Get user photo
async function testGetUserPhoto() {
  try {
    console.log('\n🧪 Testing get user photo...');
    
    if (!authToken) {
      throw new Error('No auth token available. Registration may have failed.');
    }
    
    const response = await axios.get(`${BASE_URL}/photo`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    console.log('✅ Photo retrieved successfully:', response.data.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('ℹ️ No photo found for user (expected if photo upload failed)');
    } else {
      console.error('❌ Get photo failed:', error.response?.data || error.message);
    }
    return null;
  }
}

// Test 3: Update user photo
async function testUpdateUserPhoto() {
  try {
    console.log('\n🧪 Testing update user photo...');
    
    if (!authToken) {
      throw new Error('No auth token available. Registration may have failed.');
    }
    
    const testImagePath = createTestImage();
    const formData = new FormData();
    
    // Add photo file
    formData.append('photo', fs.createReadStream(testImagePath), {
      filename: 'updated-photo.jpg',
      contentType: 'image/jpeg'
    });
    
    const response = await axios.put(`${BASE_URL}/photo`, formData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        ...formData.getHeaders(),
      }
    });
    
    console.log('✅ Photo updated successfully:', response.data.data);
    return response.data;
  } catch (error) {
    console.error('❌ Update photo failed:', error.response?.data || error.message);
    return null;
  }
}

// Test 4: Login and verify photo access
async function testLoginAndPhotoAccess() {
  try {
    console.log('\n🧪 Testing login and photo access...');
    
    const loginResponse = await axios.post(`${BASE_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    
    console.log('✅ Login successful');
    const newToken = loginResponse.data.token;
    
    // Try to get photo with new token
    const photoResponse = await axios.get(`${BASE_URL}/photo`, {
      headers: {
        'Authorization': `Bearer ${newToken}`
      }
    });
    
    console.log('✅ Photo access with login token successful:', photoResponse.data.data);
    return photoResponse.data;
  } catch (error) {
    console.error('❌ Login or photo access failed:', error.response?.data || error.message);
    return null;
  }
}

// Clean up test files
function cleanup() {
  const testImagePath = path.join(__dirname, 'test-photo.txt');
  if (fs.existsSync(testImagePath)) {
    fs.unlinkSync(testImagePath);
    console.log('🧹 Test image file cleaned up');
  }
}

// Main test runner
async function runPhotoUploadTests() {
  console.log('🚀 Starting Photo Upload System Tests...');
  console.log('=====================================');
  
  try {
    // Test registration with photo
    await testRegisterWithPhoto();
    
    // Wait a moment for processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test get photo
    await testGetUserPhoto();
    
    // Test update photo
    await testUpdateUserPhoto();
    
    // Test login and photo access
    await testLoginAndPhotoAccess();
    
    console.log('\n🎉 All photo upload tests completed!');
    console.log('=====================================');
    
  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
  } finally {
    cleanup();
  }
}

// Check if server is running
async function checkServer() {
  try {
    await axios.get('http://localhost:5000');
    return true;
  } catch (error) {
    return false;
  }
}

// Run tests
(async () => {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Server is not running on http://localhost:5000');
    console.log('Please start the server with: npm start');
    process.exit(1);
  }
  
  await runPhotoUploadTests();
})();
