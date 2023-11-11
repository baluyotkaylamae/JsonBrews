import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/Metadata';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ addItemToCart, cartItems, removeItemFromCart }) => {
    const navigate = useNavigate();

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        addItemToCart(id, newQty);
    };

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        addItemToCart(id, newQty);
    };

    const removeCartItemHandler = (id) => {
        removeItemFromCart(id);
    };

    // const checkoutHandler = () => {
    //     navigate('/login?redirect=shipping');
    // };
    const checkoutHandler = () => {
       
        cartItems.forEach(async (item) => {
            const productId = item.product;
            const newStock = item.stock - item.quantity;
    
            try {
              
                await axios.patch(`http://localhost:4001/api/product/${productId}`, { stock: newStock });
    
               
            } catch (error) {
                console.error('Error updating stock:', error);
              
            }
        });
        navigate('/login?redirect=shipping');
    };
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
            {cartItems.length === 0 ? (
                <h2 className="mt-5">Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <h2 className="mt-5">
                        Your Cart: <b>{cartItems.length} items</b>
                    </h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map((item) => (
                                <Fragment key={item.product}>
                                    <hr />

                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt="Laptop" height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">₱{item.price}</p>
                                                {item.addons && item.addons.length > 0 && (
                                                    <div>
                                                        <strong>Addons:</strong>
                                                        <ul>
                                                            {item.addons.map((addon) => (
                                                                <li key={addon._id}>
                                                                    {addon.name} (+₱{addon.price})
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                <p>Sugar Level: {item.sugarLevel}</p>
                                                
                                                {/* Calculate and display the total price for the item and its addons */}
                                                <p id="card_item_price">
                                                    Total: ₱
                                                    {(
                                                        item.price +
                                                        item.addons.reduce((acc, addon) => acc + addon.price, 0)
                                                    ).toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span
                                                        className="btn btn-danger minus"
                                                        onClick={() => decreaseQty(item.product, item.quantity)}
                                                    >
                                                        -
                                                    </span>
                                                    <span className="count d-inline">{item.quantity}</span>
                                                    <span
                                                        className="btn btn-primary plus"
                                                        onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i
                                                    id="delete_cart_item"
                                                    className="fa fa-trash btn btn-danger"
                                                    onClick={() => removeCartItemHandler(item.product)}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>
                                    Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} (Units)</span>
                                </p>



                                <p>
                                    Est. total: ₱
                                    {cartItems.reduce(
                                        (acc, item) =>
                                            acc +
                                            item.quantity *
                                            (item.price + item.addons.reduce((addonAcc, addon) => addonAcc + addon.price, 0)),
                                        0
                                    ).toFixed(2)}
                                </p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>
                                    Check out
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
