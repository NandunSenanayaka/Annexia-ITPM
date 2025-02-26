import React from 'react';
import './SecurityDetails.css';

function SecurityDetails(props) {
  console.log("Props received:", props);  // Debugging line to check props

  const { noticeid, title, date, time, status, description } = props || {};

  return (
    <div className="security-details-container">
      <div className="security-details-content">
        <table className="details-table">
          <thead>
            <tr>
              <th>Notice ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{noticeid || 'N/A'}</td>
              <td>{title || 'N/A'}</td>
              <td>{date || 'N/A'}</td>
              <td>{time || 'N/A'}</td>
              <td>{status || 'N/A'}</td>
              <td>{description || 'N/A'}</td>
              <td>
                <button className="edit">Edit</button>
                <button className="remove">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecurityDetails;
