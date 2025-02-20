import express from 'express';
import cors from 'cors';
import taskRoutes from './taskRoutes.js';
import sequelize from './config/database.js';
import cron from 'node-cron';

import sendDailyTaskReminder from './services/sendWhatsApp.js';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

const syncDatabase = async () => {
  try {
    await sequelize.sync();  // Sync the database
    console.log('Database synced!');
    
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

cron.schedule('0 8 * * *', () => {
  console.log('Sending daily WhatsApp task reminder...');
  sendDailyTaskReminder();
}, {
  timezone: 'UTC'
});

sendDailyTaskReminder();

export default app;
