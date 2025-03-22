import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const RoomAdd = () => {
  const location = useLocation();
  const renter = location.state?.renter || {};

  const [roomData, setRoomData] = useState({
    RoomName: '',
    PersonName: renter.RenterName || '',
    Description: '',
    Price: '',
    EmailAddress: renter.Mail || '',
  });

  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'RoomName':
        if (!/^[a-zA-Z0-9 ]+$/.test(value))
          errorMsg = `Invalid Room Name: "${value}". Only letters and numbers allowed.`;
        break;

      case 'Description':
        if (!/^[a-zA-Z0-9,. ]+$/.test(value))
          errorMsg = `Invalid Description: "${value}". Only letters, numbers, commas, and periods allowed.`;
        break;

      case 'Price':
        if (!/^\d+(\.\d{1,2})?$/.test(value))
          errorMsg = `Invalid Price: "${value}". Enter a valid numeric value.`;
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/room');
      if (Array.isArray(response.data)) {
        setRooms(response.data);
      } else {
        setRooms([]);
      }
      setError(null);
    } catch (error) {
      setError('Failed to fetch rooms. Please try again later.');
      setRooms([]);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    for (const field in errors) {
      if (errors[field]) {
        alert('Please fix validation errors before submitting.');
        return;
      }
    }

    if (!roomData.RoomName || !roomData.Description || !roomData.Price) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const addResponse = await axios.post('http://localhost:5000/room', roomData);
      if (addResponse.data) {
        alert('Room added successfully!');
        setRoomData({
          RoomName: '',
          PersonName: renter.RenterName || '',
          Description: '',
          Price: '',
          EmailAddress: renter.Mail || '',
        });
        setErrors({});
        fetchRooms(); // Refresh data from backend
      }
    } catch (error) {
      setError('Error adding room. Please try again later.');
    }
  };

  const handleRemoveRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/room/${id}`);
      alert('Room deleted successfully!');
      fetchRooms(); // Refresh after deletion
    } catch (error) {
      setError('Error deleting room. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add Room</h2>
        <form onSubmit={handleAddRoom} style={styles.formBox}>
          <label style={styles.label}>Room Name:</label>
          <input
            type="text"
            name="RoomName"
            value={roomData.RoomName}
            onChange={handleInputChange}
            placeholder="Room Name"
            required
            style={styles.inputField}
          />
          {errors.RoomName && <span style={styles.error}>{errors.RoomName}</span>}

          <label style={styles.label}>Person Name:</label>
          <input
            type="text"
            name="PersonName"
            value={roomData.PersonName}
            readOnly
            style={styles.inputField}
          />

          <label style={styles.label}>Email Address:</label>
          <input
            type="email"
            name="EmailAddress"
            value={roomData.EmailAddress}
            readOnly
            style={styles.inputField}
          />

          <label style={styles.label}>Description:</label>
          <textarea
            name="Description"
            value={roomData.Description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            style={styles.textArea}
          />
          {errors.Description && <span style={styles.error}>{errors.Description}</span>}

          <label style={styles.label}>Price:</label>
          <input
            type="number"
            name="Price"
            value={roomData.Price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            style={styles.inputField}
          />
          {errors.Price && <span style={styles.error}>{errors.Price}</span>}

          <button type="submit" style={styles.addButton}>
            Add Room
          </button>
        </form>
      </div>

      <div style={styles.tableContainer}>
        <h2 style={styles.heading}>Room Details</h2>
        {rooms.length === 0 ? (
          <p>No rooms found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Room Name</th>
                <th style={styles.tableHeader}>Person Name</th>
                <th style={styles.tableHeader}>Email Address</th>
                <th style={styles.tableHeader}>Description</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{room.RoomName}</td>
                  <td style={styles.tableCell}>{room.PersonName}</td>
                  <td style={styles.tableCell}>{room.EmailAddress}</td>
                  <td style={styles.tableCell}>{room.Description}</td>
                  <td style={styles.tableCell}>{room.Price}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleRemoveRoom(room._id)}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: 'auto',
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  tableContainer: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  inputField: {
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  textArea: {
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '12px',
    fontSize: '14px',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '-10px',
    marginBottom: '10px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default RoomAdd;
