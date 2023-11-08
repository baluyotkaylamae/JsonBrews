import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/Metadata';

const ProductDetails = ({ addItemToCart, cartItems }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  let { id } = useParams();

  const productDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4001/api/product/${id}`);
      setProduct(response.data); // Use response.data.product
      setLoading(false);
    } catch (err) {
      setError('Product not found');
      setLoading(false);
    }
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
    await addItemToCart(id, quantity);
  };

  useEffect(() => {
    productDetails(id);
  }, [id]);

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
              <Carousel pause='hover'>
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
              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0}
                onClick={addToCart}
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
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
