import React, { useState, useEffect } from 'react';
import SecurityOverview from "../SecurityDashboard/SecurityDashboard";
import './AddSecurity.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { AiOutlineSound } from 'react-icons/ai'; // Importing the mic icon from react-icons

// To check if the browser supports SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const AddSecurity = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        noticeid: "",
        title: "",
        date: new Date().toDateString(), // Initialize with current date (formatted)
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }), // Initialize with current time including AM/PM
        status: "",
        description: ""
    });

    // Debug: Log the time when it changes
    useEffect(() => {
        console.log(inputs.time);
    }, [inputs.time]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "noticeid" && !/^[0-9]*$/.test(value)) {
            return; // Prevent non-numeric input
        }
        
        if ((name === "title" || name === "status") && !/^[A-Za-z ]*$/.test(value)) {
            return; // Prevent numbers and symbols in title and status
        }
        
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setInputs((prevState) => ({
            ...prevState,
            date: date.toDateString(), // Store only the date part
        }));
    };

    const handleTimeChange = (time) => {
        if (time) {
            const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            setInputs((prevState) => ({
                ...prevState,
                time: formattedTime, // Ensure time is formatted correctly
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => history('../securityoverview'));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/security", {
            noticeid: String(inputs.noticeid),
            title: String(inputs.title),
            date: String(inputs.date),
            time: String(inputs.time),
            status: String(inputs.status),
            description: String(inputs.description)
        }).then(res => res.data);
    };

    // Function to start speech recognition
    const startRecognition = () => {
        if (!recognition) {
            console.error("Speech Recognition API is not supported in this browser.");
            return;
        }

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputs((prevState) => ({
                ...prevState,
                description: transcript,
            }));
        };

        recognition.onerror = (event) => {
            console.error("Error occurred in speech recognition: ", event.error);
        };
    };

    return (
        <div className="add-security-container">
            <SecurityOverview />

            <div className="add-security-content">
                <h1>Add New Notice</h1>

                <form onSubmit={handleSubmit}>
                    <label>Notice ID</label>
                    <input 
                        type="text" 
                        name="noticeid" 
                        onChange={handleChange} 
                        value={inputs.noticeid} 
                        required 
                    />

                    <label>Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        onChange={handleChange} 
                        value={inputs.title} 
                        required 
                    />

                    <label>Date</label>
                    <DatePicker
                        selected={new Date(inputs.date)}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        required
                    />

                    <label>Time</label>
                    <TimePicker
                        onChange={handleTimeChange}
                        value={inputs.time}
                        format="hh:mm a"
                        required
                    />

                    <label>Status</label>
                    <input 
                        type="text" 
                        name="status" 
                        onChange={handleChange} 
                        value={inputs.status} 
                        required 
                    />

                    <label>Description</label>
                    <div className="description-input-container">
                        <input 
                            type="text" 
                            name="description" 
                            onChange={handleChange} 
                            value={inputs.description} 
                            required 
                        />
                        <button 
                            type="button" 
                            onClick={startRecognition} 
                            className="mic-button"
                        >
                            <AiOutlineSound size={24} /> {/* React icon for the microphone */}
                        </button>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddSecurity;
