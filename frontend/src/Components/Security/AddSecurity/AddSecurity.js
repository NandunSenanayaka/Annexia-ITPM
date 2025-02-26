import React from 'react';
import SecurityOverview from "../SecurityDashboard/SecurityDashboard";  // Assuming you have a SecurityOverview component
import './AddSecurity.css';  // Assuming you have a CSS file for styling

const AddSecurity = () => {
  return (
    <div className="add-security-container">
      <SecurityOverview />

      <div className="add-security-content">
        <h1>Add Security</h1>
      </div>
    </div>
  );
};

export default AddSecurity;
