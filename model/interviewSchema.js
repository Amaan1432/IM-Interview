const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    company: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    students: [{
        type: mongoose.Types.ObjectId,
        ref: 'Students'
    }]

}, {
    timestamps: true
})

const Company = mongoose.model('company', companySchema);

module.exports = Company;