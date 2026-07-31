const express = require('express');
const router = express.Router();
const { createTimetable, updateTimetable, deleteTimetable, getTimetable } = require('../controllers/timetableController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getTimetable)
  .post(authorize('super_admin', 'admin'), createTimetable);

router.route('/:id')
  .put(authorize('super_admin', 'admin'), updateTimetable)
  .delete(authorize('super_admin', 'admin'), deleteTimetable);

module.exports = router;
