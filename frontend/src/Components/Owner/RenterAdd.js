import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OwnerDashboard from "../Owner/OwnerDashboard/OwnerDashboard";

const RenterAdd = () => {
  const [renterName, setRenterName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length === 0) {
      const renterData = {
        RenterName: renterName,
        NicNumber: nicNumber,
        Age: age,
        Description: description,
        Address: address,
        ContactNumber: contactNumber,
      };

      try {
        await axios.post("http://localhost:5000/renters/add", renterData);
        alert("Renter added successfully");
        navigate("/RenterDashboard");
      } catch (error) {
        console.error("Error adding renter:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFields = () => {
    const validationErrors = {};

    if (!renterName) {
      validationErrors.renterName = "Renter Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(renterName)) {
      validationErrors.renterName = `Invalid name: "${renterName}". Only letters and spaces allowed.`;
    }

    if (!nicNumber) {
      validationErrors.nicNumber = "NIC Number is required.";
    } else if (!/^\d{12}$/.test(nicNumber)) {
      validationErrors.nicNumber = `Invalid NIC: "${nicNumber}". Must be exactly 12 digits.`;
    }

    if (!age) {
      validationErrors.age = "Age is required.";
    } else if (isNaN(age) || age <= 0) {
      validationErrors.age = `Invalid age: "${age}". Must be a positive number.`;
    }

    if (!description) {
      validationErrors.description = "Description is required.";
    } else if (!/^[A-Za-z\s]+$/.test(description)) {
      validationErrors.description = `Invalid description: "${description}". Only letters and spaces allowed.`;
    }

    if (!address) {
      validationErrors.address = "Address is required.";
    } else if (!/^[A-Za-z0-9\s,.-]+$/.test(address)) {
      validationErrors.address = `Invalid address: "${address}". Use letters, numbers, spaces, commas, or periods only.`;
    }

    if (!contactNumber) {
      validationErrors.contactNumber = "Contact Number is required.";
    } else if (!/^\d{10}$/.test(contactNumber)) {
      validationErrors.contactNumber = `Invalid Contact Number: "${contactNumber}". Must be exactly 10 digits.`;
    }

    return validationErrors;
  };

  // Real-time validation for Name, Description, Address, NIC, and Contact Number
  const handleNameChange = (e) => {
    const value = e.target.value;
    setRenterName(value);
    if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        renterName: `Invalid name: "${value}". Only letters and spaces allowed.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, renterName: null }));
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        description: `Invalid description: "${value}". Only letters and spaces allowed.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: null }));
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (!/^[A-Za-z0-9\s,.-]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        address: `Invalid address: "${value}". Use letters, numbers, spaces, commas, or periods only.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, address: null }));
    }
  };

  const handleNicChange = (e) => {
    const value = e.target.value;
    setNicNumber(value);
    if (!/^\d{0,12}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        nicNumber: `Invalid NIC: "${value}". Must be exactly 12 digits.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, nicNumber: null }));
    }
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    setContactNumber(value);
    if (!/^\d{0,10}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        contactNumber: `Invalid Contact Number: "${value}". Must be exactly 10 digits.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, contactNumber: null }));
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
            <input type="text" value={renterName} onChange={handleNameChange} style={styles.input} />
            {errors.renterName && <p style={styles.error}>{errors.renterName}</p>}

            <label style={styles.label}>NIC Number:</label>
            <input type="text" value={nicNumber} onChange={handleNicChange} style={styles.input} />
            {errors.nicNumber && <p style={styles.error}>{errors.nicNumber}</p>}

            <label style={styles.label}>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} />
            {errors.age && <p style={styles.error}>{errors.age}</p>}

            <label style={styles.label}>Description:</label>
            <textarea value={description} onChange={handleDescriptionChange} style={styles.textarea} />
            {errors.description && <p style={styles.error}>{errors.description}</p>}

            <label style={styles.label}>Address:</label>
            <textarea value={address} onChange={handleAddressChange} style={styles.textarea} />
            {errors.address && <p style={styles.error}>{errors.address}</p>}

            <label style={styles.label}>Contact Number:</label>
            <input type="text" value={contactNumber} onChange={handleContactChange} style={styles.input} />
            {errors.contactNumber && <p style={styles.error}>{errors.contactNumber}</p>}

            <button type="submit" style={styles.button}>Add Renter</button>
          </form>
        </div>
      </div>
    </div>
  );
};


const styles = {
  heading: { textAlign: "none", marginBottom: "20px" },
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
  error: { color: "red", fontSize: "12px", marginBottom: "10px" },
};

export default RenterAdd;
