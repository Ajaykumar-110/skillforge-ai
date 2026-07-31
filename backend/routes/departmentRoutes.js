const express = require('express');
const router = express.Router();
const { 
  getDepartments, 
  getDepartmentById, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment 
} = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public Directory
router.get('/', getDepartments);
router.get('/:id', getDepartmentById);

// Admin Operations
router.post('/', protect, authorize('super_admin', 'admin'), createDepartment);
router.put('/:id', protect, authorize('super_admin', 'admin'), updateDepartment);
router.delete('/:id', protect, authorize('super_admin', 'admin'), deleteDepartment);

module.exports = router;
