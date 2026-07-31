const express = require('express');
const router = express.Router();
const { markAttendance, getStudentAttendance, getAttendanceReport } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', authorize('super_admin', 'admin', 'faculty'), markAttendance);
router.get('/report', authorize('super_admin', 'admin', 'faculty'), getAttendanceReport);
router.get('/student/:studentId', getStudentAttendance);

module.exports = router;
