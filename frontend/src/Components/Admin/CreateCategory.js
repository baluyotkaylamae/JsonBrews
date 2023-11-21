import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './CRUD.css';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const { name, description } = category;

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4001/api/categories/new', { name, description })
      .then((res) => {
        // toast.success("Successfully Created");
        navigate('/category/list');
        setCategory({
          name: '',
          description: '',
        });
      })
      .catch((err) => {
        toast.error('Failed to create'); // Use toast for error message
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar /> {/* Add the Sidebar component here */}
        </div>
        <div className="col-md-9 text-crud" style={{paddingBottom:'50px'}}>
          <h2 className='title-crud'>Create Category</h2>
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
            <button className="btn btn-crud ml-auto" onClick={submitForm}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Include this to render the notifications */}
    </div>
  );
};

export default CreateCategory;
