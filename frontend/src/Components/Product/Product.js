import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="row mt-5">
      <div className="col-sm-12 col-md-6">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="img-fluid mb-3"
        />
      </div>
      <div className="col-sm-12 col-md-6">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>
          <b>Price:</b> ${product.price}
        </p>
        <p>
          <b>Stock:</b> {product.stock}
        </p>
        <p>
          <b>Category:</b> {product.category.name}
        </p>
      </div>
    </div>
  );
};

export default Product;
