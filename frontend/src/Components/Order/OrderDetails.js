// import React, { Fragment, useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import MetaData from '../Layouts/Metadata'
// import Loader from '../Layouts/Loader'
// import axios from 'axios'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { getToken } from '../../utils/helpers'

// const OrderDetails = () => {
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState('')
//     const [order, setOrder] = useState({})

//     const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
//     let { id } = useParams();

//     const getOrderDetails = async (id) => {
//         try {

//             const config = {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${getToken()}`
//                 }
//             }

//             const { data } = await axios.get(`http://localhost:4001/api/order/${id}`, config);
//             setOrder(data.order)
//             setLoading(false)


//         } catch (error) {
//             setError(error.response.data.message)
//         }
//     }

//     useEffect(() => {
//         getOrderDetails(id)

//         if (error) {
//             toast.error(error, {
//                 position: toast.POSITION.BOTTOM_RIGHT
//             });
//         }
//     }, [error, id])

//     const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, 
//     ${shippingInfo.postalCode}, ${shippingInfo.country}`

//     // const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
//     const isPaid = paymentInfo && paymentInfo.status === 'paid' ? true : false;

//     return (
//         <Fragment>
//             <MetaData title={'Order Details'} />

//             {loading ? <Loader /> : (
//                 <Fragment>
//                     <div className="row d-flex justify-content-between">
//                         <div className="col-12 col-lg-8 mt-5 order-details"
//                             style={{
//                                 borderRadius: '10px',
//                                 width: '900px',
//                                 padding: '20px',
//                                 border: '3px solid #b38269',
//                                 margin: 'auto',
//                                 marginBottom: '50px'

//                             }}>

//                             <h1 className="my-5"
//                                 style={{
//                                     fontFamily: 'Hammersmith One, sans-serif',
//                                     color: '#8e5f47',
//                                     textTransform: ' uppercase',
//                                     fontSize: '36px',
//                                 }}>Order No.<br />
//                                 <p style={{ fontSize: '24px', }}> {order._id} </p> </h1>

//                             <hr style={{
//                                 width: '25%',
//                                 margin: '0 auto',
//                                 borderColor: '#8e5f47',
//                                 borderWidth: '5px',
//                                 opacity: '80%',
//                                 marginTop: 'auto',
//                                 marginBottom: '50px'
//                             }} />


//                             <h3 className="mb-4"
//                                 style={{
//                                     fontFamily: 'Hammersmith One, sans-serif',
//                                     color: '#8e5f47',
//                                     textTransform: ' uppercase',
//                                     fontSize: '30px',
//                                 }}>Shipping Information</h3>
//                             <p><b>Customer: </b> {user && user.name}</p>
//                             <p><b>Contact Number: </b> {shippingInfo && shippingInfo.phoneNo}</p>
//                             <p className="mb-4"><b>Address: </b>
//                             {shippingDetails}

//                             </p>
//                             <p><b>Amount of Item: </b> ₱{totalPrice}</p>

//                             <hr />

//                             <h3 className="my-4"
//                                style={{
//                                      fontFamily: 'Hammersmith One, sans-serif',
//                                     color: '#8e5f47',
//                                     textTransform: ' uppercase',
//                                     fontSize: '30px',
//                                 }}>Payment Status</h3>
//                             <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

//                             <h4 className="my-4">Stripe ID</h4>
//                             <p>{paymentInfo && paymentInfo.id}</p>

//                             <h4 className="my-4"
//                                 style={{
//                                     fontFamily: 'Hammersmith One, sans-serif',
//                                     color: '#8e5f47',
//                                     textTransform: ' uppercase',
//                                     fontSize: '30px',
//                                 }}>Order Status</h4>
//                             <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>

//                             {/* {order.orderStatus === 'Delivered' && (
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={handlePrintButtonClick}
//                                 >
//                                     Print Order
//                                 </button>
//                             )} */}


//                             <h4 className="my-4"
//                             style={{
//                                 fontFamily: 'Hammersmith One, sans-serif',
//                                color: '#8e5f47',
//                                textTransform: ' uppercase',
//                                fontSize: '30px',
//                            }}>Ordered Product</h4>


//                             {/* <div className="cart-item my-1">
//                                 {orderItems && orderItems.map(item => (
//                                     <div key={item.product} className="row my-5">
//                                         <div className="col-4 col-lg-2">
//                                             <img src={item.image} alt={item.name} height="45" width="65" />
//                                         </div>

