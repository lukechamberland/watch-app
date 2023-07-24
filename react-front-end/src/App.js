import React, { Component } from 'react';
import classnames from 'classnames'
import axios from 'axios';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

//Import components
//import Login from './Login';
//import Logout from './Logout';
import Nav from './components/Navigation'
import Product from './components/Product';

function App() {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    // console.log(user)
    if (isAuthenticated) {
      // Render content for authenticated users
      return (
        <div>
          <h1>goodbye, {user.name}</h1>
          <button onClick={() => logout()}>Logout</button>

          <Product />
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


