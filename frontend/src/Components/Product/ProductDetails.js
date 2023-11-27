import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/Metadata';
import '../Layouts/FH.css';
import './ProdDet.css';
import ProdCard from './ProdCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slidee.css';

const ProductDetails = ({ addItemToCart, cartItems }) => {
  const randomStarRating = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [addons, setAddons] = useState([]);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1); 
  const [selectedAddons, setSelectedAddons] = useState([]);

  let { id } = useParams();


  const [otherProducts, setOtherProducts] = useState([]);

  // const productDetails = async (id) => {
  //   try {
  //     const response = await axios.get(`http://localhost:4001/api/product/${id}`);
  //     setProduct(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError('Product not found');
  //     setLoading(false);
  //   }
  // };
  const [selectedCupSize, setSelectedCupSize] = useState('Small');

  const handleCupSizeChange = (size) => {
    setSelectedCupSize(size);
  };

  const productDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4001/api/product/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
       
        console.error('Server responded with an error:', err.response.data);
      } else if (err.request) {
    
        console.error('No response received from the server:', err.request);
      } else {
       
        console.error('Error setting up the request:', err.message);
      }
      setError('Product not found');
      setLoading(false);
    }
  };

  const fetchAddons = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/addons');
      const allAddons = response.data.addons;

      const productCategory = product.category || '';
      const filteredAddons = allAddons.filter((addon) => addon.category === productCategory);

      console.log('Product Category:', productCategory);
      console.log('Filtered Addons:', filteredAddons); // Add this line

      setAddons(filteredAddons);
    } catch (error) {
      console.error('Error fetching addons:', error);
    }
  }, [product.category]);

  // const [selectedSugarLevel, setSelectedSugarLevel] = useState('');
  const [selectedSugarLevel, setSelectedSugarLevel] = useState('Low');

  const handleSugarLevelChange = (level) => {
    setSelectedSugarLevel(level);
  };

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    await addItemToCart(id, quantity, selectedAddons, selectedSugarLevel, selectedCupSize);
  };

  const handleAddonChange = (addonId) => {
    setSelectedAddons((prevSelectedAddons) => {
      const index = prevSelectedAddons.indexOf(addonId);
      if (index !== -1) {
        // If addonId is already selected, remove it
        return [...prevSelectedAddons.slice(0, index), ...prevSelectedAddons.slice(index + 1)];
      } else {
        // If addonId is not selected, add it
        return [...prevSelectedAddons, addonId];
      }
    });
  };

  useEffect(() => {
    productDetails(id);
    fetchAddons();
  }, [id, fetchAddons]);


  const fetchOtherProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/products');
      const { data } = response;
      const otherProductsArray = data.products;

      if (Array.isArray(otherProductsArray) && otherProductsArray.length > 0) {
        setOtherProducts(otherProductsArray);
      } else {
        console.error('Invalid response format for other products:', data);
      }
    } catch (err) {
      console.error('Error fetching other products:', err);
    }
  };


  useEffect(() => {
    // Fetch other products when the component mounts
    fetchOtherProducts();
  }, []);


  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Adjust the number of slides to show at once
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: '0px',
    className: 'customslider',
    appendDots: (dots) => (
      <div style={{ position: 'absolute', top: '-70px', right: '10px' }}>
        <ul style={{ margin: '0' }}> {dots} </ul>
      </div>
    ),

    // ... (other settings, customize as needed)
  };

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel>
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={image.url} alt={product.name} />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                  <img className="d-block w-100" src="placeholder_image_url" alt="Placeholder" />
                </Carousel.Item>
                
                )}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h2 className='title-prod-pd'>{product.name}</h2>
              <i>
                <p id="product_id" className='card-title-des-pd'>Product No.
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      paddingLeft: '5px'
                    }
                    }
                  >
                    {product._id}
                  </span>
                </p>
              </i>


              <div style={{ display: 'flex', alignItems: 'center' }}>

                <div className="star-rating star-rating-des-pd">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} style={{ marginTop: '-5px' }}>
                      {index + 0.5 < randomStarRating ? "★" : "☆"}
                    </span>


                  ))}
                  <p id="product_id" className='card-text-des-pd'
                    style={{ paddingLeft: '15px' }}>
                    <strong>
                      RATING
                    </strong>
                  </p>
                </div>
              </div>





              <p id="product_price"
                className='card-title-des-pd'
                style={{
                  fontSize: '40px',
                  color: '#d64f3a'
                }}>
                ₱ {product.price}</p>

              {/* <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                <input type="number" className="form-control count d-inline short-input" value={quantity} readOnly />
                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
              </div> */}
              <div className="stockCounter d-inline">
                <span className="btn btn-minus-json" onClick={decreaseQty}>-</span>
                <input
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className="form-control count d-inline short-input 
                  border-for-input"
                  value={quantity}
                  readOnly
                />
                <span className="btn btn-add-json" onClick={increaseQty}>+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-addtocart"
                disabled={product.stock === 0}
                onClick={addToCart}
                style={{ backgroundColor: '#8B4513', color: 'white', fontFamily: 'Calibiri, sans-serif' }}
              >
                Add to Cart
              </button>

              <hr />
              {/* <p className='card-title-des-pd'>Status:

                <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                </p> */}

              <p className='card-title-des-pd'>
                Status:
                <span
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: '700',
                    color: product.stock > 0 ? 'green' : 'red' // Adjust the color based on your needs
                  }}
                  id="stock_status"
                >
                  {product.stock > 0 ? ' In Stock' : ' Out of Stock'}
                </span>
              </p>


              <hr />
              <h4 className="mt-2 card-title-des-pd">Description</h4>
              <p className='card-text-des-pd'>{product.description}</p>
              <hr />
              {/* <div className="col-12 col-lg-5 mt-3">
                <h4 className="mt-2">Cup Size:</h4>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="cup_size_small"
                    name="cupSize"
                    value="Small"
                    checked={selectedCupSize === 'Small'}
                    onChange={() => handleCupSizeChange('Small')}
                  />
                  <label className="form-check-label" htmlFor="cup_size_small">
                    Small
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="cup_size_medium"
                    name="cupSize"
                    value="Medium"
                    checked={selectedCupSize === 'Medium'}
                    onChange={() => handleCupSizeChange('Medium')}
                  />
                  <label className="form-check-label" htmlFor="cup_size_medium">
                    Medium
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="cup_size_large"
                    name="cupSize"
                    value="Large"
                    checked={selectedCupSize === 'Large'}
                    onChange={() => handleCupSizeChange('Large')}
                  />
                  <label className="form-check-label" htmlFor="cup_size_large">
                    Large
                  </label>
                </div>
              </div> */}

              {/* CUP SIZE */}
              <div className="col-12 col-lg-5 mt-3">
                <div className="cup-size-container">
                  <h4 className="card-title-des-pd">Cup Size</h4>
                </div>

                <div className="grid">
                  <label className="card">
                    <input
                      type="radio"
                      className="radio"
                      name="cupSize"
                      value="Small"
                      checked={selectedCupSize === 'Small'}
                      onChange={() => handleCupSizeChange('Small')}
                    />
                    <span className="plan-details">
                      <span className="plan-type">Small</span>
                      <span style={{ fontSize: '15px' }}>No Extra Fee</span>
                    </span>
                  </label>

                  <label className="card">
                    <input
                      type="radio"
                      className="radio"
                      name="cupSize"
                      value="Medium"
                      checked={selectedCupSize === 'Medium'}
                      onChange={() => handleCupSizeChange('Medium')}
                    />
                    <span className="plan-details">
                      <span className="plan-type">Medium</span>
                      <span style={{ fontSize: '15px' }}>Extra &#8369;5</span>
                    </span>
                  </label>

                  <label className="card">
                    <input
                      type="radio"
                      className="radio"
                      name="cupSize"
                      value="Large"
                      checked={selectedCupSize === 'Large'}
                      onChange={() => handleCupSizeChange('Large')}
                    />
                    <span className="plan-details">
                      <span className="plan-type">Large</span>
                      <span style={{ fontSize: '15px' }}>Extra &#8369;10</span>

                    </span>
                  </label>
                </div>
              </div>


              {/* <div className="col-12 col-lg-5 mt-3">
                <h4 className="mt-2">Sugar Level:</h4>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="sugar_low"
                    name="sugarLevel"
                    value="Low"
                    checked={selectedSugarLevel === 'Low'}
                    onChange={() => handleSugarLevelChange('Low')}
                  />
                  <label className="form-check-label" htmlFor="sugar_low">
                    Low
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="sugar_medium"
                    name="sugarLevel"
                    value="Medium"
                    checked={selectedSugarLevel === 'Medium'}
                    onChange={() => handleSugarLevelChange('Medium')}
                  />
                  <label className="form-check-label" htmlFor="sugar_medium">
                    Medium
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="sugar_high"
                    name="sugarLevel"
                    value="High"
                    checked={selectedSugarLevel === 'High'}
                    onChange={() => handleSugarLevelChange('High')}
                  />
                  <label className="form-check-label" htmlFor="sugar_high">
                    High
                  </label>
                </div>
              </div> */}


              {/* SUGAR LEVEL */}
              <div className="col-12 col-lg-5 mt-3">
                <div className="cup-size-container">
                  <h4 className="card-title-des-pd" style={{ paddingTop: '10px' }}>Sugar Level</h4>
                </div>
                <div className="grid">
                  <label className="card">
                    <input
                      type="radio"
                      className="radio"
                      name="sugarLevel"
                      value="Low"
                      checked={selectedSugarLevel === 'Low'}
                      onChange={() => handleSugarLevelChange('Low')}
                    />
                    <span className="plan-details">
                      <span className="plan-type">Low</span>

                    </span>
                  </label>

                  <label className="card">
                    <input
                      type="radio"
                      className="radio"
                      name="sugarLevel"
                      value="Medium"
                      checked={selectedSugarLevel === 'Medium'}
                      onChange={() => handleSugarLevelChange('Medium')}
                    />
                    <span className="plan-details">
                      <span className="plan-type">Medium</span>

                    </span>
                  </label>

                  <label className="card">
                    <input
                      type="radio"
                      className="radio"
                      name="sugarLevel"
                      value="High"
                      checked={selectedSugarLevel === 'High'}
                      onChange={() => handleSugarLevelChange('High')}
                    />
                    <span className="plan-details">
                      <span className="plan-type">High</span>

                    </span>
                  </label>
                </div>
              </div>


              {/* <h4 className="mt-2">Addons:</h4>
              <div className="form-check">
                {addons.map((addon) => (
                  <div key={addon._id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`addon_${addon._id}`}
                      checked={selectedAddons.includes(addon._id)}
                      onChange={() => handleAddonChange(addon._id)}
                    />
                    <label className="form-check-label" htmlFor={`addon_${addon._id}`}>
                      {addon.name} (+₱ {addon.price})
                    </label>
                  </div>
                ))}
              </div> */}


              <div className="checkbox-container">
                <h4 className="mt-2 card-title-des-pd" style={{ paddingTop: '20px' }}>Add-Ons:</h4>
                {addons.map((addon) => (
                  <div key={addon._id} className={`checkbox-button ${selectedAddons.includes(addon._id) ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      className="form-check-input visually-hidden"
                      id={`addon_${addon._id}`}
                      checked={selectedAddons.includes(addon._id)}
                      onChange={() => handleAddonChange(addon._id)}
                    />
                    <label className="checkbox-label" htmlFor={`addon_${addon._id}`}>
                      <span className="checkbox-icon"></span>
                      {addon.name}  + ₱ {addon.price}
                    </label>
                  </div>
                ))}
              </div>



            </div>
          </div>

          <div style={{ paddingTop: '100px' }}>

            {/* put the other products here */}

            {/* Put the other products here */}
            {/* <div className="row">
        {Array.isArray(otherProducts) ? (
          otherProducts.map((otherProduct) => (
            <ProdCard key={otherProduct._id} product={otherProduct} />
          ))
        ) : (
          <p>No other products available</p>
        )}
      </div> */}

          <hr className='hrr'/>
          <h3 className='title-prod-pd'
          style={{textAlign: 'center', paddingTop: '40px'}}>Recommended For You</h3>
            <div className='slider-des'>

              <Slider {...settings}>
                {Array.isArray(otherProducts) ? (
                  otherProducts.map((otherProduct) => (
                    <ProdCard key={otherProduct._id} product={otherProduct} />
                  ))
                ) : (
                  <p>No other products available</p>
                )}
              </Slider>


            </div>




          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
