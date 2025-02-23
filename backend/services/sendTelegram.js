import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { sendDailyTaskReminder } from './sendDailyTasks.js';
import { addTask, deleteTask, getTodayTasks, updateTask } from './taskService.js';
import axios from 'axios';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

export const parseDueDate = (input) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  if (input.toLowerCase() === 'today') {
    return today;
  } else if (input.toLowerCase() === 'tomorrow') {
    return tomorrow;
  } else if (input.toLowerCase().startsWith('in')) {
    const days = parseInt(input.split(' ')[1]);
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);
    return futureDate;
  } else {
    const dateParts = input.split('/');
    if (dateParts.length === 3) {
      const [month, day, year] = dateParts;
      const specificDate = new Date(year, month - 1, day);
      if (!isNaN(specificDate)) return specificDate;
    }
  }
  return tomorrow;
};

export async function handleAdd(chatId, text) {
  const taskDetails = text.slice(4).trim();
  const parts = taskDetails.split('|');
  const taskTitle = parts[0].trim();
  const taskDescription = parts[1] ? parts[1].trim() : 'No description';
  const taskDueDateInput = parts[2] ? parts[2].trim() : 'tomorrow';
  const assignedUser = parts[3] ? parts[3].trim() : 1;

  if (taskTitle) {
    try {
      const dueDate = parseDueDate(taskDueDateInput);
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        due_date: dueDate,
        assignedUser: assignedUser,
        priority: 1,
        status: 1,
      };
      const createdTask = await addTask(newTask);
      bot.sendMessage(chatId, `Task added: \n\n*Task ID:* ${createdTask.task_id}\n*Title:* "${taskTitle}"\n*Description:* "${taskDescription}"\n*Due date:* ${dueDate.toLocaleDateString()}`);
    } catch (error) {
      bot.sendMessage(chatId, 'Error adding task. Please try again.');
    }
  } else {
    bot.sendMessage(chatId, 'Please provide both title and description after the command. Example: /add Buy groceries | Buy milk and eggs | tomorrow');
  }
}

export async function handleDelete(chatId, text) {
  const taskId = text.slice(7).trim();
  if (taskId) {
    try {
      await deleteTask(taskId);
      bot.sendMessage(chatId, `🗑️ Task with ID ${taskId} has been deleted.`);
    } catch (error) {
      bot.sendMessage(chatId, 'Error deleting task. Please try again.');
    }
  } else {
    bot.sendMessage(chatId, 'Please provide a task ID to delete. Example: /delete 1');
  }
}

export async function handleToday(chatId) {
  try {
    const tasks = await getTodayTasks();
    if (tasks.length === 0) {
      bot.sendMessage(chatId, 'No tasks for today!');
    } else {
      const taskList = tasks.join('\n');
      bot.sendMessage(chatId, `📌 *Today's Tasks:*\n\n${taskList}`);
    }
  } catch (error) {
    bot.sendMessage(chatId, 'Error fetching tasks. Please try again.');
  }
}

export async function handleEdit(chatId, text) {
    const parts = text.split(' '); 
    if (parts.length < 2) {
      bot.sendMessage(chatId, 'Please provide a task ID and at least one field to edit. Example: edit 1 title=New Title');
      return;
    }
  
    const taskId = parts[1]; 
    const updatedFields = {};
  
    
    for (let i = 2; i < parts.length; i++) {
      const [key, value] = parts[i].split('=');
      if (key && value) {
        updatedFields[key] = value; 
      }
    }
  
    if (Object.keys(updatedFields).length === 0) {
      bot.sendMessage(chatId, 'No valid fields provided to update. Example: edit 1 title=New Title');
      return;
    }
  
    try {
      await updateTask(taskId, updatedFields);
      bot.sendMessage(chatId, `✅ Task with ID ${taskId} has been updated.`);
    } catch (error) {
      bot.sendMessage(chatId, 'Error updating task. Please try again.');
    }
}

export async function handleTelegramMessage(chatId, text) {
  if (text.startsWith('add')) {
    await handleAdd(chatId, text);
  } else if (text.startsWith('delete')) {
    await handleDelete(chatId, text);
  } else if (text === 'today') {
    await handleToday(chatId);
  } else if (text === 'start') {
    bot.sendMessage(chatId, 'Welcome to your task manager bot! Use the following commands:\n\nadd [task_name] - Add a task\ndelete [task_id] - Delete a task\ntoday - Get today\'s tasks');
  } else if (text.startsWith('edit')) { 
    await handleEdit(chatId, text);
  } else {
    bot.sendMessage(chatId, 'I didn\'t understand that command. Try /start for available commands.');
  }
}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  
  await handleTelegramMessage(chatId, text);
});

async function sendTelegramMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await axios.post(url, { chat_id: chatId, text });
}

export const sendDailyTaskReminderTelegram = async () => {
  await sendDailyTaskReminder(sendTelegramMessage);
};
