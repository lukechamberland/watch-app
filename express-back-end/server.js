const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const { addToProducts, getFromProducts, addToOrderProducts, getFromOrderProducts, addToOrders, getFromOrders, getFromUsers } = require('./helpers');
const cors = require('cors');
const { findOrCreateUser } = require('../db/queries/users');

const app = express();
const PORT = 8080;

console.log("Starting the server...");

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.get('/api/products', (req, res) => {
  getFromProducts().then((result) => { 
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.get('/api/order_products', (req, res) => {
  getFromOrderProducts().then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.get('/api/orders', (req, res) => {
  getFromOrders().then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.get('/api/users', (req, res) => {
  getFromUsers().then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  console.log('Received user:', user);
  findOrCreateUser(user)
    .then(userId => {
	    console.log('Responding with userId:', userId);
      res.json({ userId });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    });
});

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
