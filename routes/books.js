// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { body, validationResult } = require('express-validator');

// Middleware for validation
const bookValidationRules = () => [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('author').not().isEmpty().withMessage('Author is required'),
    body('year').isNumeric().withMessage('Year must be a number')
];

// Add a new book
router.post('/add', bookValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, year, genre } = req.body;

    try {
        const newBook = new Book({ title, author, year, genre });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Update a book
router.put('/:id', bookValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, year, genre } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, year, genre },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(200).json({ msg: 'Book deleted', book: deletedBook });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;
