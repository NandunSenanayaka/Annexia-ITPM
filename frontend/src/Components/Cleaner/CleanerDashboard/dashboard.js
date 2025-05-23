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
import "./CleanerDashboard.css";
import { Link } from "react-router-dom";

function SecurityOverview() {
  return (
    <div className="container">
      <aside className="sidebar">
        <h2 className="logo">ANNEXIA</h2>
        <nav>
          <ul>
            <Link
              to="/securityoverview"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaHome /> Overview
              </li>
            </Link>

            <Link
              to="/addCleaner"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaPlus /> Add Notice
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
              to="/cleanerlist"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaBroom /> Cleaner Overview
              </li>
            </Link>

            <Link
              to="/SecurityContact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaEnvelope /> Contact
              </li>
            </Link>
          </ul>
        </nav>

        <button className="logout">
          <FaSignOutAlt /> Logout
        </button>
      </aside>
    </div>
  );
}

export default SecurityOverview;
