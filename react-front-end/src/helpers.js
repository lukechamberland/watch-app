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

addToProducts(1, 1, 'https://example.com/images/watch1.jpg', 'Classic black leather watch', 'Leather Strap Watch', 100.00, true, 10, true);
addToProducts(2, 2, 'https://example.com/images/watch2.jpg', 'Elegant stainless steel watch', 'Stainless Steel Watch', 120.00, false, 8, true);
addToProducts(3, 3, 'https://example.com/images/watch3.jpg', 'Sports chronograph watch', 'Chronograph Sports Watch', 80.00, true, 15, true);


module.exports = { addToProducts, getFromProducts };