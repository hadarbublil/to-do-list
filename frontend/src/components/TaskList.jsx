import React, { useEffect, useState } from 'react';
import Task from './Task';
import { getAllTasks, deleteTask } from '../services/api';
import useError from '../hooks/useError';

const TaskList = ({ onEdit, tasks, setTasks }) => {
  const { error, handleError, clearError } = useError();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  // New state variables for filtering and sorting
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskId));
      clearError();
    } catch (error) {
      handleError(error);
    }
  };

  // Filtering logic
  const filteredTasks = tasks.filter((task) =>
    Object.values(task).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Sorting logic
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortField) return 0; // No sorting
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = sortedTasks.slice(startIndex, startIndex + tasksPerPage);

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (field) => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setSortField(field);
  };

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Filter tasks..."
          className="form-control"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr className="text-left">
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th onClick={() => handleSort('due_date')}>Due Date</th>
            <th onClick={() => handleSort('create_date')}>Create Date</th>
            <th onClick={() => handleSort('update_date')}>Update Date</th>
            <th onClick={() => handleSort('priority_id')}>Priority</th>
            <th onClick={() => handleSort('status_id')}>Status</th>
            <th onClick={() => handleSort('assigned_user_id')}>User Assigned</th>
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
          className="btn btn-outline-primary mr-2 mx-2"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ml-2 mx-2"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TaskList;