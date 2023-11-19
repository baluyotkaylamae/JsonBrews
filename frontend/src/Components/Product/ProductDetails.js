import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/Metadata';
import '../Layouts/FH.css';

const ProductDetails = ({ addItemToCart, cartItems }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [addons, setAddons] = useState([]);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [selectedAddons, setSelectedAddons] = useState([]);

  let { id } = useParams();

  const productDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4001/api/product/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError('Product not found');
      setLoading(false);
    }
  };
  const [selectedCupSize, setSelectedCupSize] = useState('Small');

  const handleCupSizeChange = (size) => {
    setSelectedCupSize(size);
  };

  const fetchAddons = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/addons');
      const allAddons = response.data.addons;

      const productCategory = product.category || '';
      const filteredAddons = allAddons.filter(
        (addon) => addon.category === productCategory
      );

      console.log('Product Category:', productCategory);
      setAddons(filteredAddons);
    } catch (error) {
      console.error('Error fetching addons:', error);
    }
  }, [product.category]);

  const [selectedSugarLevel, setSelectedSugarLevel] = useState('');

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
              <Carousel >
                {product.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100" src={image.url} alt={product.name} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />
              <p id="product_price"><strong>₱{product.price}</strong></p>
              <hr />
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                <input type="number" className="form-control count d-inline short-input" value={quantity} readOnly />
                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0}
                onClick={addToCart}
                style={{ marginLeft: '10px' }}
              >
                Add to Cart
              </button>

              <hr />
              <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span></p>

              <hr />
              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <div className="col-12 col-lg-5 mt-3">
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
            </div>

              <div className="col-12 col-lg-5 mt-3">
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
              </div>

              <hr />
              <h4 className="mt-2">Addons:</h4>
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
                      {addon.name} (+₱{addon.price})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
