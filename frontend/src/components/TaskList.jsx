// TaskList.jsx

import React, { useEffect, useState } from 'react';
import Task from './Task';
import { getAllTasks, deleteTask } from '../../../backend/db/mock_backend';

const TaskList = ({ onEdit, tasks, setTasks}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
        const fetchedTasks = getAllTasks();
        setError(null);
        setTasks(fetchedTasks);
    } catch (err) {
        setError(err.message);
    }
  }, []);

  const handleDelete = (taskId) => {
    try {
        deleteTask(taskId);
        setError(null);
        setTasks(prevTasks => prevTasks.filter(task => task.task_id !== taskId));
    } catch (error) {
        setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Tasks List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>User Assigned</th>
            <th>Actions</th>
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
