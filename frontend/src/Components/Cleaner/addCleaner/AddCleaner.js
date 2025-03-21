import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CleanerForms.css";

const AddCleaner = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
   
    name: "",
    email: "",
    phone: "",
   profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input validation
   

    if (name === "phone" && !/^[0-9+\- ]*$/.test(value)) {
      return; // Allow only numbers and some special characters for phone
    }

    

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate("/cleanerlist"));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3002/cleaner", {
        
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
    <div className="form-container">
      <div className="form-content">
        <h1>Add New Cleaner</h1>

        <form onSubmit={handleSubmit}>
          

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={inputs.email}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={inputs.phone}
              required
            />
          </div>

            <div className="form-group">
            <label>Profile Image</label>
            <input
              type="text"
              name="profileImage"
              onChange={handleChange}
              value={inputs.profileImage}
              required
            />
          </div>
          <br />

          <button type="submit" className="submit-btn">
            Add Cleaner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCleaner;
