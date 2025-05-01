<<<<<<< HEAD
=======


>>>>>>> 80e359fbc6342a94d67ea21768055b026326445d
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

  // Function to mask card number (shows only last 4 digits)
  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    // Convert to string if it's not already
    const cardStr = String(cardNumber).trim();
    if (cardStr.length < 4) return cardStr;
    return '**** **** **** ' + cardStr.slice(-4);
  };

  // Function to mask expiry date (shows only month and year)
  const maskExpiryDate = (expiryDate) => {
    if (!expiryDate) return '';
    // Convert to string if it's not already
    const dateStr = String(expiryDate).trim();
    if (dateStr.length < 2) return dateStr;
    return '**/**' + dateStr.slice(-2);
  };

  // Function to mask CVV
  const maskCVV = () => {
    return '***';
  };

  useEffect(() => {
    fetchHandler().then((data) => setPayments(data.payments));
  }, []);

  const deleteHandler = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this payment record? This action cannot be undone.');
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/payments/${id}`)
          .then(() => {
            setPayments(payments.filter(payment => payment._id !== id));
            // Show success message
            alert('Payment record deleted successfully!');
          });
      } catch (error) {
        // Show error message if deletion fails
        alert('Failed to delete payment record. Please try again.');
        console.error('Error deleting payment:', error);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add company logo and header
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    doc.text('Payment Receipt', 105, 20, { align: 'center' });
    
    // Add company details
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Clean & Care Services', 105, 30, { align: 'center' });
    doc.text('123 Business Street, City', 105, 35, { align: 'center' });
    doc.text('Phone: +1 234 567 8900', 105, 40, { align: 'center' });
    
    // Add date
    const today = new Date();
    const dateStr = today.toLocaleDateString();
    doc.text(`Date: ${dateStr}`, 20, 50);
    
    // Add payment details table
    autoTable(doc, {
      startY: 60,
      head: [['Payment Details']],
      body: payments.map(payment => [
        [
          `Renter Name: ${payment.RenterName}`,
          `Card Name: ${payment.CardName}`,
          `Card Number: ${maskCardNumber(payment.CardNo)}`,
          `Amount: $${payment.Amount}`,
          `Remark: ${payment.Remark || 'N/A'}`
        ].join('\n')
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 14,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 12,
        cellPadding: 5
      }
    });

    // Add thank you message
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Thank you for your payment!', 105, doc.lastAutoTable.finalY + 20, { align: 'center' });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('This is a computer-generated receipt. No signature required.', 105, doc.lastAutoTable.finalY + 30, { align: 'center' });
    doc.text('For any queries, please contact our customer support.', 105, doc.lastAutoTable.finalY + 35, { align: 'center' });
    
    // Save PDF
    doc.save('Payment_Receipt.pdf');
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
                    <td>{maskCardNumber(payment.CardNo)}</td>
                    <td>{maskExpiryDate(payment.ExpiryDate)}</td>
                    <td>{maskCVV()}</td>
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






