import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCheck, faXmark, } from './icons';

function ProductDetails() {

  const { id } = useParams();

  const [productDetailsState, setProductDetailsState] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((result) => {
        const data = result.data;
        const correctProduct = data.find((product) => product.id === Number(id))
        setProductDetailsState(correctProduct);
      });
  }, []);

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

  const toGst = function() {
    return (productDetailsState.price * 1.05).toFixed(2);
  }

  const style = {
    color: productDetailsState.available ? 'rgb(0, 201, 0)' : 'red'
  }

 let styleHeart = {
    color: productDetailsState.favourite ? 'red' : 'rgb(203, 203, 203)'
  }

  return (
    <div class="product-details-page">
      <div class="product-details-image"></div>
      <div class="about">
        <div class="PDname">{productDetailsState.name}</div>
        <div class="PDdescription">{productDetailsState.description}</div>
        <div class="contents">
          <div class="PDprice-div">
            <div class="PDprice-text">Price: ${productDetailsState.price} + GST</div> <div class="PDprice">${toGst()}</div>
          </div>
          <div class="PDavailable">
            <div class="PDavailable-text">Available:</div> <div class="check" style={style}>{isAvailable()}</div>
          </div>
          <div class="PDfavourite-div">
            <div class="PDfavourite-text">Favourite:</div> <div class="PDfavourite" style={styleHeart}>{isFavourite()}</div>
          </div>
        </div>
        <div class="PDinventory">
          <div class="in-stock">{productDetailsState.inventory} in stock</div> <button class="add-to-cart">Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;