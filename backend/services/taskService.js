import Task from '../models/Task.js';
import { Op } from 'sequelize'; 

export const addTask = async (task) => {
  return await Task.create({
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    assigned_user_id: task.assignedUser,
    priority_id: task.priority,
    status_id: task.status,
  });
};

export const getAllTasks = async () => {
  return await Task.findAll({
    where: { status_id: { [Op.ne]: 5 } }, // Exclude deleted tasks
  });
};

export const updateTask = async (task_id, updatedFields) => {
  const task = await Task.findByPk(task_id);
  if (!task || task.status_id === 5) throw new Error('Task not found or already deleted');

  updatedFields.update_date = new Date();
  await task.update(updatedFields);
};

// Delete task (soft delete by updating status)
export const deleteTask = async (task_id) => {
  const task = await Task.findByPk(task_id);
  console.log(`task=${task}`);
  if (!task || task.status_id === 5) throw new Error('Task already deleted');

  await task.update({ status_id: 5, update_date: new Date() });
};

export const getTodayTasks = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasks = await Task.findAll({
      where: {
        due_date: {
          [Op.gte]: today, // Due date is today or later
          [Op.lt]: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Before tomorrow
        },
        status_id: { [Op.ne]: 5 } 
      },
      attributes: ['title', 'description'], 
    });
    console.log('tasks in getTodayTasks:', JSON.stringify(tasks, null, 2));
    return tasks.map(task => `${task.get('title')}: ${task.get('description')}`);

  } catch (error) {

    console.error('Error fetching today’s tasks:', error);
    return [];
  }
};

