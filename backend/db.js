import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tasksDir = path.join(__dirname, 'tasks');
if (!fs.existsSync(tasksDir)) {
  fs.mkdirSync(tasksDir);
}

// Function to generate unique task ID
const generateId = () => {
  const files = fs.readdirSync(tasksDir);
  const ids = files.map(file => parseInt(path.basename(file, '.json')));
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

const saveTaskToFile = (task) => {
  const filePath = path.join(tasksDir, `${task.task_id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(task, null, 2));
};

export const addTask = (title, description, assignedUser, priority, status, due_date) => {
  const currentTimestamp = Date.now();
  const newTask = {
    task_id: generateId(),
    title,
    description,
    create_date: currentTimestamp,
    update_date: currentTimestamp,
    due_date: new Date(due_date).getTime(),
    assigned_user_id: assignedUser,
    priority_id: priority,
    status_id: status,
  };

  saveTaskToFile(newTask);
};

export const updateTask = (task_id, updatedFields) => {
  const filePath = path.join(tasksDir, `${task_id}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error('Task not found');
  }

  const task = JSON.parse(fs.readFileSync(filePath));

  if (task.status_id === 5) {
    throw new Error('Task not found or already deleted');
  }

  task.update_date = Date.now();
  Object.assign(task, updatedFields);

  saveTaskToFile(task);
};

export const getAllTasks = () => {
  const files = fs.readdirSync(tasksDir);
  const tasks = files.map(file => {
    const task = JSON.parse(fs.readFileSync(path.join(tasksDir, file)));
    return task;
  }).filter(task => task.status_id !== 5);

  return tasks;
};

export const deleteTask = (task_id) => {
  const filePath = path.join(tasksDir, `${task_id}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error('Task not found');
  }

  const task = JSON.parse(fs.readFileSync(filePath));

  if (task.status_id === 5) {
    throw new Error('Task already deleted');
  }

  task.status_id = 5;
  task.update_date = Date.now();
  saveTaskToFile(task);
};
