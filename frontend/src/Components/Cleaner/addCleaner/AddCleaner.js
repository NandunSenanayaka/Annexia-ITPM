import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import "./CleanerForms.css";

const AddCleaner = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (inputs.profileImage) {
      setIsLoading(true);
      setImageError("");

      const img = new Image();
      img.src = inputs.profileImage;

      img.onload = () => {
        setPreviewImage(inputs.profileImage);
        setIsLoading(false);
      };

      img.onerror = () => {
        setIsLoading(false);
        setImageError("Failed to load image. Please check the URL.");
        setPreviewImage("");
      };
    } else {
      setPreviewImage("");
    }
  }, [inputs.profileImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[A-Za-z ]*$/.test(value)) return;
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) {
      alert("Please wait for the image to load");
      return;
    }
    sendRequest().then(() => navigate("/cleanerlist"));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3001/cleaner", {
        name: String(inputs.name),
        email: String(inputs.email),
        phone: String(inputs.phone),
        profileImage: String(inputs.profileImage),
      });

      if (response.status === 200 || response.status === 201) {
        alert("Cleaner Added Successfully");
        return response.data;
      } else {
        alert("Failed to Add Cleaner");
        throw new Error("Failed to add cleaner");
      }
    } catch (error) {
      console.error("Error occurred while adding cleaner:", error);
      alert("Error Adding Cleaner: " + error.message);
      throw error;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className="main-content">
        <div className="form-container">
          <div className="form-content">
            <div className="form-header">
              <h1>Add New Cleaner</h1>
              <p>Enter the details to add a new cleaner to your team</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Personal Information</h2>

                <div className="form-group">
                  <label htmlFor="name">
                    <i className="fas fa-user"></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    onChange={handleChange}
                    value={inputs.name}
                    required
                    className="input-field"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="fas fa-envelope"></i> Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@email.com"
                      onChange={handleChange}
                      value={inputs.email}
                      required
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <i className="fas fa-phone"></i> Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="10-digit number"
                      onChange={handleChange}
                      value={inputs.phone}
                      required
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Profile Image</h2>
                <div className="form-group">
                  <label htmlFor="profileImage">
                    <i className="fas fa-image"></i> Image URL
                  </label>
                  <input
                    type="url"
                    id="profileImage"
                    name="profileImage"
                    placeholder="Paste image URL here"
                    onChange={handleChange}
                    value={inputs.profileImage}
                    required
                    className="input-field"
                  />
                </div>

                <div className="image-preview-container">
                  {isLoading && (
                    <div className="loading-container">
                      <div className="spinner"></div>
                      <p>Uploading image...</p>
                    </div>
                  )}

                  {imageError && (
                    <div className="error-message">{imageError}</div>
                  )}

                  {previewImage && !isLoading && (
                    <div className="image-preview">
                      <img src={previewImage} alt="Profile preview" />
                    </div>
                  )}

                  {!previewImage && !isLoading && (
                    <div className="no-image">
                      <i className="fas fa-user-circle"></i>
                      <p>Image preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Please wait..." : "Add Cleaner"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCleaner;
