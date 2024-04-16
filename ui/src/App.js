import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Inventory from './Pages/Inventory';
import Item from './Pages/Item';
import Edit from './Pages/Edit';
import NewItem from './Pages/NewItem';
//import LogIn from './Pages/LogIn';
import CreateAccount from './Pages/CreateAccount';
import { LogInTracker } from './Pages/LogInTracker';
import { Loginbutton } from './Pages/LogIn';
import './App.css';

function App() {
  const { loggedIn } = useContext(LogInTracker)
  console.log(loggedIn)

  return (
    <div>
      <h1>Supra Tracker</h1>
      <Loginbutton />
      <nav>
        <div className = 'navbar'>
          <ul style={{ listStyleType: "none" }} className="list-group list-group-horizontal">
            <li style={{display: 'flex', marginRight: '10px'}} className="list-group-item"><Link to="/">Home</Link></li>
            <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/inventory">All Items</Link></li>
            {loggedIn ? (
            <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/items/add">Add Item</Link></li>
            ) : ([]) }
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
        {/* <Route path='/users/login' element={<LogIn/>} /> */}
        <Route path='/users/createaccount' element={<CreateAccount/>} />
      </Routes>
    </div>
  );
}

export default App;
