const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getUserPhoto,
  updateUserPhoto
} = require('../controllers/mysqlAuthController');

const { protectMySQL } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.post('/register', upload.single('photo'), register); // Added photo upload
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/verify/:token', verifyEmail);

// Protected routes
router.get('/me', protectMySQL, getMe);
router.put('/updatedetails', protectMySQL, updateDetails);
router.put('/updatepassword', protectMySQL, updatePassword);

// Photo routes
router.get('/photo', protectMySQL, getUserPhoto);
router.put('/photo', protectMySQL, upload.single('photo'), updateUserPhoto);

module.exports = router;
