import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OwnerDashboard from "../Owner/OwnerDashboard/OwnerDashboard";

const RenterAdd = () => {
  const [renterName, setRenterName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [mail, setMail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "renterName":
        if (!/^[a-zA-Z ]+$/.test(value))
          errorMsg = `Invalid Name: "${value}". Only letters are allowed.`;
        break;

      case "nicNumber":
        if (!/^\d{12}$/.test(value))
          errorMsg = `Invalid NIC Number: "${value}". It must be exactly 12 digits.`;
        break;

      case "age":
        if (!/^\d+$/.test(value))
          errorMsg = `Invalid Age: "${value}". Only numbers are allowed.`;
        break;

      case "mail":
        if (!/^\S+@\S+\.\S+$/.test(value))
          errorMsg = `Invalid Email: "${value}". Enter a valid email address.`;
        break;

      case "description":
        if (!/^[a-zA-Z0-9,. ]+$/.test(value))
          errorMsg = `Invalid Description: "${value}". Only letters, numbers, commas, and periods allowed.`;
        break;

      case "address":
        if (!/^[a-zA-Z0-9,. ]+$/.test(value))
          errorMsg = `Invalid Address: "${value}". Only letters, numbers, commas, and periods allowed.`;
        break;

      case "contactNumber":
        if (!/^\d{10}$/.test(value))
          errorMsg = `Invalid Contact Number: "${value}". It must be exactly 10 digits.`;
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const field in errors) {
      if (errors[field]) {
        alert("Please fix validation errors before submitting.");
        return;
      }
    }

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
      const response = await axios.post("http://localhost:5000/renter", renterData);
      if (response.status === 200) {
        alert("Renter added successfully");
        navigate("/RenterManager");
      } else {
        alert("Failed to add renter. Please try again.");
      }
    } catch (error) {
      console.error("Error adding renter:", error.response ? error.response.data : error.message);
      alert("Failed to add renter. Please try again.");
    }
  };

  return (
    <div style={styles.formContainer}>
      <div className="owner-container">
        <OwnerDashboard />
        <div className="owner-content">
          <form onSubmit={handleSubmit}>
            <h2 style={styles.heading}>Add Renter</h2>

            <label style={styles.label}>Renter Name:</label>
            <input
              type="text"
              value={renterName}
              onChange={(e) => {
                setRenterName(e.target.value);
                validateField("renterName", e.target.value);
              }}
              style={styles.input}
            />
            {errors.renterName && <span style={styles.error}>{errors.renterName}</span>}

            <label style={styles.label}>NIC Number:</label>
            <input
              type="text"
              value={nicNumber}
              onChange={(e) => {
                setNicNumber(e.target.value);
                validateField("nicNumber", e.target.value);
              }}
              style={styles.input}
            />
            {errors.nicNumber && <span style={styles.error}>{errors.nicNumber}</span>}

            <label style={styles.label}>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                validateField("age", e.target.value);
              }}
              style={styles.input}
            />
            {errors.age && <span style={styles.error}>{errors.age}</span>}

            <label style={styles.label}>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Mail:</label>
            <input
              type="email"
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
                validateField("mail", e.target.value);
              }}
              style={styles.input}
            />
            {errors.mail && <span style={styles.error}>{errors.mail}</span>}

            <label style={styles.label}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                validateField("description", e.target.value);
              }}
              style={styles.textarea}
            />
            {errors.description && <span style={styles.error}>{errors.description}</span>}

            <label style={styles.label}>Address:</label>
            <textarea
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                validateField("address", e.target.value);
              }}
              style={styles.textarea}
            />
            
            {errors.address && <span style={styles.error}>{errors.address}</span>}

            <label style={styles.label}>Contact Number:</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
                validateField("contactNumber", e.target.value);
              }}
              style={styles.input}
            />
            {errors.contactNumber && <span style={styles.error}>{errors.contactNumber}</span>}

            <button type="submit" style={styles.button}>
              Add Renter
            </button>
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
  error: {
    color: "red",
    fontSize: "14px",
    display: "block",
    marginTop: "-10px",
    marginBottom: "10px",
  },
  
};

export default RenterAdd;
