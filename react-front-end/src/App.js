import React, { Component } from 'react';
import classnames from 'classnames'
import axios from 'axios';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Nav from './components/Navigation'

function App() {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  
    if (isAuthenticated) {
      // Render content for authenticated users
      return (
        <div>
          <h1>Hello, {user.name}</h1>
          <button onClick={() => logout()}>Logout</button>
        </div>
      );
    } else {
      // Render content for non-authenticated users
      return (
        <div>
          <h1>Welcome! Please log in.</h1>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      );
    }
}
  
  export default App;

/* 

CREATE TABLE users (
  user_id INTEGER NOT NULL PRIMARY KEY,
  )

*/

// CREATE TABLE users (
//   id SERIAL PRIMARY KEY NOT NULL,
//   user_name VARCHAR (255) NOT NULL, 
//   email VARCHAR (255) NOT NULL,
//   login_auth VARCHAR (255) NOT NULL
// );

// CREATE TABLE orders (
//   id INTEGER NOT NULL PRIMARY KEY,
//   order_products_id INTEGER NOT NULL REFERENCES order_products(id),
//   user_id INTEGER REFERENCES users(id), 
//   subtotal_amount INTEGER NOT NULL,
//   tax_amount INTEGER NOT NULL,
//   total_amount INTEGER NOT NULL
// );



// CREATE TABLE products (
//   id INTEGER PRIMARY KEY NOT NULL,
//   user_id INTEGER REFERENCES users(id),
//   image_url VARCHAR (255) NOT NULL, 
//   description VARCHAR (255) NOT NULL,
//   name VARCHAR(255) NOT NULL, 
//   price INTEGER NOT NULL DEFAULT 0
// );


// CREATE TABLE order_products (
//   id INTEGER PRIMARY KEY NOT NULL,
//   product_id INTEGER REFERENCES products(id),
//   quantity INTEGER NOT NULL
// );

// order_id INTEGER REFERENCES orders(id),


// available boolean to the products table - will have to be updated when order is placed with that product
// inventory integer to the products table - condition on more than 1 in stock or not
// favourites boolean to the products table 
// order_date in orders table

// ALTER TABLE orders
// ADD order_date DATE;

// ALTER TABLE products
// ADD favourite BOOLEAN DEFAULT FALSE;

// ALTER TABLE products
// ADD inventory INTEGER;

// ALTER TABLE products
// ADD available BOOLEAN DEFAULT TRUE;
