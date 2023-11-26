import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../Layouts/Metadata'
import CheckoutSteps from './CheckoutSteps'
import { getUser } from '../../utils/helpers'
const ConfirmOrder = ({ cartItems, shippingInfo }) => {
    const [user, setUser] = useState(getUser() ? getUser() : {});
    let navigate = useNavigate();

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce(
        (acc, item) => {
            // Include cup size adjustment for each item
            const itemPrice = item.price + (item.cupSize === 'Medium' ? 5 : item.cupSize === 'Large' ? 10 : 0);
            return acc + itemPrice * item.quantity;
        },
        0
    );

    const addonsPrice = cartItems.reduce(
        (acc, item) =>
            acc +
            item.addons.reduce((addonAcc, addon) => addonAcc + addon.price, 0) *
            item.quantity,
        0
    );

    const shippingPrice = itemsPrice + addonsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * (itemsPrice + addonsPrice)).toFixed(2));
    const totalPrice = (
        itemsPrice +
        addonsPrice +
        shippingPrice +
        taxPrice
    ).toFixed(2);

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            addonsPrice: addonsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice,
        };

        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm"
                    style={{ marginLeft: '30px' }}>
                    <h1 className="mb-3"
                        style={{
                            fontFamily: 'Hammersmith One, sans-serif',
                            color: '#8e5f47',
                            textTransform: ' uppercase',
                            fontWeight: '300'
                        }}>Shipping Information</h1>
                    {getUser() && <p>
                        <b style={{
                            textTransform: 'uppercase',
                            fontSize: '25px',
                            fontWeight: '300'
                        }}>Name:</b> {user && user.name}</p>}
                    <p>
                        <b style={{
                            textTransform: 'uppercase',
                            fontSize: '25px',
                            fontWeight: '300'
                        }}>Phone: </b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4">
                        <b style={{
                            textTransform: 'uppercase',
                            fontSize: '25px',
                            fontWeight: '300'
                        }}>Address: </b>
                        {`${shippingInfo.address}, ${shippingInfo.city}, 
                        ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Cart Items:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <p>Cup Size: {item.cupSize}</p>
                                    </div>



                                    <div className="col-5 col-lg-6">
                                        <p style={{paddingLeft: '170px',
                                                   display: 'flex'}}>
                                            {item.quantity} x &#8369; {item.price + (item.cupSize === 'Medium' ? 5 : item.cupSize === 'Large' ? 10 : 0)} ={' '}
                                            <b>&#8369; {(item.quantity * (item.price + (item.cupSize === 'Medium' ? 5 : item.cupSize === 'Large' ? 10 : 0))).toFixed(2)}</b>
                                        </p>
                                    </div>


                                    {/* <p>
                                        {item.quantity} x &#8369; {item.price + (item.cupSize === 'Medium' ? 5 : item.cupSize === 'Large' ? 10 : 0)} ={' '}
                                        <b>&#8369; {(item.quantity * (item.price + (item.cupSize === 'Medium' ? 5 : item.cupSize === 'Large' ? 10 : 0))).toFixed(2)}</b>
                                    </p> */}

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}

                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h2>Order Summary</h2>
                        <hr />
                        <p>
                            Subtotal: <span className="order-summary-values">&#8369; {itemsPrice}</span>
                        </p>
                        <p>
                            Addons: <span className="order-summary-values">&#8369; {addonsPrice}</span>
                        </p>
                        <p>
                            Shipping: <span className="order-summary-values">&#8369; {shippingPrice}</span>
                        </p>
                        <p>
                            Tax: <span className="order-summary-values">&#8369; {taxPrice}</span>
                        </p>
                        <hr />
                        <p>
                            Total: <span className="order-summary-values">&#8369; {totalPrice}</span>
                        </p>
                        <hr />
                        <button
                            id="checkout_btn"
                            className="btn btn-block"
                            onClick={processToPayment}
                            style={{
                                backgroundColor: '#8B4513',
                                color: 'white',
                                fontFamily: 'Calibiri, sans-serif',
                                borderRadius: '15px'
                            }}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder