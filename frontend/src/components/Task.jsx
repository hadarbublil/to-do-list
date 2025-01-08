// Task.jsx

import React from 'react';

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{new Date(task.due_date).toLocaleDateString()}</td>
      <td>{task.priority_id}</td>
      <td>{task.status_id === 1 ? 'Draft' : 'In Progress'}</td>
      <td>
        <button className="btn btn-warning" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(task.task_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Task;
