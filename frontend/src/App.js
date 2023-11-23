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
import { getUser } from './utils/helpers';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import OrdersList from './Components/Admin/OrdersList';
import ProcessOrder from './Components/Admin/ProcessOrder';
import Homee from './Components/Homee';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [state, setState] = useState({
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  })
  const addItemToCart = async (id, quantity, selectedAddons, selectedSugarLevel, selectedCupSize) => {


    if (!getUser()) {
      toast.error("Login first EHEHE", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    try {
      // Fetch product details
      const productResponse = await axios.get(`http://localhost:4001/api/product/${id}`);
      const productData = productResponse.data;

      // Fetch addons details
      const addonsResponse = await axios.get('http://localhost:4001/api/addons');
      const addonsData = addonsResponse.data.addons;

      // Filter selected addons
      const selectedAddonsDetails = addonsData.filter((addon) => selectedAddons.includes(addon._id));

      const newItem = {
        product: productData._id,
        name: productData.name,
        price: productData.price,
        image: productData.images[0].url,
        stock: productData.stock,
        quantity: quantity,
        addons: selectedAddonsDetails,
        sugarLevel: selectedSugarLevel,
        cupSize: selectedCupSize,
      };

      // const isItemExist = state.cartItems.find((i) => i.product === item.product);
      setState(prevState => {
        const isItemExist = prevState.cartItems.find((i) => i.product === newItem.product);

        if (isItemExist) {
          return {
            ...prevState,
            cartItems: prevState.cartItems.map((i) =>
              i.product === isItemExist.product ? newItem : i
            ),
          };
        } else {
          // Add new item
          return {
            ...prevState,
            cartItems: [...prevState.cartItems, newItem],
          };
        }
      });

      toast.success('Item Added to Cart', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  //localStorage.setItem('cartItems', JSON.stringify(state.cartItems));


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
        <Header cartItems={state.cartItems} />

        {/* <img className="image-on-banner" src="public/coffee1.png" alt="Image on Banner" /> */}
        <Routes>

          {/*for login */}
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/Homee" element={<Homee />} exact="true" />
          {/* <Route path="/product/:id" element={<ProductDetails  />} exact="true" /> */}
          <Route path="/product/:id" element={<ProductDetails cartItems={state.cartItems} addItemToCart={addItemToCart} />} exact="true" />
          <Route path="/search/:keyword" element={<Home />} exact="true" />

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
          <Route path="/addons/list" element={
            <ProtectedRoute isAdmin={true}>
              <AddonsList />
            </ProtectedRoute>
          } />
          <Route path="/addons/create" element={
            <ProtectedRoute isAdmin={true}>
              <CreateAddon />
            </ProtectedRoute>
          } />
          <Route path="/addons/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateAddon />
            </ProtectedRoute>
          } />

          {/* orders  -- Customer*/}
          <Route path="/orders/me" element={<ListOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/admin/order" element={<ProtectedRoute isAdmin={true}>
            <OrdersList />
          </ProtectedRoute>} end />

          <Route
            path="/admin/order/:id"
            element={<ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>} end />


          {/* category */}
          <Route path="/category/create" element={
            <ProtectedRoute isAdmin={true}>
              <CreateCategory />
            </ProtectedRoute>
          } end />
          <Route path="/category/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateCategory />
            </ProtectedRoute>
          } end />
          <Route path="/category/list" element={
            <ProtectedRoute isAdmin={true}>
              <CategoryList />
            </ProtectedRoute>
          } end />

          {/* <Route path="admin/product/create" element={<CreateProduct />} exact="true" /> */}

          <Route path="/product/create" element={
            <ProtectedRoute isAdmin={true}>
              <CreateProduct />
            </ProtectedRoute>
          } />

          <Route path="/product/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          } end />

          <Route path="/product/list" element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          } end />
          {/* <Route path="/admin/products" element={<ProductsList />}  /> */}

          <Route path="/dashboard" element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          } />
          {/* for admin */}


          <Route path="/sidebar" element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
              <Sidebar />
            </ProtectedRoute>
          } end />

        </Routes>
        <Footer />
      </Router>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;