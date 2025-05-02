import React, { useEffect, useState } from 'react';
import './SecurityNotices.css';
import SecurityDashboard from '../SecurityDashboard/SecurityDashboard';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import SecurityDetails from '../SecurityDetails/SecurityDetails';
import RenterDashboard from './../../RenterDashBoard/RenterDashboard';

function SecurityNotices() {
  const [security, setSecurity] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const URL = 'http://localhost:5000/security';

  const fetchHandler = async () => {
    try {
      const res = await axios.get(URL);
      console.log("Fetched security items:", res.data.security); // Debug: view full data
      setSecurity(res.data.security || []);
    } catch (error) {
      console.error("Error fetching security data:", error);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
  };


    // PDF Genarate
  const generatePDF = () => {
    const doc = new jsPDF();
  
    const getFormattedDateTime = () => {
      const now = new Date();
      return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    };
  
   doc.setFontSize(18);
     doc.text('Security Overview', 10, 10);
    const columns = [
      { header: 'Notice ID', dataKey: 'noticeId' },
      { header: 'Title', dataKey: 'title' },
      { header: 'Date', dataKey: 'date' },
      { header: 'Time', dataKey: 'time' },
      { header: 'Status', dataKey: 'status' },
      { header: 'Description', dataKey: 'description' },
    ];
  
    const rows = security.map(item => ({
      noticeId: item.noticeId || item.noticeid || 'N/A',
      title: item.title,
      date: item.date,
      time: item.time,
      status: item.status,
      description: item.description,
    }));
  
    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey])),
      startY: 50,
      margin: { top: 50, bottom: 30 },
      didDrawPage: function (data) {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const headerHeight = 30;
        const footerHeight = 20;
  
        // ===== GREEN HEADER BAR =====
        doc.setFillColor(16, 104, 97); // #106861
        doc.rect(0, 0, pageWidth, headerHeight, 'F'); // full-width header bar
  
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('ANNEXIA', 10, 18);
  
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Security Notices !', 10, 26);
  
        doc.text(`Generated: ${getFormattedDateTime()}`, pageWidth - 10, 18, { align: 'right' });
  
        // ===== GREEN FOOTER BAR =====
        doc.setFillColor(16, 104, 97); // #106861
        doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, 'F');
  
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text('Contact: +(62)21 2002–2012  |  Email: Annexia@.Com', 10, pageHeight - 7);
        
        const pageCount = doc.internal.getNumberOfPages();
        const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
        doc.text(`Page ${currentPage} of ${pageCount}`, pageWidth - 10, pageHeight - 7, { align: 'right' });
      }
    });
  
    doc.save('Security_Overview.pdf');
  };
  
  //END PDF Genarate




  const filteredSecurity = security.filter((item) => {
    const noticeId = (item.noticeId || item.notice_no || '').toLowerCase();
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
      <RenterDashboard />

      <div className="securityoverview-content">
        <h1>Security Notices</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by Notice ID, Title, Status..."
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
                filteredSecurity.map((item, i) => (
                  <tr key={i}>
                    {/* <td>{item.noticeId || item.notice_no || 'N/A'}</td> */}
                    <td>{item.noticeid}</td>

                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.status}</td>
                    <td>{item.description}</td>
                  </tr>
                ))
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
