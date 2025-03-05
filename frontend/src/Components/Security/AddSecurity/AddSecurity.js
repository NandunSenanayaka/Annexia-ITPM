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
        <h1>Add Security</h1>

        <form onSubmit={handleSubmit}>
          <label>Notice ID</label>
          <br/>
          <input type="text" name="noticeid" onChange={handleChange} value={inputs.noticeid} required />
          <br/><br/>

          <label>Title</label>
          <br/>
          <input type="text" name="title" onChange={handleChange} value={inputs.title} required />
          <br/><br/>

          <label>Date</label>
          <br/>
          <input type="text" name="date" onChange={handleChange} value={inputs.date} required />
          <br/><br/>

          <label>Time</label>
          <br/>
          <input type="text" name="time" onChange={handleChange} value={inputs.time} required />
          <br/><br/>

          <label>Status</label>
          <br/>
          <input type="text" name="status" onChange={handleChange} value={inputs.status} required />
          <br/><br/>

          <label>Description</label>
          <br/>
          <input type="text" name="description" onChange={handleChange} value={inputs.description} required />
          <br/><br/>

          <button type="submit">Submit</button>
        </form>



      </div>
    </div>
  );
};

export default AddSecurity;
