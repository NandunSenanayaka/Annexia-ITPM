
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddPayment.css';

function AddPayment() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        RenterName: "",
        CardName: "",
        CardNo: "",
        ExpiryDate: "",
        CVV: "",
        Amount: "",
        Remark: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate input dynamically
        if (name === "RenterName" || name === "CardName") {
            if (!/^[a-zA-Z\s]*$/.test(value)) return; // Only letters and spaces
        }
        if (name === "CardNo") {
            if (!/^\d*$/.test(value) || value.length > 16) return; // Only numbers, max 16 digits
        }
        if (name === "CVV") {
            if (!/^\d*$/.test(value) || value.length > 3) return; // Only numbers, max 3 digits
        }
        if (name === "Amount") {
            if (!/^\d*\.?\d*$/.test(value)) return; // Only numbers with optional decimal
        }

        setInputs((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateInputs = () => {
        let newErrors = {};

        if (!inputs.RenterName) newErrors.RenterName = "Renter name is required";
        if (!inputs.CardName) newErrors.CardName = "Card name is required";

        if (!inputs.CardNo || inputs.CardNo.length !== 16) {
            newErrors.CardNo = "Card number must be exactly 16 digits";
        }

        if (!inputs.ExpiryDate) {
            newErrors.ExpiryDate = "Expiry date is required";
        }

        if (!inputs.CVV || inputs.CVV.length !== 3) {
            newErrors.CVV = "CVV must be exactly 3 digits";
        }

        if (!inputs.Amount || inputs.Amount <= 0) {
            newErrors.Amount = "Amount must be greater than 0";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInputs()) {
            try {
                await axios.post('http://localhost:5000/payments', {
                    RenterName: inputs.RenterName,
                    CardName: inputs.CardName,
                    CardNo: inputs.CardNo,
                    ExpiryDate: inputs.ExpiryDate,
                    CVV: inputs.CVV,
                    Amount: inputs.Amount,
                    Remark: inputs.Remark,
                });
                alert("Payment Added Successfully");
                navigate('/PaymentDetails');
            } catch (error) {
                alert("Error adding payment: " + error.message);
            }
        } else {
            alert("Please fix the errors before submitting.");
        }
    };

    return (
        // <div >
        //     <h2 className="form-title"></h2>
        //     <form className="payment-form" onSubmit={handleSubmit}>
        //         <h2>Add Payment</h2>
                
        //         <div className="input-group">
        //             <label>Renter Name</label>
        //             <input type="text" name="RenterName" value={inputs.RenterName} onChange={handleChange} required />
        //             {errors.RenterName && <span className="error">{errors.RenterName}</span>}
        //         </div>

        //         <div className="input-group">
        //             <label>Card Name</label>
        //             <input type="text" name="CardName" value={inputs.CardName} onChange={handleChange} required />
        //             {errors.CardName && <span className="error">{errors.CardName}</span>}
        //         </div>

        //         <div className="input-group">
        //             <label>Card Number</label>
        //             <input type="text" name="CardNo" value={inputs.CardNo} onChange={handleChange} maxLength="16" required />
        //             {errors.CardNo && <span className="error">{errors.CardNo}</span>}
        //         </div>

        //         <div className="input-group">
        //             <label>Expiry Date</label>
        //             <input type="month" name="ExpiryDate" value={inputs.ExpiryDate} onChange={handleChange} required />
        //             {errors.ExpiryDate && <span className="error">{errors.ExpiryDate}</span>}
        //         </div>

        //         <div className="input-group">
        //             <label>CVV</label>
        //             <input type="text" name="CVV" value={inputs.CVV} onChange={handleChange} maxLength="3" required />
        //             {errors.CVV && <span className="error">{errors.CVV}</span>}
        //         </div>

        //         <div className="input-group">
        //             <label>Amount</label>
        //             <input type="text" name="Amount" value={inputs.Amount} onChange={handleChange} required />
        //             {errors.Amount && <span className="error">{errors.Amount}</span>}
        //         </div>
        <div className="payment-container">
        <div className="payment-header">
            <h2 className="payment-title">Payment</h2>
            <p className="payment-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna arcu
            </p>
            <div className="payment-icons">
                <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
                <img src="https://img.icons8.com/color/48/mastercard.png" alt="MasterCard" />
                <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" />
                <img src="https://img.icons8.com/ios-filled/50/apple-pay.png" alt="Apple Pay" />
            </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
            <div className="payment-group">
                <label>Renter Name</label>
                <input type="text" name="RenterName" value={inputs.RenterName} onChange={handleChange} />
                {errors.RenterName && <span className="error">{errors.RenterName}</span>}
            </div>

            <div className="payment-group">
                <label>Card Name</label>
                <input type="text" name="CardName" value={inputs.CardName} onChange={handleChange} />
                {errors.CardName && <span className="error">{errors.CardName}</span>}
            </div>

            <div className="payment-group">
                <label>Card Number</label>
                <input type="text" name="CardNo" value={inputs.CardNo} onChange={handleChange} maxLength="16" />
                {errors.CardNo && <span className="error">{errors.CardNo}</span>}
            </div>

            <div className="payment-row">
                <div className="payment-group">
                    <label>Expiry Date</label>
                    <input type="month" name="ExpiryDate" value={inputs.ExpiryDate} onChange={handleChange} />
                    {errors.ExpiryDate && <span className="error">{errors.ExpiryDate}</span>}
                </div>

                <div className="payment-group">
                    <label>CVV</label>
                    <input type="text" name="CVV" value={inputs.CVV} onChange={handleChange} maxLength="3" />
                    {errors.CVV && <span className="error">{errors.CVV}</span>}
                </div>
            </div>

            <div className="payment-group">
                <label>Amount</label>
                <input type="text" name="Amount" value={inputs.Amount} onChange={handleChange} />
                {errors.Amount && <span className="error">{errors.Amount}</span>}
            </div>


                {/* <div className="input-group">
                    <label>Remark</label>
                    <input type="text" name="Remark" value={inputs.Remark} onChange={handleChange}  disabled />
                </div> */}

                <button type="submit" className="submit-btn">Add Payment</button>
            </form>
        </div>
    );
}

export default AddPayment;
