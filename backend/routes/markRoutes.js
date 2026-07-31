const express = require('express');
const router = express.Router();
const { enterMarks, getStudentMarks, getMarksReport } = require('../controllers/markController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', authorize('super_admin', 'admin', 'faculty'), enterMarks);
router.get('/report', authorize('super_admin', 'admin', 'faculty'), getMarksReport);
router.get('/student/:studentId', getStudentMarks);

module.exports = router;
