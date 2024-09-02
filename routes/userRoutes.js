const express = require('express')
const router = express.Router()
const { registerUser,loginUser, getCurrentUser } = require('../controllers/userController')
const { protect } = require('../middleware/authmiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/current', protect, getCurrentUser)

module.exports = router
