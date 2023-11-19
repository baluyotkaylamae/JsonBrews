import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const AddonsList = () => {
  const [addons, setAddons] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/api/addons')
      .then((response) => {
        setAddons(response.data.addons);
      })
      .catch((error) => {
        console.error('Error fetching addons:', error);
      });

    axios.get('http://localhost:4001/api/categories')
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleDelete = (addonId) => {
    
    axios.delete(`http://localhost:4001/api/addons/${addonId}`)
      .then((response) => {
       
        setAddons((prevAddons) => prevAddons.filter((addon) => addon._id !== addonId));
        console.log(`Addon with ID ${addonId} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting addon with ID ${addonId}:`, error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          {/* Sidebar component */}
          <Sidebar />
        </div>
        <div className="col-md-9">
          {/* AddonsList component */}
          <h2>Addons List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {addons.map((addon) => (
                <tr key={addon._id}>
                  <td>{addon.name}</td>
                  <td>{addon.description}</td>
                  <td>
                    {categories.find((category) => category._id === addon.category)?.name}
                  </td>
                  <td>{addon.price}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/addons/update/${addon._id}`,
                        state: { addon },
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>{' '}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(addon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddonsList;