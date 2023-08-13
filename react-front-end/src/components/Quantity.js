import React, { useState, useEffect } from "react";

function Quantity(props) {

  const [quantity, setQuantity] = useState(1);

  const max = props.stock;

  const setQty = props.setQty

  const add = function() {
    if (quantity >= max) {
      setQuantity(max);
      setQty(max);
    } else {
      setQuantity(quantity + 1);
      setQty(quantity + 1);
    }
  }

  const subtract = function() {
    if (quantity <= 1) {
      setQuantity(1);
      setQty(1)
    } else {
      setQuantity(quantity - 1);
      setQty(quantity - 1);
    }
  }

  return (
    <div class="quantity-layout">
      <button class="quantity-button" onClick={() => subtract()}>-</button>
      <div class="number">{quantity}</div>
      <button class="quantity-button" onClick={() => add()}>+</button>
    </div>
  )
}

export default Quantity