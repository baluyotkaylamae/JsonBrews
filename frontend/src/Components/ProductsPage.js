import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import './Layouts/CurvedBanner.css';
import Product from './Product/Product';
import './ProductPage.css';

const ProductCard = ({ product, category }) => {
    const randomStarRating = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

    return (
        <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="card product-cart-text prodcard-JSON">
                <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="card-img-top product-image"
                />
                <div className="card-body card-des">
                    <h6 className="card-title card-title-des">
                        {product.name}
                    </h6>
                    <div className="star-rating star-rating-des">
                        {Array.from({ length: randomStarRating }, (_, index) => (
                            <span key={index}>&#9733;</span>
                        ))}
                    </div>
                     <p className="card-text card-des">{category}</p>
                    <p className="card-text card-price-des">₱ {product.price}</p>
               
                    
                    {/* STAR RATING RANDOMLY GENERATED */}
                
                <div className="button-container">
                <Link to={`/product/${product._id}`} className="btn json-button">
                        Details
                    </Link>
                </div>
                   
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

        <div className="container mt-4">
            <h1 className='prod-t'>Products</h1>
            <div className="row">
                <div className="col-md-3 col-sm-12 order-md-first">
                    <div className="filters">
                        <div className="filter-section ">
                            <h3 className='title-prod'>Price Filter</h3>
                            <input
                                type="number"
                                placeholder="Filter by max price"
                                value={maxPriceFilter}
                                onChange={(e) => handlePriceFilter(e.target.value)}
                                className='price-des'
                            />
                        </div>
                        {/* <div className="filter-section">
              <h4>Category Filter</h4>
              <button onClick={() => handleCategoryFilter(null)}>All</button>
              {categories.map((category) => (
                <button key={category._id} onClick={() => handleCategoryFilter(category._id)}>
                  {category.name}
                </button>
              ))}

            </div> */}

                        <div className="filter-section">
                            <h4 className='title-prod'>Category Filter</h4>
                            <div style={{ margin: '10px' }}>
                                <button className='button-cat' onClick={() => handleCategoryFilter(null)}>All</button>
                            </div>
                            {categories.map((category) => (
                                <div key={category._id} style={{ margin: '10px' }} >
                                    <button className='button-cat' onClick={() => handleCategoryFilter(category._id)}>
                                        {category.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="reset-button resett" onClick={resetFilters}>
                            Reset
                        </button>

                    </div>
                </div>
                <div className="col-md-9 col-sm-12">
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
        </div>
    );
};

export default ProductsPage;
