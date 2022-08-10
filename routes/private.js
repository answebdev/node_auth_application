const express = require('express');
const { getPrivateData } = require('../controllers/private');
const router = express.Router();

// Import middleware to use to protect private route
const { protect } = require('../middleware/auth');

// Basic route that checks for a user
router.route('/').get(protect, getPrivateData);

module.exports = router;

// STOPPED AT 1:22:50
