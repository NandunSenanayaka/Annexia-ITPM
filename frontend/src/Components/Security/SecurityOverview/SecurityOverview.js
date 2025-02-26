import React, { useEffect, useState } from 'react';
import './SecurityOverview.css';
import SecurityDashboard from '../SecurityDashboard/SecurityDashboard';
import axios from 'axios';
import SecurityOverviews from './SecurityOverview';  // Correct import
import AddSecurity from '../SecurityDetails/SecurityDetails';  // Correct import


function SecurityOverview() {
  return (                                                         
    <div className="container">
      <aside className="sidebar">
        <h2 className="logo">ANNEXIA</h2>
        <nav>
          <ul>
            <Link to="/addsecurity"style={{ textDecoration: "none", color: "inherit" }}>
              <li><FaHome /> Overview</li>
            </Link>

            <Link
              to="/addnotice"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaPlus /> Add Notice
              </li>
            </Link>

            <Link
              to="/securitynotices"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaFileAlt /> Security Notices
              </li>
            </Link>

const URL = 'http://localhost:5000/security';


const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const SecurityOverview = () => {
  const [security, setSecurity] = useState([]);  // State to hold security data

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log('Fetched data:', data);  // Log the fetched data
      setSecurity(data.security);  // Update state with security data
    });
  }, []);

  return (
    <div className="securitydashboard-container">
      <SecurityDashboard />

      <div className="securitydashboard-content">
        <h1>Overview</h1>
        <div>
          {security && security.map((securityItem, i) => (
            <div key={i}>
              {/* Passing securityItem to AddSecurity */}
              <AddSecurity {...securityItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityOverview;
