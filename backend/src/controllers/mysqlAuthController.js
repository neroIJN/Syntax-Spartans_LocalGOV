const crypto = require('crypto');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const MySQLUser = require('../models/MySQLUser');
const { sendTokenResponse } = require('../middleware/auth');

// @desc    Register user with photo upload
// @route   POST /api/auth/mysql/register
// @access  Public
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      nicNumber,
      phoneNumber,
      address,
      dateOfBirth,
      gender
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !nicNumber || !phoneNumber || !dateOfBirth || !gender) {
      // Clean up uploaded file if validation fails
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (error) {
          console.error('Error deleting uploaded file:', error);
        }
      }
      
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await MySQLUser.findOne({
      where: {
        [Op.or]: [
          { email },
          { nicNumber }
        ]
      }
    });

    if (existingUser) {
      // Clean up uploaded file if user already exists
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (error) {
          console.error('Error deleting uploaded file:', error);
        }
      }
      
      const field = existingUser.email === email ? 'email' : 'NIC number';
      return res.status(400).json({
        success: false,
        message: `User with this ${field} already exists`
      });
    }

    // Create user in MySQL with photo filename if provided
    const userData = {
      firstName,
      lastName,
      email,
      password,
      nicNumber,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      userType: 'citizen'
    };

    // Add profile picture filename if photo was uploaded
    if (req.file) {
      userData.profilePicture = req.file.filename;
    }

    const user = await MySQLUser.create(userData);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await user.save();

    console.log('User registered successfully:', user.email);
    if (req.file) {
      console.log('Profile photo saved:', req.file.filename);
    }

    sendTokenResponse(user, 201, res, req.file 
      ? 'User registered successfully with photo. Please check your email for verification.'
      : 'User registered successfully. Please check your email for verification.');
      
  } catch (error) {
    console.error('Registration error:', error);
    
    // Clean up uploaded file if registration fails
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }
    
    if (error.name === 'SequelizeValidationError') {
      const message = error.errors.map(err => err.message).join(', ');
      return res.status(400).json({
        success: false,
        message
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Email or NIC number already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/mysql/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await MySQLUser.findOne({
      where: { email, isActive: true }
    });

    console.log('User found:', !!user);
    if (user) {
      console.log('User details:', {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        passwordHash: user.password ? 'exists' : 'missing'
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    console.log('Comparing password...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/mysql/logout
// @access  Public
const logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

// @desc    Get current logged in user
// @route   GET /api/auth/mysql/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await MySQLUser.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'passwordResetToken', 'emailVerificationToken'] }
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user details
// @route   PUT /api/auth/mysql/updatedetails
// @access  Private
const updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await MySQLUser.findByPk(req.user.id);
    await user.update(fieldsToUpdate);

    res.status(200).json({
      success: true,
      message: 'User details updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update password
// @route   PUT /api/auth/mysql/updatepassword
// @access  Private
const updatePassword = async (req, res) => {
  try {
    const user = await MySQLUser.findByPk(req.user.id);

    // Check current password
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res, 'Password updated successfully');
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/mysql/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const user = await MySQLUser.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There is no user with that email'
      });
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save();

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/mysql/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      // Here you would send email
      // await sendEmail({
      //   email: user.email,
      //   subject: 'Password reset token',
      //   message
      // });

      res.status(200).json({
        success: true,
        message: 'Email sent',
        resetToken // Remove this in production
      });
    } catch (err) {
      console.log(err);
      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      await user.save();

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/mysql/resetpassword/:resettoken
// @access  Public
const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await MySQLUser.findOne({
      where: {
        passwordResetToken: resetPasswordToken,
        passwordResetExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Set new password
    user.password = req.body.password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    sendTokenResponse(user, 200, res, 'Password reset successful');
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Verify email
// @route   GET /api/auth/mysql/verify/:token
// @access  Public
const verifyEmail = async (req, res) => {
  try {
    const user = await MySQLUser.findOne({
      where: {
        emailVerificationToken: req.params.token,
        emailVerificationExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user photo
// @route   GET /api/auth/mysql/photo
// @access  Private
const getUserPhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find user with photo information
    const user = await MySQLUser.findByPk(userId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture']
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.profilePicture) {
      return res.status(404).json({
        success: false,
        message: 'No photo found for this user'
      });
    }

    // Check if file exists on filesystem
    const photoPath = path.join(__dirname, '../uploads', user.profilePicture);
    if (!fs.existsSync(photoPath)) {
      return res.status(404).json({
        success: false,
        message: 'Photo file not found on server'
      });
    }

    // Get file stats
    const stats = fs.statSync(photoPath);

    // Send photo information
    res.json({
      success: true,
      data: {
        userId: user.id,
        filename: user.profilePicture,
        size: stats.size,
        url: `/uploads/${user.profilePicture}`, // Relative URL for frontend
        uploadedBy: `${user.firstName} ${user.lastName}`
      }
    });

  } catch (error) {
    console.error('Get photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving photo'
    });
  }
};

// @desc    Update user photo
// @route   PUT /api/auth/mysql/photo
// @access  Private
const updateUserPhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a photo file'
      });
    }

    // Find the user
    const user = await MySQLUser.findByPk(userId);
    if (!user) {
      // Clean up uploaded file if user not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete old photo file if it exists
    if (user.profilePicture) {
      const oldPhotoPath = path.join(__dirname, '../uploads', user.profilePicture);
      try {
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
          console.log('Old photo deleted:', user.profilePicture);
        }
      } catch (deleteError) {
        console.error('Error deleting old photo:', deleteError);
        // Continue with update even if old photo deletion fails
      }
    }

    // Update user with new photo filename
    user.profilePicture = req.file.filename;
    await user.save();

    // Get file stats
    const stats = fs.statSync(req.file.path);

    res.json({
      success: true,
      message: 'Photo updated successfully',
      data: {
        userId: user.id,
        filename: req.file.filename,
        size: stats.size,
        url: `/uploads/${req.file.filename}`
      }
    });

  } catch (error) {
    console.error('Update photo error:', error);
    
    // Clean up uploaded file if save fails
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating photo'
    });
  }
};

module.exports = {
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
};
