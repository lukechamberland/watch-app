import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentAlt, faHeart, faCheck, faXmark, } from './icons';

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

  const isAvailable = function() {
    if (productDetailsState.available) {
      return (
        <FontAwesomeIcon icon={faCheck}/>
      )
    } else {
      return (
        <FontAwesomeIcon icon={faXmark}/>
      )
    }
  }

  const isFavourite = function() {
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

  const style = {
    color: productDetailsState.available ? 'rgb(0, 201, 0)' : 'red'
  }

  return (
    <div class="product-details-page">
      <div class="product-details-image"></div>
      <div class="about">
        <div class="PDname">{productDetailsState.name}</div>
        <div class="PDdescription">{productDetailsState.description}</div>
        <div class="PDprice">${productDetailsState.price}.00</div>
        <div class="PDavailable">
          <div class="PDavailable-text">available:</div> <div class="check" style={style}>{isAvailable()}</div>
        </div>
        <div class="PDfavourite">{isFavourite()}</div>
      </div>
    </div>
  )
}

export default ProductDetails;