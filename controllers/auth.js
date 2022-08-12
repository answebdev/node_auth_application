// Bring in the User model
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

// Authentication Routes.
// End route functions for all of our routes.
// These routes will then be created in the 'routes' folder ('routes/auth.js'),
// and then the routes will be connected to 'server.js'

// STEPS:
// 1. Add end route functions here in the 'controllers' folder.
// 2. Create the routes in the 'routes' folder.
// 3. Connect the routes to 'server.js'.

// REGISTER USER
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

    // res.status(201).json({
    //   success: true,
    //   token: 'h34kh34',
    // });

    // See down below to see 'sendToken' function
    sendToken(user, 201, res);
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   error: error.message,
    // });

    // Use custom error handler from 'middleware/error.js' instead:
    next(error);
  }
};

// LOGIN USER
// Since we're going to make a database request down in the try/catch when checking the database to see if the user exists,
// we need to use 'async':
exports.login = async (req, res, next) => {
  // res.send('Login Route');
  const { email, password } = req.body;

  // Check to see that there's an email and password - 'status(400)' means 'bad request'
  if (!email || !password) {
    // res
    //   .status(400)
    //   .json({ success: false, error: 'Please provide an email and password' });

    // Use custom Error Response from 'utils/errorResponse.js' instead:
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check if user exists in database
  try {
    // Find user in database by email address, since email should be unique,
    // then 'select' the password - this will return a user with email, id, and password,
    // because we want to compare the password now.
    const user = await User.findOne({ email }).select('password');

    // If we do not get a user back, we want a status 404 ('user not found)
    if (!user) {
      // res.status(404).json({ success: false, error: 'Invalid Credentials' });

      // Use custom Error Response from 'utils/errorResponse.js' instead -
      // 401 = 'unauthorized'
      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Compare password entered with email to see if it matches password in database
    const isMatch = await user.matchPasswords(password);

    // If the passwords do not match, send a status(404).
    // If they match, respond with a token for the user to log in.
    if (!isMatch) {
      // res.status(404).json({ success: false, error: 'Invalid Credentials' });

      // Use custom Error Response from 'utils/errorResponse.js' instead -
      // 401 = 'unauthorized'
      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Provide token for user to log in

    // res.status(200).json({
    //   success: true,
    //   token: '4391y4kh23',
    // });
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotpassword = async (req, res, next) => {
  // res.send('Forgot Password Route');
  const { email } = req.body;

  try {
    // Check if user actually exists in database
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse('Email could not be sent', 404));
    }

    // Generate token
    const resetToken = user.getResetPasswordToken();

    // Save user - this will save the newly created field (the reset token password field) to the database
    await user.save();

    // Create reset URL to email to provided email.
    // Create the reset URL
    // Here, we point to our frontend (whatever domain our frontend is running on) -
    // this can actually be put in the environment variables ('config.env'), and we can get it from there:
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML message we want to send to client.
    // You can also create nice templates with Pug (https://pugjs.org) and put that in here where the HTML code goes.
    // An IMPORTANT property to add below to the 'href' is 'clicktracking' and set it to 'off'.
    // The reason for this is when we use our email service (e.g., SendGrid), and they add a strange looking link,
    // it takes you to the same route, but they re-route it through them, and we don't want that,
    // so we set 'clicktracking' to 'off'.
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password:</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  `;

    // Send our email.
    // Here, we're going to use Nodemailer and SendGrid.
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      });

      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = (req, res, next) => {
  res.send('Reset Password Route');
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};
