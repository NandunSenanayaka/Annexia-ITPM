// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import './UpdateSecurity.css';

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
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated Inputs:", inputs);
//     sendRequest().then(() => navigate("/securityoverview"));
//   };

//   return (
//     <div>
//       <h2>Update Security Notice</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Notice ID</label>
//         <br />
//         <input
//           type="text"
//           name="noticeid"
//           onChange={handleChange}
//           value={inputs.noticeid || ""}
//           required
//         />
//         <br />
//         <br />

//         <label>Title</label>
//         <br />
//         <input
//           type="text"
//           name="title"
//           onChange={handleChange}
//           value={inputs.title || ""}
//           required
//         />
//         <br />
//         <br />

//         <label>Date</label>
//         <br />
//         <input
//           type="text"
//           name="date"
//           onChange={handleChange}
//           value={inputs.date || ""}
//           required
//         />
//         <br />
//         <br />

//         <label>Time</label>
//         <br />
//         <input
//           type="text"
//           name="time"
//           onChange={handleChange}
//           value={inputs.time || ""}
//           required
//         />
//         <br />
//         <br />

//         <label>Status</label>
//         <br />
//         <input
//           type="text"
//           name="status"
//           onChange={handleChange}
//           value={inputs.status || ""}
//           required
//         />
//         <br />
//         <br />

//         <label>Description</label>
//         <br />
//         <input
//           type="text"
//           name="description"
//           onChange={handleChange}
//           value={inputs.description || ""}
//           required
//         />
//         <br />
//         <br />

//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateSecurity;



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
