import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ ProductId }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
   
    axios.get(`http://localhost:4001/api/product/${ProductId}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error('Failed to fetch product details:', error);
      });

   
    axios.get('http://localhost:4001/api/categories')
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
      });
  }, [productId]);

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to the cart`);
  };

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {categories.find(category => category._id === product.category)?.name}</p>
          <img src={product.image} alt={product.name} />

          <div>
            <button onClick={() => handleQuantityChange('decrease')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('increase')}>+</button>
          </div>

          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
