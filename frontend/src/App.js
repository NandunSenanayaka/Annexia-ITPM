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
import RenterManager from './Components/Owner/RenterManager';
import RenterUpdate from './Components/Owner/RenterUpdate';
import RoomAvailable from './Components/Owner/RoomAvailable';
import RoomAdd from './Components/Owner/RoomAdd';

import PaymentDetails from './Components/Payment/PaymentDetails/PaymentDetails';
import AddPayment from './Components/Payment/AddPayment/AddPayment';
import PaymentDashboard from './Components/Payment/PaymentDashboard/PaymentDashboard';
import Paymnetcontact from "./Components/Payment/Paymentcontact";

import HomePage from './Components/Pages/HomePage/HomePage';
import UpdatePayment from './Components/Payment/UpdatePayment/UpdatePayment';

import Register from './Components/Register/Register';
import Login from './Components/Login/Login'

//----------------------------
import AddCleaner from "./Components/Cleaner/addCleaner/AddCleaner";
import CleanerDash from "./Components/Cleaner/CleanerDashboard/dashboard";
import CleanerList from "./Components/Cleaner/cleanerList/CleanerList";
import CleanerProfile from "./Components/Cleaner/profile/CleanerProfile";
import EditCleaner from './Components/Cleaner/EditCleaner/EtidCleaner';


import ContactPage from './Components/Pages/ContactPage/ContactPage';
import AboutUs from './Components/Pages/AboutUs/AboutUs';

import RenterDashboard from './Components/RenterDashBoard/RenterDashboard';


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<CleanerList />} /> */}
          {/* <Route path="/" element={<PaymentDashboard />} /> */}

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUs />} />


          <Route path="/addsecurity" element={<AddSecurity />} />
          <Route path="/securityoverview" element={<SecurityOverview />} />
          <Route path="/securityoverview/:id" element={<UpdateSecurity />} />
          <Route path="/securitynotices" element={<SecurityNotices />} />
          <Route path="/securitycontact" element={<SecurityContact />} />
          <Route path="/updatesecurity" element={<UpdateSecurity />} />
          <Route path="/renteradd" element={<RenterAdd />} />
          <Route path="/ownerdashboard" element={<OwnerDashboard />} />

          <Route path="/paymentdetails" element={<PaymentDetails />} />
          <Route path="/addpayment" element={<AddPayment />} />
          <Route path="/updatepayment/:id" element={<UpdatePayment />} />
          {/* <Route path="/paymentdashboard" element={<PaymentDashboard />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/cleanerDash" element={<CleanerDash />} />
          <Route path="/addCleaner" element={<AddCleaner />} />
          <Route path="/cleanerlist" element={<CleanerList />} />
          <Route path="/cleaners/:id" element={<CleanerProfile />} />
          <Route path="/cleaners/edit/:id" element={<EditCleaner />} />

          <Route path="/RenterManager" element={<RenterManager />} />
          <Route path="/RenterUpdate/:id" element={<RenterUpdate />} />
          <Route path="/RoomAvilable" element={<RoomAvailable />} />
          <Route path="/RoomAdd" element={<RoomAdd />} />

          <Route path="/paymentdetails" element={<PaymentDetails/>} />
          <Route path="/addpayment" element={<AddPayment />} />
          <Route path="/updatepayment/:id" element={<UpdatePayment />} />
          <Route path="/paymentcontact" element={<Paymnetcontact />} />
          {/* <Route path="/paymentdashboard" element={<PaymentDashboard />} /> */}

          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />

          <Route path="/renterdashboard" element={<RenterDashboard />} />


  

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
