import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import "./Layouts/CurvedBanner.css";
import './ProductPage.css';
import DeleteIcon from '@mui/icons-material/Delete';



const ProductCard = ({ product, category }) => {
  const randomStarRating = Math.floor(Math.random() * (5 - 3 + 1)) + 3;


  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card product-cart-text prodcard-JSON">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="card-img-top product-image"
        />
        <div className="card-body card-des">
          <h5 className="card-title card-title-des">
            {product.name}
          </h5>
          <div className="star-rating star-rating-des">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index}>
                {index + 0.5 < randomStarRating ? "★" : "☆"}
              </span>
            ))}
          </div>


          <p className="card-text card-price-des">₱ {product.price}</p>


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
  const [searchTerm, setSearchTerm] = useState('');


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

  const filterProducts = () => {
    const filteredProducts = originalProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const resetSearch = () => {
    setSearchTerm('');
    setProducts(originalProducts);
    setCurrentPage(1); // Reset to the first page after clearing search
  };



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


        <h2 className="mb-4 product-jsonbrew">Product List</h2>


        <div className="mb-4" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '50px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder=" Search products by name.. "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: '3px solid #b38269',
                borderRadius: '8px',
                marginRight: '10px',
                width: '300px',
                height: '50px',
                paddingRight: '10px'
              }}
            />
            <button
              onClick={resetSearch}
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '8px', // Adjust the border radius as needed
                backgroundColor: '#d64f3a',
                color: 'whitesmoke',
                border: '3px solid #d64f3a', // Adjust the border thickness as needed
                fontSize: '10px', // Adjust the font size of the entire button
                padding: '5px 5px', // Adjust the padding as needed
                marginRight: '15px',
              }}
            >
              <DeleteIcon style={{ fontSize: '16px' }} />
            </button>

          </div>

          <button
            onClick={filterProducts}
            style={{
              borderRadius: '10px',
              backgroundColor: '#8e5f47',
              color: 'whitesmoke',
              border: '5px solid #8e5f47',
              marginRight: '10px',
              height: '50px'
            }}
          >
            Search
          </button>
        </div>





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
