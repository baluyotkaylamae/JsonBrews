import React, { useState } from 'react';

const Sidebar = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isProductOpen, setProductOpen] = useState(false); // State for managing product dropdown

  const toggleCategory = () => {
    setCategoryOpen(!isCategoryOpen);
  };

  const toggleProduct = () => {
    setProductOpen(!isProductOpen);
  };

  return (
    <div className="container">
      <div className="bg-light border-right" id="sidebar">
        <div className="list-group list-group-flush">
          <button onClick={toggleCategory} className="list-group-item list-group-item-action" data-toggle="collapse" data-target="#categoryDropdown">
            CATEGORY
          </button>
          <div id="categoryDropdown" className={`collapse ${isCategoryOpen ? 'show' : ''}`}>
            <a href="/category/create" className="list-group-item list-group-item-action">Create Category</a>
            <a href="/category/list" className="list-group-item list-group-item-action">Category List</a>
            {/* Add more links for category-related actions here */}
          </div>

          <button onClick={toggleProduct} className="list-group-item list-group-item-action" data-toggle="collapse" data-target="#productDropdown">
            PRODUCTS
          </button>
          <div id="productDropdown" className={`collapse ${isProductOpen ? 'show' : ''}`}>
            <a href="/product/create" className="list-group-item list-group-item-action">Create Product</a>
            <a href="/product/list" className="list-group-item list-group-item-action">Product List</a>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
