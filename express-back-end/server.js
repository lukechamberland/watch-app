const express = require('express');
const bodyParser = require('body-parser');
const { addToProducts, getFromProducts } = require('../react-front-end/src/helpers');

const app = express();
const PORT = 8080;

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.get('/api/products', (req, res) => {
  getFromProducts().then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
