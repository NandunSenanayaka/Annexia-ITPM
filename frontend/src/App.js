import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Route here
import './App.css';

import AddSecurity from "./Components/Security/AddSecurity/AddSecurity";
import SecurityOverview from "./Components/Security/SecurityOverview/SecurityOverview";
import SecurityNotices from "./Components/Security/SecurityNotices/SecurityNotices";
import SecurityContact from "./Components/Security/SecurityContact/SecurityContact";
import UpdateSecurity from "./Components/Security/UpdateSecurity/UpdateSecurity";
import SecurityDashboard from './Components/Security/SecurityDashboard/SecurityDashboard';

import RenterAdd from './Components/Owner/RenterAdd';
import OwnerDashboard from './Components/Owner/OwnerDashboard/OwnerDashboard'

import PaymentDetails from './Components/Payment/PaymentDetails/PaymentDetails';
import AddPayment from './Components/Payment/AddPayment/AddPayment';
import PaymentDashboard from './Components/Payment/PaymentDashboard/PaymentDashboard';

import HomePage from './Components/Pages/HomePage/HomePage';
import UpdatePayment from './Components/Payment/UpdatePayment/UpdatePayment';

import Register from './Components/Register/Register';

function App() {
  return (
    <div >
      <React.Fragment>
        <Routes>

          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<PaymentDashboard />} /> */}

          <Route path="/addsecurity" element={<AddSecurity />} />
          <Route path="/securityoverview" element={<SecurityOverview />} />
          <Route path="/securityoverview/:id" element={<UpdateSecurity />} />
          <Route path="/securitynotices" element={<SecurityNotices />} />
          <Route path="/securitycontact" element={<SecurityContact />} />
          <Route path="/updatesecurity" element={<UpdateSecurity />} />

          <Route path="/renteradd" element={<RenterAdd />} />
          <Route path="/ownerdashboard" element={<OwnerDashboard />} />

          <Route path="/paymentdetails" element={<PaymentDetails/>} />
          <Route path="/addpayment" element={<AddPayment />} />
          <Route path="/updatepayment/:id" element={<UpdatePayment />} />
          {/* <Route path="/paymentdashboard" element={<PaymentDashboard />} /> */}

          <Route path="/register" element={<Register/>} />


  

        </Routes>
    </React.Fragment>
    </div>
  );
}

export default App;
