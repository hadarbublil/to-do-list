// src/components/HomePage.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  console.log("i am in home page");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/tasks'); 
    }
  }, [user, navigate]); 


  return (
    <div className="container text-center">
      <h2>Welcome to the To-Do List App</h2>
      <p>Please sign in or sign up to continue.</p>
      <div>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Sign In
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
