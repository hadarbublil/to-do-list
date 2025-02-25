// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Login from './components/Login'; 
import Signup from './components/SignUp'; 
import HomePage from './components/HomePage';
import { Layout } from "./components/Layout";
import { AuthProvider } from './context/AuthContext'; 


const App = () => {
  return (
    <Router> 
      <AuthProvider> 
        <div>
          <h1 className='text-dark font-weight-bold text-center display-4 my-4'>To-Do List</h1>
          <AuthenticatedRoutes />
        </div>
      </AuthProvider> 
    </Router>
  );
};

const AuthenticatedRoutes = () => {
  // const { user } = useContext(AuthContext); 
  // console.log(user);
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<TaskManager />} />
        </Route>
      </Routes>
  );
};

export default App;
