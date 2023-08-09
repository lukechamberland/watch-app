import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart } from './icons';
import { useNavigate } from 'react-router-dom';
import { newCart } from './ProductDetails';
import Layout from './Layout';

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

  function handleCheckout() {
    const products = cartState.map((product) => ({
      productId: product.id,
      quantity: 1 // Modify this if you have quantity information
    }));
  
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout URL not found');
      }
    })
    .catch((error) => console.error('An error occurred:', error));
  }

  return (
    <Layout>
    <div className="cart">
      {cartState.map((product) => (
        <div className="cart-product-div" onClick={() => showProduct(product.id)}>
        <div className="cart-image"></div>
        <div>
        <div className="cart-title">{product.name}</div>
        <div className="cart-product-price">
          ${product.price}.00
        </div>
        </div>
        <div className="cart-heart">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="trash-can" onClick={(event) => {
          event.stopPropagation();
          removeProduct(product)
        }}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        </div>
      ))}
      <div className="final-items">
        <div className="total-price">
          Total price + GST: <div className="final-price">${getTotalPrice(cartState)}</div>
        </div>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
    </Layout>
  );
}

export { addToArrCart }

export default Cart;