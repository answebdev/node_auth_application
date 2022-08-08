// This middleware catches all errors we pass to the next variable.
// This middleware uses the error response in 'utils/errorResponse.js'.
// This error handler ('errorHandler') will then be used in 'server.js'.
const ErrorResponse = require('../utils/errorResponse');

// This error handler does error checking, custom error messages, etc.
// The first parameter should always be error ('err'):
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Check for errors
  // If the error code equals 11000 (this code means 'duplicate error key' in Mongoose),
  // then create the message, 'Duplicate Field Value Entered'.
  if (err.code === 11000) {
    const message = 'Duplicate Field Value Entered';

    // Status 400 means 'bad request'
    error = new ErrorResponse(message, 400);
  }

  // Check if 'err.name' is equal to 'ValidationError'.
  // In Mongoose, we get validation errors, so whenever there is a validation error,
  // we usually get an object of a lot of nested objects.
  // So we want to take that object and create an array from it,
  // and then add the messages to the 'message' variable:
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // console.log(error.message);

  // All of our responses will come from the error handler,
  // so here, the status code is equal to 'error.statusCode' -
  // 'error' refers to any of the errors we created up above.
  // If there's no status code set, then there's obviously a server error.
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
