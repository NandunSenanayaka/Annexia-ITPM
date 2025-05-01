import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaFileAlt,
  FaBroom,
  FaEnvelope,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="sidebar">
      <h2 className="logo">ANNEXIA</h2>
      <nav>
        <ul>
          <Link
            to="/securityoverview"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={currentPath === "/securityoverview" ? "active" : ""}>
              <FaHome /> Overview
            </li>
          </Link>
          <Link
            to="/addsecurity"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={currentPath === "/addsecurity" ? "active" : ""}>
              <FaPlus /> Add Notice
            </li>
          </Link>
          <Link
            to="/securitynotices"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={currentPath === "/securitynotices" ? "active" : ""}>
              <FaFileAlt /> Security Notices
            </li>
          </Link>
          <Link
            to="/cleaners"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={currentPath === "/cleaners" ? "active" : ""}>
              <FaBroom /> Cleaner Overview
            </li>
          </Link>
          <Link
            to="/cleanerDashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={currentPath === "/cleanerDashboard" ? "active" : ""}>
              <FaChartBar /> Cleaner Dashboard
            </li>
          </Link>
          <Link
            to="/bookingManager"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={currentPath === "/bookingManager" ? "active" : ""}>
              <FaFileAlt /> Booking Manager
            </li>
          </Link>
          <Link
            to="/SecurityContact"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={currentPath === "/SecurityContact" ? "active" : ""}>
              <FaEnvelope /> Contact
            </li>
          </Link>
        </ul>
      </nav>
      <button className="logout">
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
