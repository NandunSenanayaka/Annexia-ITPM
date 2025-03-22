import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OwnerDashboard from "../Owner/OwnerDashboard/OwnerDashboard";

const RenterUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [renterName, setRenterName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [mail, setMail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    const fetchRenter = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/renter/${id}`);
        const renter = response.data.renter;
        setRenterName(renter.RenterName);
        setNicNumber(renter.NicNumber);
        setAge(renter.Age);
        setDate(renter.Date);
        setMail(renter.Mail);
        setDescription(renter.description);
        setAddress(renter.Address);
        setContactNumber(renter.ContactNumber);
      } catch (error) {
        console.error("Error fetching renter:", error);
      }
    };

    fetchRenter();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const renterData = {
      RenterName: renterName,
      NicNumber: nicNumber,
      Age: age,
      Date: date,
      Mail: mail,
      description: description,
      Address: address,
      ContactNumber: contactNumber,
    };

    try {
      const response = await axios.put(`http://localhost:5000/renter/${id}`, renterData);
      if (response.status === 200) {
        alert("Renter updated successfully");
        navigate("/RenterManager");
      } else {
        alert("Failed to update renter. Please try again.");
      }
    } catch (error) {
      console.error("Error updating renter:", error.response ? error.response.data : error.message);
      alert("Failed to update renter. Please try again.");
    }
  };

  return (
    <div style={styles.formContainer}>
      <div className="owner-container">
        <OwnerDashboard />
        <div className="owner-content">
          <form onSubmit={handleSubmit}>
            <h2 style={styles.heading}>Update Renter</h2>

            <label style={styles.label}>Renter Name:</label>
            <input type="text" value={renterName} onChange={(e) => setRenterName(e.target.value)} style={styles.input} />

            <label style={styles.label}>NIC Number:</label>
            <input type="text" value={nicNumber} onChange={(e) => setNicNumber(e.target.value)} style={styles.input} />

            <label style={styles.label}>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} />

            <label style={styles.label}>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />

            <label style={styles.label}>Mail:</label>
            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} style={styles.input} />

            <label style={styles.label}>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} />

            <label style={styles.label}>Address:</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} style={styles.textarea} />

            <label style={styles.label}>Contact Number:</label>
            <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} style={styles.input} />

            <button type="submit" style={styles.button}>Update Renter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  heading: { textAlign: "center", marginBottom: "20px" },
  label: { marginBottom: "8px", fontWeight: "bold" },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    width: "100%",
  },
  textarea: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default RenterUpdate;