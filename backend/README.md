# LocalGOV Backend - Clean Architecture

## 📁 Project Structure

```
backend/
├── src/                          # Main source code
│   ├── app.js                   # Main Express application
│   ├── config/                  # Configuration files
│   │   ├── database.js         # Database configuration
│   │   └── ...                 # Other config files
│   ├── controllers/             # Route controllers
│   │   ├── authController.js
│   │   ├── appointmentController.js
│   │   └── ...
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── ...
│   ├── models/                  # Database models (Sequelize)
│   │   ├── MySQLUser.js
│   │   ├── MySQLAppointment.js
│   │   └── ...
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── appointments.js
│   │   └── ...
│   ├── services/                # Business logic layer
│   ├── utils/                   # Utility functions
│   ├── validators/              # Input validation schemas
│   ├── database/                # Database initialization
│   └── views/                   # View templates (if any)
├── scripts/                     # Utility & management scripts
│   ├── database/               # Database management
│   │   ├── setup-database.js   # Initial database setup
│   │   ├── recreate-database.js # Recreate database from scratch
│   │   └── reset-database.js   # Reset database data
│   ├── users/                  # User management
│   │   ├── create-test-user.js
│   │   ├── reset-user-password.js
│   │   └── create-specific-user.js
│   ├── test-data/              # Test data generation
│   │   ├── create-test-data.js
│   │   ├── create-test-appointments.js
│   │   └── clear-test-data.js
│   └── checks/                 # Health checks
│       ├── check-database.js
│       ├── check-user.js
│       ├── check-appointments.js
│       └── check-notifications.js
├── tests/                      # Test files
│   ├── api/                   # API tests
│   │   ├── test-api.js
│   │   └── test-photo-upload.js
│   └── setup/                 # Test setup
│       └── test-setup.js
├── docs/                      # Documentation
│   └── README_MYSQL_AUTH.md
├── storage/                   # File storage
│   ├── public/               # Public static files
│   └── uploads/              # User uploaded files
├── server.js                 # Main entry point
├── package.json
├── .env.example             # Environment variables template
└── .gitignore
```

## 🚀 Available Scripts

### **Development**
```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
```

### **Database Management**
```bash
npm run db:setup      # Setup database tables
npm run db:reset      # Reset database data
npm run db:recreate   # Recreate entire database
```

### **User Management**
```bash
npm run user:create           # Create test user
npm run user:reset-password   # Reset user password
```

### **Test Data**
```bash
npm run test-data:create       # Create test data
npm run test-data:appointments # Create test appointments
npm run test-data:clear        # Clear all test data
```

### **Health Checks**
```bash
npm run check:db              # Check database connection
npm run check:user            # Check user operations
npm run check:appointments    # Check appointment operations
npm run check:notifications   # Check notification system
```

### **Testing**
```bash
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
```

## 🏗️ Architecture Benefits

### **Separation of Concerns**
- **src/**: All application code
- **scripts/**: Utility and management scripts
- **tests/**: All test files
- **storage/**: File storage separated from code
- **docs/**: Documentation

### **Clean Imports**
- Relative imports from src directory
- Clear dependency structure
- Easy to navigate and maintain

### **Script Organization**
- Database scripts grouped together
- User management scripts separated
- Test data scripts organized
- Health check scripts available

### **Development Workflow**
- Easy development with `npm run dev`
- Quick database management
- Organized test data creation
- Health monitoring capabilities

## 🔧 Migration Notes

All file paths have been updated to reflect the new structure:
- Main entry point: `src/app.js`
- Static files: `../storage/public`
- Uploads: `../storage/uploads`
- Import paths: Relative to src directory

## 📝 Next Steps

1. **Update any remaining absolute paths** in scripts
2. **Create service layer** for business logic
3. **Add validators** for input validation
4. **Enhance documentation** in docs folder
5. **Add more comprehensive tests**

This structure follows Node.js best practices and provides a solid foundation for scaling the LocalGOV backend application.
