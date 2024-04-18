import './Inventory.css'
import React, { useState, useEffect, useContext } from 'react';
import { LogInTracker } from './LogInTracker';
import { useNavigate } from 'react-router-dom';

function Inventory () {
  const [ allItems, setAllItems ] = useState([]);
  const [ id, setId] = useState(0)
  // const [ foodDescription, setFoodDescription ] = useState([])
  const { item, setItem } = useContext(LogInTracker)
  const navigate = useNavigate();
  console.log('itemid:', item);

  useEffect(() => {
    fetchItems();

  }, [])

  useEffect(() => {
    fetchId();

    if(id > item){
      setItem(id)
    }

  }, [id])

  const fetchId = async () => {
    await fetch('http://localhost:3001/inventory')
    .then(response => response.json())
    .then(data => setId(parseInt(data[data.length-1].item_id)))
    // .then(x => console.log(parseInt(x[x.length-1].item_id)))
  }

  const fetchItems = async () => {
    await fetch('http://localhost:3001/inventory')
    .then(response => response.json())
    .then(data => setAllItems(data))
    // .then(details => allItems.map((info) => [setFoodDescription(info.item_description)]))
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
  );

}

export default Inventory