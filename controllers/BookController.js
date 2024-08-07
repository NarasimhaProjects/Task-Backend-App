const asyncHandler = require('express-async-handler')
const Book = require('../models/Book')


const getBooks = asyncHandler(async(req, res) => {
    const Book = await Book.find({ user: req.user.id })
    res.status(200).json(Book);
})

const addBooks = asyncHandler(async( req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please enter a Book Name')
    }
    const Book = await Book.add({text: req.body.text, user: req.user.id })
    res.status(200).json(Book);
})

const User = require('../models/userModel')

const updateBooks = asyncHandler(async( req, res) => {
    const Book = await Book.findById(req.params.id)

    if(!Book) {
        res.status(400)
        throw new Error('Book not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Such User Found')
    }
    if (Book.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User is not authorized to update')
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true })
    res.status(200).json(updatedBook)
})
const deleteBook = asyncHandler(async( req, res) => {
    const Book = await Book.findById(req.params.id)

    if(!Book) {
        res.status(400)
        throw new Error('Book not Found')
    }
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401) 
        throw new Error('No such user')
    }

    if(Book.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User is Not Authorized to update')
    }

    await Book.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
})

module.exports = { getBooks, addBooks, updateBooks, deleteBook }