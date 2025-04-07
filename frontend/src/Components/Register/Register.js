
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import the updated CSS file
import buildingImage from "../../Assets/register.png";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nic: "",
    dateTime: "",
    password: "",
    description: "",
    role: "", // Add role field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const response = await axios.post("http://localhost:5000/register", formData);
      
      if (response.data.status === "ok") {
        // Send welcome email
        await axios.post("http://localhost:5000/send-welcome-email", {
          name: formData.name,
          email: formData.email,
          username: formData.email, // Using email as username
          password: "user123" // Default password
        });
        
        alert("Registration successful! Please check your email for login credentials.");
        navigate("/login"); // Navigate to login page
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    // <div className="register-container">
    //   <div className="register-box">
    //     <h2>Register an ANNEXIA</h2>
    //     <form onSubmit={handleSubmit}>

    //       {/* Row 1: Name & Email */}
    //       <div className="form-row">
    //         <div className="input-group">
    //           <label>Name</label>
    //           <input
    //             type="text"
    //             name="name"
    //             value={formData.name}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </div>

    //         <div className="input-group">
    //           <label>Email</label>
    //           <input
    //             type="email"
    //             name="email"
    //             value={formData.email}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </div>
    //       </div>

    //       {/* Row 2: NIC & DateTime */}
    //       <div className="form-row">
    //         <div className="input-group">
    //           <label>NIC</label>
    //           <input
    //             type="text"
    //             name="nic"
    //             value={formData.nic}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </div>

    //         <div className="input-group">
    //           <label>Date & Time</label>
    //           <input
    //             type="datetime-local"
    //             name="dateTime"
    //             value={formData.dateTime}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </div>
    //       </div>

    //       {/* Row 3: Password & Description */}
    //       <div className="form-row">
    //         <div className="input-group">
    //           <label>Password</label>
    //           <input
    //             type="password"
    //             name="password"
    //             value={formData.password}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </div>

    //         <div className="input-group">
    //           <label>Description</label>
    //           <textarea
    //             name="description"
    //             value={formData.description}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </div>
    //       </div>

    //       {/* Row 4: Role Selection */}
    //       <div className="form-row">
    //         <div className="input-group">
    //           <label>Select Role</label>
    //           <select
    //             name="role"
    //             value={formData.role}
    //             onChange={handleInputChange}
    //             required
    //           >
    //             <option value="">Select a role</option>
    //             <option value="renter">Renter</option>
    //             <option value="owner">Owner</option>
    //             <option value="security">Security</option>
    //             <option value="cleaner manager">Cleaner Manager</option>
    //           </select>
    //         </div>
    //       </div>

    //       {/* Submit Button */}
    //       <button type="submit" className="register-button">
    //         Sign Up
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="register-container">
    <div className="register-box">
      <div className="register-left">
        <div className="register-brand-logo">ANNEXIA</div>
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtext">
          Join the community. Register now to access all features.
        </p>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="register-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="register-input"
              required
            />
          </div>

          <div className="register-row">
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              value={formData.nic}
              onChange={handleInputChange}
              className="register-input"
              required
            />
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
              className="register-input"
              required
            />
          </div>

          <div className="register-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="register-input"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="register-input"
              required
            />
          </div>

          <div className="register-row">
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="register-input"
              required
            >
              <option value="">Select a role</option>
              <option value="renter">Renter</option>
              <option value="owner">Owner</option>
              <option value="security">Security</option>
              <option value="cleaner manager">Cleaner Manager</option>
            </select>
          </div>

          <button type="submit" className="register-button">
            Sign Up
          </button>

          <p className="register-login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>

      <div className="register-right">
        <img src={buildingImage} alt="Register Visual" className="register-image" />
      </div>
    </div>
  </div>
  );
}

export default Register;

