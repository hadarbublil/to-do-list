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
          <AuthenticatedRoutes />
        </div>
      </AuthProvider> 
    </Router>
  );
};

const AuthenticatedRoutes = () => {
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
