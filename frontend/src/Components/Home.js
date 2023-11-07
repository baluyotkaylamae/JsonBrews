import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'



const ProductCard = ({ product }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card">
      <img
          src={product.images[0].url}
          alt={product.name}
          className="card-img-top product-image"
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Price: ₱{product.price}</p>
          <Link to={`/product/${product._id}`} className="btn btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from your API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">Error: {error.message}</p>
      ) : Array.isArray(products) && products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="no-products-message">No products found.</p>
      )}
    </div>
  );
};

export default Home;
