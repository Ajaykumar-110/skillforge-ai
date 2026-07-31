const mongoose = require('mongoose');

const markSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required'],
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Examination',
      required: [true, 'Examination reference is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    marksObtained: {
      type: Number,
      required: [true, 'Marks obtained are required'],
    },
    grade: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mark', markSchema);
