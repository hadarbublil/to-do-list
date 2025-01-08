import express from 'express';
import { addTask, updateTask, getAllTasks, deleteTask } from './db.js';

export const router = express.Router();

// Create a new task
router.post('/tasks', (req, res) => {
  try {
    const {
        title,
        description,
        assignedUser = 1, 
        priority = 1,     
        status = 1,       
        due_date = new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to tomorrow
      } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    addTask(title, description, assignedUser, priority, status, due_date);
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
router.get('/tasks', (req, res) => {
  try {
    const tasks = getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
router.put('/tasks/:id', (req, res) => {
  try {
    const task_id = parseInt(req.params.id);
    const updatedFields = req.body;

    if (isNaN(task_id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    updateTask(task_id, updatedFields);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
  try {
    const task_id = parseInt(req.params.id);

    if (isNaN(task_id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    deleteTask(task_id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
