import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Product() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
    .then((result) => {
      console.log(result);
      setData(result.data);
    })
  }, []);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  }

  return (
    <div class="products">
      {data.map((product) => (
        <div class="product-wrapper">
           <img class="product-image" src={product.image_url} onClick={() => handleClick(product.id)}/>
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