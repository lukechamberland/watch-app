import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import myImage from '../images/images-2.jpg';

function Product() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/products')
    .then((result) => {
      console.log(result);
      setData(result.data);
    })
  }, []);

  return (
    <div class="products">
      {data.map((product) => (
        <div class="product-wrapper">
          <div class="product">
          </div>
          <div class="product-details"></div>
          <div class="product-name">{product.name}</div>
          <div class="price-div">
            <h1 class="price"> ${product.price}.00</h1>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Product;