
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import './UpdatePayment.css';

function UpdatePayment() {
    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/payments/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.payment));
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/payments/${id}`, {
                RenterName: String(inputs.RenterName),
                CardName: String(inputs.CardName),
                CardNo: Number(inputs.CardNo),
                ExpiryDate: String(inputs.ExpiryDate),
                CVV: Number(inputs.CVV),
                Amount: Number(inputs.Amount),
                Remark: String(inputs.Remark),
            })
            .then((res) => res.data);
    };

    const handleChange = (e) => {
        // Restricting input to text-only in the Remark field
        if (e.target.name === "Remark" && /[0-9]/.test(e.target.value)) {
            return; // If number is detected, do not update the state
        }

        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => history('/PaymentDetails'));
    };

    // Mask the Card Number, Expiry Date, and CVV fields
    const maskField = (fieldValue, length) => {
        return "*".repeat(length);
    };

    return (
        // <div>
            
        //     <form className="payment-form" onSubmit={handleSubmit}>
        //     <h2>Update Payment</h2>
        //         {/* Renter Name */}
        //         <div className="input-group">
        //             <label>Renter Name</label>
        //             <input
        //                 type="text"
        //                 name="RenterName"
        //                 value={inputs.RenterName}
        //                 onChange={handleChange}
        //                 required
        //                 disabled
        //             />
        //         </div>

        //         {/* Card Name */}
        //         <div className="input-group">
        //             <label>Card Name</label>
        //             <input
        //                 type="text"
        //                 name="CardName"
        //                 value={inputs.CardName}
        //                 onChange={handleChange}
        //                 required
        //                 disabled
        //             />
        //         </div>

        //         {/* Card Number - Display asterisks instead of the actual number */}
        //         <div className="input-group">
        //             <label>Card Number <span className="required">*</span></label>
        //             <input
        //                 type="text"
        //                 name="CardNo"
        //                 value={maskField(inputs.CardNo, 16)} // assuming a card number length of 16
        //                 onChange={handleChange}
        //                 required
        //                 disabled
        //             />
        //         </div>

        //         {/* Expiry Date - Display asterisks instead of the actual date */}
        //         <div className="input-group">
        //             <label>Expiry Date <span className="required">*</span></label>
        //             <input
        //                 type="text"
        //                 name="ExpiryDate"
        //                 placeholder="MM/YY"
        //                 value={maskField(inputs.ExpiryDate, 5)} // assuming format MM/YY
        //                 onChange={handleChange}
        //                 required
        //                 disabled
        //             />
        //         </div>

        //         {/* CVV - Display asterisks instead of the actual CVV */}
        //         <div className="input-group">
        //             <label>CVV <span className="required">*</span></label>
        //             <input
        //                 type="text"
        //                 name="CVV"
        //                 value={maskField(inputs.CVV, 3)} // assuming CVV length is 3 digits
        //                 onChange={handleChange}
        //                 required
        //                 disabled
        //             />
        //         </div>

        //         {/* Amount */}
        //         <div className="input-group">
        //             <label>Amount</label>
        //             <input
        //                 type="number"
        //                 name="Amount"
        //                 value={inputs.Amount}
        //                 onChange={handleChange}
        //                 required
        //                 disabled
        //             />
        //         </div>

        //         {/* Remark */}
        //         <div className="input-group">
        //             <label>Remark</label>
        //             <input
        //                 type="text"
        //                 name="Remark"
        //                 value={inputs.Remark}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
<div className="payment-container">
    <div className="payment-header">
        <h2 className="payment-title">Update Payment</h2>
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
            <input
                type="text"
                name="RenterName"
                value={inputs.RenterName}
                onChange={handleChange}
                required
                disabled
            />
        </div>

        <div className="payment-group">
            <label>Card Name</label>
            <input
                type="text"
                name="CardName"
                value={inputs.CardName}
                onChange={handleChange}
                required
                disabled
            />
        </div>

        <div className="payment-group">
            <label>Card Number <span className="required">*</span></label>
            <input
                type="text"
                name="CardNo"
                value={maskField(inputs.CardNo, 16)} // assuming a card number length of 16
                onChange={handleChange}
                required
                disabled
            />
        </div>

        <div className="payment-row">
            <div className="payment-group">
                <label>Expiry Date <span className="required">*</span></label>
                <input
                    type="text"
                    name="ExpiryDate"
                    placeholder="MM/YY"
                    value={maskField(inputs.ExpiryDate, 5)} // assuming format MM/YY
                    onChange={handleChange}
                    required
                    disabled
                />
            </div>

            <div className="payment-group">
                <label>CVV <span className="required">*</span></label>
                <input
                    type="text"
                    name="CVV"
                    value={maskField(inputs.CVV, 3)} // assuming CVV length is 3 digits
                    onChange={handleChange}
                    required
                    disabled
                />
            </div>
        </div>

        <div className="payment-group">
            <label>Amount</label>
            <input
                type="number"
                name="Amount"
                value={inputs.Amount}
                onChange={handleChange}
                required
                disabled
            />
        </div>

        <div className="payment-group">
            <label>Remark</label>
            <input
                type="text"
                name="Remark"
                value={inputs.Remark}
                onChange={handleChange}
                required
            />
        </div>



                {/* Submit Button */}
                <button type="submit" className="submit-btn">
                    Update Payment
                </button>
            </form>
        </div>
    );
}

export default UpdatePayment;
