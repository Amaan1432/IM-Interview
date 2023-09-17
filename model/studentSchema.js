const mongoose = require('mongoose');

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
    companies: [{
        type: mongoose.Types.ObjectId,
        ref: 'company'
    }]

}, {
    timestamps: true
})

const Student = mongoose.model('Students', studentSchema)

module.exports = Student;