import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import {useNavigate} from 'react-router'
import './UpdatePayment.css'

function UpdatePayment() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id=useParams().id;

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
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>
        history('/PaymentDetails')); 
    };
                



  return (
    <div>UpdatePayment
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
  )
}

export default UpdatePayment