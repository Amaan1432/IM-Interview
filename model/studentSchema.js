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
    contactNumber: {
        type: Number,
        required: true,
      },
    college: {
        type: String,
        required: true
    },
    placement: {
      type: String,
      required: true,
      enum: ['Placed', 'Not Placed'],
    },
    batch: {
      type: String,
      required: true,
    },
    dsa: {
      type: Number,
      required: true,
    },
    webD: {
      type: Number,
      required: true,
    },
    react: {
      type: Number,
      required: true,
    },
    interviews: [
      {
        company: {
          type: String,
        },
        date: {
          type: String,
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

const Student = mongoose.model('Students', studentSchema)

module.exports = Student;