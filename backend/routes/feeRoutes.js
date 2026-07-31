const express = require('express');
const router = express.Router();
const { createFeeAllocation, recordPayment, getStudentFees, getFeesReport } = require('../controllers/feeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(authorize('super_admin', 'admin'), createFeeAllocation);

router.get('/report', authorize('super_admin', 'admin'), getFeesReport);
router.get('/student/:studentId', getStudentFees);
router.post('/:id/pay', recordPayment);

module.exports = router;
