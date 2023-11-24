import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'
import "./Layouts/CurvedBanner.css";



const ProductCard = ({ product }) => {
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
          <p className="card-text">{product.description}</p> 
          <Link to={`/product/${product._id}`} className="btn jsonbrew-button">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const pageNumbers = Math.ceil(totalProducts / productsPerPage);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage - 1)} className="page-link">
            Previous
          </button>
        </li>
        {Array.from({ length: pageNumbers }, (_, index) => (
          <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === pageNumbers ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage + 1)} className="page-link">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};



const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/products');
        setProducts(response.data.products);
        setOriginalProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const CurvedBanner = () => {
    return (
      <div className="curved-banner">
        <div className="image-on-banner">
          <img src='/coffee1.png' className="image-on-banner" alt="Image-on-banner" />

        </div>
        <div className="svg">
          <svg className="wave blend1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path d="M0,100 C150,200 350,0 500,100 L500,0 L0,0 Z"></path>
          </svg>
        </div>
        <div className="svg">
          <svg className="wave blend2" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path d="M0,100 C150,300 350,0 500,100 L500,0 L0,0 Z"></path>
          </svg>
        </div>
        <div className="gradient">
          <svg width="0" height="0">
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#EBEF95' }} />
              <stop offset="100%" style={{ stopColor: '#B5CDA3' }} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#EBEF95' }} />
              <stop offset="100%" style={{ stopColor: '#B5CDA3' }} />
            </linearGradient>
          </svg>
        </div>

        <div className="text-on-banner">
          <h3 className="text-on-banner">
            Brewing up happiness –
            where every cup is
            a latte fun! Join us at <strong style={{ fontWeight: 'bold' }}>JSONBREW</strong> for a brewteaful time!
            <h3 style={{ textAlign: 'right' }}>— JSONCREW</h3>
          </h3 >
          {/* <button  className="text-on-banner">
          Count Me In!
        </button> */}
        </div>


      </div>


    );
  };

  return (
    // <CurvedBanner />
    
   <div>
 
    <CurvedBanner />


    <div className="container mt-4">
   

        <h1 className="mb-4 product-jsonbrew">Product List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">Error: {error.message}</p>
        ) : Array.isArray(products) && products.length > 0 ? (
          <div>
            <div className="row">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        ) : (
          <p className="no-products-message">No products found.</p>
        )}
      </div>
    </div>
  );

};

export default Home;
