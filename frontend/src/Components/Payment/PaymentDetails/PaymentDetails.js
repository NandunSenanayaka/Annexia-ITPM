
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './PaymentDetails.css';  
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'; 
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import PaymentDashboard from "../PaymentDashboard/PaymentDashboard";

// const URL = "http://localhost:5000/payments";

// const fetchHandler = async () => {
//   return await axios.get(URL).then((res) => res.data);
// };

// const PaymentDetails = () => {
//   const [payments, setPayments] = useState([]);
//   const history = useNavigate();

//   useEffect(() => {
//     fetchHandler().then((data) => setPayments(data.payments));
//   }, []);

//   const deleteHandler = async (id) => {
//     await axios.delete(`http://localhost:5000/payments/${id}`)
//       .then(() => {
//         setPayments(payments.filter(payment => payment._id !== id)); // Update state to remove deleted item
//       });
//   };

//   // ✅ Generate PDF
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Add title
//     doc.setFontSize(18);
//     doc.text('Payment Details Report', 10, 10);

//     // Define table columns
//     const columns = [
//       { header: 'Renter Name', dataKey: 'RenterName' },
//       { header: 'Card Name', dataKey: 'CardName' },
//       { header: 'Card No', dataKey: 'CardNo' },
//       { header: 'Expiry Date', dataKey: 'ExpiryDate' },
//       { header: 'CVV', dataKey: 'CVV' },
//       { header: 'Amount', dataKey: 'Amount' },
//       { header: 'Remark', dataKey: 'Remark' },
//     ];

//     // Map payments to table rows
//     const rows = payments.map(payment => [
//       payment.RenterName,
//       payment.CardName,
//       payment.CardNo,
//       payment.ExpiryDate,
//       payment.CVV,
//       payment.Amount,
//       payment.Remark,
//     ]);

//     // Add table to PDF
//     autoTable(doc, {
//       head: [columns.map(col => col.header)],
//       body: rows,
//       startY: 20,
//     });

//     // Save PDF
//     doc.save('Payment_Details.pdf');
//   };

//   const [searchQuery, setSearchQuery] = useState('');
//   const [noResults,setNoResults] = useState(false);

//   const handleSearch =()=>{
//     fetchHandler().then((data) => {
//       const filteredPayments = data.payments.filter(payment => 
//         Object.values(payment).some((field) =>
//           field.toString().toLowerCase().includes(searchQuery.toLowerCase())
//         ))
//         setPayments(filteredPayments);
//         setNoResults(filteredPayments.length === 0);
      
//     });
//   }



//   return (
//     <div className="payment-dashboard-container">
//     <PaymentDashboard/>
//       <div className="payment-dashboard-content">
//         <h1>Payment Details</h1>

//         <div className="search-container">
//           <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search..." />
//           <button onClick={handleSearch}>Search</button>
//         </div>

//         {noResults ? (
//           <div>
//             <p>No results found</p>
//           </div>
//         ) : (

//         <div className="payment-list">
//           {payments.length > 0 ? (
//             payments.map((payment, i) => (
//               <div key={i} className="payment-card">
//                 <h2>ID: {payment._id}</h2>
//                 <p><strong>Renter Name:</strong> {payment.RenterName}</p>
//                 <p><strong>Card Name:</strong> {payment.CardName}</p>
//                 <p><strong>Card No:</strong> {payment.CardNo}</p>
//                 <p><strong>Expiry Date:</strong> {payment.ExpiryDate}</p>
//                 <p><strong>CVV:</strong> {payment.CVV}</p>
//                 <p><strong>Amount:</strong> ${payment.Amount}</p>
//                 <p><strong>Remark:</strong> {payment.Remark}</p>
//                 <div className="payment-actions">
//                   <Link to={`/updatepayment/${payment._id}`} className="update-btn">Update</Link>
//                   <button className="delete-btn" onClick={() => deleteHandler(payment._id)}>Delete</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No Payments Available</p>
//           )}
//         </div>
//       )}
//         {/* ✅ PDF Download Button */}
//         <button className="download-btn" onClick={generatePDF}>Download PDF</button>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetails;


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
