const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks - Retrieve all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /tasks - Create new task
router.post('/', async (req, res) => {
    const task = new Task({
        task: req.body.task,
        priority: req.body.priority || 'Medium'
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /tasks/:id - Update task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.body.task != null) task.task = req.body.task;
        if (req.body.completed != null) task.completed = req.body.completed;
        if (req.body.priority != null) task.priority = req.body.priority;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.deleteOne();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
