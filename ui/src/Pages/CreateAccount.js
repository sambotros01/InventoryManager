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
  // const [count, setCount] = useState(0);
  const { loggedIn, setLoggedIn, setUserId, userId } = useContext(LogInTracker)
  const navigate = useNavigate();
  // const bcrypt = require('bcrypt');
  // let saltRounds = 12;
  // let thePlaintextPassword = userPassword;


  // useEffect(() => {
  //   fetch('http://localhost:3001/users')
  //   .then(response => response.json())
  //   .then( data => setUserId(data[data.length].user_id))

  //   // navigate(`/inventory/users/${userId}`)

  //   }, [accountData])

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
    // console.log('What?: ', accountData)
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

      // bcrypt.hash(thePlaintextPassword, saltRounds)
      //   .then((hash) => {
      //     // Store hash in your password DB...
      //     // or insecurely log it!
      //     console.log(hash);
      //   })
      //   .catch((err) => {
      //     console.log("oopsie:", err);
      //   });

    //   await fetch('http://localhost:3001/users')
    //   .then(response => response.json())
    //   .then( index => {if (userId == 0){
    //     return index.length
    //   }else{
    //     return index.pop().user_id
    //   }
    // })
    // .then( data => setUserId(data))

    //   // .then( last => last.pop().user_id)
    //   // .then( x => console.log(x))
    //   // .then( data => setUserId(data))
    //   // .then ( x => console.log(userId))


    // setTimeout(() => (console.log(userId), 3000))
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