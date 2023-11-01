import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });

    const onChange = e => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }

    const { name, description } = category

    const submitForm = e => {
        e.preventDefault();
        axios
            .post('http://localhost:4001/api/categories/new', { name, description })
            .then(res => {
                // toast.success("Successfully Created");
                navigate('/category/list'); 
                setCategory({
                    name: '',
                    description: ''
                });

                
            })
            .catch(err => {
                toast.error("Failed to create"); // Use toast for error message
            });
    }

    return (
        <div className='container mt-5'>
              <form>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label for="name" className="form-label">Description</label>
                    <textarea className="form-control" id="name" name="description" onChange={onChange}></textarea>
                </div>
                <button className='btn btn-primary' onClick={submitForm}>Submit</button>
            </form>
            <ToastContainer /> {/* Include this to render the notifications */}
        </div>
    )
}

export default CreateCategory;
