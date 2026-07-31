const express = require('express');
const router = express.Router();
const { createExam, getExams, deleteExam } = require('../controllers/examController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getExams)
  .post(authorize('super_admin', 'admin', 'faculty'), createExam);

router.delete('/:id', authorize('super_admin', 'admin'), deleteExam);

module.exports = router;
