import React, { useState } from 'react';

const Sidebar = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);

  const toggleCategory = () => {
    setCategoryOpen(!isCategoryOpen);
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
          {/* Add more sidebar items and dropdowns as needed */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
