const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require(`./connect/database`);
const Cors = require('cors');
const port = process.env.PORT || 5000;
const http = require('http');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Cors());

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.listen(port, () => console.log(`Server listening on ${port}`));