import React from "react";
import {
  FaBroom,
  FaHome,
  FaPlus,
  FaFileAlt,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import "./OwnerDashboard.css";
import { Link } from "react-router-dom";




function SecurityOverview() {
  return (
    <div className="container">
      <aside className="sidebar3">
        <h2 className="logo">ANNEXIA</h2>
        <nav>
          <ul>
            <Link to="/RenterManager"style={{ textDecoration: "none", color: "inherit" }}>
              <li><FaHome /> Overview</li>
            </Link>

            <Link
              to="/RenterAdd"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaPlus /> Add Renter
              </li>
            </Link>

            <Link
              to="/securitynotices"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaFileAlt /> Security Notices
              </li>
            </Link>

            <Link
              to="/RenterUpdate"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaFileAlt /> Update Renter
              </li>
            </Link>

            

            <Link
              to="/RoomAvilable"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaEnvelope /> Room Avilablility
              </li>
            </Link>
          </ul>
        </nav>

        <button className="logout3">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      
    </div>
  );
}

export default SecurityOverview;
