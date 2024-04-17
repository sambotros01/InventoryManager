import './Inventory.css'
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogInTracker } from './LogInTracker';

function MyItems () {
  const { user_id } = useParams();
  const { loggedIn } = useContext(LogInTracker)
  const [ allItems, setAllItems ] = useState([]);
  // const [ foodDescription, setFoodDescription ] = useState([])
  const navigate = useNavigate();

  // console.log(userId)

  useEffect(() => {
    fetchItems();
    // console.log(allItems)
  }, [])

  const fetchItems = async () => {
    await fetch(`http://localhost:3001/inventory/user/${user_id}`)
    .then(response => response.json())
    .then(data => setAllItems(data))
    .catch(error => console.log('Error fetching games: ', error))
  }

  const Details = (item_id) => {
    navigate(`/inventory/items/${item_id}`)
  }

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
      :
      <h2>Please log in to view your inventory.</h2>
  );
}

export default MyItems