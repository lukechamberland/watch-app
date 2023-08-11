import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCheck, faXmark, } from './icons';
import Quantity from './Quantity';
import Layout from './Layout';
import { useAuth0 } from "@auth0/auth0-react";


function ProductDetails() {
  const { isAuthenticated, loginWithRedirect  } = useAuth0();

  const { id } = useParams();

  const [productDetailsState, setProductDetailsState] = useState([]);

  const [productQuantity, setProductQuantity] = useState(1);

  const [emptyCart, setEmptyCart] = useState(true);

  const [heartState, setHeartState] = useState(0);

  useEffect(() => {
    axios.get('/api/products')
      .then((result) => {
        const data = result.data;
        const correctProduct = data.find((product) => product.id === Number(id));
        setProductDetailsState(correctProduct);
      });
  }, []);

  console.log(productDetailsState)

  const isAvailable = function () {
    if (productDetailsState.available) {
      return (
        <FontAwesomeIcon icon={faCheck} />
      )
    } else {
      return (
        <FontAwesomeIcon icon={faXmark} />
      )
    }
  }

  const addToCart = function(pd) {
    const allProducts = localStorage.getItem("allProducts") || localStorage.setItem('allProducts', JSON.stringify([]));
    const count = localStorage.getItem("count") || localStorage.setItem('count', JSON.stringify(0))

    const data = JSON.parse(allProducts || '[]');
    data.push(pd);
    localStorage.setItem("allProducts", JSON.stringify(data));

    const secondCount = JSON.parse(count || '0');
    let newCount = secondCount + 1;
    localStorage.setItem('count', JSON.stringify(newCount));
  }

  const callAddToCart = function(pd, num) {
    if (!isAuthenticated) {
      loginWithRedirect(); 
      return;
    }

    for (let i = 1; i <= num; i++) {
      addToCart(pd);
    }
    setEmptyCart(false)
  }
 
  const setQty = function(val) {
    setProductQuantity(val);
  }

  const isCartEmpty = function() {
    if (emptyCart) {
      return (
        <div>Add to cart</div>
      )
    } else {
      return (
        <div>Added <FontAwesomeIcon icon={faCheck} /></div>
      )
    }
  }

  const style = {
    color: productDetailsState.available ? 'rgb(0, 201, 0)' : 'red'
  }

 let styleHeart = {
    color: productDetailsState.favourite ? 'red' : 'rgb(203, 203, 203)'
  }

  const styleTheHeart = function() {
    if (heartState > 0) {
      return (
        { color: 'red' }
      )
    } else {
      return (
        { color: 'grey'}
      )
    }
  }

  // const changeToRed = function() {
  //   setHeartState(heartState + 1);

  //   if (!JSON.parse(localStorage.getItem("heartCount"))) {
  //     localStorage.setItem("heartCount", JSON.stringify(1))
  //   } else {
  //     const heartData = JSON.parse(localStorage.getItem("heartCount"));
  //     const newHeartData = heartData + 1;
  //     localStorage.setItem("heartCount", newHeartData);
  //   }

  //   if (JSON.parse(localStorage.getItem("heartData")) <= 1) {
  //     localStorage.setItem("favourites", JSON.stringify([productDetailsState]))
  //   } else {
  //     const data = JSON.parse(localStorage.getItem("favourites"))
  //     localStorage.setItem("favourites", JSON.stringify([...data, productDetailsState]))
  //   }
    
  // }

  const changeToRed = function() {
    const heartCount = (JSON.parse(localStorage.getItem("heartCount")) || 0) + 1;
    localStorage.setItem("heartCount", JSON.stringify(heartCount));
  
    const currentFavorites = JSON.parse(localStorage.getItem("favourites")) || [];
    
    // Check if the productDetailsState is already in the currentFavorites array
    if (!currentFavorites.some(product => product.id === productDetailsState.id)) {
      const updatedFavorites = [...currentFavorites, productDetailsState];
      localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
      
      const heartDataCount = JSON.parse(localStorage.getItem("heartData")) || 0;
      localStorage.setItem("heartData", JSON.stringify(heartDataCount + 1));
    
      setHeartState(heartState + 1);
    }
  };

  return (
    <>
    <Layout>
    <div class="product-details-page">
      <img class="product-details-image" src={productDetailsState.image_url}/>
      <div class="about">
        <div class="PDname">{productDetailsState.name}</div>
        <div class="PDdescription">{productDetailsState.description}</div>
        <div class="contents">
          <div class="PDprice-div">
            <div class="PDprice-text">Price:</div> <div class="PDprice">${productDetailsState.price}.00</div>
          </div>
          <div class="PDavailable">
            <div class="PDavailable-text">Available:</div> <div class="check" style={style}>{isAvailable()}</div>
          </div>
          <div class="PDfavourite-div">
            <div class="PDfavourite-text">Favourite:</div> <div class="PDfavourite" style={styleTheHeart()} onClick={() => changeToRed()}>{<FontAwesomeIcon icon={faHeart} />}</div>
          </div>
        </div>
        <div class="PDinventory">
          <div class="in-stock">{productDetailsState.inventory} in stock</div> 
          <div class="quantity">{<Quantity stock={productDetailsState.inventory} setQty={setQty}/>}</div>
          <button class="add-to-cart" onClick={() => callAddToCart(productDetailsState, productQuantity)} disabled={!emptyCart}>{isCartEmpty()}</button>
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}

// export { addToCart }

export default ProductDetails;