//                                         <div className="col-5 col-lg-5">
//                                             <p>Item Name:</p><Link to={`/products/${item.product}`}>{item.name}</Link>
//                                         </div>


//                                         <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                                             <p>Item Price: ₱{item.price}</p>
//                                         </div>

//                                         <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                                             <p>Quantity: {item.quantity}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div> */}

//                             <div className="row">
//                                 <div className="col-lg-12 col-md-12 col-sm-12">
//                                     <div className="table-responsive">
//                                         <table className="table table-striped table-bordered table-hover">
//                                             <thead
//                                                 style={{
//                                                     textAlign: 'center',
//                                                     fontFamily: 'Hammersmith One, sans-serif',
//                                                     color: '#8e5f47',
//                                                     textTransform: 'uppercase',
//                                                     fontSize: '20px',
//                                                 }}>
//                                                 <tr>
//                                                     <th>IMAGE</th>
//                                                     <th>PRODUCT</th>
//                                                     <th>Quantity</th>
//                                                     <th>Unit Price</th>
//                                                     <th>Sub Total</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {orderItems &&
//                                                     orderItems.map(item => (
//                                                         <tr key={item.product}>
//                                                             <td style={{ textAlign: 'center' }}>

//                                                                 <img src={item.image} alt="Jsbrew" height="90" width="115"
//                                                                 /></td>
//                                                             <td>{item.name}</td>

//                                                             <td>{item.quantity}</td>
//                                                             <td>PHP {item.price} </td>
//                                                             <td> PHP {(item.quantity * item.price).toFixed(2)} </td>
//                                                         </tr>
//                                                     ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     <hr />
//                                     <div className="ttl-amts">
//                                         <h5>Total Amount <br />
//                                             <i
//                                                 style={{ fontSize: '18px' }}>
//                                                 including extra fees
//                                             </i>
//                                             <br />
//                                             <hr
//                                             style={{width: '20%',
//                                             border: '1px solid #b38269', }}/>
//                                             PHP {totalPrice}
//                                         </h5>
//                                     </div>
//                                     <hr />



//                                 </div>
//                             </div>



//                             <hr />
//                         </div>
//                     </div>
//                 </Fragment>
//             )}

//         </Fragment>
//     )
// }

// export default OrderDetails


