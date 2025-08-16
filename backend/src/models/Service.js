const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: [
      'civil_registration',
      'business_registration',
      'land_services',
      'taxation',
      'licensing',
      'social_services',
      'health_services',
      'education',
      'transport',
      'other'
    ]
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  requiredDocuments: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    mandatory: {
      type: Boolean,
      default: true
    }
  }],
  fees: {
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'LKR'
    },
    paymentMethods: [{
      type: String,
      enum: ['cash', 'card', 'bank_transfer', 'online']
    }]
  },
  processingTime: {
    estimated: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      enum: ['minutes', 'hours', 'days', 'weeks'],
      default: 'days'
    }
  },
  eligibility: {
    minAge: Number,
    maxAge: Number,
    citizenship: {
      type: String,
      enum: ['sri_lankan', 'any'],
      default: 'sri_lankan'
    },
    requirements: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  appointmentRequired: {
    type: Boolean,
    default: true
  },
  availableSlots: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    startTime: String,
    endTime: String,
    slotDuration: {
      type: Number,
      default: 30 // minutes
    }
  }],
  locations: [{
    name: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    contactInfo: {
      phone: String,
      email: String
    }
  }],
  steps: [{
    stepNumber: Number,
    title: String,
    description: String,
    estimatedTime: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient searches
serviceSchema.index({ name: 'text', description: 'text' });
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ department: 1, isActive: 1 });

module.exports = mongoose.model('Service', serviceSchema);
