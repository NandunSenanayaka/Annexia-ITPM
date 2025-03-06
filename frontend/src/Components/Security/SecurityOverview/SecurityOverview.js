import React, { useEffect, useRef, useState } from 'react';
import './SecurityOverview.css';
import SecurityDashboard from '../SecurityDashboard/SecurityDashboard';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { useNavigate } from 'react-router-dom';
import SecurityDetails from '../SecurityDetails/SecurityDetails'; // Correct import

function SecurityOverview() {
  const [security, setSecurity] = useState([]);
 // const printRef = useRef(null);
  const URL = 'http://localhost:5000/security';

  const fetchHandler = async () => {
    try {
      const res = await axios.get(URL);
      setSecurity(res.data.security || []);
    } catch (error) {
      console.error("Error fetching security data:", error);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  
  return (
    <div className="container">
      <div className="securitydashboard-container">
        <SecurityDashboard />
        <div className="securitydashboard-content">
          <h1>Security Overview</h1>
          <div>
            <table className="details-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Notice ID</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {security.length > 0 ? (
                  security.map((securityItem, i) => (
                    <SecurityDetails key={i} {...securityItem} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No security data available to print.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityOverview;



