import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInTracker } from './LogInTracker';

function CreateAccount () {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [accountData, setAccountData] = useState('');
  const [count, setCount] = useState(0);
  const { loggedIn, setLoggedIn, setUserId, userId } = useContext(LogInTracker)
  const navigate = useNavigate();


  // useEffect(() => {
  //   fetch('http://localhost:3001/users')
  //   .then(response => response.json())
  //   .then( data => setUserId(data[data.length].user_id))

  //   // navigate(`/inventory/users/${userId}`)

  //   }, [accountData])


  useEffect(() => {
    const addUser = async () => {
      try{
        const response = await fetch('http://localhost:3001/users')
        // navigate(`/inventory/users/${response.user_id}`)

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

    console.log('What?: ', accountData)
  }, [accountData])

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const request_data = {
  //     name_first: firstName,
  //     name_last: lastName,
  //     username: userName,
  //     password: userPassword
  //   };

  //   setAccountData(request_data)
  //   window.confirm("Account created!")
  //   setLoggedIn(true)
  //   navigate(`/inventory/users/${request_data.user_id}`)
  // }

  const request_data = {
    name_first: firstName,
    name_last: lastName,
    username: userName,
    password: userPassword,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/users', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(request_data),
    }).then((res) => {
      if (res.status === 409) {
        alert("Username is already in use, please try a different username");
      } else{
        window.confirm("Account created!")
        setLoggedIn(true)
        setAccountData(request_data)
      }
    }).then(
      fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then( last => last.pop())
      // .then( x => console.log(x.user_id))
      .then( data => setUserId(data.user_id))
      .then(x => navigate(`/inventory/users/${userId}`))
    )
  }

  return (
    <div>
      <h1>Create A New Account</h1>

      <form onSubmit={(event) => handleSubmit(event)}>

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