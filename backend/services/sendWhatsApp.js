import dotenv from 'dotenv';
import twilio from 'twilio';
import { getTodayTasks } from './taskService.js';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendDailyTaskReminder = async () => {
  try {

    const tasks = await getTodayTasks();

    if (tasks.length === 0) {
      console.log('No tasks due today.');
      return;
    }

    const taskList = tasks.join('\n'); 
    const messageBody = `📌 *Today's Tasks:*\n\n${taskList}`;

    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.MY_PHONE_NUMBER,
      body: messageBody,
    });

    console.log('WhatsApp message sent:', message.sid);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};

export default sendDailyTaskReminder;
