import React from 'react';
import { addTask } from '../services/api';
import TaskForm from './TaskForm';
import useTaskForm from '../hooks/useTasksForm';
import useError from '../hooks/useError';

const AddTask = ({ onClose }) => {
  const {
    formState,
    formActions,
    options,
  } = useTaskForm();

  const { error, handleError, clearError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(formState.title, formState.description, formState.assignedUserId, formState.priority, formState.status, formState.dueDate);
      formActions.resetForm();
      onClose();
      clearError(); 
    } catch (err) {
        handleError(err); 
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Task</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <TaskForm
        formState={formState}
        formActions={formActions}
        options={options}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};

export default AddTask;
