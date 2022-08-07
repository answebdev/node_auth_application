const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    // The following are no longer supported:
    // useCreateIndex: true,
    // useFindAndModify: true,

    // See: https://www.mongodb.com/community/forums/t/option-usecreateindex-is-not-supported/123048/3
  });

  console.log('MongoDB Connected');
};

module.exports = connectDB;

// Need to create a MongoDB project, cluster, etc.
// and use the connection string in 'config.env' instead of the current 'localhost' string.

// See around 36:50

// STOPPED at 39:40 - next: Test on Postman
