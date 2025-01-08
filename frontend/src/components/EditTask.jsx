// EditTask.jsx

import React, { useState, useEffect } from 'react';
import { updateTask } from '../services/mock_backend';

const EditTask = ({ task, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(new Date(task.due_date).toLocaleDateString('en-CA'));
  const [priority, setPriority] = useState(task.priority_id);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(new Date(task.due_date).toLocaleDateString('en-CA'));
    setPriority(task.priority_id);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
        updateTask(task.task_id, { title, description, due_date: new Date(dueDate).getTime(), priority_id: priority });
        onTaskUpdated(); // Refresh task list in parent component
        // setError(null)
    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Task</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            className="form-control"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Urgent</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
