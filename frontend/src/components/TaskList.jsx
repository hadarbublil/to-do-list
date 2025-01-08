// TaskList.jsx

import React, { useEffect, useState } from 'react';
import Task from './Task';
import { getAllTasks, deleteTask } from '../services/api';

const TaskList = ({ onEdit, tasks, setTasks}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const fetchedTasks = await getAllTasks();
            setError(null);
            setTasks(fetchedTasks);
        } catch (err) {
            setError(err.message);
        }
    };
    fetchTasks(); 
  });

  const handleDelete = async (taskId) => {
    try {
        await deleteTask(taskId);
        setError(null);
        setTasks(prevTasks => prevTasks.filter(task => task.task_id !== taskId));
    } catch (error) {
        setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-dark mb-4 font-weight-bold">Tasks List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-hover">
        <thead>
          <tr className="text-center">
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
            <th scope="col">User Assigned</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.task_id} task={task} onDelete={handleDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
