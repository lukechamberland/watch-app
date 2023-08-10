import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Layout from './Layout';

function NewProduct() {

  const navigate = useNavigate()

  return (
  <div>
    <Layout>
    <h1 class='title'>Add A Product</h1>
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
      <Form class='productForm'>
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

        <button class='submitbtn' type="submit">Submit</button>

      </Form>
    </Formik>
    </Layout>
  </div>
  )
};

export default NewProduct;