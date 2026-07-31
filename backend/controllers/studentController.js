const User = require('../models/User');

// @desc    Get all students with filters, search and pagination
// @route   GET /api/students
// @access  Private/Admin
const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', department = 'All', semester = 'All' } = req.query;

    const query = { role: 'student' };

    if (department !== 'All') {
      query.department = department;
    }

    if (semester !== 'All') {
      query.semester = semester;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
        { registrationNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const count = await User.countDocuments(query);
    const students = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      students,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalStudents: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: 'student' }).select('-password');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create student user
// @route   POST /api/students
// @access  Private/Admin
const createStudent = async (req, res) => {
  try {
    const { name, email, password, department, rollNumber, registrationNumber, semester, phone, parentName, parentPhone, address, photo } = req.body;

    if (!name || !email || !password || !rollNumber) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, password and roll number' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const rollExists = await User.findOne({ rollNumber });
    if (rollExists) {
      return res.status(400).json({ success: false, message: 'Roll number already exists' });
    }

    const student = await User.create({
      name,
      email,
      password,
      role: 'student',
      department: department || 'General',
      rollNumber,
      registrationNumber,
      semester,
      phone,
      parentName,
      parentPhone,
      address,
      photo,
      status: 'Active',
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update student details
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudent = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: 'student' });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const { name, email, password, department, rollNumber, registrationNumber, semester, phone, parentName, parentPhone, address, photo, status } = req.body;

    // Check unique restrictions if email/roll is modified
    if (email && email !== student.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json({ success: false, message: 'Email already exists' });
      student.email = email;
    }

    if (rollNumber && rollNumber !== student.rollNumber) {
      const rollExists = await User.findOne({ rollNumber });
      if (rollExists) return res.status(400).json({ success: false, message: 'Roll number already exists' });
      student.rollNumber = rollNumber;
    }

    if (name) student.name = name;
    if (password) student.password = password; // Hashed in pre-save
    if (department) student.department = department;
    if (registrationNumber) student.registrationNumber = registrationNumber;
    if (semester) student.semester = semester;
    if (phone) student.phone = phone;
    if (parentName) student.parentName = parentName;
    if (parentPhone) student.parentPhone = parentPhone;
    if (address) student.address = address;
    if (photo) student.photo = photo;
    if (status) student.status = status;

    await student.save();

    res.json({
      success: true,
      message: 'Student updated successfully',
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id, role: 'student' });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
