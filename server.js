// To run server in terminal (in root):
// 'npm run server' (for nodemon), OR 'node server.js'

// IMPORTANT: This 'dotenv' line should be at the very top of the file here,
// because everything else down below in this file has access to this 'process.env' syntax,
// so this line needs to go at the very top:
require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Connect DB
connectDB();

const app = express();

// Middleware that allows us to get data from the body ('request.body')
app.use(express.json());

// Connect the routes.
// Redirect anything that goes to '/api/auth' to the 'auth.js' file in the 'routes' folder, i.e.,
// whenever a request comes in, this piece of middleware catches it
// and checks if it's to '/api/auth', or something, then it will be redirected to the 'auth' router:
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

// Error Handler Middleware
// Important: This error handler must be the LAST piece of middleware in this server file (i.e, if there are other middlewares in this file,
// as we do - see above - then this one should be the last one).
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Handle server error
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);

  // Stop server nicely without any crashes -
  // this will just show us the error being logged
  // instead of the complete crash stack (that really long stack of messages); easier to read:
  server.close(() => process.exit(1));
});
