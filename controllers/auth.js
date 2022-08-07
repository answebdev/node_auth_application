// Bring in the User model
const User = require('../models/User');

// Authentication Routes.
// End route functions for all of our routes.
// These routes will then be created in the 'routes' folder ('routes/auth.js'),
// and then the routes will be connected to 'server.js'

// STEPS:
// 1. Add end route functions here in the 'controllers' folder.
// 2. Create the routes in the 'routes' folder.
// 3. Connect the routes to 'server.js'.

// Since we'll be working with a database, this needs to be an asynchronous function,
// then use a try / catch (used when working with asynchronous code).
exports.register = async (req, res, next) => {
  // res.send('Register Route');;
  const { username, email, password } = req.body;

  try {
    // Create a user - take the 'User' model and use 'create'
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = (req, res, next) => {
  res.send('Login Route');
};

exports.forgotpassword = (req, res, next) => {
  res.send('Forgot Password Route');
};

exports.resetpassword = (req, res, next) => {
  res.send('Reset Password Route');
};
