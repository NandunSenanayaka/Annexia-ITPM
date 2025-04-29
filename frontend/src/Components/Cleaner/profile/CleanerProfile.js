import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CleanerProfile.css";

const CleanerProfile = () => {
  const { id } = useParams();
  const [cleaner, setCleaner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCleanerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/cleaner/${id}`);
        setCleaner(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cleaner details");
        setLoading(false);
        console.error("Error fetching cleaner details:", err);
      }
    };

    fetchCleanerDetails();
  }, [id]);

  const renderRating = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="rating-display">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full-star">
            ★
          </span>
        ))}

        {hasHalfStar && <span className="star half-star">★</span>}

        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
          (_, i) => (
            <span key={`empty-${i}`} className="star empty-star">
              ☆
            </span>
          )
        )}

        <span className="rating-number">({rating.toFixed(1)})</span>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading cleaner profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!cleaner) return <div className="error">Cleaner not found</div>;

  return (
    <div className="cleaner-profile-container">
      <div className="profile-header">
        <Link to="/cleanerlist" className="back-button">
          ← Back to Cleaners
        </Link>
        <h1>Cleaner Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-image-container">
          <img
            src={cleaner.profileImage || "/default-profile.png"}
            alt={`${cleaner.name}'s profile`}
            className="profile-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-profile.png";
            }}
          />
          <div
            className={`status-indicator ${
              cleaner.isAvailable ? "available" : "unavailable"
            }`}
          >
            {cleaner.isAvailable ? "Available" : "Unavailable"}
          </div>
        </div>

        <div className="profile-details">
          <h2>{cleaner.name}</h2>
          <div className="rating-section">
            {renderRating(cleaner.rating || 0)}
            <span className="review-count">
              {cleaner.reviewCount || 0} reviews
            </span>
          </div>

          <div className="info-section">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{cleaner.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{cleaner.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {new Date(cleaner.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {cleaner.bio && (
            <div className="bio-section">
              <h3>About</h3>
              <p>{cleaner.bio}</p>
            </div>
          )}

          {cleaner.specialties && cleaner.specialties.length > 0 && (
            <div className="specialties-section">
              <h3>Specialties</h3>
              <div className="specialties-tags">
                {cleaner.specialties.map((specialty, index) => (
                  <span key={index} className="specialty-tag">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <Link to={`/cleaners/edit/${cleaner._id}`} className="edit-button">
          Edit Profile
        </Link>
        <Link to={`/bookings/new/${cleaner._id}`} className="book-button">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default CleanerProfile;
