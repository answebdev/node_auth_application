// This function is a blueprint for our error response message.
// This will be used for custom error response messages in 'controllers/auth.js', instead of the default way of catching errors.
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
