
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        // role: "renter", // Default role
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/login', formData); // Update the backend URL
        const { status, role, err } = response.data;
        
        if (status === "ok") {
            alert("LOGIN Success");
            if (role === "renter") navigate('/paymentdetails');
            else if (role === "owner") navigate('/owner-dashboard');
            else if (role === "security") navigate('/securityoverview');
            else if (role === "cleaner manager") navigate('/cleaner-dashboard');
            else alert("Unknown role, please contact admin");
        } else {
            alert(err || "Invalid login credentials");
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
};


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-row">
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="form-row">
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Role Selection */}
                {/* <div className="form-row">
                    <div className="input-group">
                        <label>Select Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                        >
                            <option value="renter">Renter</option>
                            <option value="owner">Owner</option>
                            <option value="security">Security</option>
                            <option value="cleaner manager">Cleaner Manager</option>
                        </select>
                    </div>
                </div> */}

                {/* Submit Button */}
                <button type="submit" className="register-button">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
