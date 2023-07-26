const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'watchdb',
  password: 'Greenbear12?',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
  }
});

const addToProducts = function(id, user_id, image_url, description, name, price, favourite, inventory, available) {
  const statement = 'INSERT INTO products (id, user_id, image_url, description, name, price, favourite, inventory, available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);'
  const values = [id, user_id, image_url, description, name, price, favourite, inventory, available];

  client.query(statement, values, (err) => {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.log('Success!');
    }
  });
};

const getFromProducts = function() {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM products;';
    client.query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error('Error executing query:', err);
        reject(err);
      });
  });
};

module.exports = { addToProducts, getFromProducts };