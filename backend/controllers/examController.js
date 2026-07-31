const Examination = require('../models/Examination');

// @desc    Create new exam
// @route   POST /api/exams
// @access  Private/Faculty/Admin
const createExam = async (req, res) => {
  try {
    const { title, date, time, course, subject, maxMarks } = req.body;

    if (!title || !date || !time || !course || !subject) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const exam = await Examination.create({
      title,
      date,
      time,
      course,
      subject,
      maxMarks: maxMarks || 100,
    });

    res.status(201).json({ success: true, message: 'Exam scheduled successfully', exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all exams
// @route   GET /api/exams
// @access  Private
const getExams = async (req, res) => {
  try {
    const { course, subject } = req.query;
    const query = {};

    if (course) query.course = course;
    if (subject) query.subject = subject;

    const exams = await Examination.find(query).sort({ date: 1 });
    res.json({ success: true, exams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete scheduled exam
// @route   DELETE /api/exams/:id
// @access  Private/Admin
const deleteExam = async (req, res) => {
  try {
    const result = await Examination.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.json({ success: true, message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createExam,
  getExams,
  deleteExam,
};
