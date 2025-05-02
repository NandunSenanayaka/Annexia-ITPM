import React, { useEffect, useState } from 'react';
import './SecurityOverview.css';
import SecurityDashboard from '../SecurityDashboard/SecurityDashboard';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import SecurityDetails from '../SecurityDetails/SecurityDetails';

function SecurityOverview() {
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

  // Format the current date and time
  const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
  };

  // Generate PDF
  // const generatePDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text('Security Overview', 10, 10);

  //   doc.setFontSize(10);
  //   doc.text('Generated on: ' + getFormattedDateTime(), 10, 20);

  //   const columns = [
  //     { header: 'ID', dataKey: 'id' },
  //     { header: 'Notice ID', dataKey: 'noticeId' },
  //     { header: 'Title', dataKey: 'title' },
  //     { header: 'Date', dataKey: 'date' },
  //     { header: 'Time', dataKey: 'time' },
  //     { header: 'Status', dataKey: 'status' },
  //     { header: 'Description', dataKey: 'description' },
  //   ];

  //   const rows = security.map(item => ({
  //     id: item.id,
  //     noticeId: item.noticeId,
  //     title: item.title,
  //     date: item.date,
  //     time: item.time,
  //     status: item.status,
  //     description: item.description,
  //   }));

  //   autoTable(doc, {
  //     head: [columns.map(col => col.header)],
  //     body: rows.map(row => columns.map(col => row[col.dataKey])),
  //     startY: 30,
  //   });

  //   doc.save('Security_Overview.pdf');
  // };

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




  // **Search Filtering Logic**
  const filteredSecurity = security.filter((item) => {
    const noticeId = item.noticeId ? String(item.noticeId).toLowerCase() : ''; // Ensure Notice ID is a string
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
    <div className="securityoverview-container">
      <SecurityDashboard />

      <div className="securityoverview-content">
        <h1>Security Overview</h1>

        {/* Search Bar */}
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
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {filteredSecurity.length > 0 ? (
                filteredSecurity.map((securityItem, i) => (
                  <SecurityDetails key={i} {...securityItem} />
                ))
              ) : (
                <tr>
                  <td colSpan="7">No security data available.</td>
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

export default SecurityOverview;
