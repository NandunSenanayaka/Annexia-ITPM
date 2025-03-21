import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './UpdateSecurity.css';

const UpdateSecurity = () => {
  const [inputs, setInputs] = useState({
    noticeid: "",
    title: "",
    date: "",
    time: "",
    status: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/security/${id}`);
        
        if (res.data && res.data.security) {
          setInputs(res.data.security); 
        } else {
          console.error("Invalid API response structure:", res.data);
        }
      } catch (error) {
        console.error("Error fetching security data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/security/${id}`, {
        noticeid: String(inputs.noticeid),
        title: String(inputs.title),
        date: String(inputs.date),
        time: String(inputs.time),
        status: String(inputs.status),
        description: String(inputs.description),
      });
    } catch (error) {
      console.error("Error updating security notice:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Inputs:", inputs);
    sendRequest().then(() => navigate("/securityoverview"));
  };

  return (
    <div className="add-security-container">
      <div className="add-security-content">
        <h1>Update Security Notice</h1>
        <form onSubmit={handleSubmit}>
          <label>Notice ID</label>
          <input
            type="text"
            name="noticeid"
            onChange={handleChange}
            value={inputs.noticeid || ""}
            required
          />

          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={inputs.title || ""}
            required
          />

          <label>Date</label>
          <input
            type="text"
            name="date"
            onChange={handleChange}
            value={inputs.date || ""}
            required
          />

          <label>Time</label>
          <input
            type="text"
            name="time"
            onChange={handleChange}
            value={inputs.time || ""}
            required
          />

          <label>Status</label>
          <input
            type="text"
            name="status"
            onChange={handleChange}
            value={inputs.status || ""}
            required
          />

          <label>Description</label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={inputs.description || ""}
            required
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSecurity;


//////////////
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import './UpdateSecurity.css';
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const UpdateSecurity = () => {
//   const [inputs, setInputs] = useState({
//     noticeid: "",
//     title: "",
//     date: "",
//     time: "",
//     status: "",
//     description: "",
//   });

//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchHandler = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/security/${id}`);
        
//         if (res.data && res.data.security) {
//           setInputs(res.data.security); 
//         } else {
//           console.error("Invalid API response structure:", res.data);
//         }
//       } catch (error) {
//         console.error("Error fetching security data:", error);
//       }
//     };
//     fetchHandler();
//   }, [id]);

//   const sendRequest = async () => {
//     try {
//       await axios.put(`http://localhost:5000/security/${id}`, {
//         noticeid: String(inputs.noticeid),
//         title: String(inputs.title),
//         date: String(inputs.date),
//         time: String(inputs.time),
//         status: String(inputs.status),
//         description: String(inputs.description),
//       });
//     } catch (error) {
//       console.error("Error updating security notice:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "noticeid" && !/^[0-9]*$/.test(value)) {
//       return; // Prevent non-numeric input for Notice ID
//     }

//     if ((name === "title" || name === "status") && !/^[A-Za-z ]*$/.test(value)) {
//       return; // Prevent numbers and symbols in title and status
//     }

//     setInputs((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleTimeChange = (time) => {
//     if (time) {
//       const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
//       setInputs((prevState) => ({
//         ...prevState,
//         time: formattedTime,
//       }));
//     }
//   };

//   const handleDateChange = (date) => {
//     if (date) {
//       setInputs((prevState) => ({
//         ...prevState,
//         date: date.toISOString(), // Store as ISO string
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated Inputs:", inputs);
//     sendRequest().then(() => navigate("/securityoverview"));
//   };

//   // Ensure the initial date is a valid Date object
//   const initialDate = inputs.date ? new Date(inputs.date) : new Date();

//   return (
//     <div className="add-security-container">
//       <div className="add-security-content">
//         <h1>Update Security Notice</h1>
//         <form onSubmit={handleSubmit}>
//           <label>Notice ID</label>
//           <input
//             type="text"
//             name="noticeid"
//             onChange={handleChange}
//             value={inputs.noticeid || ""}
//             required
//           />

//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             onChange={handleChange}
//             value={inputs.title || ""}
//             required
//           />

//           <label>Date</label>
//           <DatePicker
//             selected={initialDate}  // Use the initialDate variable to handle invalid date
//             onChange={handleDateChange}
//             dateFormat="yyyy-MM-dd"
//             required
//           />

//           <label>Time</label>
//           <TimePicker
//             onChange={handleTimeChange}
//             value={inputs.time || ""}
//             format="hh:mm a"
//             required
//           />

//           <label>Status</label>
//           <input
//             type="text"
//             name="status"
//             onChange={handleChange}
//             value={inputs.status || ""}
//             required
//           />

//           <label>Description</label>
//           <input
//             type="text"
//             name="description"
//             onChange={handleChange}
//             value={inputs.description || ""}
//             required
//           />

//           <button type="submit">Update</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateSecurity;
