
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentDetails.css';  // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';

const URL = "http://localhost:5000/payments";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setPayments(data.payments));
  }, []);

  return (
    <div className="payment-dashboard-container">
      <div className="payment-dashboard-content">
        <h1>Payment Details</h1>
        <div className="payment-list">
          {payments && payments.map((payment, i) => (
            <div key={i} className="payment-card">
              <h2>ID: {payment._id}</h2>
              <p><strong>Renter Name:</strong> {payment.RenterName}</p>
              <p><strong>Card Name:</strong> {payment.CardName}</p>
              <p><strong>Card No:</strong> {payment.CardNo}</p>
              <p><strong>Expiry Date:</strong> {payment.ExpiryDate}</p>
              <p><strong>CVV:</strong> {payment.CVV}</p>
              <p><strong>Amount:</strong> ${payment.Amount}</p>
              <p><strong>Remark:</strong> {payment.Remark}</p>
              <div className="payment-actions">
                
                <Link to={`/updatepayment/${payment._id}`}>Update</Link>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;

