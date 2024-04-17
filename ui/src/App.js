import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { compile } from 'path-to-regexp'
import Home from './Pages/Home';
import Inventory from './Pages/Inventory';
import Item from './Pages/Item';
import Edit from './Pages/Edit';
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
    <div>
      <h1>Supra Tracker</h1>
      <Loginbutton />
      <nav>
        <div className = 'navbar'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/inventory">All Items</Link></li>
            {loggedIn ? (<li><Link to="/inventory/items/add">Add Item</Link></li>) : ([]) }
            {loggedIn ? ( <li><Link to={toPath({user_id: userId})}>My Items</Link></li>) : ([]) }
        </ul>
        </div>
        <br></br>
      </nav>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/inventory' element={<Inventory/>} />
        <Route path='/inventory/items/:item_id' element={<Item/>} />
        <Route path='/inventory/items/add' element={<NewItem/>} />
        <Route path='/inventory/items/edit/:item_id' element={<Edit/>} />
        <Route path='/inventory/users/:user_id' element={<MyItems/>} />
        <Route path='/users/login' element={<LogIn/>} />
        <Route path='/users/new' element={<CreateAccount/>} />
      </Routes>
    </div>
  );
}

export default App;
