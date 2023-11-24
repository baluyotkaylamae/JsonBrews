import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { MDBDataTable } from 'mdbreact';
import './CRUD.css';

const CategoryDataTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4001/api/categories')
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (categoryId) => {
    axios
      .delete(`http://localhost:4001/api/categories/${categoryId}`)
      .then(() => {
        setCategories(categories.filter((category) => category._id !== categoryId));
        toast.success('Category deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete category');
      });
  };

  const setDataTable = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: '_id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Description',
          field: 'description',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    categories.forEach((category) => {
      data.rows.push({
        _id: category._id,
        name: category.name,
        description: category.description,
        actions: (
          <div>
            <Link to={`/category/update/${category._id}`} className="btn btn-primary">
              Edit
            </Link>
            <button
              className="btn btn-danger ml-2"
              onClick={() => handleDelete(category._id)}
            >
              Delete
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9" style={{ color: '#A97155' }}>
          <h2 className="title-crud">List of Categories</h2>
          <Link to="/category/create" className="btn btn-primary mb-3">
            Create Category
          </Link>
          <MDBDataTable
            data={setDataTable()}
            className="px-3"
            bordered
            striped
            hover
          />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CategoryDataTable;
