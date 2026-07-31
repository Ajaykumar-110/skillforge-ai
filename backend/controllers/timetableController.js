const Timetable = require('../models/Timetable');

// @desc    Create timetable entry
// @route   POST /api/timetable
// @access  Private/Admin
const createTimetable = async (req, res) => {
  try {
    const { day, subject, startTime, endTime, room, facultyId, department, semester } = req.body;

    if (!day || !subject || !startTime || !endTime || !room || !department || !semester) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const timetable = await Timetable.create({
      day,
      subject,
      startTime,
      endTime,
      room,
      faculty: facultyId || null,
      department,
      semester,
    });

    res.status(201).json({ success: true, message: 'Timetable slot created successfully', timetable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update timetable entry
// @route   PUT /api/timetable/:id
// @access  Private/Admin
const updateTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) return res.status(404).json({ success: false, message: 'Timetable entry not found' });

    const { day, subject, startTime, endTime, room, facultyId, department, semester } = req.body;

    if (day) timetable.day = day;
    if (subject) timetable.subject = subject;
    if (startTime) timetable.startTime = startTime;
    if (endTime) timetable.endTime = endTime;
    if (room) timetable.room = room;
    if (facultyId) timetable.faculty = facultyId;
    if (department) timetable.department = department;
    if (semester) timetable.semester = semester;

    await timetable.save();
    res.json({ success: true, message: 'Timetable entry updated successfully', timetable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete timetable entry
// @route   DELETE /api/timetable/:id
// @access  Private/Admin
const deleteTimetable = async (req, res) => {
  try {
    const result = await Timetable.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: 'Timetable entry not found' });
    res.json({ success: true, message: 'Timetable entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get timetable with filters (department, semester, facultyId)
// @route   GET /api/timetable
// @access  Private
const getTimetable = async (req, res) => {
  try {
    const { department, semester, facultyId } = req.query;
    const query = {};

    if (department && department !== 'All') query.department = department;
    if (semester && semester !== 'All') query.semester = semester;
    if (facultyId) query.faculty = facultyId;

    const timetable = await Timetable.find(query)
      .populate('faculty', 'name email')
      .sort({ day: 1, startTime: 1 });

    res.json({ success: true, timetable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTimetable,
  updateTimetable,
  deleteTimetable,
  getTimetable,
};
