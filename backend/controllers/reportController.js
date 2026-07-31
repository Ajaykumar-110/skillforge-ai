const User = require('../models/User');
const Department = require('../models/Department');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');
const Book = require('../models/Book');
const Fee = require('../models/Fee');
const Mark = require('../models/Mark');

// @desc    Get counts and metrics summary for system dashboard
// @route   GET /api/reports/dashboard-stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalFaculty = await User.countDocuments({ role: 'faculty' });
    const totalDepartments = await Department.countDocuments();
    const totalCourses = await Course.countDocuments();

    // 1. Finance / Fees collection stats
    const feeSummary = await Fee.aggregate([
      {
        $group: {
          _id: null,
          collected: { $sum: '$paidAmount' },
          expected: { $sum: '$amount' },
        },
      },
    ]);
    const finance = {
      collected: feeSummary[0]?.collected || 0,
      pending: (feeSummary[0]?.expected || 0) - (feeSummary[0]?.collected || 0),
    };

    // 2. Library stats
    const books = await Book.find();
    const totalBooks = books.reduce((acc, curr) => acc + curr.copies, 0);
    const availableBooks = books.reduce((acc, curr) => acc + curr.availableCopies, 0);
    const issuedBooks = totalBooks - availableBooks;

    // 3. Attendance average percentage
    const attendanceStats = await Attendance.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    const presentCount = attendanceStats.find((a) => a._id === 'present')?.count || 0;
    const absentCount = attendanceStats.find((a) => a._id === 'absent')?.count || 0;
    const totalAttendance = presentCount + absentCount;
    const avgAttendance = totalAttendance > 0 ? ((presentCount / totalAttendance) * 100).toFixed(1) : 100;

    // 4. Grades breakdown for charts
    const gradeStats = await Mark.aggregate([
      {
        $group: {
          _id: '$grade',
          count: { $sum: 1 },
        },
      },
    ]);
    const grades = gradeStats.map((g) => ({ name: g._id || 'Unknown', value: g.count }));

    // 5. Monthly Admissions Mock Data
    const monthlyAdmissions = [
      { month: 'Jan', students: 40 },
      { month: 'Feb', students: 60 },
      { month: 'Mar', students: 50 },
      { month: 'Apr', students: 80 },
      { month: 'May', students: 120 },
      { month: 'Jun', students: 200 },
      { month: 'Jul', students: 250 },
    ];

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalFaculty,
        totalDepartments,
        totalCourses,
        finance,
        library: {
          total: totalBooks,
          issued: issuedBooks,
          available: availableBooks,
        },
        avgAttendance: Number(avgAttendance),
        grades,
        monthlyAdmissions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
