import Task from '../models/Task.js';
import { Op } from 'sequelize'; 

export const addTask = async (title, description, assignedUser, priority, status, due_date) => {
  return await Task.create({
    title,
    description,
    due_date,
    assigned_user_id: assignedUser,
    priority_id: priority,
    status_id: status,
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
  if (!task || task.status_id === 5) throw new Error('Task already deleted');

  await task.update({ status_id: 5, update_date: new Date() });
};
