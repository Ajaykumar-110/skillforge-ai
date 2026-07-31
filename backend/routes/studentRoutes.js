const express = require('express');
const router = express.Router();
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(authorize('super_admin', 'admin', 'faculty'), getAllStudents)
  .post(authorize('super_admin', 'admin'), createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(authorize('super_admin', 'admin'), updateStudent)
  .delete(authorize('super_admin', 'admin'), deleteStudent);

module.exports = router;
