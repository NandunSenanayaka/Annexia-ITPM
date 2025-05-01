import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingManager.css";
import {
  FaCalendarAlt,
  FaUserClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigningId, setAssigningId] = useState(null);
  const [selectedCleaner, setSelectedCleaner] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsResponse, cleanersResponse] = await Promise.all([
          axios.get("http://localhost:3001/booking"),
          axios.get("http://localhost:3001/cleaner"),
        ]);

        setBookings(bookingsResponse.data.data || []);
        setCleaners(cleanersResponse.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignCleaner = async (bookingId) => {
    if (!selectedCleaner) {
      setErrorMessage("Please select a cleaner first.");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/booking/${bookingId}/assign`, {
        cleanerId: selectedCleaner,
      });

      // Update local state
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                cleaner: cleaners.find((c) => c._id === selectedCleaner),
                status: "Assigned",
              }
            : booking
        )
      );

      // Mark cleaner as unavailable in local state
      setCleaners(
        cleaners.map((cleaner) =>
          cleaner._id === selectedCleaner
            ? { ...cleaner, isAvailable: false }
            : cleaner
        )
      );

      setSuccessMessage("Cleaner successfully assigned!");
      setAssigningId(null);
      setSelectedCleaner("");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error assigning cleaner:", err);
      setErrorMessage(
        err.response?.data?.error ||
          "Failed to assign cleaner. Please try again."
      );

      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Assigned":
        return "status-assigned";
      case "Completed":
        return "status-completed";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  if (loading)
    return (
      <div className="loading-state">Loading bookings and cleaners...</div>
    );
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="booking-manager-container">
      <h1 className="page-title">Booking Management</h1>

      {successMessage && (
        <div className="success-alert">
          <FaCheckCircle /> {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="error-alert">
          <FaExclamationTriangle /> {errorMessage}
        </div>
      )}

      <div className="filter-container">
        <label htmlFor="filter-status">Filter by status:</label>
        <select
          id="filter-status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Bookings</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="no-bookings">
          No bookings found with the selected filter.
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <div className="booking-header">
                <h2>
                  Booking #{booking._id.substring(booking._id.length - 6)}
                </h2>
                <span
                  className={`booking-status ${getStatusClass(booking.status)}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="booking-details">
                <div className="detail-item">
                  <div className="detail-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Service Date</span>
                    <span className="detail-value">
                      {formatDate(booking.date)}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <FaUserClock />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Service Type</span>
                    <span className="detail-value service-type">
                      {booking.service}
                    </span>
                  </div>
                </div>
              </div>

              {booking.specialInstructions && (
                <div className="special-instructions">
                  <h3>Special Instructions</h3>
                  <p>{booking.specialInstructions}</p>
                </div>
              )}

              <div className="cleaner-assignment">
                {booking.cleaner ? (
                  <div className="assigned-cleaner">
                    <h3>Assigned Cleaner</h3>
                    <div className="cleaner-info">
                      <img
                        src={
                          booking.cleaner.profileImage || "/default-profile.png"
                        }
                        alt={`${booking.cleaner.name}'s avatar`}
                        className="cleaner-avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/50";
                        }}
                      />
                      <div className="cleaner-details">
                        <p className="cleaner-name">{booking.cleaner.name}</p>
                        <p className="cleaner-contact">
                          {booking.cleaner.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="cleaner-assignment-form">
                    {assigningId === booking._id ? (
                      <>
                        <select
                          value={selectedCleaner}
                          onChange={(e) => setSelectedCleaner(e.target.value)}
                          className="cleaner-select"
                        >
                          <option value="">Select a cleaner</option>
                          {cleaners
                            .filter((cleaner) => cleaner.isAvailable)
                            .map((cleaner) => (
                              <option key={cleaner._id} value={cleaner._id}>
                                {cleaner.name} - Rating:{" "}
                                {cleaner.rating.toFixed(1)}
                              </option>
                            ))}
                        </select>
                        <div className="assignment-actions">
                          <button
                            onClick={() => handleAssignCleaner(booking._id)}
                            className="assign-button"
                          >
                            Confirm Assignment
                          </button>
                          <button
                            onClick={() => {
                              setAssigningId(null);
                              setSelectedCleaner("");
                            }}
                            className="cancel-button"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => setAssigningId(booking._id)}
                        className="assign-cleaner-button"
                        disabled={booking.status !== "Pending"}
                      >
                        Assign Cleaner
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingManager;
