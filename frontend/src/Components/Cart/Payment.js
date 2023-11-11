import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/Metadata';
import CheckoutSteps from './CheckoutSteps';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const Payment = ({ cartItems, shippingInfo }) => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const order = {
    orderItems: cartItems,
    shippingInfo,
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

      toast.success('Order created', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/success');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create order', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;
    
    createOrder(order);
  };

  return (
    <Fragment>
      <MetaData title={'Payment'} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Payment Method</h1>
            <p>Cash on Delivery (COD)</p>
            <button
              id="pay_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              Place Order - {`₱${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
