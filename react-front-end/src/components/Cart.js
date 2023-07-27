import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart } from './icons';
import { useNavigate } from 'react-router-dom';
import { newCart } from './ProductDetails';

const cart = [];

const addToArrCart = function(ele) {
  cart.push(ele);
}

function Cart() {

  const [cartState, setCartState] = useState([]);

  const getFromLocalStorage = function(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  useEffect(() => {
    setCartState(getFromLocalStorage('allProducts'));
  }, []);

  const navigate = useNavigate()

  const showProduct = function(id) {
    navigate(`/product/${id}`);
  }

  const getTotalPrice = function(state) {
    console.log(state)
    let amount = 0;
    for (let product of state) {
      amount += product.price;
    }
    const newAmount = (amount * 1.05).toFixed(2);
    return newAmount;
  }

  const removeProduct = function(pdct) {
    const updatedCartState = cartState.filter((product) => product !== pdct);
    setCartState(updatedCartState);
    const product = localStorage.getItem("allProducts");
    const parsedProduct = JSON.parse(product);

    let removed = false;
    const setParsedProduct = parsedProduct.filter((deletedProduct) => {
      if (!removed && deletedProduct.id === pdct.id) {
        removed = true;
        return false;
      }
      return true;
    });
    localStorage.setItem("allProducts", JSON.stringify(setParsedProduct));
  }

  return (
    <div class="cart">
      {cartState.map((product) => (
        <div class="cart-product-div" onClick={() => showProduct(product.id)}>
        <div class="cart-image"></div>
        <div>
        <div class="cart-title">{product.name}</div>
        <div class="cart-product-price">
          ${product.price}.00
        </div>
        </div>
        <div class="cart-heart">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div class="trash-can" onClick={(event) => {
          event.stopPropagation();
          removeProduct(product)
        }}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        </div>
      ))}
      <div class="final-items">
        <div class="total-price">
          Total price + GST: <div class="final-price">${getTotalPrice(cartState)}</div>
        </div>
        <button class="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export { addToArrCart }

export default Cart;