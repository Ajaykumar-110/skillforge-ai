const Fee = require('../models/Fee');
const User = require('../models/User');

// @desc    Allocate fee structure to student
// @route   POST /api/fees
// @access  Private/Admin
const createFeeAllocation = async (req, res) => {
  try {
    const { studentId, amount, dueDate } = req.body;

    if (!studentId || !amount || !dueDate) {
      return res.status(400).json({ success: false, message: 'Please provide studentId, amount, and dueDate' });
    }

    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const fee = await Fee.create({
      student: studentId,
      amount,
      dueDate,
      status: 'pending',
    });

    res.status(201).json({ success: true, message: 'Fee allocated successfully', fee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Record fee payment receipt
// @route   POST /api/fees/:id/pay
// @access  Private/Admin/Student
const recordPayment = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ success: false, message: 'Fee record not found' });

    const { amountPaid } = req.body;
    if (!amountPaid || amountPaid <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid payment amount' });
    }

    const receiptNumber = 'REC-' + Date.now().toString().slice(-8).toUpperCase();

    fee.payments.push({
      amount: amountPaid,
      receiptNumber,
    });

    fee.paidAmount += Number(amountPaid);

    if (fee.paidAmount >= fee.amount) {
      fee.status = 'paid';
    } else {
      fee.status = 'pending';
    }

    await fee.save();

    res.json({
      success: true,
      message: 'Payment recorded successfully',
      receiptNumber,
      fee,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get fees list for a student
// @route   GET /api/fees/student/:studentId
// @access  Private
const getStudentFees = async (req, res) => {
  try {
    const { studentId } = req.params;
    const fees = await Fee.find({ student: studentId }).sort({ dueDate: 1 });
    res.json({ success: true, fees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all fees report (Admin)
// @route   GET /api/fees/report
// @access  Private/Admin
const getFeesReport = async (req, res) => {
  try {
    const records = await Fee.find()
      .populate('student', 'name email rollNumber department semester')
      .sort({ createdAt: -1 });

    const totalCollected = records.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const totalPending = records.reduce((acc, curr) => acc + (curr.amount - curr.paidAmount), 0);

    res.json({
      success: true,
      totalCollected,
      totalPending,
      records,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createFeeAllocation,
  recordPayment,
  getStudentFees,
  getFeesReport,
};
