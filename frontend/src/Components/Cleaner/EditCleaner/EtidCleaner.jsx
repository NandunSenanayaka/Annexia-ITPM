import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditCleaner.css";
import {
  FaBroom,
  FaHome,
  FaPlus,
  FaFileAlt,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

const EditCleaner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isAvailable: false,
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchCleaner = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/cleaner/${id}`);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          isAvailable: response.data.isAvailable || false,
          profileImage: response.data.profileImage || "",
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cleaner details");
        setLoading(false);
        console.error("Error fetching cleaner:", err);
      }
    };
    fetchCleaner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    // In a real app, you would handle file upload here
    // For now, we'll just use a placeholder or URL input
    const file = e.target.files[0];
    if (file) {
      // This is a simplified example - in production you'd upload to server
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await axios.put(`http://localhost:3002/cleaner/${id}`, formData);
      alert("Cleaner updated successfully");
      navigate("/cleanerlist");
    } catch (err) {
      setError("Failed to update cleaner");
      console.error("Error updating cleaner:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading cleaner details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
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
              to="/cleaners"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="active">
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

      {/* Main content */}
      <div className="main-content">
        <div className="edit-cleaner-container">
          <div className="form-header">
            <h1>Edit Cleaner</h1>
            <Link to="/cleanerlist" className="back-button">
              <FaArrowLeft /> Back to List
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="edit-cleaner-form">
            <div className="form-group">
              <label htmlFor="profileImage">Profile Image</label>
              <div className="profile-image-container">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile preview"
                    className="profile-preview"
                  />
                ) : (
                  <div className="profile-placeholder">
                    <FaUserCircle />
                  </div>
                )}
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group checkbox-group">
                <label htmlFor="isAvailable" className="checkbox-label">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  Available for Work
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="save-button"
                disabled={submitLoading}
              >
                {submitLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
              <Link to="/cleanerlist" className="cancel-button">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCleaner;
