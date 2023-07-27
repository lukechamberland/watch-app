import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
    <div>
      {data.map((product) => (
        <div>
          <h1>{product.name}</h1>
          <h1>Price: {product.price}</h1>
        </div>
      ))}
    </div>
  )
}

export default Product;