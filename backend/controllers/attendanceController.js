const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Mark attendance for students
// @route   POST /api/attendance
// @access  Private/Faculty/Admin
const markAttendance = async (req, res) => {
  try {
    const { date, subject, records } = req.body; // records: [{ studentId, status: 'present'/'absent' }]

    if (!date || !subject || !records || !records.length) {
      return res.status(400).json({ success: false, message: 'Please provide date, subject and student attendance records' });
    }

    const attendanceRecords = [];

    for (const record of records) {
      const { studentId, status } = record;
      // Upsert attendance for the student on this day for this subject
      const query = {
        student: studentId,
        date: new Date(date).setHours(0, 0, 0, 0),
        subject,
      };

      const update = {
        status,
        markedBy: req.user._id,
      };

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const rec = await Attendance.findOneAndUpdate(query, update, options);
      attendanceRecords.push(rec);
    }

    res.status(201).json({
      success: true,
      message: 'Attendance saved successfully',
      count: attendanceRecords.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get student attendance summary & logs
// @route   GET /api/attendance/student/:studentId
// @access  Private
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subject } = req.query;

    const query = { student: studentId };
    if (subject) query.subject = subject;

    const records = await Attendance.find(query).sort({ date: -1 });

    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 100;

    res.json({
      success: true,
      total,
      present,
      absent: total - present,
      percentage: Number(percentage),
      records,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all attendance records (Reports)
// @route   GET /api/attendance/report
// @access  Private/Faculty/Admin
const getAttendanceReport = async (req, res) => {
  try {
    const { department, subject, date } = req.query;
    const query = {};

    if (date) {
      query.date = new Date(date).setHours(0, 0, 0, 0);
    }
    if (subject) {
      query.subject = subject;
    }

    let records = await Attendance.find(query)
      .populate('student', 'name email rollNumber department')
      .populate('markedBy', 'name email')
      .sort({ date: -1 });

    // Filter by student department if provided
    if (department && department !== 'All') {
      records = records.filter((r) => r.student && r.student.department === department);
    }

    res.json({ success: true, count: records.length, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  markAttendance,
  getStudentAttendance,
  getAttendanceReport,
};
