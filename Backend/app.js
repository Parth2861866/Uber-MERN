//environmental variable goes on top inorder to configure them first (preferable)
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
//creating variable app and calling "express"
const cors = require('cors');
const app = express();
//setup for cors 
app.use(cors());

//created route 
app.get('/', (req, res) => {
    res.send('hello world');
});

//the variable that we created in line 3 and where we called express() we are exporting that here 
module.exports = app;