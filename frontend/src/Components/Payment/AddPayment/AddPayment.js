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

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await sendRequest();
        navigate('/PaymentDetails'); 
    };

    const sendRequest = async () => {
        return await axios.post('http://localhost:5000/payments', {
            RenterName: String(inputs.RenterName),
            CardName: String(inputs.CardName),
            CardNo: Number(inputs.CardNo),
            ExpiryDate: String(inputs.ExpiryDate),
            CVV: Number(inputs.CVV),
            Amount: Number(inputs.Amount),
            Remark: String(inputs.Remark),
        }).then((res) => res.data);
    };

    return (
        <div className="payment-container">
            <h2 className="form-title">Add Payment</h2>
            <form className="payment-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Renter Name</label>
                    <input type="text" name="RenterName" value={inputs.RenterName} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Card Name</label>
                    <input type="text" name="CardName" value={inputs.CardName} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Card Number</label>
                    <input type="number" name="CardNo" value={inputs.CardNo} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Expiry Date</label>
                    <input type="text" name="ExpiryDate" placeholder="MM/YY" value={inputs.ExpiryDate} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>CVV</label>
                    <input type="number" name="CVV" value={inputs.CVV} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Amount</label>
                    <input type="number" name="Amount" value={inputs.Amount} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Remark</label>
                    <input type="text" name="Remark" value={inputs.Remark} onChange={handleChange} required />
                </div>

                <button type="submit" className="submit-btn">Add Payment</button>
            </form>
        </div>
    );
}

export default AddPayment;
