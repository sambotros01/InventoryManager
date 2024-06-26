import React, {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { LogInTracker } from './LogInTracker';
import './Login.css'

function Item () {
  const { userId, deleted, setDeleted, loggedIn } = useContext(LogInTracker)
  const { item_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const [ itemData, setItemData ] = useState();
  const [ itemName, setItemName ] = useState('');
  const [ itemQuantity, setItemQuantity ] = useState('');
  const [ itemDescription, setItemDescription] = useState('');

  // Get details for a specific item
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await fetch (`http://localhost:3001/inventory/item/${item_id}`)
        const data = await response.json();
        setItemName(data[0].item_name);
        setItemQuantity(data[0].quantity);
        setItemDescription(data[0].item_description)
        setLoading(false);
      } catch(error){
        console.error('Error fetching item: ', error)
      }
    }
    fetchData()
  }, [item_id])

  // Get data for all inventory items
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await fetch (`http://localhost:3001/inventory/`)
        const data = await response.json();
        setItemData(data);
      } catch(error){
        console.error('Error fetching item: ', error)
      }
    }
    fetchData()
  }, [item_id])

  // Render edit screen when update button is clicked
  const Update = () => {
    setEdit(true)
  }

  // Update item based on changes invoked by the inventory manager
  const handleSubmit = async(event) => {
    event.preventDefault();

    const item_update = {
      item_id: item_id,
      item_name: itemName,
      quantity: itemQuantity,
      item_description: itemDescription
    }

    try{
      const response = await fetch(`http://localhost:3001/inventory/item/${item_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item_update)
      });

      if(!response.ok){
        throw new Error(`HTTP error status: ${response.status}`);
      }

      alert(`${itemName} has been successfully modified!`)
    }catch(error){
      console.error('Error updating game:', error);
      alert('Error updating game. Please try again.');
    }
    setEdit(false);
  }

  // Delete item
  const Delete = async () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this item?")

    if (shouldDelete){
      try{
        const response = await fetch(`http://localhost:3001/inventory/item/${item_id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        alert(`${itemName} has been deleted. You will now be redirected to your inventory page.`)
        navigate(`/inventory/users/${userId}`)
      } catch (error){
        console.error('Error deleting game: ', error)
        alert('Error deleting game. Please try again.')
      }
    }
  }


  return(
    // Render page depending if content is loaded, display loading until ready
    (!loading ?

      // Render page depending on whether inventory manager selects to edit or view items
      (!edit ?

        // Render page based on whether it is an inventory manager or visitor
        (loggedIn ?

          // Item detail view for an inventory manager
          <div className = 'Background'>
          <h1 className = 'Title'>Item Details</h1>
          <br></br>
          <h3 className = 'Title'>Item Name:</h3>
          <p className = 'Title'>{itemName}</p>
          <br></br>
          <h3 className = 'Title'>Quantity</h3>
          <p className = 'Title'>{itemQuantity} </p>
          <br></br>
          <h3 className = 'Title'>Item Description:</h3>
          <p className = 'Title'>{itemDescription}</p>
          <br></br>
          <br></br>
          <div className = 'Container'>
          <button className = 'Update-Button' type = "button" onClick = {() => Update()}>Update</button>
          <br></br>
          <br></br>
          <button className = 'Delete-Button' type = "button" onClick = {() => Delete()}>Delete</button>
          </div>
          </div>

          :

          // Item detail view for visitor
          <div className = 'Background'>
          <h1 className = 'Title'>Item Details</h1>
          <br></br>
          <h3 className = 'Title'>Item Name:</h3>
          <p className = 'Title'>{itemName}</p>
          <br></br>
          <h3 className = 'Title'>Quantity</h3>
          <p className = 'Title'>{itemQuantity} </p>
          <br></br>
          <h3 className = 'Title'>Item Description:</h3>
          <p className = 'Title'>{itemDescription}</p>
          <br></br>
          <br></br>
          </div>

          )
        :
        // Editable by inventory manager
        <div className = 'Background'>
          <h1 className = 'Title'>Item Details</h1>
          <h2 className = 'Title'>Edit Item</h2>
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

            <button className="Button" type="submit">Submit</button>
          </form>
      </div>
      )

      :

      // Content loading
      <div className = 'Background'>
      <h1 className = 'Title'>Loading...</h1>
      </div>
    )
  )
}

export default Item