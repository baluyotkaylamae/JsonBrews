import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    console.log(categories);
    useEffect(() => {
        // Fetch a list of categories from your API
        axios
            .get('http://localhost:4001/api/categories')
            .then((res) => {
                setCategories(res.data.categories);
                console.log(categories);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleDelete = (categoryId) => {
        // Handle category deletion using API
        axios
            .delete(`http://localhost:4001/api/categories/${categoryId}`)
            .then((res) => {
                // Update the list of categories after successful deletion
                setCategories(categories.filter((category) => category._id !== categoryId));
                toast.success('Category deleted successfully'); // Display success toast
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to delete category'); // Display error toast
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h2>Categories</h2>
                    <Link to="/category/create" className="btn btn-primary mb-3">
                        Create Category
                    </Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(categories) && categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category._id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <Link to={`/category/update/${category._id}`} className="btn btn-primary">
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(category._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No categories available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
