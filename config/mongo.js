const mongoose = require('mongoose');

const dbConnection=mongoose.connect('mongodb://127.0.0.1:27017/IM-Interview');

const db = mongoose.connection

db.on('open', () => {
    console.log("MongoDB connected successfully!")
})

module.exports = {db, dbConnection}
