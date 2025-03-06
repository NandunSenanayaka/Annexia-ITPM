import React from 'react';
import './SecurityDetails.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SecurityDetails(props) {
  console.log("Props received:", props); 

  const { _id, noticeid, title, date, time, status, description } = props || {};

//delete function
  const history = useNavigate();
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/security/${_id}`);
      history("/securityoverview");
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting security notice:", error);
    }
  }; 
//end delete function

  return (
    <div className="security-details-container">
      <div className="security-details-content">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{_id || 'N/A'}</td>
              <td>{noticeid || 'N/A'}</td>
              <td>{title || 'N/A'}</td>
              <td>{date || 'N/A'}</td>
              <td>{time || 'N/A'}</td>
              <td>{status || 'N/A'}</td>
              <td>{description || 'N/A'}</td>
              <td>
                <Link to={`/securityoverview/${_id}`}> Update</Link>
                <button onClick={deleteHandler}>Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecurityDetails;