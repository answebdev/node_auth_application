// Mongoose helps us create schemas, validate schemas, etc.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// MIDDLEWARE
// Run a few pieces of middleware (thanks to Mongoose) for pre-saving or post-saving.
// This 'pre' will run pre some function; in this case, we want to run this BEFORE it gets saved ('save');
// important: use the 'function' declaration here and NOT an arrow function.
// First, we want to check if the password being passed in is modified ('isModified').
// If the password is NOT modified, it will not rehash - it will just save the current password.
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  // HASH THE PASSWORD (using 'bcryptjs').
  // The higher the number, the more secure; but '10' should be fine -
  // 10 is the number of digits the hashed password will have.
  const salt = await bcrypt.genSalt(10);

  // Change the password sent - this will sabe the new password in the 'password' field that was passed in,
  // and then it would save the document.
  // This is the password that will be used in the controller ('auth.js') - see 'const user = await User.create'.
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method that checks to see if password entered with email when logging in is the same as the user password in the database.
// This function receives a 'password' from the user.
// This 'matchPassword' method will be run on the user in the try/catch (in the Login User section) in 'controllers/auth.js'.
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
