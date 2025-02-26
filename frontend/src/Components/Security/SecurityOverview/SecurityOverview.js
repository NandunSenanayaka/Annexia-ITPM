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
import "./SecurityOverview.css";
import { Link } from "react-router-dom";

function SecurityOverview() {
  return (
    <div className="container">
      <aside className="sidebar">
        <h2 className="logo">ANNEXIA</h2>
        <nav>
          <ul>
            <Link to="/addsecurity"style={{ textDecoration: "none", color: "inherit" }}>
              <li><FaHome /> Overview</li>
            </Link>

            <Link
              to="/addnotice"
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
              to="/cleaneroverview"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>
                <FaBroom /> Cleaner Overview
              </li>
            </Link>

            <Link
              to="/contact"
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

      <main className="content">
        <header>
          <h1>Overview</h1>
          <div className="profile">
            <FaUserCircle className="profile-icon" />
            <span>Sahan</span>
          </div>
        </header>

        <section className="table-container">
          <table>
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
                <td>CN0001</td>
                <td>Powercut</td>
                <td>15 July 2024</td>
                <td>2.26 PM</td>
                <td>Urgent</td>
                <td>Powercut today 8.00-9.00 PM</td>
                <td>
                  <button className="edit">Edit</button>
                  <button className="remove">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <button className="print-report">Print Report</button>
      </main>
    </div>
  );
}

export default SecurityOverview;
