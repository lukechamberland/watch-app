import React from 'react';
import axios from 'axios';

function Product() {
    axios.get('localhost:8080/api/products')
    .then((response) => {
      return (<div>{response[0].price}</div>)
    })
    .catch((err) => {
      console.log(err)
    })
  
}

export default Product;