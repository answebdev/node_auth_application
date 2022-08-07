// Express is needed to route to our controllers
const express = require('express');
const router = express.Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
} = require('../controllers/auth');

// Routes that are routed to the different controllers ('controllers/auth.js')
// Register Route - POST Request
router.route('/register').post(register);
// Can also do:
// router.post('/register',)

// Login Route - POST Request
router.route('/login').post(login);

// Forgot Password Route - POST Request
router.route('/forgotpassword').post(forgotpassword);

// Reset Password Route - PUT Request
router.route('/resetpassword/:resetToken').put(resetpassword);

module.exports = router;
