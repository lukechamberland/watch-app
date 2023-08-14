const { pool } = require("../db/connection");

const addToProducts = function (values) {
  return new Promise((resolve, reject) => {
    const statement =
      "INSERT INTO products (user_id, image_url, description, name, price, inventory, available, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

    pool
      .query(statement, values)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log('test helper')
        reject(err);
      });
  });
};

const updateProduct = function(values) {
  return new Promise((resolve, reject) => {
    const statement = "UPDATE products SET image_url = $1, description = $2, name = $3, price = $4, inventory = $5 WHERE id = $6;"

    pool.query(statement, values)
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });
  })
}

const getFromProducts = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM products;";
    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        reject(err);
      });
  });
};

const getMensProducts = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM products WHERE category='mens';";
    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        reject(err);
      });
  });
};

const getWomensProducts = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM products WHERE category='womens';";
    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        reject(err);
      });
  });
};

const getKidsProducts = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM products WHERE category='kids';";
    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        reject(err);
      });
  });
};

const getAthleticProducts = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM products WHERE category='athletic';";
    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        reject(err);
      });
  });
};

const addToOrderProducts = function (id, product_id, quantity, order_id) {
  const statement =
    "INSERT INTO order_products (id, product_id, quantity, order_id) VALUES ($1, $2, $3, $4);";
  const values = [id, product_id, quantity, order_id];

  return pool.query(statement, values, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success!");
    }
  });
};

const getFromOrderProducts = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM order_products;";
    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        reject(err);
      });
  });
};

const addToOrders = function (
  id,
  order_products_id,
  user_id,
  subtotal_amount,
  tax_amount,
  total_amount,
  order_data
) {
  const statement =
    "INSERT INTO orders (id, order_products_id, user_id, subtotal_amount, tax_amount, total_amount, order_data) VALUES ($1, $2, $3, $4, $5, $6, $7);";
  const values = [
    id,
    order_products_id,
    user_id,
    subtotal_amount,
    tax_amount,
    total_amount,
    order_data,
  ];

  return pool.query(statement, values, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success!");
    }
  });
};

const getFromOrders = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT orders.user_id, orders.total_amount, orders.order_date, order_products.order_id, products.name, products.image_url, products.price FROM orders JOIN order_products ON order_products.order_id = orders.id JOIN products ON products.id = order_products.product_id"
    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        reject(err);
      });
  });
};

const addToUsers = function (id, user_name, email, login_auth) {
  const statement =
    "INSERT INTO users (id, user_name, email, login_auth) VALUES ($1, $2, $3, $4);";
  const values = [id, user_name, email, login_auth];

  pool.query(statement, values, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success!");
    }
  });
};

const getFromUsers = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT * FROM users;";
    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        console.error("Error executing query:", err);
        reject(err);
      });
  });
};

const getFavourites = function () {
  return new Promise((resolve, reject) => {
    const statement = "SELECT favourites.user_id, favourites.product_id, favourites.is_active, products.name, products.price, products.inventory FROM favourites JOIN products ON products.id=products.id WHERE favourites.is_active IS true AND products.id = favourites.product_id;";

    pool
      .query(statement)
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const removeProduct = function (id) {
  return new Promise((resolve, reject) => {
    const statement = "DELETE FROM products WHERE id = $1";
    pool
      .query(statement, [id])
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  addToProducts,
  getFromProducts,
  getMensProducts,
  getWomensProducts,
  getKidsProducts,
  getAthleticProducts,
  addToOrderProducts,
  getFromOrderProducts,
  addToOrders,
  getFromOrders,
  addToUsers,
  getFromUsers,
  getFavourites,
  removeProduct,
  updateProduct
};
