// Middleware that checks for a JSON Web Token in the headers
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Add 'Bearer' in front of the token to show that this is an authentication bearing header.
  // If this is true, then set the token variable equal to 'req.headers.authorization.split("")[1]'.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  // Decode the token we just got.
  // 'verify' decrypts the token - so it's going to decrypt (or, verify) based off our secret (JWT_SECRET)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find a user by ID.
    // The id comes from the token -
    // when the token was created (see 'getSignedToken' in 'models/User.js), the user id was saved in there =>
    // the '._id' of the user was added in the token.
    const user = await User.findById(decoded.id);

    // If no user is found, then the token is not valid
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }

    // Set the user on the request object, which will be used in the other routes to do different things
    req.user = user;

    // Continue to the next piece of controller in the route
    next();

    // Catch the error
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};
