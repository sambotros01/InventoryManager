import React, { useContext } from "react";
import { LogInTracker } from "./LogInTracker";
import { useNavigate } from "react-router-dom";

export const Loginbutton = () => {
  const { loggedIn, setLoggedIn } = useContext(LogInTracker);
  const navigate = useNavigate();

  const handleOnClick = () => {
   setLoggedIn(false)
   navigate('/')
  }

  // Render Log In button based on log in status
  return loggedIn ? (
    <button type="button" onClick={() => handleOnClick()} class="btn btn-dark">Log Out</button>
  ) : (
    <button type="button" onClick={() => navigate('/users/login')} class="btn btn-dark">Log In</button>
  );
};