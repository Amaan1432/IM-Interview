const mongoose = require('mongoose');
const Company = require ('./interviewSchema');
const Scores = require('./finalScoresSchema');
const studentSchema = new mongoose.Schema({
    batch: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    collageName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    scores:{
        type: mongoose.Types.ObjectId,
        ref: 'Scores'
    },
    companies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Company'
    }]

}, {
    timestamps: true
})

const Student = mongoose.model('Students', studentSchema)

module.exports = Student;