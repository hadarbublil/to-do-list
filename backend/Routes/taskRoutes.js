import express from 'express';
import { addTask, updateTask, getAllTasks, deleteTask } from '../services/taskService.js';
import { authenticate } from '../controllers/authController.js';

const router = express.Router();

export const validateDueDate = (dueDate) => {
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

// Add task
router.post('/tasks',authenticate, async (req, res) => {
  try {
      const { task } = req.body;  
      if (!task || !task.title || !task.due_date) {
        console.log("Received task data:", task);
        return res.status(400).json({ error: 'Missing required fields' });
      }
      validateDueDate(task.due_date);
      
      const createdTask = await addTask(task);

      res.status(201).json({ message: 'Task created successfully', task: createdTask });
      
  } catch (error) {
    const status = error.status || 500;
    console.log(`status = ${error.status}`);
    const message = error.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  }
});

// Get all tasks
router.get('/tasks',authenticate, async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update task
router.put('/tasks/:id', authenticate, async (req, res) => {
    try {
        const task_id = parseInt(req.params.id);
        validateId(task_id, 'Invalid task ID');
        const { assignedUser, due_date, ...updatedFields } = req.body;

        await updateTask(task_id, { ...updatedFields, assignedUser, due_date });
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete task
router.delete('/tasks/:id', authenticate, async (req, res) => {
    try {
        const task_id = parseInt(req.params.id);
        validateId(task_id, 'Invalid task ID');
        await deleteTask(task_id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
