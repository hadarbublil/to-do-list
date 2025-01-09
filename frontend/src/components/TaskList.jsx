import React, { useEffect, useState } from 'react';
import Task from './Task';
import { getAllTasks, deleteTask } from '../services/api';
import useError from '../hooks/useError';

const TaskList = ({ onEdit, tasks, setTasks }) => {
  const { error, handleError, clearError } = useError();
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const tasksPerPage = 10; // Number of tasks per page

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
      setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskId));
      clearError();
    } catch (error) {
      handleError(error);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-left text-dark mb-4 font-weight-bold">Tasks List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-hover">
        <thead>
          <tr className="text-left">
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
          {currentTasks.map((task) => (
            <Task
              key={task.task_id}
              task={task}
              onDelete={handleDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary mr-2"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ml-2"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;