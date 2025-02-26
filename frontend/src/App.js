import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Route here
import './App.css';
import SecurityDashboard from "./Components/Security/SecurityDashboard/SecurityDashboard";
import AddSecurity from "./Components/Security/AddSecurity/AddSecurity";

import SecurityOverview from "./Components/Security/SecurityOverview/SecurityOverview";
import SecurityNotices from "./Components/Security/SecurityNotices/SecurityNotices";
import SecurityContact from "./Components/Security/SecurityContact/SecurityContact";


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
  

        </Routes>
    </React.Fragment>
    </div>
  );
}

export default App;
