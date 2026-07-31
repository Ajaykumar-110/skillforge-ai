const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Exam title is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Exam date is required'],
    },
    time: {
      type: String,
      required: [true, 'Exam time is required'],
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    maxMarks: {
      type: Number,
      required: [true, 'Max marks are required'],
      default: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Examination', examinationSchema);
