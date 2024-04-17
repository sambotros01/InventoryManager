import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogInTracker } from './LogInTracker';

function NewItem () {
  const { loggedIn, userId } = useContext(LogInTracker)
  const [ itemName, setItemName ] = useState('');
  const [ itemQuantity, setItemQuantity ] = useState('');
  const [ itemDescription, setItemDescription] = useState('');
  const [ submit, setSubmit ] = useState(false);
  const [ itemData, setItemData ] = useState('');
  const [ itemId, setItemId ] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch('http://localhost:3001/inventory')
    .then(response => response.json())
    // .then( x => console.log(x[(x.length) - 1].item_id))
    .then(inventory => setItemId(inventory[(inventory.length) - 1].item_id))
  }, [itemData])
  // console.log(itemId)

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newData = {
      item_name: itemName,
      quantity: itemQuantity,
      item_description: itemDescription
    }

    setItemData(newData);
  }

  const GoHome = () => {
    setSubmit(false)
    navigate('/')
  }

  const SeeItem = () => {
    setSubmit(false)
    navigate(`/inventory/items/${itemId}`)
  }

  const AllItems = () => {
    setSubmit(false)
    navigate(`/inventory`)
  }

  const AddItem = () => {
    setItemName('');
    setItemQuantity(0);
    setItemDescription('');
    setSubmit(false);
  }

  if (!loggedIn){
    return <h2>Please log in to access this feature.</h2>
  }

  return(
    (!submit ?
      <div>
        <h1>New Item Submission Page</h1>
          <form onSubmit={handleSubmit}>
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

      <div>
        <h1>Welcome to the Item Submission Page</h1>
        <br></br>
        <h4>Thank you for submitting {itemName} to our inventory.</h4>
        <h4>{itemName} has successfully been added to our inventory!</h4>
        <h4>You may now close this window.</h4>
        <br></br>
        <br></br>

        <div className = 'Buttons'>
          <button type="button" className="btn btn-dark btn-lg" onClick = {() => SeeItem()}>Go To New Item</button>
          <button type="button" className="btn btn-dark btn-lg" onClick = {() => AddItem()}>Submit New Item</button>
          <button type="button" className="btn btn-dark btn-lg" onClick = {() => AllItems()}>See Inventory</button>
          <button type="button" className="btn btn-dark btn-lg" onClick = {() => GoHome()}>Go Home</button>
        </div>
      </div>

      )
  )

}
export default NewItem