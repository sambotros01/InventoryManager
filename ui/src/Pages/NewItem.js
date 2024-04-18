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
      // .then( x => console.log(x.pop().item_id))
      .then(id => setItemId(id.pop().item_id))
      // .then(x => x.pop().item_id)
      // .then(next => setStatus(!status))
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

    let newData = {
      item_name: itemName,
      quantity: itemQuantity,
      item_description: itemDescription
    }

    let inventoryUpdate = {
      user_id: userId,
      item_id: parseInt(itemId+1)
    }

    setItemData(newData);
    setInventory(inventoryUpdate)
    setSubmit(false);
    // navigate(`/inventory/users/${userId}`)
  }

  const addItem = async () => {
    // const shouldAdd = window.confirm("Do you want to add this item to your inventory?")
    // if (shouldAdd){
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
    // }

    setTimeout(() => navigate(`/inventory/users/${userId}`), 1000)


  // alert(`${itemName} has been added! You will now be redirected to your inventory. Please wait.`)

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
        <h4>{itemName} has successfully been added to our inventory!</h4>
        <h4>You will be redirected to your inventory where you can view {itemName}.</h4>
        <br></br>
        <br></br>

        <div className = 'Buttons'>
          <button type = "button" onClick = {() => addItem()}>Add to my inventory</button>
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