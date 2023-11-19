import React, { useState } from 'react';

const Sidebar = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isProductOpen, setProductOpen] = useState(false); // State for managing product dropdown
  const [isAddonsOpen, setAddonsOpen] = useState(false);
  const toggleCategory = () => {
    setCategoryOpen(!isCategoryOpen);
  };

  const toggleProduct = () => {
    setProductOpen(!isProductOpen);
  };

  const toggleAddons = () => {
    setAddonsOpen(!isAddonsOpen);
  };

  return (
    <div className="container sidebar-JSON ">
      <div className="bg-light border-right " id="sidebar">
        <div className="list-group list-group-flush ">
          <button onClick={toggleCategory} className="list-group-item list-group-item-action sidebar-dashboard" data-toggle="collapse" data-target="#categoryDropdown">
            CATEGORY
          </button>
          <div id="categoryDropdown" className={`collapse ${isCategoryOpen ? 'show' : ''}`}>
            <a href="/category/create" className="list-group-item list-group-item-action sidebar-dashboard">Create Category</a>
            <a href="/category/list" className="list-group-item list-group-item-action sidebar-dashboard">Category List</a>
            {/* Add more links for category-related actions here */}
          </div>

          <button onClick={toggleProduct} className="list-group-item list-group-item-action
          sidebar-dashboard" data-toggle="collapse" data-target="#productDropdown">
            PRODUCTS
          </button>
          <div id="productDropdown" className={`collapse ${isProductOpen ? 'show' : ''}`}>
            <a href="/product/create" className="list-group-item list-group-item-action sidebar-dashboard">Create Product</a>
            <a href="/product/list" className="list-group-item list-group-item-action sidebar-dashboard">Product List</a>
          </div>


          <button onClick={toggleAddons} className="list-group-item list-group-item-action
          sidebar-dashboard" data-toggle="collapse" data-target="#productDropdown">
            ADD-ONS
          </button>
          <div id="addonsDropdown" className={`collapse ${isAddonsOpen ? 'show' : ''}`}>
            <a href="/addons/create" className="list-group-item list-group-item-action sidebar-dashboard">Create Add-Ons</a>
            <a href="/addons/list" className="list-group-item list-group-item-action sidebar-dashboard">Add-Ons List</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
