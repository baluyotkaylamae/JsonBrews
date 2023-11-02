import React from 'react'


const Product = ({product}) => {
	return ( 
		<div className="col-sm-12 col-md-6 col-lg-3 my-3">
	          <div className="card p-3 rounded">
	            <img
	              className="card-img-top mx-auto"
	              src={product.images[0].url}
	            />
	            <div className="card-body d-flex flex-column">
	              <h5 className="card-title">
	                <a href="">{product.name}</a>
	              </h5>
	            </div>
	          </div>
	        </div>
	      )
}
export default Product