import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MetaData from '../Layouts/Metadata';
import Loader from '../Layouts/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const OrderDetails = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [order, setOrder] = useState({});

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
    let { id } = useParams();

    const getOrderDetails = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`http://localhost:4001/api/order/${id}`, config);
            setOrder(data.order);
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        getOrderDetails(id);

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }, [error, id]);

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const isPaid = paymentInfo && paymentInfo.status === 'paid';

    return (
        <Fragment>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details"
                            style={{
                                borderRadius: '10px',
                                width: '900px',
                                padding: '20px',
                                border: '3px solid #b38269',
                                margin: 'auto',
                                marginBottom: '50px'
                            }}>

                            <h1 className="my-5"
                                style={{
                                    fontFamily: 'Hammersmith One, sans-serif',
                                    color: '#8e5f47',
                                    textTransform: 'uppercase',
                                    fontSize: '36px',
                                }}>Order No.<br />
                                <p style={{ fontSize: '24px', }}> {order._id} </p> </h1>

                            <hr style={{
                                width: '25%',
                                margin: '0 auto',
                                borderColor: '#8e5f47',
                                borderWidth: '5px',
                                opacity: '80%',
                                marginTop: 'auto',
                                marginBottom: '50px'
                            }} />

                            <div className="row pad-top-botm">
                                <div className="col-lg-6 col-md-6 col-sm-6"
                                    style={{ paddingBottom: '20px' }}>
                                    <h2 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '30px',
                                    }}>
                                        Client Information
                                    </h2>


                                    <h4 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '20px',
                                    }}>
                                        Contact Number:
                                        <span style={{
                                            fontSize: '20px',
                                            color: '#b38269',
                                        }}> {shippingInfo && shippingInfo.phoneNo}
                                        </span>
                                    </h4>

                                    <h4 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '20px',
                                    }}>E-mail: &nbsp;
                                        <span style={{
                                            fontSize: '20px',
                                            color: '#b38269',
                                        }}>
                                            {user && user.email}
                                        </span>

                                    </h4>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6"
                                    style={{ paddingBottom: '20px' }}>
                                    <h2 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '30px',
                                    }}>
                                        Payment Details
                                    </h2>
                                    <h4 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '20px',
                                    }}>Payment Status: {" "}
                                        <span className={isPaid ? "greenColor" : "redColor"}
                                            style={{ fontSize: '23px' }}>
                                            {isPaid ? "PAID" : "NOT PAID"}
                                        </span> </h4>

                                </div>
                            </div>

                            <div className="row pad-top-botm">
                                <div className="col-lg-6 col-md-6 col-sm-6"
                                    style={{ paddingBottom: '20px' }}>
                                    <h2 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '30px',
                                    }}>Shipping Information
                                    </h2>
                                    <h4 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '20px',
                                    }}>

                                    </h4>
                                    <h4 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '20px',
                                    }}>
                                        Customer:
                                        <span style={{
                                            fontSize: '20px',
                                            color: '#b38269',
                                        }}> {user && user.name}
                                        </span>
                                    </h4>

                                    <h4
                                        style={{
                                            fontFamily: 'Hammersmith One, sans-serif',
                                            color: '#8e5f47',
                                            textTransform: 'uppercase',
                                            fontSize: '20px',
                                        }}>Address: &nbsp;
                                        <span style={{
                                            fontSize: '20px',
                                            color: '#b38269',
                                        }}>
                                            {shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, 
                                     ${shippingInfo.country}`}
                                        </span>
                                    </h4>

                                    <h4
                                        style={{
                                            fontFamily: 'Hammersmith One, sans-serif',
                                            color: '#8e5f47',
                                            textTransform: 'uppercase',
                                            fontSize: '20px',
                                        }}>Amount: &nbsp;
                                        <span style={{
                                            fontSize: '20px',
                                            color: '#b38269',
                                        }}>
                                            PHP {totalPrice}
                                        </span>
                                    </h4>

                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6"
                                    style={{ paddingBottom: '20px' }}>
                                    <h2 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '30px',
                                    }}>Order Information
                                    </h2>

                                    <h4 style={{
                                        fontFamily: 'Hammersmith One, sans-serif',
                                        color: '#8e5f47',
                                        textTransform: 'uppercase',
                                        fontSize: '20px',
                                    }}>Order Status: {" "}
                                        <span className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"}>{orderStatus}
                                        </span> </h4>

                                    {/* <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p> */}
                                </div>
                            </div>

                            {/* <h3 className="my-4"
                                style={{
                                    fontFamily: 'Hammersmith One, sans-serif',
                                    color: '#8e5f47',
                                    textTransform: 'uppercase',
                                    fontSize: '30px',
                                }}>Payment Status</h3>
                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p> */}

                            {/* <h4 className="my-4">Stripe ID</h4>
                            <p>{paymentInfo && paymentInfo.id}</p> */}

                            <h4 className="my-4"
                                style={{
                                    fontFamily: 'Hammersmith One, sans-serif',
                                    color: '#8e5f47',
                                    textTransform: 'uppercase',
                                    fontSize: '30px',
                                }}>Ordered Product</h4>

                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered table-hover">
                                            <thead
                                                style={{
                                                    textAlign: 'center',
                                                    fontFamily: 'Hammersmith One, sans-serif',
                                                    color: '#8e5f47',
                                                    textTransform: 'uppercase',
                                                    fontSize: '20px',
                                                }}>
                                                <tr>
                                                    <th>IMAGE</th>
                                                    <th>PRODUCT</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Price</th>
                                                    <th>Sub Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderItems &&
                                                    orderItems.map(item => (
                                                        <tr key={item.product}>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <img src={item.image} alt="Jsbrew" height="90" width="115" />
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>PHP {item.price} </td>
                                                            <td> PHP {(item.quantity * item.price).toFixed(2)} </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <hr />
                                    <div className="row pad-top-botm justify-content-end">
                                        <div className="col-lg-6 col-md-6 col-sm-6 text-end">
                                            <h3  style={{
                                    fontFamily: 'Hammersmith One, sans-serif',
                                    color: '#8e5f47',
                                    textTransform: 'uppercase',
                                    fontSize: '30px',
                                }}>Total Amount <br />
                                                <i style={{ fontSize: '18px' }}>
                                                    including extra fees
                                                </i>
                                                <br />
                                                <hr style={{ width: '20%', border: '1px solid #b38269',
                                            marginLeft: 'auto' }} />
                                            <span 
                                            style={{ color: '#56a1c6',}}>
                                           <b style={{fontSize:'35px'}}>
                                           PHP
                                            </b>  {totalPrice}

                                            </span>
                                               
                                            </h3>
                                        </div>
                                    </div>


                                
                                </div>
                            </div>

                          
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;

