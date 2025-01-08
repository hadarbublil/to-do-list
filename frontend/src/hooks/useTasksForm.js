import { useState, useEffect } from 'react';

const useTaskForm = (initialValues = {}) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [dueDate, setDueDate] = useState(initialValues.dueDate || '');
  const [priority, setPriority] = useState(initialValues.priority || 1);
  const [assignedUserId, setAssignedUserId] = useState(initialValues.assignedUserId || 1);
  const [status, setStatus] = useState(initialValues.status || 1);

  const statusOptions = [
    { value: 1, label: 'Draft' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'On Hold' },
    { value: 4, label: 'Completed' },
    { value: 5, label: 'Deleted' },
  ];

  const priorityOptions = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' },
    { value: 4, label: 'Urgent' },
  ];

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority(1);
    setAssignedUserId(1);
    setStatus(1);
  };

  const setFormValues = (values) => {
    setTitle(values.title || '');
    setDescription(values.description || '');
    setDueDate(values.dueDate || '');
    setPriority(values.priority || 1);
    setAssignedUserId(values.assignedUserId || 1);
    setStatus(values.status || 1);
  };

  return {
    formState: {
        title,
        description,
        dueDate,
        priority,
        assignedUserId,
        status,
      },
      formActions: {
        setFormValues,
        resetForm,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        setAssignedUserId,
        setStatus,
      },
      options: {
        statusOptions,
        priorityOptions,
      }
    };
};

export default useTaskForm;
