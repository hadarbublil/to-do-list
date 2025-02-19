import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';
import Task from '../models/Task.js';
import { addTask, updateTask, deleteTask } from '../services/taskService.js';

afterEach(() => {
  jest.clearAllMocks(); 
  jest.restoreAllMocks();
});

describe('addTask', () => {
  it('should add a task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test description',
      assignedUser: 1,
      priority: 1,
      status: 1,
      due_date: new Date(),
    };

    jest.spyOn(Task, 'create').mockResolvedValue(taskData);

    const result = await addTask(taskData);

    expect(result).toEqual(taskData);
    expect(Task.create).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if Task.create fails', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test description',
      assignedUser: 1,
      priority: 1,
      status: 1,
      due_date: new Date(),
    };

    jest.spyOn(Task, 'create').mockRejectedValue(new Error('Database error'));

    await expect(addTask(taskData)).rejects.toThrow('Database error');
  });

  it('should not allow adding a task with missing fields', async () => {
    const incompleteTaskData = {
      title: 'Missing Fields Task',
      description: 'Test description',
    };

    await expect(addTask(incompleteTaskData)).rejects.toThrow();
  });
});

describe('updateTask', () => {
  it('should successfully update a task', async () => {
    const taskData = {
      id: 1,
      title: 'Old Title',
      description: 'Old description',
      assignedUser: 1,
      priority: 1,
      status: 1,
      due_date: new Date(),
    };

    const mockTask = {
      ...taskData,
      update: jest.fn().mockResolvedValue(true),
    };
    jest.spyOn(Task, 'findByPk').mockResolvedValue(mockTask);

    const updatedFields = {
      title: 'Updated Title',
      description: 'Updated description',
    };

    await updateTask(1, updatedFields);

    expect(Task.findByPk).toHaveBeenCalledWith(1);
    expect(mockTask.update).toHaveBeenCalledWith(expect.objectContaining(updatedFields));
  });

  it('should throw an error if task is not found', async () => {
    jest.spyOn(Task, 'findByPk').mockResolvedValue(null);

    const updatedFields = {
      title: 'Updated Title',
      description: 'Updated description',
    };

    await expect(updateTask(1, updatedFields)).rejects.toThrow('Task not found or already deleted');
  });

  it('should throw an error if task is already deleted', async () => {
    const taskData = {
      id: 1,
      status_id: 5,
    };

    const mockTask = {
      ...taskData,
      update: jest.fn().mockResolvedValue(true),
    };
    jest.spyOn(Task, 'findByPk').mockResolvedValue(mockTask);

    const updatedFields = {
      title: 'Updated Title',
      description: 'Updated description',
    };

    await expect(updateTask(1, updatedFields)).rejects.toThrow('Task not found or already deleted');
  });
});

describe('deleteTask', () => {
  it('should successfully soft delete a task', async () => {
    const taskData = {
      id: 1,
      status_id: 1,
      title: 'Task to be deleted',
    };

    const mockTask = {
      ...taskData,
      update: jest.fn().mockResolvedValue(true),
    };
    jest.spyOn(Task, 'findByPk').mockResolvedValue(mockTask);

    await deleteTask(1);

    expect(Task.findByPk).toHaveBeenCalledWith(1);
    expect(mockTask.update).toHaveBeenCalledWith({ status_id: 5, update_date: expect.any(Date) });
  });

  it('should throw an error if task is not found', async () => {
    jest.spyOn(Task, 'findByPk').mockResolvedValue(null);

    await expect(deleteTask(1)).rejects.toThrow('Task already deleted');
  });

  it('should throw an error if task is already deleted', async () => {
    const taskData = {
      id: 1,
      status_id: 5,
    };

    const mockTask = {
      ...taskData,
      update: jest.fn().mockResolvedValue(true),
    };
    jest.spyOn(Task, 'findByPk').mockResolvedValue(mockTask);

    await expect(deleteTask(1)).rejects.toThrow('Task already deleted');
  });
});


describe('POST /tasks', () => {
    // it('should reject invalid date format', async () => {
    //   const response = await request(app)
    //     .post('/tasks')
    //     .send({
    //       task: {
    //         title: 'Invalid Date Task',
    //         description: 'Test description',
    //         assignedUser: 1,
    //         priority: 1,
    //         status: 1,
    //         due_date: 'invalid-date',
    //       }
    //     });
  
    //   expect(response.status).toBe(400);
    //   expect(response.body.error).toBe('Due date must be today or a future date');
    // });
  
    it('should reject past dates', async () => {
      const pastDate = new Date();
      console.log(`past date = ${pastDate}`);
      pastDate.setDate(pastDate.getDate() - 1);
      console.log(`past date after = ${pastDate}`);
  
      const response = await request(app)
        .post('/api/tasks')
        .send({
          task: {
            title: 'Past Date Task',
            description: 'Test description',
            assignedUser: 1,
            priority: 1,
            status: 1,
            due_date: pastDate.toISOString(),
          }
        });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Due date must be today or a future date');
    });
  
    it('should accept valid future dates', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
  
      jest.spyOn(Task, 'create').mockResolvedValue({
        title: 'Future Date Task',
        description: 'Test description',
        assignedUser: 1,
        priority: 1,
        status: 1,
        due_date: futureDate,
      });
  
      const response = await request(app)
        .post('/api/tasks')
        .send({
          task: {
            title: 'Future Date Task',
            description: 'Test description',
            assignedUser: 1,
            priority: 1,
            status: 1,
            due_date: futureDate.toISOString(),
          }
        });
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Task created successfully');
    });
  
    it('should reject requests with missing required fields', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          task: {
            title: 'Missing Fields Task',
            assignedUser: 1,
            priority: 1,
            status: 1,
          }
        });
  
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });
  });