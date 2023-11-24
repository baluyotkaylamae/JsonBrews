import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import './Layouts/CurvedBanner.css';
import Product from './Product/Product';

const ProductCard = ({ product, category }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card product-cart-text" style={{ height: "600px" }}>
        <img
          src={product.images[0].url}
          alt={product.name}
          className="card-img-top product-image"
        />
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "20px", fontWeight: "bold" }}>
            {product.name}
          </h5>
          <p className="card-text">Price: ₱{product.price}</p>
          <p className="card-text">Category: {category}</p>
          <Link to={`/product/${product._id}`} className="btn jsonbrew-button">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:4001/api/products');
        setProducts(productsResponse.data.products);

        const categoriesResponse = await axios.get('http://localhost:4001/api/categories');
        setCategories(categoriesResponse.data.categories);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceFilter = (price) => {
    setMaxPriceFilter(price);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setMaxPriceFilter('');
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatches = selectedCategory
      ? product.category === selectedCategory
      : true;

    const priceMatches = maxPriceFilter === '' || product.price <= parseFloat(maxPriceFilter);

    return categoryMatches && priceMatches;
  });

  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-4 product-jsonbrew">Product List</h1>
        <div className="filters">
          <div className="category-filter">
            <button onClick={() => handleCategoryFilter(null)}>All</button>
            {categories.map((category) => (
              <button key={category._id} onClick={() => handleCategoryFilter(category._id)}>
                {category.name}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Filter by max price"
            value={maxPriceFilter}
            onChange={(e) => handlePriceFilter(e.target.value)}
          />
          <button onClick={resetFilters}>Reset</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">Error: {error.message}</p>
        ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          <div className="row">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                category={getCategoryName(product.category)}
              />
            ))}
          </div>
        ) : (
          <p className="no-products-message">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
