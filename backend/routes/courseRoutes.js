const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse, enrollStudent } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getCourses)
  .post(authorize('super_admin', 'admin'), createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(authorize('super_admin', 'admin'), updateCourse)
  .delete(authorize('super_admin', 'admin'), deleteCourse);

router.post('/:id/enroll', authorize('super_admin', 'admin'), enrollStudent);

module.exports = router;
