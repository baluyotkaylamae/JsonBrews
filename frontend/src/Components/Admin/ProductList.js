import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const ProductDataTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:4001/api/products'),
          axios.get('http://localhost:4001/api/categories'),
        ]);

        setProducts(productsResponse.data.products || []);
        setCategories(categoriesResponse.data.categories || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch products and categories');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
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

    products.forEach((product) => {
      data.rows.push({
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: categories.find((category) => category._id === product.category)?.name || '',
        actions: (
          <div>
            <Link
              to={{
                pathname: `/product/update/${product._id}`,
                state: { product },
              }}
              className="btn btn-primary"
            >
              Edit
            </Link>
            <button
              className="btn btn-danger ml-2"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:4001/api/product/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== productId));
        toast.success('Product is deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete product');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="title-crud">List of Products</h2>
          <Link to="/product/create" className="btn btn-primary mb-3">
            Create Product
          </Link>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <MDBDataTable
              data={setDataTable()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ProductDataTable;
