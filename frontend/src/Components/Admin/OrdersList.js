import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../Layouts/Metadata'
import Loader from '../Layouts/Loader'
import Sidebar from './Sidebar'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css';


const OrdersList = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [allOrders, setAllOrders] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    // const listOrders = async () => {
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${getToken()}`
    //             }
    //         }
    //         const { data } = await axios.get(`http://localhost:4001/api/admin/orders`, config)
    //         setAllOrders(data.orders)
    //         setLoading(false)
    //     } catch (error) {
    //         setError(error.response.data.message)
    //     }
    // }
    // const deleteOrder = async (id) => {
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${getToken()}`
    //             }
    //         }
    //         const { data } = await axios.delete(`htp://localhost:4001/api/admin/orders/${id}`, config)
    //         setIsDeleted(data.success)
    //         setLoading(false)
    //     } catch (error) {
    //         setError(error.response.data.message)

    //     }
    // }
    // useEffect(() => {
    //     listOrders()
    //     if (error) {
    //         errMsg(error)
    //         setError('')
    //     }
    //     if (isDeleted) {
    //         successMsg('Order deleted successfully');
    //         navigate('/admin/orders');
    //     }
    // }, [error, isDeleted])
    // const deleteOrderHandler = (id) => {
    //     deleteOrder(id)
    // }

    const listOrders = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.get(`http://localhost:4001/api/admin/orders`, config)
            setAllOrders(data.orders)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching orders:', error.response || error.message); 
            setError(error.response ? error.response.data.message : error.message);
        }
    }
    
    // const deleteOrderHandler = async (id) => {
    //     deleteOrder(id)
    // }
        // try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             // 'Authorization': `Bearer ${getToken()}`
                    
        //         }
        //     }
        //     const { data } = await axios.delete(`http://localhost:4001/api/admin/delete/order/${id}`, config)
        //     setIsDeleted(data.success)
        //     setLoading(false)
        // } catch (error) {
        //     console.error('Error deleting order:', error.response || error.message); 
        //     setError(error.response ? error.response.data.message : error.message);
        // }
    // }

    const deleteOrder = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.delete(`http://localhost:4001/api/admin/order/${id}`, config)
            setIsDeleted(data.success)
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)

        }
    }
    useEffect(() => {
        listOrders()
        if (error) {
            errMsg(error)
            setError('')
        }
        if (isDeleted) {
            successMsg('Order deleted successfully');
            navigate('/admin/order');
        }
    }, [error, isDeleted])

    const deleteOrderHandler = (id) => {
    
        deleteOrder(id);
    };
    
    
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },

                {
                    label: 'Number of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        allOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `₱${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Fragment>

                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fas fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data;
    }
    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default OrdersList