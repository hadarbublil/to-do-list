// Mock database for storing tasks
let tasks = [];

// Function to generate unique task ID
const generateId = () => {
  return tasks.length > 0 ? Math.max(tasks.map(task => task.task_id)) + 1 : 1;
};

// Add a new task
export const addTask = (title, description, assignedUser, priority, status, due_date) => {
  const currentTimestamp = Date.now(); // Use current timestamp for create_date and update_date
  const newTask = {
    task_id: generateId(),
    title,
    description,
    create_date: currentTimestamp,
    update_date: currentTimestamp,
    due_date: new Date(due_date).getTime(), // Ensure the due_date is a valid timestamp
    assigned_user_id: assignedUser,
    priority_id: priority, // Priority (1 - Low, 2 - Medium, 3 - High, 4 - Urgent)
    status_id: status, 
  };
  tasks.push(newTask);
};

// Update a task's field by ID
export const updateTask = (task_id, updatedFields) => {
  const task = tasks.find(task => task.task_id === task_id);
  if (!task || task.status_id === 5) {
    throw new Error('Task not found or already deleted');
  }

  task.update_date = Date.now();

  Object.assign(task, updatedFields);
};

export const getAllTasks = () => {
  tasks =  tasks.filter(task => task.status_id !== 5);
  if (tasks.length === 0) {
    // throw new Error('No tasks found');
    return [];
  }
  return tasks;
};

// Delete a task by ID
export const deleteTask = (task_id) => {
  const taskIndex = tasks.findIndex(task => task.task_id === task_id);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }

  // Mark task as deleted (status_id = 5)
  const deletedTask = tasks[taskIndex];
  if (deletedTask.status_id === 5) {
    throw new Error('Task already deleted'); 
  }

  deletedTask.status_id = 5;
  deletedTask.update_date = Date.now(); // Update the date when marking as deleted
  return null;
};
