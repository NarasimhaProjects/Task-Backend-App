const express = require('express');
const { errorHandler } = require('./middleware/errorMIddleware')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db');
const port = process.env.PORT || 5000
const bookRoutes = require('./routes/books');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/Books', bookRoutes);
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is Listening on ${port}`));