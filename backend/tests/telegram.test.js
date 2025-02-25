import { jest } from '@jest/globals';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { 
  handleTelegramMessage, 
  handleAdd, 
  handleDelete, 
  handleToday 
} from '../services/sendTelegram.js';
import { 
  addTask, 
  deleteTask, 
  getTodayTasks 
} from '../services/taskService.js';

// Mock TelegramBot
const mockSendMessage = jest.fn();
jest.mock('node-telegram-bot-api', () => {
  return jest.fn().mockImplementation(() => {
    return { sendMessage: mockSendMessage };
  });
});

// Clear mocks after each test
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('Telegram Bot Tests', () => {
  beforeEach(() => {
    // Clear mock calls
    mockSendMessage.mockClear();
  });

  describe('handleTelegramMessage', () => {
    it('should send a welcome message on /start command', async () => {
      const chatId = 123;
      const text = '/start';

      mockSendMessage.mockResolvedValueOnce({});

      await handleTelegramMessage(chatId, text);
      
      expect(mockSendMessage).toHaveBeenCalledWith(
        chatId,
        'Welcome to your task manager bot! Use the following commands:\n\n/add [task_name] - Add a task\n/delete [task_id] - Delete a task\n/today - Get today\'s tasks'
      );
    });

    it('should call handleAdd and send task details on /add command', async () => {
      const chatId = 123;
      const text = '/add Buy groceries | Buy milk and eggs | tomorrow';
      const mockTask = { task_id: 1, title: 'Buy groceries' };
      
      jest.spyOn(addTask, 'mockImplementation').mockImplementation(() => Promise.resolve(mockTask));
      mockSendMessage.mockResolvedValueOnce({});

      await handleTelegramMessage(chatId, text);

      expect(addTask).toHaveBeenCalledWith({
        title: 'Buy groceries',
        description: 'Buy milk and eggs',
        due_date: expect.any(Date),
        assignedUser: 1,
        priority: 1,
        status: 1
      });
      expect(mockSendMessage).toHaveBeenCalledWith(
        chatId,
        expect.stringContaining('Task added:')
      );
    });
  });

  describe('handleDelete', () => {
    it('should handle deleting a task and send confirmation', async () => {
      const chatId = 123;
      const text = '/delete 1';

      jest.spyOn(deleteTask, 'mockImplementation').mockImplementation(() => Promise.resolve());
      mockSendMessage.mockResolvedValueOnce({});

      await handleDelete(chatId, text);

      expect(deleteTask).toHaveBeenCalledWith('1');
      expect(mockSendMessage).toHaveBeenCalledWith(
        chatId, 
        '🗑️ Task with ID 1 has been deleted.'
      );
    });

    it('should handle error when deleting a task fails', async () => {
      const chatId = 123;
      const text = '/delete 1';

      jest.spyOn(deleteTask, 'mockImplementation').mockImplementation(() => 
        Promise.reject(new Error('Failed to delete task'))
      );
      mockSendMessage.mockResolvedValueOnce({});

      await handleDelete(chatId, text);

      expect(mockSendMessage).toHaveBeenCalledWith(
        chatId, 
        'Error deleting task. Please try again.'
      );
    });
  });

  describe('handleToday', () => {
    it('should handle fetching today\'s tasks', async () => {
      const chatId = 123;
      const mockTasks = ['Task 1', 'Task 2'];

      jest.spyOn(getTodayTasks, 'mockImplementation').mockImplementation(() => Promise.resolve(mockTasks));
      mockSendMessage.mockResolvedValueOnce({});

      await handleToday(chatId);

      expect(mockSendMessage).toHaveBeenCalledWith(
        chatId,
        `📌 *Today's Tasks:*\n\nTask 1\nTask 2`
      );
    });

    it('should handle no tasks for today', async () => {
      const chatId = 123;
      
      jest.spyOn(getTodayTasks, 'mockImplementation').mockImplementation(() => Promise.resolve([]));
      mockSendMessage.mockResolvedValueOnce({});

      await handleToday(chatId);

      expect(mockSendMessage).toHaveBeenCalledWith(
        chatId, 
        'No tasks for today!'
      );
    });
  });
});