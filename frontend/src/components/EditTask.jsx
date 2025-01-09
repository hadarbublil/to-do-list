import React, { useEffect } from 'react';
import { updateTask } from '../services/api';
import TaskForm from './TaskForm';
import useTaskForm from '../hooks/useTasksForm';
import useError from '../hooks/useError';

const EditTask = ({ task, onTaskUpdated }) => {
  const {
    formState,
    formActions,
    options,
  } = useTaskForm();

  const { error, handleError, clearError } = useError();

  useEffect(() => {
    formActions.setTitle(task.title);
    formActions.setDescription(task.description);
    formActions.setDueDate(new Date(task.due_date).toLocaleDateString('en-CA'));
    formActions.setPriority(task.priority_id);
    formActions.setStatus(task.status_id);
    formActions.setAssignedUserId(task.assigned_user_id);
  }, [task]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(task.task_id, {
        title: formState.title,
        description: formState.description,
        status_id: formState.status,
        due_date: new Date(formState.dueDate).getTime(),
        priority_id: formState.priority,
        assigned_user_id: formState.assignedUserId,
      });
      onTaskUpdated();
      clearError(); 
    } catch (err) {
      handleError(err); 
    }
  };

  return (
    <div className="container mt-4 col-6">
      <h2>Edit Task</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <TaskForm
        formState={formState}
        formActions={formActions}
        options={options}
        onSubmit={handleSubmit}
        onClose={onTaskUpdated}
      />
    </div>
  );
};

export default EditTask;
