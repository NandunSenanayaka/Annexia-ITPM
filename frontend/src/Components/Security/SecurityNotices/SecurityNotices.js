// import React from "react";
// import SecurityOverview from "../SecurityDashboard/SecurityDashboard";
// import "./SecurityNotices.css";

// function SecurityNotices() {
//   return (

//     <div className="security-notices-container">
//       <SecurityOverview />
//       <div className="security-notices-content">
//         <h1>Security Notices</h1>
//       </div>
//     </div>
//   );
// }

// export default SecurityNotices;

import React, { useEffect, useState } from 'react';
import './SecurityNotices.css';
import SecurityDashboard from '../SecurityDashboard/SecurityDashboard';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import SecurityDetails from '../SecurityDetails/SecurityDetails';

function SecurityNotices() {
  const [security, setSecurity] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    console.log("Fetched Security Data: ", security); // Log security data to inspect the structure
  }, [security]);

  const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Security Overview', 10, 10);

    doc.setFontSize(10);
    doc.text('Generated on: ' + getFormattedDateTime(), 10, 20);

    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Notice ID', dataKey: 'noticeId' },
      { header: 'Title', dataKey: 'title' },
      { header: 'Date', dataKey: 'date' },
      { header: 'Time', dataKey: 'time' },
      { header: 'Status', dataKey: 'status' },
      { header: 'Description', dataKey: 'description' },
    ];

    const rows = security.map(item => ({
      id: item.id,
      noticeId: item.noticeId || 'N/A', // Adding fallback in case noticeId is missing
      title: item.title,
      date: item.date,
      time: item.time,
      status: item.status,
      description: item.description,
    }));

    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey])),
      startY: 30,
    });

    doc.save('Security_Overview.pdf');
  };

  const filteredSecurity = security.filter((item) => {
    const noticeId = item.noticeId ? String(item.noticeId).toLowerCase() : '';
    const title = item.title ? item.title.toLowerCase() : '';
    const status = item.status ? item.status.toLowerCase() : '';
    const description = item.description ? item.description.toLowerCase() : '';

    return (
      noticeId.includes(searchTerm.toLowerCase()) ||
      title.includes(searchTerm.toLowerCase()) ||
      status.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="security-notices-container">
      <SecurityDashboard />

      <div className="securityoverview-content">
        <h1>Security Overview</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="table-container">
          <table className="details-table">
            <thead>
              <tr>
                <th>Notice No</th>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredSecurity.length > 0 ? (
                filteredSecurity.map((securityItem, i) => {
                  const { noticeId, title, date, time, status, description } = securityItem;
                  return (
                    <tr key={i}>
                      <td>{noticeId || 'N/A'}</td> {/* Added fallback for noticeId */}
                      <td>{title}</td>
                      <td>{date}</td>
                      <td>{time}</td>
                      <td>{status}</td>
                      <td>{description}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No security data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <br />
        <button className="download-button1" onClick={generatePDF}>Download Report</button>
      </div>
    </div>
  );
}

export default SecurityNotices;
