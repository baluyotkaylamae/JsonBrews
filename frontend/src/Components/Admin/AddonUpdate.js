import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateAddon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addon, setAddon] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch addon data from the API endpoint based on the addon ID
    axios.get(`http://localhost:4001/api/addons/${id}`)
      .then((response) => {
        setAddon(response.data.addon);
      })
      .catch((error) => {
        console.error('Error fetching addon:', error);
      });

    // Fetch categories from the API endpoint
    axios.get('http://localhost:4001/api/categories')
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [id]); 

  const onChange = (e) => {
    setAddon({ ...addon, [e.target.name]: e.target.value });
  };

  const { name, description, category, price } = addon;

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4001/api/addons/${id}`, { name, description, category, price })
      .then((res) => {
        console.log(res.data);
        
        navigate('/addons/list');
      })
      .catch((err) => {
        console.error('Failed to update addon:', err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Update Addon</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            onChange={onChange}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            name="category"
            required
            onChange={onChange}
            value={category}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            required
            onChange={onChange}
            value={price}
          />
        </div>
        <button className="btn btn-primary" onClick={submitForm}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateAddon;
