const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      required: [true, 'Day is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    room: {
      type: String,
      required: [true, 'Room number is required'],
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timetable', timetableSchema);
