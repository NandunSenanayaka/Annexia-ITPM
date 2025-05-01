import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaFileAlt,
  FaBroom,
  FaEnvelope,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [showCleanerSubmenu, setShowCleanerSubmenu] = useState(false);

  const isCleanerSection =
    location.pathname.includes("/cleanerlist") ||
    location.pathname === "/bookings" ||
    location.pathname === "/cleaner-dashboard";

  useEffect(() => {
    if (isCleanerSection) {
      setShowCleanerSubmenu(true);
    }
  }, [isCleanerSection]);

  const toggleCleanerSubmenu = () => {
    setShowCleanerSubmenu(!showCleanerSubmenu);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo">ANNEXIA</h2>
      </div>

      <nav>
        <ul className="sidebar-menu">
          <li
            className={
              location.pathname === "/securityoverview" ? "active" : ""
            }
          >
            <Link to="/securityoverview">
              <FaHome />
              <span className="menu-text">Overview</span>
            </Link>
          </li>

          <li className={location.pathname === "/addsecurity" ? "active" : ""}>
            <Link to="/addsecurity">
              <FaPlus />
              <span className="menu-text">Add Notice</span>
            </Link>
          </li>

          <li
            className={location.pathname === "/securitynotices" ? "active" : ""}
          >
            <Link to="/securitynotices">
              <FaFileAlt />
              <span className="menu-text">Security Notices</span>
            </Link>
          </li>

          <li className={`submenu-parent ${isCleanerSection ? "active" : ""}`}>
            <div className="menu-item" onClick={toggleCleanerSubmenu}>
              <div className="menu-icon-text">
                <FaBroom />
                <span className="menu-text">Cleaner Overview</span>
              </div>
              {showCleanerSubmenu ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            <ul className={`submenu ${showCleanerSubmenu ? "show" : ""}`}>
              <li
                className={
                  location.pathname === "/cleaner-dashboard" ? "active" : ""
                }
              >
                <Link to="/cleaner-dashboard">
                  <FaTachometerAlt />
                  <span className="menu-text">Dashboard</span>
                </Link>
              </li>
              <li
                className={location.pathname === "/cleanerlist" ? "active" : ""}
              >
                <Link to="/cleanerlist">
                  <FaUsers />
                  <span className="menu-text">Cleaners</span>
                </Link>
              </li>
              <li className={location.pathname === "/bookings" ? "active" : ""}>
                <Link to="/bookings">
                  <FaCalendarAlt />
                  <span className="menu-text">Bookings</span>
                </Link>
              </li>
            </ul>
          </li>

          <li
            className={location.pathname === "/SecurityContact" ? "active" : ""}
          >
            <Link to="/SecurityContact">
              <FaEnvelope />
              <span className="menu-text">Contact</span>
            </Link>
          </li>
        </ul>
      </nav>

      <button className="logout">
        <FaSignOutAlt />
        <span className="menu-text">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
