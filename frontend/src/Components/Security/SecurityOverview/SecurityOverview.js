import React, { useEffect, useState } from 'react';
import './SecurityOverview.css';
import SecurityDashboard from '../SecurityDashboard/SecurityDashboard';
import axios from 'axios';
import SecurityOverviews from './SecurityOverview';  // Correct import
import AddSecurity from '../SecurityDetails/SecurityDetails';  // Correct import

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
