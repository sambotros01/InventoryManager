import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  // console.log(deleted)

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
      // .then( x => console.log(x.pop().item_id))
      .then(id => setItemId(id.pop().item_id))
      // .then(x => x.pop().item_id)
      // .then(next => setStatus(!status))

      // if (deleted === true){
      //   setItemId(parseInt(itemId+1))
      // }else{
      //   setItemId(parseInt(itemId))
      // }

    if(inventory){
      setStatus(!status);
    }
  }, [inventory])

  // Add the item to the user's account
  // useEffect(() => {
    // fetch('http://localhost:3001/inventory')
    //   .then(response => response.json())
    //   .then(id => setItemId(id.pop().item_id))

      // .then( x => console.log('Current ID: ', x))

      // fetch('http://localhost:3001/inventory/user/:user_id', {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json"},
      //   body: JSON.stringify(inventory)
      // })
      // .then(x => setSubmit(true))
      // .then( x => console.log('inventory: ', inventory))])

      // setSubmit(true),
      // console.log('inventory: ', inventory)])

    // .then(x => console.log(x))

  //   const sendData = async () => {
  //     try{
  //       const response = await fetch('http://localhost:3001/inventory/user/:user_id', {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json"},
  //         body: JSON.stringify(inventory)
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error status: ${response.status}`)
  //       }

  //       setSubmit(true);
  //       console.log('inventory: ', inventory)
  //     }catch(error){
  //       console.error('Error adding new item: ', error);
  //       alert('Error adding new item. Please try again')
  //     }
  //   };

  //   if(inventory){
  //     sendData();
  //   }
  // }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // var testid

    // if (deleted === true){
    //   testid = parseInt(item+2)
    // }else{
    //   testid = parseInt(item+1)
    // }

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
    // navigate(`/inventory/users/${userId}`)
  }

  const addItem = async () => {
    // const shouldAdd = window.confirm("This item has been added! Press continue to see your updated inventory")
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
          console.log('inventory: ', inventory)
        }catch(error){
          console.error('Error adding new item: ', error);
          alert('Error adding new item. Please try again')
        }
    }
    setDeleted(false)
    alert(`${itemName} has been added! You will now be redirected to your inventory.`)
    setTimeout(() => navigate(`/inventory/users/${userId}`), 500)
  }

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



  // const GoHome = () => {
  //   setSubmit(false)
  //   navigate('/')
  // }

  // const MyInventory = () => {
  //   setSubmit(false)
  //   navigate(`/inventory/users/${userId}`)
  // }

  // const AllInventory = () => {
  //   setSubmit(false)
  //   navigate(`/inventory`)
  // }

  // const AddItem = () => {
  //   setItemName('');
  //   setItemQuantity(0);
  //   setItemDescription('');
  //   setSubmit(false);
  // }

  if (!loggedIn){
    return <h2>Please log in to access this feature.</h2>
  }

  return(
    (!submit ?
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

      <div className = 'Background'>
        <h1 className = 'Title'>Welcome to the Item Submission Page</h1>
        <br></br>
        <h4 className = 'Title'>{itemName} has successfully been added to our inventory!</h4>
        {/* <h4>You will be redirected to your inventory where you can view {itemName}.</h4> */}
        <h4 className = 'Title'>Press Continue to see your updated inventory.</h4>
        <h4 className = 'Title'>If you would like to cancel this change please press Cancel</h4>
        <br></br>

        <div className = 'Button'>
          <button type = "button" onClick = {() => addItem()}>Continue</button>
          <button type = "button" onClick = {() => cancelAdd()}>Cancel</button>
          {/* <button type="button" className="btn btn-dark btn-lg" onClick = {() => MyInventory()}>My Inventory</button> */}
          {/* <button type="button" className="btn btn-dark btn-lg" onClick = {() => AddItem()}>Submit New Item</button>
          <button type="button" className="btn btn-dark btn-lg" onClick = {() => AllItems()}>See Inventory</button>
          <button type="button" className="btn btn-dark btn-lg" onClick = {() => GoHome()}>Go Home</button> */}
        </div>
      </div>

      )
  )

}
export default NewItem