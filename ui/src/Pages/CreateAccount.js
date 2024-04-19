import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInTracker } from './LogInTracker';
import './Login.css'

function CreateAccount () {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [accountData, setAccountData] = useState('');
  const { loggedIn, setLoggedIn, setUserId, userId } = useContext(LogInTracker)
  const navigate = useNavigate();

  // Get user id for the new account
  useEffect(() => {
    fetch('http://localhost:3001/users')
    .then(response => response.json())
    .then( index => {if (userId == 0){
      return index.length + 1
    }else{
      return index.pop().user_id + 1
    }
  })
  .then( data => setUserId(data))
  }, [userId, setUserId])


  // Fetch current user table data
  useEffect(() => {
    const addUser = async () => {
      try{
        const response = await fetch('http://localhost:3001/users')

        if (!response.ok) {
          throw new Error(`HTTP eror status: ${response.status}`)
        }
      } catch(error){
        console.error('Error submitting ticket:', error);
        alert('Error creating new account. Please try again.');
      }
    };

    if (accountData){
      addUser()
    }

  }, [accountData])

  // Required user data
  const request_data = {
    name_first: firstName,
    name_last: lastName,
    username: userName,
    password: userPassword,
  };

  // Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
      fetch('http://localhost:3001/users', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(request_data),
      }).then((res) => {
        if (res.status === 409) {
          alert("Username is already in use, please try a different username");
        } else{
          window.confirm("Account created! You will now be redirected to your inventory")
          setLoggedIn(true)
          setAccountData(request_data)
        }
      })

    setTimeout(() => navigate(`/inventory/users/${userId}`), 2000)
  }

  return (
    <div className = "Background">
      <h1 className = 'Title'>Create A New Account</h1>

      <form className = 'Form' onSubmit={(event) => handleSubmit(event)}>

        <label>
          <input
            type="text"
            placeholder="Enter First Name"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br/>

        <label>
          <input
            type="text"
            placeholder="Enter Last Name"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br/>

        <label>
          <input
            type="text"
            placeholder="Enter Username"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br/>

        <label>
          <input
            type="password"
            placeholder="Enter Password"
            value={userPassword}
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <br/>

        <button className="btn btn-dark" type="submit">Submit</button>

      </form>
    </div>
  );
}

export default CreateAccount