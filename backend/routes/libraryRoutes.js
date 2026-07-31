const express = require('express');
const router = express.Router();
const { getBooks, addBook, updateBook, deleteBook, issueBook, returnBook } = require('../controllers/libraryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getBooks)
  .post(authorize('super_admin', 'admin'), addBook);

router.route('/:id')
  .put(authorize('super_admin', 'admin'), updateBook)
  .delete(authorize('super_admin', 'admin'), deleteBook);

router.post('/:id/issue', authorize('super_admin', 'admin'), issueBook);
router.post('/:id/return', authorize('super_admin', 'admin'), returnBook);

module.exports = router;
