import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import 'apexcharts';
import MetaData from '../Layouts/Metadata';
import Loader from '../Layouts/Loader';
import Sidebar from './Sidebar';
import { getToken } from '../../utils/helpers';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Layouts/FH.css';

import MonthlySalesChart from './MonthlySalesChart';
import ProductSalesChart from './ProductSalesChart';
import UserSalesChart from './UserSalesChart';

const Dashboard = () => {

    const [categories, setCategories] = useState([]);
    const [product, setProducts] = useState([]);
    const [error, setError] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryNames, setCategoryNames] = useState([]);
    const [productsCount, setProductsCount] = useState({});
    const [userRegistrationDates, setUserRegistrationDates] = useState({});

    const getAdminProducts = async () => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/admin/products`, config)
            console.log(data)
            setProducts(data.products)
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)

        }
    }

    const getCategories = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`http://localhost:4001/api/categories`, config);

            const productsCountObj = {};
            product.forEach(product => {
                const categoryId = product.category;
                if (productsCountObj[categoryId]) {
                    productsCountObj[categoryId]++;
                } else {
                    productsCountObj[categoryId] = 1;
                }
            });

            setCategories(data.categories);
            setProductsCount(productsCountObj);
            console.log(data.categories);

            const names = data.categories.map(category => category.name);
            setCategoryNames(names);
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

            // Extract user registration dates
            const registrationDates = data.users.map(user => user.createdAt.split('T')[0]);
            const registrationDatesCount = registrationDates.reduce((acc, date) => {
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});
            setUserRegistrationDates(registrationDatesCount);

            console.log(data.users);
        } catch (error) {
            console.error(error);
            // Handle the error as needed
        }
    };

    const getProducts = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${getToken()}`
                }
            };
            const response = await axios.get(`http://localhost:4001/api/products`, config);

            if (response.data && Array.isArray(response.data.products)) {
                const productsData = response.data.products;
                setProducts(productsData);

                // Update productsCount based on the fetched products
                const productsCountObj = {};
                productsData.forEach(product => {
                    const categoryId = product.category;
                    if (productsCountObj[categoryId]) {
                        productsCountObj[categoryId]++;
                    } else {
                        productsCountObj[categoryId] = 1;
                    }
                });
                setProductsCount(productsCountObj);

                console.log(productsData);
            } else {
                console.error('Invalid product data format');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getCategories();
        getUsers();
        getProducts();
        getAdminProducts()
    }, []);
    
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2 sidebar-dashboard" style={{ padding: 0 }}>
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="container">
                        <h1 className="my-4 dashboard-title">Dashboard</h1>

                        {loading ? <Loader /> : (
                            <Fragment>
                                <MetaData title={'Admin Dashboard'} />

                                <div className="row pr-4">
                                    <div className="col-xl-4 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100 dashboard-category">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Categories<br /> <b>{categories.length}</b></div>
                                            </div>

                                            <Link className="card-footer text-white clearfix small z-1" to="/category/list">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-sm-6 mb-3">
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

                                    <div className="col-xl-4 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100 dashboard-user">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Products<br /> <b>{product.length}</b></div>
                                            </div>

                                            <Link className="card-footer text-white clearfix small z-1" to="/product/list">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Add ApexCharts component */}
                                    <div className="row">
                                        <div className="col-xl-6 margin-down">
                                            <div className="card">
                                                <div className="card-body d-flex flex-column align-items-center">
                                                    <h5 className="card-title" style={{ color: "#b38269" }}>Products per Categories</h5>
                                                    {console.log('Rendering Chart:', categoryNames, productsCount)}
                                                    <Chart
                                                        options={{
                                                            chart: {
                                                                id: "basic-bar"
                                                            },
                                                            xaxis: {
                                                                categories: categoryNames
                                                            }
                                                        }}
                                                        series={[
                                                            {
                                                                name: "series-1",
                                                                data: Object.values(productsCount)
                                                            }
                                                        ]}
                                                        type="bar"
                                                        width="500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="card">
                                                <div className="card-body d-flex flex-column align-items-center">
                                                    <h5 className="card-title" style={{ color: "#b38269" }}>User Registration by Day</h5>
                                                    {console.log('Rendering User Registration Chart:', Object.keys(userRegistrationDates), Object.values(userRegistrationDates))}
                                                    <Chart
                                                        options={{
                                                            chart: {
                                                                id: "user-registration-chart"
                                                            },
                                                            xaxis: {
                                                                categories: Object.keys(userRegistrationDates)
                                                            }
                                                        }}
                                                        series={[
                                                            {
                                                                name: "users-registered",
                                                                data: Object.values(userRegistrationDates)
                                                            }
                                                        ]}
                                                        type="bar"
                                                        width="500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-xl-6 col-sm-6 mt-3 margin-down">
                                            <div className="card">
                                                <div className="card-body d-flex flex-column align-items-center">
                                                    <h5 className="card-title" style={{ color: "#b38269" }}>Monthly Sales Chart</h5>
                                                    {/* Use MonthlySalesChart component here */}
                                                    <MonthlySalesChart />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 mt-3">
                                            <div className="card">
                                                <div className="card-body d-flex flex-column align-items-center">
                                                    <h5 className="card-title" style={{ color: "#b38269" }}>User Sales Chart</h5>
                                                    {/* Use UserSalesChart component here */}
                                                    <UserSalesChart />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 mt-3 margin-down">
                                        <div className="card">
                                            <div className="card-body d-flex flex-column align-items-center">
                                                <h5 className="card-title" style={{ color: "#b38269" }}>Product Sales Chart</h5>
                                                <ProductSalesChart />
                                            </div>
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