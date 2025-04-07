
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import buildingImage from '../../Assets/loginimg.png';

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
            else if (role === "owner") navigate('/RenterManager');
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
      
            <div className="login-container">
                <div className="login-box">
                    <div className="login-left">
                        <div className="brand-logo">ANNEXIA</div>
                        <h2 className="login-title">Sign in</h2>
                        <p className="login-subtext">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna arcu tempor et tellus, lobortis interdum.
                        </p>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-row">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Username"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="login-input"
                                    required
                                />
                            </div>
        
                            <div className="form-row">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="login-input"
                                    required
                                />
                            </div>
        
                            <div className="login-options">
                                <a href="#" className="forgot-password">Forgot Password</a>
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                            </div>
        
                            <button type="submit" className="login-button a">
                                Login to Continue
                            </button>
        
                            <p className="signup-link">
                                Don’t have an account? <a href="/register">Sign up</a>
                            </p>
                        </form>
                    </div>
        
                    <div className="login-right">
                    <img
                        src={buildingImage}
                        alt="Building"
                        className="login-image"
                    />
                    </div>
                </div>
            </div>
       
    );
}

export default Login;
