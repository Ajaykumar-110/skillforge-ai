const express = require('express');
const router = express.Router();
const { 
  getFaculties, 
  getFacultyById, 
  adminGetFaculties, 
  adminCreateFaculty, 
  adminUpdateFaculty, 
  adminDeleteFaculty 
} = require('../controllers/facultyController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public Directory
router.get('/', getFaculties);
router.get('/:id', getFacultyById);

// Admin Operations (User collection role='faculty')
router.use(protect);
router.get('/admin/list', authorize('super_admin', 'admin'), adminGetFaculties);
router.post('/admin', authorize('super_admin', 'admin'), adminCreateFaculty);
router.put('/admin/:id', authorize('super_admin', 'admin'), adminUpdateFaculty);
router.delete('/admin/:id', authorize('super_admin', 'admin'), adminDeleteFaculty);

module.exports = router;
