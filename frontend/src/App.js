import logo from './logo.svg';
import './App.css';
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
import ProductDetails from './Components/Product/ProductDetails'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>

          {/*for login */}
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/product/:id" element={<ProductDetails  />} exact="true" />
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register />} exact="true" />
          <Route path="/me" element={<Profile />} exact="true" />
          <Route path="/me/update" element={<UpdateProfile />} exact="true"/>
          <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
          <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
          <Route path="/password/update" element={<UpdatePassword />} />

          <Route path="/category/create" element={<CreateCategory />} end />
          <Route path="/category/update/:id" element={<UpdateCategory />} end />
          <Route path="/category/list" element={<CategoryList />} end />

          {/* <Route path="admin/product/create" element={<CreateProduct />} exact="true" /> */}

          <Route path="/product/create" element={<CreateProduct />} end  />
          <Route path="/product/update/:id" element={<UpdateProduct />} end  />
          <Route path="/product/list" element={<ProductList />} end  />
          {/* <Route path="/admin/products" element={<ProductsList />}  /> */}

          <Route path="/dashboard" element={<Dashboard />}  />
          {/* for admin */}
          <Route path="/sidebar" element={<Sidebar />} end />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
