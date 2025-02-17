import express from 'express';
import { addTask, updateTask, getAllTasks, deleteTask } from './services/taskService.js';

const router = express.Router();

// Add task
router.post('/tasks', async (req, res) => {
    try {
        const { title, description, assignedUser = 1, priority = 1, status = 1, due_date } = req.body;
        if (!title || !description || !due_date) return res.status(400).json({ error: 'Missing required fields' });

        const task = await addTask(title, description, assignedUser, priority, status, due_date);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update task
router.put('/tasks/:id', async (req, res) => {
    try {
        const task_id = parseInt(req.params.id);
        const { assignedUser, due_date, ...updatedFields } = req.body;

        await updateTask(task_id, { ...updatedFields, assignedUser, due_date });
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task_id = parseInt(req.params.id);
        await deleteTask(task_id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
