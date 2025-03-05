import React, { useEffect, useState } from 'react';
import './SecurityOverview.css';
import SecurityDashboard from '../SecurityDashboard/SecurityDashboard';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Ensure Link is imported
import { FaHome, FaPlus, FaFileAlt } from 'react-icons/fa';  // Assuming these are imported

import AddSecurity from '../SecurityDetails/SecurityDetails'; // Adjust the path according to your folder structure



function SecurityOverview() {
  const [security, setSecurity] = useState([]);  // State to hold security data

  const URL = 'http://localhost:5000/security';

  const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
  };

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log('Fetched data:', data);  // Log the fetched data
      setSecurity(data.security);  // Update state with security data
    });
  }, []);

  return (
    <div className="container">
      <div className="securitydashboard-container">
        <SecurityDashboard />
        <div className="securitydashboard-content">
          <h1>Overview</h1>
          <div>
            {security && security.map((securityItem, i) => (
              <div key={i}>
                <AddSecurity {...securityItem} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityOverview;
