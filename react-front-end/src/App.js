import React from "react";
import axios from "axios";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


//Import components
import Product from "./components/Product";
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
        <Routes>
        <Route
              exact
              path="/"
              element={
                <div>
                  <Layout>
                    <Slideshow />
                    <Product />
                  </Layout>
                </div>
              }
            />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/athletic" element={<Athletic />} />
          <Route path="/product/:id" element={<ProductDetails handleClick={handleClick} click={click} allData={[]}/>} />
        </Routes>
        
      </>
  
      </BrowserRouter>
    );
  }
}

export default App;
