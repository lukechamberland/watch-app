import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

function Athletic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/products/athletic')
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
    <>
    <Layout />
    <h1 class="title">Athletic Watches</h1>
      <div class="products">
      {data.map((product) => (
        <div class="product-wrapper">
            <div class="product-details"></div>
            <img class="product-image" src={product.image_url} onClick={() => handleClick(product.id)}/>
            <div class="product-name">{product.name}</div>
            <div class="price-div">
              <h1 class="price"> ${product.price}.00</h1>
            </div>
          </div>
      ))}
    </div>
    </>
  
  )
}

export default Athletic;