// AddTask.jsx

import React, { useState } from 'react';
import { addTask } from '../services/mock_backend';

const AddTask = ({ onClose  }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, description, 1, 1, dueDate);
    onClose();  // Close the AddTask form after adding the task

  };

  return (
    <div className="container mt-4">
      <h2>Add Task</h2>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTask;
