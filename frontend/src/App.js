import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Route here
import './App.css';
import SecurityDashboard from "./Components/Security/SecurityDashboard/SecurityDashboard";
import AddSecurity from "./Components/Security/AddSecurity/AddSecurity";

import SecurityOverview from "./Components/Security/SecurityOverview/SecurityOverview";
import SecurityNotices from "./Components/Security/SecurityNotices/SecurityNotices";
import SecurityContact from "./Components/Security/SecurityContact/SecurityContact";

import RenterAdd from './Components/Owner/RenterAdd';
import OwnerDashboard from './Components/Owner/OwnerDashboard/OwnerDashboard'
import RenterManager from './Components/Owner/RenterManager';
import RenterUpdate from './Components/Owner/RenterUpdate';
import RoomAvailable from './Components/Owner/RoomAvailable';
import RoomAdd from './Components/Owner/RoomAdd';

import PaymentDetails from './Components/Payment/PaymentDetails/PaymentDetails';
import AddPayment from './Components/Payment/AddPayment/AddPayment';

import HomePage from './Components/Pages/HomePage/HomePage';

function App() {
  return (
    <div >
      <React.Fragment>
        <Routes>

          <Route path="/" element={<HomePage />} />

          {/* <Route path="/SecurityDashboard" element={<SecurityDashboard />} /> */}

          

          <Route path="/addsecurity" element={<AddSecurity />} />
          <Route path="/securityoverview" element={<SecurityOverview />} />
          <Route path="/securitynotices" element={<SecurityNotices />} />
          <Route path="/securitycontact" element={<SecurityContact />} />

          <Route path="/renteradd" element={<RenterAdd />} />
          <Route path="/ownerdashboard" element={<OwnerDashboard />} />
          <Route path="/RenterManager" element={<RenterManager />} />
          <Route path="/RenterUpdate/:id" element={<RenterUpdate />} />
          <Route path="/RoomAvilable" element={<RoomAvailable />} />
          <Route path="/RoomAdd" element={<RoomAdd />} />

          <Route path="/paymentdetails" element={<PaymentDetails />} />
          <Route path="/addpayment" element={<AddPayment />} />

  

        </Routes>
    </React.Fragment>
    </div>
  );
}

export default App;
