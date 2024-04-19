import './Inventory.css'
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogInTracker } from './LogInTracker';

function MyItems () {
  const { user_id } = useParams();
  const { loggedIn, item, setItem, deleted } = useContext(LogInTracker)
  const [ allItems, setAllItems ] = useState([]);
  const [ id, setId ] = useState(0)
  const navigate = useNavigate();

  // Get all items in a specific user's inventory
  useEffect(() => {
    fetchItems();
  }, [])

  // Get highest item id in the item table
  useEffect(() => {
    fetchId();

    if(id > item ){
      setItem(id) // Set item id to the highest item id
    }
  }, [id])

  // Set item id value
  const fetchId = async () => {
    await fetch('http://localhost:3001/inventory')
    .then(response => response.json())
    .then(data => setId(parseInt(data[data.length-1].item_id)))
  }

  // Set all items for a specific user
  const fetchItems = async () => {
    await fetch(`http://localhost:3001/inventory/user/${user_id}`)
    .then(response => response.json())
    .then(data => setAllItems(data))
    .catch(error => console.log('Error fetching games: ', error))
  }

  // Route to detailed item page when clicked
  const Details = (item_id) => {
    navigate(`/inventory/items/${item_id}`)
  }

  // Provide item description with a 100 character cut off
  const Description = (foodDescription) => {
    if (foodDescription.length > 100 ){
      const cutOff = foodDescription.slice(0, 100)
      const newString = `${cutOff}...`
      return newString
    }
    else{
      return foodDescription
    }
  }

  return (
    (loggedIn) ?
    // Show inventory items if user is logged in
      <div className = 'Background'>
        <h1 className = 'Title'>My Items</h1>
          <div className="App">
          {allItems.map((food, index) => (
            <div className='inventory-pane' key={food.item_id} onClick={() => Details(food.item_id)}>
              <div className='item-title'>
                {food.item_name}
              </div>
              <div className='item-quantity'>
                {food.quantity}
              </div>
              <div className='item-details'>
                {Description(food.item_description)}
              </div>
            </div>
          ))}
        </div>
      </div>
      :
      // Tell user to log in to see their inventory
      <h2 className = 'Title'>Please log in to view your inventory.</h2>
  );
}

export default MyItems