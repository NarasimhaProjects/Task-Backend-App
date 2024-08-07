const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body

    if(!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }

    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400)
        throw new Error('User Exists')
    }
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)

   const user = await User.create({ username, email, password: hashedPassword })

   if(user) {
       res.status(201).json({_id: user.id, username: user.name, email: user.email, token: generateJWTtoken(user._id) })
    } else {
       res.status(400)
       throw new Error('Invalid user Data')
   }
})

const loginUser = asyncHandler(async(req, res) => {
   const { email, password } = req.body
   const user = await User.findOne({ email })

   if (user && (await bcrypt.compare(password, user.password))) {
    res.json({_id: user.id, username: user.name, email: user.email, token: generateJWTtoken(user._id)})
   } else {
    res.status(400)
    throw new Error('Invalid Data')
   }
})
const getCurrentUser = asyncHandler(async(req, res) => {
    const { _id, username, email } = await User.findById(req.user.id)
    res.status(200).json({ id: _id, username, email })
})

const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d'})

module.exports = { registerUser, loginUser, getCurrentUser }