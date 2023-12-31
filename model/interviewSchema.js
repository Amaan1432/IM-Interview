const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    company: {
        type: String,
        required: true,
    },
    students: [
        {
          student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
          date: {
            type: Date,
            required: true,
          },
          result: {
            type: String,
            enum: [
              'On Hold',
              'Selected',
              'Pending',
              'Not Selected',
              'Did not Attempt',
            ],
          },
        },
      ],

}, {
    timestamps: true
})

const Company = mongoose.model('company', companySchema);

module.exports = Company;