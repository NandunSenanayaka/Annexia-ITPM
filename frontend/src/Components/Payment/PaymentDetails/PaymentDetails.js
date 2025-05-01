

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PaymentDashboard from "../PaymentDashboard/PaymentDashboard";
import './PaymentDetails.css';

const URL = "http://localhost:5000/payments";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => setPayments(data.payments));
  }, []);

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:5000/payments/${id}`)
      .then(() => {
        setPayments(payments.filter(payment => payment._id !== id));
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Payment Details Report', 10, 10);

    autoTable(doc, {
      head: [['Renter Name', 'Card Name', 'Card No', 'Expiry Date', 'CVV', 'Amount', 'Remark']],
      body: payments.map(payment => [
        payment.RenterName,
        payment.CardName,
        payment.CardNo,
        payment.ExpiryDate,
        payment.CVV,
        `$${payment.Amount}`,
        payment.Remark
      ]),
      startY: 20,
    });

    doc.save('Payment_Details.pdf');
  };

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredPayments = data.payments.filter(payment => 
        Object.values(payment).some(field =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setPayments(filteredPayments);
      setNoResults(filteredPayments.length === 0);
    });
  };

  return (
    <div className="payment-dashboard-container">
      <PaymentDashboard />
      <div className="payment-dashboard-content">
        <h1>Payment Details</h1>

        <div className="search-container">
          <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search..." />
          <button onClick={handleSearch}>Search</button>
        </div>

        {noResults ? (
          <p>No results found</p>
        ) : (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Renter Name</th>
                <th>Card Name</th>
                <th>Card No</th>
                <th>Expiry Date</th>
                <th>CVV</th>
                <th>Amount</th>
                <th>Remark</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, i) => (
                  <tr key={i}>
                    <td>{payment.RenterName}</td>
                    <td>{payment.CardName}</td>
                    <td>{payment.CardNo}</td>
                    <td>{payment.ExpiryDate}</td>
                    <td>{payment.CVV}</td>
                    <td>${payment.Amount}</td>
                    <td>{payment.Remark}</td>
                    <td>
                      <Link to={`/updatepayment/${payment._id}`} className="update-btn">Update</Link>
                      <button className="delete-btn" onClick={() => deleteHandler(payment._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8">No Payments Available</td></tr>
              )}
            </tbody>
          </table>
        )}
        
        <button className="download-btn" onClick={generatePDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default PaymentDetails;






