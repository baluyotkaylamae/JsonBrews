import { red } from '@mui/material/colors'
import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (

        <div style={{
            background: 'linear-gradient(to right, #eae4cf, #ebb585)!important',
            paddingTop: '-50px'
        }}>

            <div className="checkout-progress d-flex justify-content-center mt-5">
                <button style={{
                    borderRadius: '20px', marginRight: '50px',
                    height: '5vh', border: ' 3px solid #8e5f47'
                }}>


                    {shipping ? <Link to='/shipping' className="float-right"
                        style={{
                            paddingRight: '10px', textDecoration: 'none',
                            color: '#8e5f47',
                            textTransform: 'uppercase',
                        }}>
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Shipping</div>
                        <div className="triangle-active"></div>
                    </Link> : <Link to="#!" disabled>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Shipping</div>
                        <div className="triangle-incomplete"></div>
                    </Link>}


                </button>


                <button style={{
                    borderRadius: '20px', marginRight: '50px',
                    height: '5vh', border: ' 3px solid #8e5f47'
                }}>

                    {confirmOrder ? <Link to='/order/confirm' className="float-right"
                        style={{
                            paddingRight: '10px', textDecoration: 'none',
                            color: '#8e5f47',
                            textTransform: 'uppercase',
                        }}>
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Confirm Order</div>
                        <div className="triangle-active"></div>
                    </Link> : <Link to="#!" disabled
                    style={{textDecoration: 'none', textTransform:'uppercase',
                    color: '#8e5f47',}}>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Confirm Order</div>
                        <div className="triangle-incomplete"></div>
                    </Link>}


                </button>



                <button style={{
                  borderRadius: '20px',
                  marginRight: '50px',
                  height: '5vh',
                  border: '3px solid #8e5f47',
                  textDecoration: 'none',
                }}>




                    {payment ? <Link to='/payment' className="float-right"
                        style={{
                            paddingRight: '10px',
                            textDecoration: 'none',
                            color: '#8e5f47',
                            textTransform: 'uppercase',
                        }}>
                        <div className="triangle2-active"></div>
                        <div className="step active-step"
                           >Payment</div>
                        <div className="triangle-active"></div>
                    </Link> : <Link to="#!" disabled    
                    style={{textDecoration: 'none', textTransform:'uppercase',
                    color: '#8e5f47',}}>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete"
                            style={{ textDecoration: 'none' }}>Payment</div>
                        <div className="triangle-incomplete"></div>
                    </Link>}



                </button>

            </div>




        </div>


    )
}

export default CheckoutSteps