const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const cookieSession = reqiuire('cookie-session')
require("dotenv").config();

const app = express();
const port = 3001;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

// app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    username: "user_session",
    // secure: true,
    httpOnly: true,
    // sameSite: "strict",
    secret: 'testing',
    maxAge: 24 * 60 * 60 * 1000,
    path: "/login",
  })
);

// app.use((req, res, next) => {
//   // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   // res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

// Get entire inventory
app.get('/inventory', function(req, res){
  knex('item')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(202).json({message: 'The data you are looking for could not be found.'}))
})

// Get specific item
app.get('/inventory/item/:item_id', function(req, res){
  const { item_id } = req.params;
  knex('item')
    .select('*')
    .where('item_id', item_id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(202).json({message: 'The item you are looking for could not be found.'}))
})

// Get items for a specific user
app.get('/inventory/user/:user_id', function(req, res){
  const { user_id } = req.params;
  knex('inventory')
    .select('*')
    .join('item', knex.ref('item.item_id'), knex.ref('inventory.item_id'))
    .join('users', knex.ref('users.user_id'), knex.ref('inventory.user_id'))
    .where('inventory.user_id', user_id)
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.error(err)
      res.status(202).json({error: "Internal server error"});
    });
});

// Get all inventory data
app.get('/all', function(req, res){
  knex('inventory')
    .select('*')
    .join('item', knex.ref('item.item_id'), knex.ref('inventory.item_id'))
    .join('users', knex.ref('users.user_id'), knex.ref('inventory.user_id'))
    .then(data => {
      if (data.length > 0){
        res.status(200).json(data)
      } else{
        res.status(404).json({message: `${inventory.name_first} ${inventory.name_last}'s inventory could not be found.`})
      }
      })
    .catch(err => {
      console.error(err)
      res.status(202).json({error: "Internal server error"});
    });
});

// Post a new item
app.post('/inventory', (req, res) => {
  const { item_name, item_description, quantity } = req.body;
  knex('item')
    .insert({
      item_name,
      item_description,
      quantity
    })
    .then( () => {
      res.status(201).send(`${item_name} has been added to the inventory`)
    })
    .catch ( (error) => {
      console.log(error)
      res.status(500).send(`${item_name} could not be added to the inventory`)
    });
})

// Edit inventory item
app.patch('/inventory/item/:item_id', (req, res) => {
  const { item_id } = req.params;
  const { item_name, item_description, quantity } = req.body;
  knex('item')
    .where('item_id', item_id)
    .update({ item_name, item_description, quantity })
    .then( () => {
      res.status(200).send(`${item_name} has been updated`)
    })
    .catch ( (error) => {
      console.log(error)
      res.status(500).send(`${item_name} could not be updated`)
    });
})

// Remove an item from the inventory
app.delete('/inventory/item/:item_id', (req, res) => {
  const { item_id } = req.params;
  knex.transaction(trx => {
    return trx("inventory")
      .where('inventory.item_id', item_id)
      .del()
      .then(() => {
        return trx('item')
          .where('item.item_id', item_id)
          .del();
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
  .then(() => {
    res.status(200).send(`Item has been removed from the inventory`)
  })
  .catch ( (error) => {
    console.log(error)
    res.status(500).send(`Item could not be removed from the inventory`)
  });
})

// Get list of all users
app.get('/users', function(req, res){
  knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(202).json({message: 'The data you are looking for could not be found.'}))
})

// Add a new user
app.post('/users', (req, res) => {
  const { name_first, name_last, username, password } = req.body;
  // console.log('password: ', req.body)
  knex('users')
    .insert({
      name_first,
      name_last,
      username,
      password
    })
    .then( () => {
      res.status(201).send(`Your account with username: ${username} has been created. Please log in.`)
    })
    .catch ( (error) => {
      console.log(error)
      res.status(500).send(`Your account with username: ${username} could not be created. Please try again.`)
    });
})

app.post('/login', (req, res) => {
  knex('users')
    .select("*")
    .where({
      username: `${req.body.username}`,
    })
    .then((user_info) => {
      console.log(req.body);
      if (user_info.length === 0) {
        res.status(404).send("User/Password not found");
      } else if (user_info[0].password !== req.body.password) {
        console.log(user_info);
        res.status(404).send("User/Password not found");
      } else {
        req.session.username = req.body.username;
        res.status(200).json(user_info);
      }
    });
});

// Remove a user
app.delete('/users/:user_id', (req, res) => {
  const { user_id } = req.params;
  knex.transaction(trx => {
    return trx("inventory")
      .where('inventory.user_id', user_id)
      .del()
      .then(() => {
        return trx('users')
          .where('users.user_id', user_id)
          .del();
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
  .then(() => {
    res.status(200).send(`User has been removed.`)
  })
  .catch ( (error) => {
    console.log(error)
    res.status(500).send(`User could not be removed.`)
  });
})

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});