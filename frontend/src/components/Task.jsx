// Task.jsx

import React from 'react';
import './Task.css';

const Task = ({ task, onDelete, onEdit }) => {
  const priorityLabels = ['Low', 'Medium', 'High', 'Urgent'];
  const statusLabels = ['Draft', 'In Progress', 'On Hold', 'Completed', 'Deleted'];
  return (
    <tr className="text-left">
      <td title={task.title} className='text-ellipsis'>{task.title}</td>
      <td title={task.description} className='text-ellipsis'>{task.description}</td>
      <td>{new Date(task.due_date).toLocaleDateString()}</td>
      <td>{new Date(task.create_date).toLocaleDateString()}</td>
      <td>{new Date(task.update_date).toLocaleDateString()}</td>
      <td>
        <span className={`tag priority-${task.priority_id}`}>
          {priorityLabels[task.priority_id - 1]}
        </span>
      </td>
      <td>
        <span className={`tag status-${task.status_id}`}>
          {statusLabels[task.status_id - 1]}
        </span>
      </td>
      <td>{task.assigned_user_id}</td>
      <td>
        <button className="btn btn-outline-success custom-border me-3" data-bs-toggle="button" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-outline-danger custom-border" onClick={() => onDelete(task.task_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Task;
