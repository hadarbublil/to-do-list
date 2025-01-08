// App.js

import React, { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import EditTask from './components/EditTask';
import { getAllTasks } from '../../backend/db/mock_backend';

const App = () => {
  const UIState = {
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    NONE: 'NONE',
  };

  const [currentState, setCurrentState] = useState(UIState.VIEW_TASKS);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
    setCurrentState(UIState.EDIT_TASK);
  };

  const handleCloseEdit = () => {
    setCurrentState(UIState.NONE);
    setTasks(getAllTasks());
  };

  const handleCloseAddTask = () => {
    setCurrentState(UIState.NONE);   
    setTasks(getAllTasks());
  };

  const handleAddTaskClick = () => {
    setCurrentState(UIState.ADD_TASK); 
  };

  return (
    <div>
      <div className="container">
        <h1>To-Do List</h1>
        <button className="btn btn-primary" onClick={handleAddTaskClick}>Add Task</button>
        {currentState === UIState.ADD_TASK && (
          <AddTask onClose={handleCloseAddTask} />
        )}

        {currentState === UIState.EDIT_TASK && editingTask && (
          <EditTask task={editingTask} onTaskUpdated={handleCloseEdit} />
        )}

        <TaskList onEdit={handleEdit} tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default App;
