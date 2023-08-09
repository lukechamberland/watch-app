import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

//Import components
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
import Layout from "./components/Layout";
import Mens from "./components/Mens";
import Womens from "./components/Womens";
import Athletic from "./components/Athletic";
import Kids from "./components/Kids"

function App() {
  const { isAuthenticated, user } = useAuth0();
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
                  <Layout>
                    <Logout />
                    <Slideshow />
                    <Product />
                  </Layout>
                </div>
              }
            />
        
            <Route path="/product/:id" element={<ProductDetails handleClick={handleClick} click={click} allData={[]}/>} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route path="/profile" element={<ProfileTabs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/womens" element={<Womens />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/athletic" element={<Athletic />} />

          </Routes>
        </div>
      </BrowserRouter>
    );
  } else {
    // Render content for non-authenticated users
    return (
      <BrowserRouter>
      <>
        <Layout>
        <Login />
        <Slideshow />
        <Product />
        </Layout>
      </>
  
      </BrowserRouter>
    );
  }
}

export default App;
