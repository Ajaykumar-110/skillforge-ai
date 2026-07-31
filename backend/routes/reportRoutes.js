const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/dashboard-stats', protect, authorize('super_admin', 'admin'), getDashboardStats);

module.exports = router;
