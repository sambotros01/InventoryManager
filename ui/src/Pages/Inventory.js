import './Inventory.css'
import React, { useState, useEffect, useContext } from 'react';
import { LogInTracker } from './LogInTracker';
import { useNavigate } from 'react-router-dom';

function Inventory () {
  const [ allItems, setAllItems ] = useState([]);
  const [ id, setId] = useState(0)
  const { item, setItem } = useContext(LogInTracker)
  const navigate = useNavigate();

  // Get data of all inventory items
  useEffect(() => {
    fetchItems();
  }, [])

  // Get item id of the last item in the inventory
  useEffect(() => {
    fetchId();

    if(id > item){
      setItem(id) //Set item id to highest number in the item table
    }

  }, [id])

  // Set item id to last item in the inventory
  const fetchId = async () => {
    await fetch('http://localhost:3001/inventory')
    .then(response => response.json())
    .then(data => setId(parseInt(data[data.length-1].item_id)))
  }

  // Set data for all inventory items
  const fetchItems = async () => {
    await fetch('http://localhost:3001/inventory')
    .then(response => response.json())
    .then(data => setAllItems(data))
    .catch(error => console.log('Error fetching games: ', error))
  }

  // Redirect to details page when specific item is clicked
  const Details = (item_id) => {
    navigate(`/inventory/items/${item_id}`)
  }

  // Provide description of item with 100 character cut off
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
    <div className = 'Background'>
      <h1 className = 'Title'>All Items</h1>
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
  );

}

export default Inventory