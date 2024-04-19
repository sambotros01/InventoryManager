import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { compile } from 'path-to-regexp'
import Home from './Pages/Home';
import Inventory from './Pages/Inventory';
import Item from './Pages/Item';
import NewItem from './Pages/NewItem';
import MyItems from './Pages/MyItems';
import LogIn from './Pages/LogIn'
import CreateAccount from './Pages/CreateAccount';
import { LogInTracker } from './Pages/LogInTracker';
import { Loginbutton } from './Pages/LogInFeatures';
import './App.css';

function App() {
  const { loggedIn, userId } = useContext(LogInTracker)
  console.log(loggedIn)

  const MY_ROUTE = '/inventory/users/:user_id';
  const toPath = compile(MY_ROUTE)

  return (
    <div className = 'all'>
      <div className = 'header'>
        <div className = 'top'>
          <h1 className = 'title'>Supra Tracker</h1>
            <div className = 'login'>
              <Loginbutton />
            </div>
        </div>

        <nav>
            {/* <ul className = 'navbar'> */}
              <li className = 'link'><Link to="/">Home</Link></li>
              <li><Link to="/inventory">All Items</Link></li>
              {loggedIn ? ( <li><Link to={toPath({user_id: userId})}>My Items</Link></li>) : ([]) }
              {loggedIn ? (<li><Link to="/inventory/items/add">Add Item</Link></li>) : ([]) }
            {/* </ul> */}
          <br></br>
        </nav>
      </div>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/inventory' element={<Inventory/>} />
          <Route path='/inventory/items/:item_id' element={<Item/>} />
          <Route path='/inventory/items/add' element={<NewItem/>} />
          <Route path='/inventory/users/:user_id' element={<MyItems/>} />
          <Route path='/users/login' element={<LogIn/>} />
          <Route path='/users/new' element={<CreateAccount/>} />
        </Routes>
    </div>
  );
}

export default App;
