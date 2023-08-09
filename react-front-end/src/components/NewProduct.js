import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

function NewProduct() {

  const navigate = useNavigate()

  return (
  <div>
    <h1>Add A Product</h1>
    <Formik
      initialValues={{
        productImage: '',
        productDescription: '',
        productName: '',
        productPrice: 0
      }}
      onSubmit={
        async (values) => {
        const userId = window.sessionStorage.getItem('userId')
        const data = await axios.post("/newproduct", [userId, values.productImage, values.productDescription, values.productName, values.productPrice, 1, true])
        navigate('/profile')
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

        <button type="submit">Submit</button>

      </Form>
    </Formik>
  </div>
  )
};

export default NewProduct;