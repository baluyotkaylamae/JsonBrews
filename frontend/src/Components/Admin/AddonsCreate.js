import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './CRUD.css';


const CreateAddon = () => {
  const navigate = useNavigate();
  const [addon, setAddon] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API endpoint
    axios.get('http://localhost:4001/api/categories')
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const onChange = (e) => {
    setAddon({ ...addon, [e.target.name]: e.target.value });
  };

  const { name, description, category, price } = addon;

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4001/api/addons/new', { name, description, category, price })
      .then((res) => {
        toast.success('Addon successfully created');
        navigate('/addons/list');
        setAddon({
          name: '',
          description: '',
          category: '',
          price: 0,
        });
      })
      .catch((err) => {
        toast.error('Failed to create addon'); // Use toast for error message
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar /> {/* Add the Sidebar component here */}
        </div>
        <div className="col-md-9 text-crud" style={{paddingBottom:'50px'}}>
          <h2 className='title-crud'>Create Add-on</h2>
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
                <option value="" disabled>Select a category</option>
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
            <button className="btn btn-crud" onClick={submitForm}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Include this to render the notifications */}
    </div>
  );
};

export default CreateAddon;
