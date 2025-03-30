// Task.jsx

import React from 'react';
import './Task.css';

const Task = ({ task, onDelete, onEdit }) => {
  const priorityLabels = ['Low', 'Medium', 'High', 'Urgent'];
  const statusLabels = ['Draft', 'In Progress', 'On Hold', 'Completed', 'Deleted'];
  return (
    <tr className="text-center">
      <td title={task.title} className='text-ellipsis text-center-td'>{task.title}</td>
      <td title={task.description} className='text-ellipsis text-center-td'>{task.description}</td>
      <td className='text-center-td'>{new Date(task.due_date).toLocaleDateString()}</td>
      <td className='text-center-td'>{new Date(task.create_date).toLocaleDateString()}</td>
      <td className='text-center-td'>{new Date(task.update_date).toLocaleDateString()}</td>
      <td className='text-center-td'>
        <span className={`tag priority-${task.priority_id}`}>
          {priorityLabels[task.priority_id - 1]}
        </span>
      </td>
      <td className='text-center-td'>
        <span className={`tag status-${task.status_id}`}>
          {statusLabels[task.status_id - 1]}
        </span>
      </td>
      <td className='text-center' style={{verticalAlign: "middle"}}>{task.assigned_user_id}</td>
      <td>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn btn-outline-success custom-border task-btn" data-bs-toggle="button" onClick={() => onEdit(task)}>Edit</button>
          <button className="btn btn-outline-danger custom-border task-btn" onClick={() => onDelete(task.task_id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default Task;
