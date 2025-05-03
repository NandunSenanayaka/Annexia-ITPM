import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaClipboardList, FaInfoCircle } from "react-icons/fa";
import "./CreateBooking.css";

const CreateBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: "cleaning",
    date: "",
    specialInstructions: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/booking",
        formData
      );
      setSuccess(true);
      setLoading(false);

      // Reset form
      setFormData({
        service: "cleaning",
        date: "",
        specialInstructions: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create booking");
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="booking-container">
      <div className="booking-form-container">
        <h1 className="form-title">Request Cleaning Service</h1>

        {success && (
          <div className="success-message">
            <FaInfoCircle /> Your booking has been successfully created. You
            will be redirected shortly.
          </div>
        )}

        {error && (
          <div className="error-message">
            <FaInfoCircle /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="service">
              <FaClipboardList /> Service Type
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="cleaning">Cleaning</option>
              <option value="laundry">Laundry</option>
              <option value="room service">Room Service</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">
              <FaCalendarAlt /> Date & Time
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialInstructions">
              <FaInfoCircle /> Special Instructions (Optional)
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              placeholder="Any special requirements or instructions for the cleaner"
              rows="4"
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Request Service"}
          </button>
        </form>
      </div>

      <div className="booking-info">
        <h2>Service Information</h2>
        <div className="info-item">
          <h3>Cleaning Service</h3>
          <p>
            Our standard cleaning includes dusting, vacuuming, mopping, and
            sanitizing all areas.
          </p>
        </div>
        <div className="info-item">
          <h3>Laundry Service</h3>
          <p>
            Our laundry service includes washing, drying, and folding of clothes
            and linens.
          </p>
        </div>
        <div className="info-item">
          <h3>Room Service</h3>
          <p>
            Complete room service includes bed making, bathroom cleaning, and
            general tidying.
          </p>
        </div>
        <div className="info-note">
          <p>
            <strong>Note:</strong> All services are subject to availability.
            We'll confirm your booking within 2 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
