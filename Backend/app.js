//environmental variable goes on top inorder to configure them first (preferable)

const dotenv = require('dotenv');
require('dotenv').config();

const express = require('express');
//creating variable app and calling "express"
const cors = require('cors');
const app = express();

const connectToDb = require('./db/db');

const userRoutes = require('./routes/user.routes')

connectToDb();

//setup for cors 
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//created route 
app.get('/', (req, res) => {
    res.send('hello world');
});


app.use('/users', userRoutes);

//the variable that we created in line 3 and where we called express() we are exporting that here 
module.exports = app;