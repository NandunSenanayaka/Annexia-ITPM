import React, { useState } from 'react';
import SecurityOverview from "../SecurityDashboard/SecurityDashboard";  // Assuming you have a SecurityOverview component
import './AddSecurity.css';  // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router';
import axios from 'axios';

const AddSecurity = () => {
    const history = useNavigate();
    const [inputs,setInputs] = useState({
      noticeid:"",
      title:"",
      date:"",
      time:"",
      status:"",
      description:""

    });

    const handleChange =(e)=>{
      setInputs((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    //click submit
    const handleSubmit =(e)=>{
      e.preventDefault();
      console.log(inputs);
      sendRequest().then(()=>history('../securityoverview'))
    }

    const sendRequest = async()=>{
      await axios.post("http://localhost:5000/security",{
        noticeid:String(inputs.noticeid),
        title:String(inputs.title),
        date:String(inputs.date),
        time:String(inputs.time),
        status:String(inputs.status),
        description:String(inputs.description)
      }).then(res => res.data);
    }


  return (
    <div className="add-security-container">
      <SecurityOverview />

      <div className="add-security-content">
        <h1>Add New Notice</h1>

        <form onSubmit={handleSubmit}>
          <label>Notice ID</label>
          <input type="text" name="noticeid" onChange={handleChange} value={inputs.noticeid} required />

          <label>Title</label>
          <input type="text" name="title" onChange={handleChange} value={inputs.title} required />

          <label>Date</label>
          <input type="text" name="date" onChange={handleChange} value={inputs.date} required />

          <label>Time</label>
          <input type="text" name="time" onChange={handleChange} value={inputs.time} required />

          <label>Status</label>
          <input type="text" name="status" onChange={handleChange} value={inputs.status} required />

          <label>Description</label>
          <input type="text" name="description" onChange={handleChange} value={inputs.description} required />

          <button type="submit">Submit</button>
        </form>



      </div>
    </div>
  );
};

export default AddSecurity;





///////////////////////////////////////////////////////////////


/////////////////////////

// import React, { useState, useEffect } from 'react';
// import SecurityOverview from "../SecurityDashboard/SecurityDashboard";
// import './AddSecurity.css';
// import { useNavigate } from 'react-router';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import TimePicker from 'react-time-picker';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-time-picker/dist/TimePicker.css';

// const AddSecurity = () => {
//     const history = useNavigate();
//     const [inputs, setInputs] = useState({
//         noticeid: "",
//         title: "",
//         date: new Date(), // Initialize with current date
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Initialize with current time
//         status: "",
//         description: ""
//     });

//     // Debug: Log the time when it changes
//     useEffect(() => {
//         console.log(inputs.time);
//     }, [inputs.time]);

//     const handleChange = (e) => {
//         setInputs((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleDateChange = (date) => {
//         setInputs((prevState) => ({
//             ...prevState,
//             date: date,
//         }));
//     };

//     const handleTimeChange = (time) => {
//         setInputs((prevState) => ({
//             ...prevState,
//             time: time, // Ensure time is a string
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(inputs);
//         sendRequest().then(() => history('../securityoverview'));
//     };

//     const sendRequest = async () => {
//         await axios.post("http://localhost:5000/security", {
//             noticeid: String(inputs.noticeid),
//             title: String(inputs.title),
//             date: String(inputs.date),
//             time: String(inputs.time),
//             status: String(inputs.status),
//             description: String(inputs.description)
//         }).then(res => res.data);
//     };

//     return (
//         <div className="add-security-container">
//             <SecurityOverview />

//             <div className="add-security-content">
//                 <h1>Add New Notice</h1>

//                 <form onSubmit={handleSubmit}>
//                     <label>Notice ID</label>
//                     <input type="text" name="noticeid" onChange={handleChange} value={inputs.noticeid} required />

//                     <label>Title</label>
//                     <input type="text" name="title" onChange={handleChange} value={inputs.title} required />

//                     <label>Date</label>
//                     <DatePicker
//                         selected={inputs.date}
//                         onChange={handleDateChange}
//                         dateFormat="yyyy-MM-dd"
//                         required
//                     />

//                     <label>Time</label>
//                     <TimePicker
//                         onChange={handleTimeChange}
//                         value={inputs.time}
//                         required
//                     />

//                     <label>Status</label>
//                     <input type="text" name="status" onChange={handleChange} value={inputs.status} required />

//                     <label>Description</label>
//                     <input type="text" name="description" onChange={handleChange} value={inputs.description} required />

//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddSecurity;
