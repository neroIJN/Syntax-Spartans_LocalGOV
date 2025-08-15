const express = require('express');
const router = express.Router();
const {
  getDocuments,
  getDashboardDocuments,
  uploadDocument,
  getDocument,
  downloadDocument,
  updateDocument,
  deleteDocument
} = require('../controllers/mysqlDocumentController');

const { protectMySQL } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(protectMySQL);

// Dashboard route
router.get('/dashboard', getDashboardDocuments);

// Upload route
router.post('/upload', uploadDocument);

// Download route
router.get('/:id/download', downloadDocument);

// CRUD routes
router.route('/')
  .get(getDocuments);

router.route('/:id')
  .get(getDocument)
  .put(updateDocument)
  .delete(deleteDocument);

module.exports = router;
