import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import './CRUD.css';

const AddonsDataTable = () => {
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
      .then(() => {
        setAddons((prevAddons) => prevAddons.filter((addon) => addon._id !== addonId));
        toast.success(`Addon with ID ${addonId} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting addon with ID ${addonId}:`, error);
        toast.error(`Failed to delete addon with ID ${addonId}`);
      });
  };

  const setDataTable = () => {
    const data = {
      columns: [
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
          label: 'Category',
          field: 'category',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
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

    addons.forEach((addon) => {
      data.rows.push({
        name: addon.name,
        description: addon.description,
        category: categories.find((category) => category._id === addon.category)?.name || '',
        price: addon.price,
        actions: (
          <div>
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
              className="btn btn-danger ml-2"
              onClick={() => handleDelete(addon._id)}
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
        <div className="col-md-9">
          <h2 className='title-crud'>List of Add-Ons</h2>
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

export default AddonsDataTable;
