import React, { useEffect } from 'react';
import { updateTask } from '../services/api';
import TaskForm from './TaskForm';
import useTaskForm from '../hooks/useTasksForm';

const EditTask = ({ task, onTaskUpdated }) => {
  const {
    formState,
    formActions,
    options,
  } = useTaskForm();

  useEffect(() => {
    formActions.setTitle(task.title);
    formActions.setDescription(task.description);
    formActions.setDueDate(new Date(task.due_date).toLocaleDateString('en-CA'));
    formActions.setPriority(task.priority_id);
    formActions.setStatus(task.status_id);
    formActions.setAssignedUserId(task.assigned_user_id);
  }, [task, formActions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task.task_id, {
      title: formState.title,
      description: formState.description,
      status_id: formState.status,
      due_date: new Date(formState.dueDate).getTime(),
      priority_id: formState.priority,
      assigned_user_id: formState.assignedUserId,
    });
    onTaskUpdated();
  };

  return (
    <div className="container mt-4">
      <h2>Edit Task</h2>
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
