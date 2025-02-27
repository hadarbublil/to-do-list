import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./HomePage.css"; 
import Login from "./Login";

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
        <h1>Welcome to Tasks Manager</h1>
        <div className="login-container">
          <p id="first-p">Please sign in to continue</p>
          <Login />
          <div className="signup-link">
            <p>Don't have an account yet? <span onClick={() => navigate("/signup")}>Sign up here</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
