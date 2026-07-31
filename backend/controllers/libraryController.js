const Book = require('../models/Book');

// @desc    Add a book
// @route   POST /api/library
// @access  Private/Admin
const addBook = async (req, res) => {
  try {
    const { title, author, isbn, copies } = req.body;

    if (!title || !author) {
      return res.status(400).json({ success: false, message: 'Please provide book title and author' });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      copies: copies || 1,
      availableCopies: copies || 1,
    });

    res.status(201).json({ success: true, message: 'Book added to catalog', book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update book details
// @route   PUT /api/library/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    const { title, author, isbn, copies } = req.body;

    if (copies && copies !== book.copies) {
      const diff = copies - book.copies;
      book.availableCopies = Math.max(0, book.availableCopies + diff);
      book.copies = copies;
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (isbn) book.isbn = isbn;

    await book.save();
    res.json({ success: true, message: 'Book details updated', book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete book from library
// @route   DELETE /api/library/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book deleted from catalog' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all books
// @route   GET /api/library
// @access  Private
const getBooks = async (req, res) => {
  try {
    const { search = '' } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } },
      ];
    }

    const books = await Book.find(query)
      .populate('borrowedBy.student', 'name email rollNumber')
      .sort({ title: 1 });

    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Issue a book to student
// @route   POST /api/library/:id/issue
// @access  Private/Admin
const issueBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    if (book.availableCopies <= 0) {
      return res.status(400).json({ success: false, message: 'No copies available for issue' });
    }

    const { studentId, durationDays = 14 } = req.body;

    // Check if student already has this book issued
    const alreadyIssued = book.borrowedBy.some((b) => b.student.toString() === studentId && !b.returnDate);
    if (alreadyIssued) {
      return res.status(400).json({ success: false, message: 'This book is already issued to this student' });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(durationDays));

    book.borrowedBy.push({
      student: studentId,
      dueDate,
    });

    book.availableCopies -= 1;
    await book.save();

    res.json({ success: true, message: 'Book issued successfully', book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Return a book
// @route   POST /api/library/:id/return
// @access  Private/Admin
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    const { studentId } = req.body;

    const issueRecord = book.borrowedBy.find((b) => b.student.toString() === studentId && !b.returnDate);
    if (!issueRecord) {
      return res.status(400).json({ success: false, message: 'No active issue record found for this student' });
    }

    issueRecord.returnDate = new Date();

    // Calculate fine: $1 or INR 10 per day overdue
    let fine = 0;
    const today = new Date();
    if (today > issueRecord.dueDate) {
      const diffTime = Math.abs(today - issueRecord.dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      fine = diffDays * 10;
    }

    book.availableCopies = Math.min(book.copies, book.availableCopies + 1);
    await book.save();

    res.json({
      success: true,
      message: 'Book returned successfully',
      fineAccrued: fine,
      book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getBooks,
  issueBook,
  returnBook,
};
