import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./HomePage.css"; 

const HomePage = () => {
  console.log("I am in home page");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/tasks");
    }
  }, [user, navigate]);

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h2>Welcome to Tasks Manager</h2>
        <p>Please sign in or sign up to continue.</p>
        <div className="button-group">
          <button
            className="btn-primary"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
