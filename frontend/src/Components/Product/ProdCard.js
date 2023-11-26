// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProdDet.css';

const ProdCard = ({ product }) => {
  const randomStarRating = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card product-cart-text prodcard-JSON" 
      style={{ zIndex: 3 }}>
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

export default ProdCard;
