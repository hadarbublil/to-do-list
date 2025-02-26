import React, { useState, useEffect, useContext } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import EditTask from './EditTask';
import { getAllTasks } from '../services/tasksApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const TaskManager = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user, navigate]); 

  const UIState = {
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    NONE: 'NONE',   
  };

  const [currentState, setCurrentState] = useState(UIState.NONE);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
    setCurrentState(UIState.EDIT_TASK);
  };

  const handleClose = async () => {
    setCurrentState(UIState.NONE);
    setTasks(await getAllTasks());
  };

  const handleAddTaskClick = () => {
    setCurrentState(UIState.ADD_TASK);
  };

  return (
    <div className="container d-flex flex-column">
      <div className="d-flex justify-content-end mb-4 ">
        {currentState === UIState.NONE && (
          <button
            className="btn btn-primary btn-lg ml-auto mt-4"
            style={{ width: '200px'}}
            onClick={handleAddTaskClick}
          >
            Add Task
          </button>
        )}
      </div>

      {currentState === UIState.EDIT_TASK && editingTask && (
        <EditTask task={editingTask} onTaskUpdated={handleClose} />
      )}

      {currentState === UIState.ADD_TASK && <AddTask onClose={handleClose} />}

      <h2 className="text-dark font-weight-bold text-center flex-grow-1 mt-4">Tasks List</h2>
      <TaskList onEdit={handleEdit} tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskManager;
