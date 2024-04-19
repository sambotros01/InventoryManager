import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInTracker } from './LogInTracker';
import './Login.css'

function NewItem () {
  const { loggedIn, userId, deleted, setDeleted, item, setItem } = useContext(LogInTracker)
  const [ itemName, setItemName ] = useState('');
  const [ itemQuantity, setItemQuantity ] = useState('');
  const [ itemDescription, setItemDescription] = useState('');
  const [ submit, setSubmit ] = useState(false);
  const [ itemData, setItemData ] = useState('');
  const [ inventory, setInventory ] = useState('');
  const [ itemId, setItemId ] = useState('');
  const [ status, setStatus ] = useState(false);
  const navigate = useNavigate();

  // Add new item
  useEffect(() => {
    const sendData = async () => {
      try{
        const response = await fetch('http://localhost:3001/inventory', {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(itemData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`)
        }

        setSubmit(true)
      }catch(error){
        console.error('Error adding new item: ', error);
        alert('Error adding new item. Please try again')
      }
    };

    if(itemData){
      sendData();
    }
  }, [itemData])

  // Grab id of the newly added item
  useEffect(() => {
    fetch('http://localhost:3001/inventory')
      .then(response => response.json())
      .then(id => setItemId(id.pop().item_id))

    if(inventory){
      setStatus(!status);
    }
  }, [inventory])

  // Submit data for the new item and user inventory update
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newData = {
      item_name: itemName,
      quantity: itemQuantity,
      item_description: itemDescription
    }

    let inventoryUpdate = {
      user_id: userId,
      item_id: parseInt(item+1)
    }

    setItemData(newData);
    setInventory(inventoryUpdate)
    setSubmit(false);
  }

  // Confirm user wants to add this item to the universal and personal inventories
  const addItem = async () => {
    var shouldAdd = true;
    if (shouldAdd){
      try{
          const response = await fetch('http://localhost:3001/inventory/user/:user_id', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(inventory)
          });

          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`)
          }

          setSubmit(true);
        }catch(error){
          console.error('Error adding new item: ', error);
          alert('Error adding new item. Please try again')
        }
    }
    setDeleted(false)
    alert(`${itemName} has been added! You will now be redirected to your inventory.`)
    setTimeout(() => navigate(`/inventory/users/${userId}`), 500)
  }

  // Do not add item to universal and personal inventories
  const cancelAdd = async () =>{
    alert('Item was not added to your inventory. You will now be redirected to your inventory.')
    setTimeout(() => navigate(`/inventory/users/${userId}`), 500)

    const shouldDelete = true
      if (shouldDelete){
        try{
          const response = await fetch(`http://localhost:3001/inventory/item/${inventory.item_id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }
        } catch (error){
          console.error('Error deleting item: ', error)
          alert('Error deleting item. Please try again.')
        }
      }
      setDeleted(true);
      setItem(item + 1);
    }

  // Do not show this page if user is not logged in
  if (!loggedIn){
    return <h2>Please log in to access this feature.</h2>
  }

  return(
    (!submit ?
      // Item submission page
      <div className = 'Background'>
        <h1 className = 'Title'>New Item Submission Page</h1>
          <form className = 'Form' onSubmit={handleSubmit}>
            <label>
              <input type = "text" placeholder = "Enter Item Name" style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </label>
            <br></br>

            <label>
              <input type = "text" placeholder = "Enter Item Quantity" style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={itemQuantity} onChange={(e) => setItemQuantity(parseInt(e.target.value))} />
            </label>
            <br></br>

            <label>
              <input type = "text" placeholder = "Enter Item Description" style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
            </label>
            <br></br>

            <button className="btn btn-dark" type="submit">Submit</button>
          </form>
      </div>

        :

      // Item submission confirmation page
      <div className = 'Background'>
        <h1 className = 'Title'>Welcome to the Item Submission Page</h1>
        <br></br>
        <h4 className = 'Title'>{itemName} has successfully been added to our inventory!</h4>
        <h4 className = 'Title'>Press Continue to see your updated inventory.</h4>
        <h4 className = 'Title'>If you would like to cancel this change please press Cancel</h4>
        <br></br>

        <div className = 'Button'>
          <button type = "button" onClick = {() => addItem()}>Continue</button>
          <button type = "button" onClick = {() => cancelAdd()}>Cancel</button>
        </div>
      </div>

      )
  )

}
export default NewItem