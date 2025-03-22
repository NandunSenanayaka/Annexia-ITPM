import React, { forwardRef } from 'react';
import './SecurityDetails.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SecurityDetails = forwardRef(({ _id, noticeid, title, date, time, status, description }, ref) => {
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/security/${_id}`);
      alert("Security notice deleted successfully!");
      window.location.reload();
      navigate("/securityoverview");
    } catch (error) {
      console.error("Error deleting security notice:", error);
      alert("Error deleting security notice. Please try again.");
    }
  };

  return (
    <tr ref={ref}>
      <td>{noticeid || 'N/A'}</td>
      <td>{title || 'N/A'}</td>
      <td>{date || 'N/A'}</td>
      <td>{time || 'N/A'}</td>
      <td>{status || 'N/A'}</td>
      <td>{description || 'N/A'}</td>
      <td>
        <Link to={`/securityoverview/${_id}`} className="update-link">Update</Link>
        <button className="delete-button1" onClick={deleteHandler}>Remove</button>
      </td>
    </tr>
  );
});

export default SecurityDetails;
