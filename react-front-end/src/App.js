import React, { Component } from 'react';
import classnames from 'classnames'
import axios from 'axios';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState, createContext, useContext } from 'react';

//Import components
import Login from './components/Login';
import Nav from './components/Navigation'
import Product from './components/Product';
import Logout from './components/Logout';

const userContext = createContext();
import ToggleNav from './components/ToggleNav'

import Slideshow from './components/Slideshow'

function App() {
    const { isAuthenticated, user } = useAuth0();
    console.log(user)
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      if (isAuthenticated) {
        axios.post('/api/users', user)
          .then(res => {
            const userId = res.data.userId;
            setUserId(userId);
            window.sessionStorage.setItem('userId', userId);
          })
          .catch(err => {
            console.log(err)
          });
      }
    }, [isAuthenticated, user])
    /*
    useEffect (() => {
        //make a request to a back end router
        //send over entire user object
        //backend query user object
        //if match found send data to front end
        //set as primary logged in user
        //if not register user
        //login_auth = sub
        //backend will send frontend userid, existing or new 
        //save userid info in a useContext
        //second option windows.sessionStorage
    }, [isAuthenticated])
    */
    if (isAuthenticated) {
      // Render content for authenticated users
      return (
        <div>
          <Logout />  
          <Product />
        </div>
      );
    } else {
      // Render content for non-authenticated users
      return (
        <Login />
      );
    }
}
  export default App;