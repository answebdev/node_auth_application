// Mongoose helps us create schemas, validate schemas, etc.
const mongoose = require('mongoose');

// USER SCHEMA - this is going to be used in the 'controller', i.e., 'controllers/auth.js'
// 'match' property below means to match the email to a regular expression.
// 'select' property below means whenever we query for a user,
// do we want to return the password as well?
// Setting this to 'false' means we do not want the password to be sent back as well,
// unless we explicitly ask the query for it.
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email address'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
