import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./BookingManager.css";

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
  // Add validation state
  const [validationErrors, setValidationErrors] = useState({
    date: "",
    specialInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear validation errors when field changes
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate fields as user types
    validateField(name, value);
  };

  // Validate individual fields
  const validateField = (name, value) => {
    switch (name) {
      case "date":
        if (!value) {
          setValidationErrors((prev) => ({
            ...prev,
            date: "Date and time are required",
          }));
          return false;
        }

        const selectedDate = new Date(value);
        const now = new Date();

        // Check if date is in the past
        if (selectedDate < now) {
          setValidationErrors((prev) => ({
            ...prev,
            date: "Booking date cannot be in the past",
          }));
          return false;
        }

        // Check weekday (0 = Sunday, 6 = Saturday)
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          setValidationErrors((prev) => ({
            ...prev,
            date: "Bookings are only available on weekdays (Monday to Friday)",
          }));
          return false;
        }

        // Check business hours (8 AM - 6 PM)
        const hours = selectedDate.getHours();
        if (hours < 8 || hours > 18) {
          setValidationErrors((prev) => ({
            ...prev,
            date: "Bookings are only available between 8 AM and 6 PM",
          }));
          return false;
        }
        break;

      case "specialInstructions":
        if (value.length > 500) {
          setValidationErrors((prev) => ({
            ...prev,
            specialInstructions:
              "Special instructions cannot exceed 500 characters",
          }));
          return false;
        }
        break;

      default:
        break;
    }

    return true;
  };

  // Validate entire form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { date: "", specialInstructions: "" };

    // Validate date
    if (!formData.date) {
      newErrors.date = "Date and time are required";
      isValid = false;
    } else {
      const isDateValid = validateField("date", formData.date);
      if (!isDateValid) {
        isValid = false;
      }
    }

    // Validate special instructions
    if (formData.specialInstructions.length > 500) {
      newErrors.specialInstructions =
        "Special instructions cannot exceed 500 characters";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

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
      // Handle API validation errors
      if (err.response?.data?.details) {
        // Format validation errors from backend
        const backendErrors = err.response.data.details;
        const formattedErrors = {};

        backendErrors.forEach((error) => {
          formattedErrors[error.param] = error.msg;
        });

        setValidationErrors({
          ...validationErrors,
          ...formattedErrors,
        });
      } else {
        setError(err.response?.data?.error || "Failed to create booking");
      }
      setLoading(false);
    }
  };

  // Get minimum date (today) for the datetime-local input
  const today = new Date().toISOString().split("T")[0];
  // Get current time formatted for the datetime-local input
  const now = new Date();
  const currentHour = String(now.getHours()).padStart(2, "0");
  const currentMinute = String(now.getMinutes()).padStart(2, "0");
  const minDateTime = `${today}T${currentHour}:${currentMinute}`;

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
            <FaExclamationTriangle /> {error}
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
              min={minDateTime}
              required
              className={validationErrors.date ? "input-error" : ""}
            />
            {validationErrors.date && (
              <div className="validation-error">
                <FaExclamationTriangle /> {validationErrors.date}
              </div>
            )}
            <small className="form-text">
              Bookings available Monday-Friday, 8 AM - 6 PM
            </small>
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
              className={
                validationErrors.specialInstructions ? "input-error" : ""
              }
            />
            {validationErrors.specialInstructions && (
              <div className="validation-error">
                <FaExclamationTriangle /> {validationErrors.specialInstructions}
              </div>
            )}
            <small className="form-text">
              {formData.specialInstructions.length}/500 characters
            </small>
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
