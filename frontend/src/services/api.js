import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Add a new task
export const addTask = async (title, description, assignedUser, priority, status, due_date) => {
  const newTask = {
    title,
    description,
    assignedUser,
    priority,
    status,
    due_date: new Date(due_date).getTime(),
  };

  await axios.post(API_URL, newTask);
};

// Update a task's field by ID
export const updateTask = async (task_id, updatedFields) => {
  const response = await axios.put(`${API_URL}/${task_id}`, updatedFields);

  if (response.status !== 200) {
    throw new Error('Task not found or already deleted');
  }
};

// Get all tasks
export const getAllTasks = async () => {
  const response = await axios.get(API_URL);
  const tasks = response.data.filter(task => task.status_id !== 5);

  if (tasks.length === 0) {
    return [];
  }
  return tasks;
};

// Delete a task by ID
export const deleteTask = async (task_id) => {
  const response = await axios.delete(`${API_URL}/${task_id}`);

  if (response.status !== 200) {
    throw new Error('Task not found or already deleted');
  }
  return null;
};
