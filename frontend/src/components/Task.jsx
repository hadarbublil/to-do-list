// Task.jsx

import React from 'react';

const Task = ({ task, onDelete, onEdit }) => {
  const priorityLabels = ['Low', 'Medium', 'High', 'Urgent'];
  const statusLabels = ['Draft', 'In Progress', 'On Hold', 'Completed', 'Deleted'];
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{new Date(task.due_date).toLocaleDateString()}</td>
      <td>{priorityLabels[task.priority_id - 1]}</td>
      <td>{statusLabels[task.status_id - 1]}</td>
      <td>{task.assigned_user_id}</td>
      <td>
        <button className="btn btn-warning" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(task.task_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Task;
