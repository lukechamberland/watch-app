const { pool } = require('../db/connection')

const addToProducts = function(id, user_id, image_url, description, name, price, favourite, inventory, available) {
  const statement = 'INSERT INTO products (id, user_id, image_url, description, name, price, favourite, inventory, available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);'
  const values = [id, user_id, image_url, description, name, price, favourite, inventory, available];

  pool.query(statement, values, (err) => {
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
    pool.query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error('Error executing query:', err);
        reject(err);
      });
  });
};

const addToOrderProducts = function(id, product_id, quantity, order_id) {
  const statement = 'INSERT INTO order_products (id, product_id, quantity, order_id) VALUES ($1, $2, $3, $4);'
  const values = [id, product_id, quantity, order_id];

  pool.query(statement, values, (err) => {
    if (err) {
      console.log(err) 
    } else {
      console.log('Success!')
    }
  });
}

const getFromOrderProducts = function() {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM order_products;';
    pool.query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error('Error executing query:', err);
        reject(err);
      });
  });
}

const addToOrders = function(id, order_products_id, user_id, subtotal_amount, tax_amount, total_amount, order_data) {
  const statement = 'INSERT INTO orders (id, order_products_id, user_id, subtotal_amount, tax_amount, total_amount, order_data) VALUES ($1, $2, $3, $4, $5, $6, $7);'
  const values = [id, order_products_id, user_id, subtotal_amount, tax_amount, total_amount, order_data];

  pool.query(statement, values, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Success!');
    }
  });
}

const getFromOrders = function() {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM orders;';
    pool.query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error('Error executing query:', err);
        reject(err);
      });
  });
};

const addToUsers = function(id, user_name, email, login_auth) {
  const statement = 'INSERT INTO users (id, user_name, email, login_auth) VALUES ($1, $2, $3, $4);'
  const values = [id, user_name, email, login_auth];

  pool.query(statement, values, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Success!');
    }
  });
}

const getFromUsers = function() {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM users;';
    pool.query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error('Error executing query:', err);
        reject(err);
      });
  });
};

module.exports = { addToProducts, getFromProducts, addToOrderProducts, getFromOrderProducts, addToOrders, getFromOrders, addToUsers, getFromUsers };