const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses with pagination/search
// @route   GET /api/courses
// @access  Private
const getCourses = async (req, res) => {
  try {
    const { search = '', department = 'All' } = req.query;
    const query = {};

    if (department !== 'All') {
      query.department = department;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await Course.find(query)
      .populate('faculty', 'name email employeeId')
      .populate('students', 'name email rollNumber')
      .sort({ createdAt: -1 });

    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Private
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('faculty', 'name email employeeId')
      .populate('students', 'name email rollNumber');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  try {
    const { name, code, department, credits, description, facultyId } = req.body;

    if (!name || !code || !department || !credits) {
      return res.status(400).json({ success: false, message: 'Please fill name, code, department and credits' });
    }

    const courseExists = await Course.findOne({ code });
    if (courseExists) {
      return res.status(400).json({ success: false, message: 'Course code already exists' });
    }

    const courseData = {
      name,
      code,
      department,
      credits,
      description,
    };

    if (facultyId) {
      const faculty = await User.findOne({ _id: facultyId, role: 'faculty' });
      if (!faculty) return res.status(400).json({ success: false, message: 'Invalid Faculty ID' });
      courseData.faculty = facultyId;
    }

    const course = await Course.create(courseData);
    res.status(201).json({ success: true, message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const { name, code, department, credits, description, facultyId } = req.body;

    if (code && code !== course.code) {
      const codeExists = await Course.findOne({ code });
      if (codeExists) return res.status(400).json({ success: false, message: 'Course code already exists' });
      course.code = code;
    }

    if (name) course.name = name;
    if (department) course.department = department;
    if (credits) course.credits = credits;
    if (description) course.description = description;

    if (facultyId) {
      const faculty = await User.findOne({ _id: facultyId, role: 'faculty' });
      if (!faculty) return res.status(400).json({ success: false, message: 'Invalid Faculty ID' });
      course.faculty = facultyId;
    } else if (facultyId === null) {
      course.faculty = undefined;
    }

    await course.save();
    res.json({ success: true, message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  try {
    const result = await Course.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Enroll student in course
// @route   POST /api/courses/:id/enroll
// @access  Private/Admin
const enrollStudent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const { studentId } = req.body;
    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    if (course.students.includes(studentId)) {
      return res.status(400).json({ success: false, message: 'Student is already enrolled in this course' });
    }

    course.students.push(studentId);
    await course.save();

    res.json({ success: true, message: 'Student enrolled successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
};
