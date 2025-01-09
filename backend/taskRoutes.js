import express from 'express';
import { addTask, updateTask, getAllTasks, deleteTask } from './db.js';

export const router = express.Router();
const validateDueDate = (dueDate) => {
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate) || parsedDueDate < new Date().setHours(0, 0, 0, 0)) {
        throw { status: 400, message: 'Due date must be today or a future date' };
    }
};

const validateId = (id, message) => {
    if (isNaN(id)) {
        throw { status: 400, message: message };
    }
};

// add task
router.post('/tasks', (req, res) => {
    try {
        const {
            title,
            description,
            assignedUser = 1, 
            priority = 1,     
            status = 1,       
            due_date,
        } = req.body;

        if (!title || !description || !due_date) {
            return res.status(400).json({ error: 'Missing required fields: title, description, and due_date are required.' });
        }

        validateDueDate(due_date);    
        validateId(assignedUser, "User Id must be a number");
        addTask(title, description, assignedUser, priority, status, due_date);
        
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message }); 
        }
        res.status(500).json({ error: 'Internal Server Error' });
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
    const { assignedUser, due_date, ...updatedFields } = req.body;

    validateId(task_id, "Invalid task id");
    if (assignedUser !== undefined) validateAssignedUserId(assignedUser);
    if (due_date !== undefined) validateDueDate(due_date);
    updateTask(task_id, { ...updatedFields, assignedUser, due_date });
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
  try {
    const task_id = parseInt(req.params.id);

    validateId(task_id, "Invalid task id"); 

    deleteTask(task_id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
