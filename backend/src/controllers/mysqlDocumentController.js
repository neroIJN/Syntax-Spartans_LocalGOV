const MySQLDocument = require('../models/MySQLDocument');
const MySQLUser = require('../models/MySQLUser');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/documents');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow common document types
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images, PDFs, and document files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: fileFilter
});

// @desc    Get all documents for logged in user
// @route   GET /api/mysql/documents
// @access  Private
const getDocuments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    
    let whereClause = { userId: req.user.id };
    
    if (status && status !== 'all') {
      whereClause.status = status;
    }

    if (category && category !== 'all') {
      whereClause.category = category;
    }

    const documents = await MySQLDocument.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      include: [
        {
          model: MySQLUser,
          as: 'verifier',
          attributes: ['id', 'firstName', 'lastName'],
          required: false
        }
      ]
    });

    res.json({
      success: true,
      count: documents.rows.length,
      total: documents.count,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(documents.count / limit)
      },
      data: documents.rows
    });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving documents'
    });
  }
};

// @desc    Get dashboard documents (recent)
// @route   GET /api/mysql/documents/dashboard
// @access  Private
const getDashboardDocuments = async (req, res) => {
  try {
    const recentDocuments = await MySQLDocument.findAll({
      where: {
        userId: req.user.id
      },
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: [
        'id', 'name', 'fileType', 'fileSize', 'status', 'category', 'createdAt'
      ]
    });

    res.json({
      success: true,
      data: recentDocuments
    });
  } catch (error) {
    console.error('Get dashboard documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving dashboard documents'
    });
  }
};

// @desc    Upload document
// @route   POST /api/mysql/documents/upload
// @access  Private
const uploadDocument = async (req, res) => {
  try {
    const uploadSingle = upload.single('document');
    
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file'
        });
      }

      const {
        name,
        category = 'other',
        description,
        tags
      } = req.body;

      try {
        const document = await MySQLDocument.create({
          userId: req.user.id,
          name: name || req.file.originalname,
          originalName: req.file.originalname,
          fileName: req.file.filename,
          fileType: path.extname(req.file.originalname).slice(1).toUpperCase(),
          mimeType: req.file.mimetype,
          fileSize: req.file.size,
          filePath: req.file.path,
          category,
          description,
          tags: tags ? JSON.parse(tags) : []
        });

        res.status(201).json({
          success: true,
          message: 'Document uploaded successfully',
          data: document
        });
      } catch (dbError) {
        // Clean up uploaded file if database save fails
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        throw dbError;
      }
    });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error uploading document'
    });
  }
};

// @desc    Get single document
// @route   GET /api/mysql/documents/:id
// @access  Private
const getDocument = async (req, res) => {
  try {
    const document = await MySQLDocument.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: [
        {
          model: MySQLUser,
          as: 'verifier',
          attributes: ['id', 'firstName', 'lastName'],
          required: false
        }
      ]
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Update last accessed
    await document.update({
      lastAccessedAt: new Date()
    });

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving document'
    });
  }
};

// @desc    Download document
// @route   GET /api/mysql/documents/:id/download
// @access  Private
const downloadDocument = async (req, res) => {
  try {
    const document = await MySQLDocument.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found on server'
      });
    }

    // Update download count and last accessed
    await document.update({
      downloadCount: document.downloadCount + 1,
      lastAccessedAt: new Date()
    });

    res.download(document.filePath, document.originalName);
  } catch (error) {
    console.error('Download document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error downloading document'
    });
  }
};

// @desc    Update document
// @route   PUT /api/mysql/documents/:id
// @access  Private
const updateDocument = async (req, res) => {
  try {
    const document = await MySQLDocument.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    const {
      name,
      category,
      description,
      tags
    } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (category) fieldsToUpdate.category = category;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (tags) fieldsToUpdate.tags = JSON.parse(tags);

    await document.update(fieldsToUpdate);

    res.json({
      success: true,
      message: 'Document updated successfully',
      data: document
    });
  } catch (error) {
    console.error('Update document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating document'
    });
  }
};

// @desc    Delete document
// @route   DELETE /api/mysql/documents/:id
// @access  Private
const deleteDocument = async (req, res) => {
  try {
    const document = await MySQLDocument.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Delete file from filesystem
    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    // Delete from database
    await document.destroy();

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting document'
    });
  }
};

module.exports = {
  getDocuments,
  getDashboardDocuments,
  uploadDocument,
  getDocument,
  downloadDocument,
  updateDocument,
  deleteDocument
};
