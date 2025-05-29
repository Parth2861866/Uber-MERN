const mongoose = require('mongoose');


function connectToDb() {
    console.log('Attempting to connect to DB...');
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log('Connected to DB');
    }).catch(err => {
        console.error('DB Connection Error:', err); // Use console.error for errors
    });
}

module.exports = connectToDb;