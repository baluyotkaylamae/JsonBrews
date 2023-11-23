import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/Metadata';
import CheckoutSteps from './CheckoutSteps';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';
import axios from 'axios';

const Payment = ({ cartItems, shippingInfo }) => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const order = {
    orderItems: cartItems,
    shippingInfo,
    paymentInfo: {
      status: 'paid', 
      method: 'Cash on Delivery (COD)',
    },
  };

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const createOrder = async (order) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.post('http://localhost:4001/api/order/new', order, config);

      toast.success('Order created', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      console.log('Order created:', data);

      navigate('/success');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to create order',
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;

    console.log('Order Info:', order);
   
    createOrder(order);
  };

  return (
    <Fragment>
      <MetaData title={'Payment'} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Payment</h1>

            <div className="text-center">
              <p>Cash on Delivery (COD)</p>
            </div>

            <div className="text-center">
              <button
                id="pay_btn"
                type="submit"
                className="btn btn-block py-3"
                style={{ backgroundColor: '#8B4513', color: 'white', fontFamily: 'Calibiri, sans-serif' }}
              >
                Place Order - {`₱${orderInfo && orderInfo.totalPrice}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
