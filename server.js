// To run server in terminal (in root):
// node server.js
require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
