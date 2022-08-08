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

// STOPPED at 49:49
