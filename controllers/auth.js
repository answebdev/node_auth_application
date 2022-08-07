// Authentication Routes.
// End route functions for all of our routes.
// These routes will then be created in the 'routes' folder ('routes/auth.js'),
// and then the routes will be connected to 'server.js'

// STEPS:
// 1. Add end route functions here in the 'controllers' folder.
// 2. Create the routes in the 'routes' folder.
// 3. Connect the routes to 'server.js'.
exports.register = (req, res, next) => {
  res.send('Register Route');
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
