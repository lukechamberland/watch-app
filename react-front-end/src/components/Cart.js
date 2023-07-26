import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart } from './icons';

function Cart() {

  const [cartState, setCartState] = useState([]);

  const getFromLocalStorage = function(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  useEffect(() => {
    setCartState(getFromLocalStorage("cartProducts"));
  }, []);

  console.log(cartState)

  return (
    <div class="cart">
      {cartState.map((product) => (
        <div class="cart-product-div">
        <div class="cart-image"></div>
        <div>
        <h2 class="cart-title">{product.name}</h2>
        <div class="cart-product-price">
          ${(product.price * 1.05).toFixed(2)}
        </div>
        </div>
        <div class="cart-heart">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div class="trash-can">
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
      ))}
    </div>
  );
}

export default Cart;