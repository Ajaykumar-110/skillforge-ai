const Faculty = require('../models/Faculty');
const User = require('../models/User');

// --- Public Endpoints (Seeded Faculty Directory) ---

// @desc Get all faculties with filter support
// @route GET /api/faculties
const getFaculties = async (req, res) => {
  try {
    const { department, search } = req.query;
    let query = {};
    if (department && department !== 'All') {
      query.department = department;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
      ];
    }
    const faculties = await Faculty.find(query);
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get faculty by ID
// @route GET /api/faculties/:id
const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Admin Endpoints (Login-enabled Faculty in User Collection) ---

// @desc    Get all login-enabled faculty
// @route   GET /api/faculties/admin/list
// @access  Private/Admin
const adminGetFaculties = async (req, res) => {
  try {
    const { search = '', department = 'All' } = req.query;
    const query = { role: 'faculty' };

    if (department !== 'All') {
      query.department = department;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
      ];
    }

    const faculties = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, faculties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create login-enabled faculty
// @route   POST /api/faculties/admin
// @access  Private/Admin
const adminCreateFaculty = async (req, res) => {
  try {
    const { name, email, password, department, employeeId, qualification, experience, subjects, classes } = req.body;

    if (!name || !email || !password || !employeeId) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, password and employee ID' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const empExists = await User.findOne({ employeeId });
    if (empExists) {
      return res.status(400).json({ success: false, message: 'Employee ID already exists' });
    }

    const faculty = await User.create({
      name,
      email,
      password,
      role: 'faculty',
      department: department || 'General',
      employeeId,
      qualification,
      experience,
      subjects: subjects || [],
      classes: classes || [],
    });

    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      faculty: {
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        employeeId: faculty.employeeId,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update login-enabled faculty
// @route   PUT /api/faculties/admin/:id
// @access  Private/Admin
const adminUpdateFaculty = async (req, res) => {
  try {
    const faculty = await User.findOne({ _id: req.params.id, role: 'faculty' });
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }

    const { name, email, password, department, employeeId, qualification, experience, subjects, classes } = req.body;

    if (email && email !== faculty.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json({ success: false, message: 'Email already exists' });
      faculty.email = email;
    }

    if (employeeId && employeeId !== faculty.employeeId) {
      const empExists = await User.findOne({ employeeId });
      if (empExists) return res.status(400).json({ success: false, message: 'Employee ID already exists' });
      faculty.employeeId = employeeId;
    }

    if (name) faculty.name = name;
    if (password) faculty.password = password;
    if (department) faculty.department = department;
    if (qualification) faculty.qualification = qualification;
    if (experience) faculty.experience = experience;
    if (subjects) faculty.subjects = subjects;
    if (classes) faculty.classes = classes;

    await faculty.save();

    res.json({
      success: true,
      message: 'Faculty updated successfully',
      faculty: {
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete login-enabled faculty
// @route   DELETE /api/faculties/admin/:id
// @access  Private/Admin
const adminDeleteFaculty = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id, role: 'faculty' });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }
    res.json({ success: true, message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFaculties,
  getFacultyById,
  adminGetFaculties,
  adminCreateFaculty,
  adminUpdateFaculty,
  adminDeleteFaculty,
};
