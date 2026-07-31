const Mark = require('../models/Mark');
const Examination = require('../models/Examination');

// @desc    Enter/Update marks for students
// @route   POST /api/marks
// @access  Private/Faculty/Admin
const enterMarks = async (req, res) => {
  try {
    const { examId, subject, records } = req.body; // records: [{ studentId, marksObtained, grade, remarks }]

    if (!examId || !subject || !records || !records.length) {
      return res.status(400).json({ success: false, message: 'Please provide examId, subject and student records' });
    }

    const exam = await Examination.findById(examId);
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });

    const marksRecords = [];

    for (const record of records) {
      const { studentId, marksObtained, grade, remarks } = record;

      const query = {
        student: studentId,
        exam: examId,
        subject,
      };

      const update = {
        marksObtained,
        grade: grade || calculateGrade(marksObtained, exam.maxMarks),
        remarks,
      };

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const rec = await Mark.findOneAndUpdate(query, update, options);
      marksRecords.push(rec);
    }

    res.status(201).json({
      success: true,
      message: 'Marks recorded successfully',
      count: marksRecords.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function to calculate grades
const calculateGrade = (obtained, max) => {
  const pct = (obtained / max) * 100;
  if (pct >= 90) return 'O'; // Outstanding
  if (pct >= 80) return 'A+';
  if (pct >= 70) return 'A';
  if (pct >= 60) return 'B+';
  if (pct >= 50) return 'B';
  if (pct >= 40) return 'C';
  return 'F'; // Fail
};

// @desc    Get marks for a student
// @route   GET /api/marks/student/:studentId
// @access  Private
const getStudentMarks = async (req, res) => {
  try {
    const { studentId } = req.params;
    const marks = await Mark.find({ student: studentId })
      .populate('exam', 'title date maxMarks')
      .sort({ createdAt: -1 });

    res.json({ success: true, marks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all marks (Faculty/Admin Report)
// @route   GET /api/marks/report
// @access  Private/Faculty/Admin
const getMarksReport = async (req, res) => {
  try {
    const { examId, subject } = req.query;
    const query = {};

    if (examId) query.exam = examId;
    if (subject) query.subject = subject;

    const records = await Mark.find(query)
      .populate('student', 'name email rollNumber department semester')
      .populate('exam', 'title maxMarks')
      .sort({ createdAt: -1 });

    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  enterMarks,
  getStudentMarks,
  getMarksReport,
};
