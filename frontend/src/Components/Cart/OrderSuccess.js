import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../Layouts/Metadata'

const OrderSuccess = () => {
    
    sessionStorage.removeItem('orderInfo')
    localStorage.clear();
    
    // localStorage.removeItem('cartItems');
    // localStorage.removeItem('shippingInfo');
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/cafe.png" alt="Order Success" width="200" height="200" />

                    <h2 
                    style={{
                        textTransform: 'capitalize'
                    }}>Your Order has been placed successfully.</h2>


                    <button style={{
                          borderRadius: '20px',
                        background: '#8e5f47',
                          height: '5vh',
                          border: '3px solid #8e5f47',
                          textDecoration: 'none',
                          marginBottom: '50px',
                          fontSize: '24px',
                          textTransform: 'uppercase',
                         
                    }}>

                    <Link to="/orders/me"
                    style={{
                        textDecoration:'none',
                        color: 'white',
                    }}>Go to Orders</Link>

                    </button>
                    
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess