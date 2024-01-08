const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel'); 
router.post('/', async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const newTodo = new Todo({
      userId,
      title,
      description,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add todo item' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo item' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo item' });
  }
});

module.exports = router;
