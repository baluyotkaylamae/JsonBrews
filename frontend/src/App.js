import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer'
import CreateCategory from './Components/Admin/CreateCategory';
import CreateProduct from './Components/Admin/productCreate';
import UpdateProduct from './Components/Admin/UpdateProduct';
import ProductList from './Components/Admin/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateCategory from './Components/Admin/UpdateCategory';
import CategoryList from './Components/Admin/Category';
import Sidebar from './Components/Admin/Sidebar';
import Login from './Components/User/Login'
import Register from './Components/User/Register';
import Profile from './Components/User/Profile'
import UpdateProfile from './Components/User/UpdateProfile';
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';
import UpdatePassword from './Components/User/UpdatePassword';
import Dashboard from './Components/Admin/Dashboard';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import Payment from './Components/Cart/Payment';
import OrderSuccess from './Components/Cart/OrderSuccess';
import ListOrders from './Components/Order/ListOrders';
import OrderDetails from './Components/Order/OrderDetails';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AddonsList from './Components/Admin/AddonsList';
import CreateAddon from './Components/Admin/AddonsCreate';
import UpdateAddon from './Components/Admin/AddonUpdate';


function App() {
  const [state, setState] = useState({
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  })
  const addItemToCart = async (id, quantity) => {
    console.log(id, quantity)
    try {
      const { data } = await axios.get(`http://localhost:4001/api/product/${id}`)
      console.log(data)
      const item = {
        product: data._id,
        name: data.name,
        price: data.price,
        image: data.images[0].url,
        stock: data.stock,
        quantity: quantity
      }

      const isItemExist = state.cartItems.find(i => i.products === item.product)
      console.log(isItemExist, state)
      // setState({
      //   ...state,
      //   cartItems: [...state.cartItems, item]
      // })
      if (isItemExist) {
        console.log("asdsad")
        setState({
          ...state,
          cartItems: state.cartItems.map(i => i.products === isItemExist.product ? item : i)
        })
      }
      else {
        console.log("ADSAD")
        setState({
          ...state,
          cartItems: [...state.cartItems, item]

        })
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      }

      console.log(state.cartItems)
      toast.success('Item Added to Cart', {
        position: toast.POSITION.BOTTOM_RIGHT
      })

    } catch (error) {
      console.log(error)
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT
      });
      // navigate('/')
    }

  }

  // const removeItemFromCart = async (id) => {
  //   setState({
  //     ...state,
  //     cartItems: state.cartItems.filter(i => i.products !== id)
  //   })
  //   localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
  // }
  const removeItemFromCart = (id) => {
    // Filter out the item with the given id and update the state
    setState({
      ...state,
      cartItems: state.cartItems.filter(item => item.product !== id)
    });

    // Update the localStorage to persist the changes
    localStorage.setItem(
      'cartItems',
      JSON.stringify(state.cartItems.filter(item => item.product !== id))
    );
  }

  const saveShippingInfo = async (data) => {
    setState({
      ...state,
      shippingInfo: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
  }

  return (
    <div>
      <Router>
        <Header />
        <Routes>

          {/*for login */}
          <Route path="/" element={<Home />} exact="true" />
          {/* <Route path="/product/:id" element={<ProductDetails  />} exact="true" /> */}
          <Route path="/product/:id" element={<ProductDetails cartItems={state.cartItems} addItemToCart={addItemToCart} />} exact="true" />

          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register />} exact="true" />
          <Route path="/me" element={<Profile />} exact="true" />
          <Route path="/me/update" element={<UpdateProfile />} exact="true" />
          <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
          <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
          <Route path="/password/update" element={<UpdatePassword />} />

          {/* cart */}
          <Route path="/cart" element={<Cart cartItems={state.cartItems} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} />} exact="true" />
          <Route path="/shipping" element={<Shipping
            shipping={state.shippingInfo}
            saveShippingInfo={saveShippingInfo}
          />}
          />
          <Route path="/confirm" element={<ConfirmOrder cartItems={state.cartItems} shippingInfo={state.shippingInfo} />} />
          <Route path="/payment" element={<Payment cartItems={state.cartItems} shippingInfo={state.shippingInfo} />} />
          <Route path="/success" element={<OrderSuccess />} />

          {/* Addons */}
          <Route path="/addons/list" element={<AddonsList />} />
          <Route path="/addons/create" element={<CreateAddon />} />
          <Route path="/addons/update/:id" element={<UpdateAddon />} />

          {/* orders */}
          <Route path="/orders/me" element={<ListOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          {/* category */}
          <Route path="/category/create" element={<CreateCategory />} end />
          <Route path="/category/update/:id" element={<UpdateCategory />} end />
          <Route path="/category/list" element={<CategoryList />} end />

          {/* <Route path="admin/product/create" element={<CreateProduct />} exact="true" /> */}

          <Route path="/product/create" element={<CreateProduct />} end />
          <Route path="/product/update/:id" element={<UpdateProduct />} end />
          <Route path="/product/list" element={<ProductList />} end />
          {/* <Route path="/admin/products" element={<ProductsList />}  /> */}

          <Route path="/dashboard" element={<Dashboard />} />
          {/* for admin */}
          <Route path="/sidebar" element={<Sidebar />} end />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;