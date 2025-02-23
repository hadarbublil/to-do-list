import { getTodayTasks } from '../services/taskService.js';

export const sendDailyTaskReminder = async (sendFunction) => {
  try {
    const tasks = await getTodayTasks();
    let messageBody;

    if (tasks.length === 0) {
      messageBody = '📌 *Today\'s Tasks:*\n\n✅ No tasks for today!';
    } else {
      const taskList = tasks.map(task => `✅ ${task.title}`).join('\n');
      messageBody = `📌 *Today's Tasks:*\n\n${taskList}`;
    }

    await sendFunction(messageBody); 
    console.log('Daily task reminder sent successfully!');
  } catch (error) {
    console.error('Error sending daily task reminder:', error);
  }
};
