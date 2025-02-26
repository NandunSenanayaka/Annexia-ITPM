import React from "react";
import SecurityOverview from "../SecurityDashboard/SecurityDashboard";
import "./SecurityNotices.css";

function SecurityNotices() {
  return (

    <div className="security-notices-container">
      <SecurityOverview />
      <div className="security-notices-content">
        <h1>Security Notices</h1>
      </div>

    <div>
      <h1>
        Security notices
      </h1></div>

    </div>
  );
}

export default SecurityNotices;
