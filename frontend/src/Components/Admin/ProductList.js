import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:4001/api/products'),
      axios.get('http://localhost:4001/api/categories'),
    ])
      .then(([productsResponse, categoriesResponse]) => {
        if (Array.isArray(productsResponse.data.products)) {
          setProducts(productsResponse.data.products);
        } else {
          console.error('Invalid response format for products:', productsResponse.data);
          toast.error('Failed to fetch products');
        }

        if (Array.isArray(categoriesResponse.data.categories)) {
          setCategories(categoriesResponse.data.categories);
        } else {
          console.error('Invalid response format for categories:', categoriesResponse.data);
          toast.error('Failed to fetch categories');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to fetch products and categories');
      });
  }, []);

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:4001/api/product/${productId}`)
      .then((res) => {
        setProducts(products.filter((product) => product._id !== productId));
        toast.success('Product is deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete product');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className='title-crud'>List of Products</h2>
          <Link to="/product/create" className="btn btn-primary mb-3">
            Create Product
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      {categories.find((category) => category._id === product.category)?.name}
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: `/product/update/${product._id}`,
                          state: { product }, 
                        }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Products</td>
                </tr>
              )}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
