const mongoose = require('mongoose');

// const dbConnection=mongoose.connect('mongodb://127.0.0.1:27017/IM-Interview');
const url = 'mongodb+srv://amaan1432:jpladiFXLD1wtEPD@cluster0.wqiwl1y.mongodb.net/IM-Interviewy?retryWrites=true&w=majority';
const dbConnection=mongoose.connect(url)
.then(()=>{
    console.log('Connection successful!');
}).catch((err) => console.log("no connection " + err));


const db = mongoose.connection

db.on('open', () => {
    console.log("MongoDB connected successfully!")
})

module.exports = {db, dbConnection}
