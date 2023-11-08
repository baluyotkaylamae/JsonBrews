import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import MetaData from '../Layouts/Metadata';
import Loader from '../Layouts/Loader';
import Sidebar from './Sidebar';
import { getToken } from '../../utils/helpers';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Layouts/FH.css';

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCategories = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`http://localhost:4001/api/categories`, config);
            setCategories(data.categories);
            console.log(data.categories);
            setLoading(false);
        } catch (error) {
            console.error(error);
            // Handle the error as needed
        }
    };

    const getUsers = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`http://localhost:4001/api/admin/users`, config);
            setUsers(data.users);
            console.log(data.users);
        } catch (error) {
            console.error(error);
            // Handle the error as needed
        }
    };

    useEffect(() => {
        getCategories();
        getUsers();
    }, []);

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2 sidebar-dashboard" style={{ padding: 0 }}>
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="container"> {/* Add a new container */}
                        <h1 className="my-4 dashboard-title">Dashboard</h1>

                        {loading ? (
                            // Display a loading indicator here if needed
                            <p>Loading...</p>
                        ) : (
                            <Fragment>
                                <MetaData title={'Admin Dashboard'} />

                                <div className="row pr-4">
                                    <div className="col-xl-3 col-sm-6 mb-3 ">
                                        <div className="card text-white bg-success o-hidden h-100 dashboard-category">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Categories<br /> <b>{categories.length}</b></div>
                                            </div>

                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/categories">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100 dashboard-product">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Users<br /> <b>{users.length}</b></div>
                                            </div>

                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
