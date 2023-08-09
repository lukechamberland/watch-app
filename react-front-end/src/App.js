import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Import components
import Nav from "./components/Navigation";
import Product from "./components/Product";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ToggleNav from "./components/ToggleNav";
import Slideshow from "./components/Slideshow";
import ProductDetails from "./components/ProductDetails";
import NewProduct from "./components/NewProduct";
import ProfileTabs from "./components/ProfileTabs"
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";
import Header from "./components/Header";

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  console.log(user);
  const [userId, setUserId] = useState(null);

  const [click, handleClick] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post("/api/users", user)
        .then((res) => {
          const userId = res.data.userId;
          setUserId(userId);
          window.sessionStorage.setItem("userId", userId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuthenticated, user]);
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

  const handleMenuClick = () => {
    console.log('Menu clicked!');
  };

  const handleCartClick = () => {
    console.log('Cart clicked!');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked!');
  };

  if (isAuthenticated) {
    // Render content for authenticated users
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div>
                  <Logout />
                  <Product />
                </div>
              }
            />
            <Route path="/product/:id" element={<ProductDetails handleClick={handleClick} click={click} allData={[]}/>} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route path="/profile" element={<ProfileTabs />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  } else {
    // Render content for non-authenticated users
    return (
      <>
        <Header
        title="TimelessTrends"
        logo="/path/to/logo.png"
        onMenuClick={handleMenuClick}
        onCartClick={handleCartClick}
        onProfileClick={handleProfileClick}
        />
        <Login />
        <ToggleNav />
        <Slideshow />
        <NewProduct />
      </>
    );
  }
}

export default App;
