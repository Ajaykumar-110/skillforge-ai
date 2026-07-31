const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, 'Number of copies is required'],
      default: 1,
    },
    availableCopies: {
      type: Number,
      required: [true, 'Number of available copies is required'],
      default: 1,
    },
    borrowedBy: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        borrowDate: {
          type: Date,
          default: Date.now,
        },
        dueDate: {
          type: Date,
          required: true,
        },
        returnDate: {
          type: Date,
        },
        finePaid: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
