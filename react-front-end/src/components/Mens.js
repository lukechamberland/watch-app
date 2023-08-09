import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Mens() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/products/mens')
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
      <h1>Mens Watches</h1>
      {data.map((product) => (
        <div class="product-wrapper">
          <div class="product" onClick={() => handleClick(product.id)}></div>
            <div class="product-details"></div>
            <img class="product-details-image" src={product.image_url}/>
            <div class="product-name">{product.name}</div>
            <div class="price-div">
              <h1 class="price"> ${product.price}.00</h1>
            </div>
          </div>
      ))}
    </div>
  )
}

export default Mens;