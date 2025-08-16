const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const MySQLUser = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 255]
    }
  },
  nicNumber: {
    type: DataTypes.STRING(12),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      is: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/ // Sri Lankan NIC format
    }
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^(\+94|0)[0-9]{9}$/ // Sri Lankan phone format
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  userType: {
    type: DataTypes.ENUM('citizen', 'officer'),
    allowNull: false,
    defaultValue: 'citizen'
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  profilePicture: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  passwordResetToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  emailVerificationToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  emailVerificationExpires: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  paranoid: true, // Enables soft delete
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['nicNumber']
    },
    {
      fields: ['userType', 'isActive'] // Combined index instead of separate ones
    }
  ]
});

// Hash password before saving
MySQLUser.beforeSave(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Instance method to check password
MySQLUser.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to get full name
MySQLUser.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Class method to find by email
MySQLUser.findByEmail = function(email) {
  return this.findOne({ where: { email, isActive: true } });
};

// Class method to find by NIC
MySQLUser.findByNIC = function(nicNumber) {
  return this.findOne({ where: { nicNumber, isActive: true } });
};

module.exports = MySQLUser;
