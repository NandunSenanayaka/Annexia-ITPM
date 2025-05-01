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
import "./SecurityDashboard.css";
import { Link } from "react-router-dom";
import LoginPage from './../../Login/Login'


function SecurityOverview() {
  return (
    <div className="container2">
      <aside className="sidebar2">
        <h2 className="logo1">ANNEXIA</h2>
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
              to="/addsecurity"
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

        {/* <button className="logout2">
          <FaSignOutAlt />  Logout
        </button> */}

        <button type="button"  className="payment-logout">
        <a href="/login"> <FaSignOutAlt /> Logout</a>
        </button>
      </aside>
    </div>
  );
}

export default SecurityOverview;
