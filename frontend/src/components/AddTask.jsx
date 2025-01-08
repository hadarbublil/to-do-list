import React from 'react';
import { addTask } from '../services/api';
import TaskForm from './TaskForm';
import useTaskForm from '../hooks/useTasksForm';

const AddTask = ({ onClose }) => {
  const {
    formState,
    formActions,
    options,
  } = useTaskForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(formState.title, formState.description, formState.assignedUserId, formState.priority, formState.status, formState.dueDate);
    formActions.resetForm();
    onClose();
  };

  return (
    <div className="container mt-4">
      <h2>Add Task</h2>
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
