import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import {
  FaUsersCog,
  FaCalendarCheck,
  FaStar,
  FaChartLine,
  FaBroom,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import "./CleanerDashboard.css";

const port = process.env.BEPORT || 3001;

const CleanerDashboard = () => {
  const [cleaners, setCleaners] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cleanersResponse, bookingsResponse] = await Promise.all([
          axios.get(`http://localhost:${port}/cleaner`),
          axios.get(`http://localhost:${port}/booking`),
        ]);
        setCleaners(cleanersResponse.data || []);
        setBookings(bookingsResponse.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalCleaners = cleaners.length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const assignedBookings = bookings.filter(
    (b) => b.status === "Assigned"
  ).length;
  const completedBookings = bookings.filter(
    (b) => b.status === "Completed"
  ).length;
  const availableCleaners = cleaners.filter((c) => c.isAvailable).length;

  const topRatedCleaner =
    cleaners.length > 0
      ? [...cleaners].sort((a, b) => b.rating - a.rating)[0]
      : null;

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getServiceDistribution = () => {
    const distribution = {};
    bookings.forEach((booking) => {
      distribution[booking.service] = (distribution[booking.service] || 0) + 1;
    });
    return Object.keys(distribution).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: distribution[key],
    }));
  };

  const getStatusDistribution = () => [
    { name: "Pending", value: pendingBookings },
    { name: "Assigned", value: assignedBookings },
    { name: "Completed", value: completedBookings },
    {
      name: "Cancelled",
      value: bookings.filter((b) => b.status === "Cancelled").length,
    },
  ];

  const getMonthlyBookings = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const baseValue = Math.max(5, bookings.length / 3);
    return months.map((month) => ({
      name: month,
      bookings: Math.floor(baseValue + Math.random() * baseValue * 0.5),
    }));
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (loading || error) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="main-content">
          {loading ? (
            <div className="loading-state">Loading dashboard data...</div>
          ) : (
            <div className="error-state">{error}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <h1 className="dashboard-title">Cleaner Management Dashboard</h1>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Link to="/cleanerlist" className="stat-card-link">
            <div className="stat-card clickable">
              <div className="stat-icon cleaner-icon">
                <FaUsersCog />
              </div>
              <div className="stat-details">
                <h3>Total Cleaners</h3>
                <p className="stat-value">{totalCleaners}</p>
                <p className="stat-info">{availableCleaners} available</p>
              </div>
            </div>
          </Link>

          <div className="stat-card">
            <div className="stat-icon booking-icon">
              <FaCalendarCheck />
            </div>
            <div className="stat-details">
              <h3>Total Bookings</h3>
              <p className="stat-value">{totalBookings}</p>
              <p className="stat-info">{pendingBookings} pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completed-icon">
              <FaChartLine />
            </div>
            <div className="stat-details">
              <h3>Completed Services</h3>
              <p className="stat-value">{completedBookings}</p>
              <p className="stat-info">
                {Math.round((completedBookings / totalBookings) * 100) || 0}%
                completion rate
              </p>
            </div>
          </div>

          {topRatedCleaner && (
            <div className="stat-card">
              <div className="stat-icon star-icon">
                <FaStar />
              </div>
              <div className="stat-details">
                <h3>Top Rated Cleaner</h3>
                <p className="stat-value">{topRatedCleaner.name}</p>
                <p className="stat-info">
                  {topRatedCleaner.rating.toFixed(1)} ★
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-container">
            <h2 className="chart-title">Booking Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={getStatusDistribution()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3498db" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h2 className="chart-title">Service Type Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getServiceDistribution()}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {getServiceDistribution().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h2 className="chart-title">Monthly Booking Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={getMonthlyBookings()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="recent-section">
          <h2 className="section-title">Recent Bookings</h2>
          <div className="recent-bookings-list">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div className="recent-booking-item" key={booking._id}>
                  <div className="booking-item-icon">
                    <FaBroom />
                  </div>
                  <div className="booking-item-details">
                    <h3>Booking #{booking._id.slice(-6)}</h3>
                    <p>
                      <strong>Service:</strong>{" "}
                      {booking.service.charAt(0).toUpperCase() +
                        booking.service.slice(1)}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(booking.date).toLocaleDateString()} at{" "}
                      {new Date(booking.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <span
                      className={`status-badge ${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No recent bookings found</p>
            )}
          </div>
          <Link to="/bookings" className="view-all-link">
            View All Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CleanerDashboard;
