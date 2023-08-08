import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios'

function UpdateProduct() {
  
  const image = window.sessionStorage.getItem('productImage')
  const description = window.sessionStorage.getItem('productDesc')
  const name = window.sessionStorage.getItem('productName')
  const price = window.sessionStorage.getItem('productPrice')

  return (
  <div>
    <h1>Edit Product</h1>
    <Formik
      initialValues={{
        productImage: image,
        productDescription: description,
        productName: name,
        productPrice: price, 
        productInventory: 0
      }}
      onSubmit={
        async (values) => {
        const productId = window.sessionStorage.getItem('productId')
        const res = await axios.put('/updateproduct', [
          values.productImage,
          values.productDescription, 
          values.productName,
          values.productPrice,
          values.productInventory,
          productId
        ]);
        } 
        
      }
    >
      <Form>
        <label htmlFor="productName">Product Name</label>
        <Field class='field' id="productName" name="productName" />

        <label htmlFor="productDescription">Product Description</label>
        <Field class='field' id="productDescription" name="productDescription" />

        <label htmlFor="productPrice">Product Price</label>
        <Field
          class='field'
          id="productPrice"
          name="productPrice"
          type='number'
        />

        <label htmlFor="productImage">Product Image</label>
        <Field
          class='field'
          id="productImage"
          name="productImage"
        />

        <label htmlFor="productInventory">Product Inventory</label>
        <Field
          class='field'
          id="productIventory"
          name="productInventory"
          type='number'
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
  )
};

export default UpdateProduct;
