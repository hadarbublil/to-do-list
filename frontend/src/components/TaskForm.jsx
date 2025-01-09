import React from 'react';
import ToggleButton from './ToggleButton';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';

const TaskForm = ({
  formState,
  formActions,
  options,
  onSubmit,
  onClose,
}) => {
    const handleAssignedUserIdChange = (e) => {
        const value = e.target.value;
        const validValue = value === '' || isNaN(value) ? 1 : parseInt(value); 
        formActions.setAssignedUserId(validValue);
    };
    return(
    <form onSubmit={onSubmit}>
        <InputField 
        label="Title" 
        value={formState.title} 
        onChange={(e) => formActions.setTitle(e.target.value)} 
        />
        
        <TextAreaField 
        label="Description" 
        value={formState.description} 
        onChange={(e) => formActions.setDescription(e.target.value)} 
        type="textarea" 
        />
        
        <InputField 
        label="Due Date" 
        value={formState.dueDate} 
        onChange={(e) => formActions.setDueDate(e.target.value)} 
        type="date" 
        />

        <ToggleButton 
        value={formState.priority} 
        onChange={formActions.setPriority} 
        options={options.priorityOptions} 
        label="Priority" 
        />

        <ToggleButton 
        value={formState.status} 
        onChange={formActions.setStatus} 
        options={options.statusOptions} 
        label="Status" 
        />

        <InputField 
        label="Assigned user id" 
        value={formState.assignedUserId} 
        onChange={handleAssignedUserIdChange} 
        type="number" 
        />
        
        <div className="d-flex justify-content-between mt-3">
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
    </form>
    );
}

export default TaskForm;
