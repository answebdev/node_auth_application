// To run server in terminal (in root):
// 'npm run server' (for nodemon), OR 'node server.js'
require('dotenv').config({ path: './config.env' });
const express = require('express');

const app = express();

// Middleware that allows us to get data from the body ('request.body')
app.use(express.json());

// Connect the routes.
// Redirect anything that goes to '/api/auth' to the 'auth.js' file in the 'routes' folder, i.e.,
// whenever a request comes in, this piece of middleware catches it
// and checks if it's to '/api/auth', or something, then it will be redirected to the 'auth' router:
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
