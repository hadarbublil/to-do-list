import dotenv from 'dotenv';
import twilio from 'twilio';
import { sendDailyTaskReminder } from './sendDailyTasks.js';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendWhatsAppMessage = async (message) => {
    try {
      const msg = await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: process.env.MY_PHONE_NUMBER,
        body: message,
      });
      console.log('WhatsApp message sent:', msg.sid);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  };
  
export const sendDailyTaskReminderWhatsApp = async () => {
    await sendDailyTaskReminder(sendWhatsAppMessage);
};

