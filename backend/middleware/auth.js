const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User'); // MongoDB User
const MySQLUser = require('../models/MySQLUser'); // MySQL User

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = generateToken(user.id);
  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  // Remove sensitive data from user object
  const userResponse = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    nicNumber: user.nicNumber,
    phoneNumber: user.phoneNumber,
    userType: user.userType,
    isEmailVerified: user.isEmailVerified,
    profilePicture: user.profilePicture
  };

  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message,
      token,
      user: userResponse
    });
};

// Protect routes middleware for MySQL
const protectMySQL = async (req, res, next) => {
  try {
    let token;

    // Get token from header or cookie
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await MySQLUser.findByPk(decoded.userId, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'No user found with this token'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Original MongoDB protect middleware
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found'
        });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role || req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role || req.user.userType} is not authorized to access this route`
      });
    }
    next();
  };
};

// Check if user is email verified (MySQL)
const requireEmailVerification = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Please verify your email address to access this resource'
    });
  }
  next();
};

module.exports = {
  generateToken,
  sendTokenResponse,
  protect,
  protectMySQL,
  authorize,
  requireEmailVerification
};
