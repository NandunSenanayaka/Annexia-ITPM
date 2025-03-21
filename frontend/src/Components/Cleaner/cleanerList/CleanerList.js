import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CleanerList.css";

const CleanerList = () => {
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCleaners = async () => {
      try {
        const response = await axios.get("http://localhost:3002/cleaner");
        setCleaners(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cleaners");
        setLoading(false);
        console.error("Error fetching cleaners:", err);
      }
    };
    fetchCleaners();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCleaners = cleaners.filter(
    (cleaner) =>
      cleaner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cleaner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this cleaner?")) {
      try {
        await axios.delete(`http://localhost:3002/cleaner/${id}`);
        setCleaners(cleaners.filter((cleaner) => cleaner._id !== id));
        alert("Cleaner deleted successfully");
      } catch (err) {
        alert("Failed to delete cleaner");
        console.error("Error deleting cleaner:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // New rating display component
  const RatingDisplay = ({ rating }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) - fullStars >= 0.5;

    return (
      <div className="rating-display">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full-star">
            ★
          </span>
        ))}

        {/* Half star */}
        {hasHalfStar && <span className="star half-star">★</span>}

        {/* Empty stars */}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
          (_, i) => (
            <span key={`empty-${i}`} className="star empty-star">
              ☆
            </span>
          )
        )}

        <span className="rating-number">({(rating || 0).toFixed(1)})</span>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading cleaners...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cleaners-container">
      <div className="cleaners-header">
        <h1>Cleaners List</h1>
        <div className="actions-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <Link to="/cleaners/add" className="add-button">
            Add New Cleaner
          </Link>
        </div>
      </div>

      {filteredCleaners.length === 0 ? (
        <div className="no-results">
          {searchTerm
            ? "No cleaners match your search"
            : "No cleaners available"}
        </div>
      ) : (
        <div className="cleaners-table-container">
          <table className="cleaners-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCleaners.map((cleaner) => (
                <tr key={cleaner._id}>
                  <td className="profile-cell">
                    <img
                      src={cleaner.profileImage || "/default-profile.png"}
                      alt={`${cleaner.name}'s profile`}
                      className="profile-thumbnail"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-profile.png";
                      }}
                    />
                  </td>
                  <td>{cleaner.name}</td>
                  <td>{cleaner.email}</td>
                  <td>{cleaner.phone}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        cleaner.isAvailable ? "available" : "unavailable"
                      }`}
                    >
                      {cleaner.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td>
                    <RatingDisplay rating={cleaner.rating} />
                  </td>
                  <td>{formatDate(cleaner.createdAt)}</td>
                  <td className="actions-cell">
                    <Link
                      to={`/cleaners/${cleaner._id}`}
                      className="view-button"
                    >
                      View
                    </Link>
                    <Link
                      to={`/cleaners/edit/${cleaner._id}`}
                      className="edit-button"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(cleaner._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CleanerList;
