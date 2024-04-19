import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInTracker } from './LogInTracker';
import './Login.css'

function LogIn () {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { loggedIn, setLoggedIn, setUserId, userId } = useContext(LogInTracker)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: userName,
      password: userPassword,
    };

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    }).then(async(res) => {
      if (res.status === 200){
        let jsonres = await res.json();
        setLoggedIn(true);
        setUserId(jsonres[0].user_id);
      } else{
        alert("Account not found! Please try again or create a new account.")
      }
    })
  }

  const NewAccount = () => {
    navigate('/users/new')
  }

  return loggedIn ? (
    <div className = 'Background'>
      {/* <h1>Welcome {userName}!</h1> */}
      {navigate(`/inventory/users/${userId}`)}
    </div>
  ) : (
    <div className = 'Background'>
      <h2 className = 'Title'>Log In</h2>
      <br />
      <form className = 'Form'>
        <label>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter Username"
            style={{ padding: 15, borderRadius: 5, textAlign: "center" }}
            onInput={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter Password"
            style={{ padding: 15, borderRadius: 5, textAlign: "center" }}
            onInput={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <br></br>
        <br></br>
        <input
          type="submit"
          className="Submit"
          value="Submit"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
      <br></br>
      <div className = 'Container'>
        <button
          type="button"
          className= "CreateAccount"
          onClick={() => NewAccount()}
        >
          New Account
        </button>
      </div>
    </div>
  );

}

export default LogIn