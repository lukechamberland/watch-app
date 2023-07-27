import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCheck, faXmark, } from './icons';
import { cart, addToCartArr } from './stateHelpers';
import Quantity from './Quantity';

function ProductDetails() {

  const { id } = useParams();

  const [productDetailsState, setProductDetailsState] = useState([]);

  const [productQuantity, setProductQuantity] = useState(1);

  const [emptyCart, setEmptyCart] = useState(true);

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

  const isFavourite = function () {
    if (productDetailsState.favourite) {
      return (
        <FontAwesomeIcon icon={faHeart} />
      )
    } else {
      return (
        <FontAwesomeIcon icon={faHeart} />
      )
    }
  }

  const addToCart = function() {
    const allProducts = localStorage.getItem("allProducts") || localStorage.setItem('allProducts', JSON.stringify([]));
    const count = localStorage.getItem("count") || localStorage.setItem('count', JSON.stringify(0))

    const data = JSON.parse(allProducts || '[]');
    data.push(productDetailsState);
    localStorage.setItem("allProducts", JSON.stringify(data));

    const secondCount = JSON.parse(count || '0');
    let newCount = secondCount + 1;
    localStorage.setItem('count', JSON.stringify(newCount));
  }

  const callAddToCart = function(num) {
    for (let i = 1; i <= num; i++) {
      addToCart();
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

  return (
    <div class="product-details-page">
      {/* <div class="product-details-image"></div> */}
      <img src={productDetailsState.image_url}/>
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
            <div class="PDfavourite-text">Favourite:</div> <div class="PDfavourite" style={styleHeart}>{isFavourite()}</div>
          </div>
        </div>
        <div class="PDinventory">
          <div class="in-stock">{productDetailsState.inventory} in stock</div> 
          <div class="quantity">{<Quantity stock={productDetailsState.inventory} setQty={setQty}/>}</div>
          <button class="add-to-cart" onClick={() => callAddToCart(productQuantity)} disabled={!emptyCart}>{isCartEmpty()}</button>
        </div>
      </div>
    </div>
  )
}

const newCart = cart;

export { newCart }

export default ProductDetails;