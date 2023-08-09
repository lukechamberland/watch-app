// const addToCart = function(pd) {
//   const allProducts = localStorage.getItem("allProducts") || localStorage.setItem('allProducts', JSON.stringify([]));
//   const count = localStorage.getItem("count") || localStorage.setItem('count', JSON.stringify(0))

//   const data = JSON.parse(allProducts || '[]');
//   data.push(pd);
//   localStorage.setItem("allProducts", JSON.stringify(data));

//   const secondCount = JSON.parse(count || '0');
//   let newCount = secondCount + 1;
//   localStorage.setItem('count', JSON.stringify(newCount));
// }

// const callAddToCart = function(pd, num) {
//   for (let i = 1; i <= num; i++) {
//     addToCart(pd);
//   }
//   setEmptyCart(false)
// }

// export { addToCart, callAddToCart}