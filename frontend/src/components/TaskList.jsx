// TaskList.jsx

import React, { useEffect } from 'react';
import Task from './Task';
import { getAllTasks, deleteTask } from '../services/api';
import useError from '../hooks/useError';

const TaskList = ({ onEdit, tasks, setTasks}) => {
  const { error, handleError, clearError } = useError();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
        clearError(); 
      } catch (err) {
        handleError(err); 
      }
    };
    fetchTasks();
  }, [setTasks, handleError, clearError]); 


  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.task_id !== taskId));
      clearError(); 
    } catch (error) {
      handleError(error); 
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-dark mb-4 font-weight-bold">Tasks List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-hover">
        <thead>
          <tr className="text-center">
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
