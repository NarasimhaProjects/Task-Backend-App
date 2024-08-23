const express = require('express');
const { getTasks, setTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')


router.get('/', protect, getTasks);
router.post('/', protect, setTask);
router.put('/:id', protect, updateTask)
router.delete('/:id', protect, deleteTask)


module.exports = router;