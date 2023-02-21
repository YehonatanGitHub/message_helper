const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use message routes
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
