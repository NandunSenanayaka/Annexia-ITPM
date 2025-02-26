import React from "react";
import SecurityOverview from "../SecurityDashboard/SecurityDashboard";
import "./SecurityContact.css";

const SecurityContact = () => {
  return (
    <div className="security-contact-container">
      <SecurityOverview />
      <div className="security-contact-content">
        <h1>Security Contact</h1>
      </div>
    </div>
  );
};

export default SecurityContact;
