
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from "@mui/material/Tabs"
import TabPanel from '@mui/lab/TabPanel';
import Button from "@mui/material/Button"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { addToCart, callAddToCart } from './stateHelpers';
import Layout from "./Layout"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../App.css'


export default function ProfileTabs() {
  
  const { id } = useParams();
  const [value, setValue] = React.useState('1');
  const [favourites, setFavourites] = useState([]);
  const [userproducts, setUserproducts] = useState([]);
  const [orderhistory, setOrderhistory] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  

  const onEdit = (id, image, description, name, price) => {
    const productId = window.sessionStorage.setItem('productId', id)
    const productImage = window.sessionStorage.setItem('productImage', image)
    const productDesc = window.sessionStorage.setItem('productDesc', description)
    const productName = window.sessionStorage.setItem('productName', name)
    const productPrice = window.sessionStorage.setItem('productPrice', price)
    navigate('/updateproduct')
  }

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  }

  const onDelete = (id) => {
    axios.delete(`/api/products/${id}`, id)
    axios.get('/api/products')
      .then((results) => {
        let userId = sessionStorage.getItem("userId");
        const mapResults = results.data.map((element) => {
          if(element.user_id == userId) {
            return element
          }
        })   
        const filteredResults = mapResults.filter((result) => result != undefined)
        setUserproducts(filteredResults)
      })
    userProducts()
  };

  // useEffect(() => {
  //   let userId = sessionStorage.getItem("userId");
  //   axios.get('/api/favourites')
  //     .then((results) => {
  //       let userId = sessionStorage.getItem("userId");
  //       const mapResults = results.data.map((element) => {
  //         if(element.user_id == userId) {
  //           return element
  //         }
  //       })   
  //       const filteredResults = mapResults.filter((result) => result != undefined)
  //       setFavourites(filteredResults)
  //     })
  //   userProducts()
  // })

  useEffect(() => {
    setFavourites(JSON.parse(localStorage.getItem("favourites")))
    }, []);

    const deleteFavourite = function(pdc) {
      const data = JSON.parse(localStorage.getItem("favourites"));
      const correctArr = data.filter((otherPdc) => otherPdc.id !== pdc.id);
      localStorage.setItem("favourites", JSON.stringify(correctArr));
      window.location.reload();
    }

    const userFavourites = function() {
      const favouriteList = favourites.map((favourite, idx) => 
        <div class="products" key={favourite.name + favourite.price + idx}>
          <div class="product-wrapper">
            <div class="product-details"></div>
            <img class="product-image" src={favourite.image_url} onClick={() => handleClick(favourite.id)}/>
            <div class="product-name">{favourite.name}</div>
            <div class="price-div">
              <h1 class="price"> ${favourite.price}.00</h1>
              <button class="favourite-delete-button" onClick={() => deleteFavourite(favourite)}>DELETE</button>
            </div>
            <div class="PDinventory">
              <div class="in-stock">{favourite.inventory} in stock</div> <button class="add-to-cart" >ADD TO CART</button>
            </div>
          </div>
        </div>
      )
      const noFavourites = (
        <div>You currently have no favourite products.</div>
      )
      if (favourites.length != 0) {
        return favouriteList;
      } else {
        return noFavourites;
      }
    }

    useEffect(() => {
      axios.get('/api/products')
      .then((results) => {
        let userId = sessionStorage.getItem("userId");
        const mapResults = results.data.map((element) => {
          if(element.user_id == userId) {
            return element
          }
        })   
        const filteredResults = mapResults.filter((result) => result != undefined)
        setUserproducts(filteredResults)
      })
      
    }, [])

    const userProducts = function() {
      const userProducts = userproducts.map((product) => (
        <div class="products">
        <div class="product-wrapper">
            <div class="product-details"></div>
            <img class="product-image" src={product.image_url} onClick={() => handleClick(product.id)}/>
            <div class="product-name">{product.name}</div>
            <div class="price-div">
              <h1 class="price"> ${product.price}.00</h1>
            </div>
            <div class='buttons'>
              <button class="editbtn" href="/updateproduct" onClick={() => onEdit(product.id, product.image_url, product.description, product.name, product.price)}>EDIT </button>
              <button class="deletebtn" onClick={() => onDelete(product.id)}>DELETE</button>
            </div>
          </div>
        </div>
      ))

      return userProducts
    }

    useEffect(() => {
      let userId = sessionStorage.getItem("userId");
      axios.get('/api/orders')
      .then((results) => {
        const mapResults = results.data.map((element) => {
          if(element.user_id == userId) {
            return element
          }
        })
        const filteredResults = mapResults.filter((result) => result != undefined)
        setOrderhistory(filteredResults)
      })
    }, [])

    const orderHistory = function() {
      const orderHistory = orderhistory.map((order) => (
        <div class='order-box'>
          <div> Order Number: {order.order_id}</div>
          <div> Product Name: {order.name}</div>
          <div> Product Price: {order.price}</div>
          <div> Order Date: {order.order_date}</div>
          <div> Order Total: {order.total_amount}</div>
        </div>
      ))
      return orderHistory
    }
    const styles = {
      tabs: {
        color: 'white',
      }, 
      panel: {
        display: 'flex', 
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'justify-content': 'center',
      }
    }

  return (
    <>
    <Layout>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
          <Tabs centered={true} onChange={handleChange} aria-label="lab API tabs example">
            <Tab style={styles.tabs} label="My Ads" value="1"/>
            <Tab style={styles.tabs} label="Favourites" value="2" />
            <Tab style={styles.tabs} label="Order History" value="3" />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <div style={styles.panel}>
          {userProducts()}
          </div>
          <button class='newproductbtn' href='/newproduct'> ADD NEW PRODUCT </button>
          </TabPanel>
        <TabPanel style={styles.panel} value="2">{userFavourites()}</TabPanel>
        <TabPanel value="3">{orderHistory()}</TabPanel>
      </TabContext>
    </Box>
    </Layout>
    </>
  );
  
}