const express = require('express');
const { getTasks, setTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();


router.get('/', getTasks);
router.post('/', setTask);
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)


module.exports = router;