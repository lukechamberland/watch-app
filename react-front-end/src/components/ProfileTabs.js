import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProfileTabs() {
  const [value, setValue] = React.useState('1');
  const [favourites, setFavourites] = useState([]);
  const [userproducts, setUserproducts] = useState([]);
  const [orderhistory, setOrderhistory] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onEdit = (id, image, description, name, price) => {
    const productId = window.sessionStorage.setItem('productId', id)
    const productImage = window.sessionStorage.setItem('productImage', image)
    const productDesc = window.sessionStorage.setItem('productDesc', description)
    const productName = window.sessionStorage.setItem('productName', name)
    const productPrice = window.sessionStorage.setItem('productPrice', price)
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

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    axios.get('/api/favourites')
      .then((results) => {
        const data = (results.data);
        const mapResults = data.map((element) => {
          if(element.user_id == userId) {
            return element
          }
        })   
        const filteredResults = mapResults.filter((result) => result != undefined)
        setFavourites(filteredResults)
      });
  
    }, []);

    const userFavourites = function() {
      const favouriteList = favourites.map((favourite, idx) => 
        <div class="products" key={favourite.name + favourite.price + idx}>
          <div class="product-wrapper">
          <div class="product" ></div>
            <div class="product-details"></div>
            <img class="product-details-image" src={favourite.image_url}/>
            <div class="product-name">{favourite.name}</div>
            <div class="price-div">
              <h1 class="price"> ${favourite.price}.00</h1>
            </div>
            <div class="PDinventory">
              <div class="in-stock">{favourite.inventory} in stock</div> <button class="add-to-cart">Add to cart</button>
            </div>
          </div>
        </div>
      )
      return favouriteList
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
          <div class="product" ></div>
            <div class="product-details"></div>
            <img class="product-details-image" src={product.image_url}/>
            <div class="product-name">{product.name}</div>
            <div class="price-div">
              <h1 class="price"> ${product.price}.00</h1>
            </div>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" href="/updateproduct" onClick={() => onEdit(product.id, product.image_url, product.description, product.name, product.price)}>EDIT</Button>
              <Button variant="outlined" color="error" onClick={() => onDelete(product.id)}>DELETE</Button>
            </Stack>
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

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="My Ads" value="1" />
            <Tab label="Favourites" value="2" />
            <Tab label="Order History" value="3" />
            <Tab label="Messages" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {userProducts()}
          <Button variant="contained" href='/newproduct'> Add new Product </Button>
          </TabPanel>
        <TabPanel value="2">{userFavourites()}</TabPanel>
        <TabPanel value="3">{orderHistory()}</TabPanel>
        <TabPanel value="4">Messages</TabPanel>
      </TabContext>
    </Box>
  );
}
