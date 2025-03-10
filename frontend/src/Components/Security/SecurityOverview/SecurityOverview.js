import React, { useEffect, useState } from 'react';
import './SecurityOverview.css';
import SecurityDashboard from '../SecurityDashboard/SecurityDashboard';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import SecurityDetails from '../SecurityDetails/SecurityDetails'; // Correct import

function SecurityOverview() {
  const [security, setSecurity] = useState([]);
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

  // Format the current date and time
  const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Security Overview', 10, 10);

    // Add current date and time in the header
    doc.setFontSize(10);
    doc.text('Generated on: ' + getFormattedDateTime(), 10, 20);

    // Define columns for the table
    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Notice ID', dataKey: 'noticeId' },
      { header: 'Title', dataKey: 'title' },
      { header: 'Date', dataKey: 'date' },
      { header: 'Time', dataKey: 'time' },
      { header: 'Status', dataKey: 'status' },
      { header: 'Description', dataKey: 'description' },
    ];

    // Map security data to rows
    const rows = security.map(item => ({
      id: item.id,
      noticeId: item.noticeId,
      title: item.title,
      date: item.date,
      time: item.time,
      status: item.status,
      description: item.description,
    }));

    // Add table to PDF
    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey])),
      startY: 30, // Start the table below the header
    });

    // Save the PDF
    doc.save('Security_Overview.pdf');
  };

  return (
    <div className="container">
      <div className="securityoverview-container">
        <SecurityDashboard />
        <div className="securityoverview-content">
          <h1>Security Overview</h1>
          <div>
            <table className="details-table">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
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
          </div><br />
          <button className="download-button1" onClick={generatePDF}>Download Report</button>
        </div>
      </div>
    </div>
  );
}

export default SecurityOverview;
