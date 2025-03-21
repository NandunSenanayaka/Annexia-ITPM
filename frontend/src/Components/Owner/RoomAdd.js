import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const RoomAdd = () => {
  const location = useLocation();
  const renter = location.state?.renter || {};    

  // State for room data and error handling
  const [roomData, setRoomData] = useState({
    RoomName: '',
    PersonName: renter.RenterName || '',
    Description: '',
    Price: '',
    EmailAddress: renter.Mail || ''
  });

  const [rooms, setRooms] = useState(() => {
    // Load saved rooms from localStorage initially
    const savedRooms = localStorage.getItem('rooms');
    return savedRooms ? JSON.parse(savedRooms) : [];
  });
  const [error, setError] = useState(null);

  // Fetch rooms from backend
  const fetchRooms = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/room');
      if (Array.isArray(response.data)) {
        const filteredRooms = response.data.filter(room => 
          room.EmailAddress === renter.Mail
        );
        setRooms(filteredRooms);

        // Save rooms to localStorage for persistence
        localStorage.setItem('rooms', JSON.stringify(filteredRooms));
      } else {
        setRooms([]);
        localStorage.removeItem('rooms'); // Clear localStorage if no data
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to fetch rooms. Please try again later.');
      setRooms([]);
    }
  }, [renter.Mail]);

  // Fetch rooms when the component mounts
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission to add a room
  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!roomData.RoomName || !roomData.Description || !roomData.Price) {
      alert('Please fill out all required fields.');
      return;
    }
    try {
      const addResponse = await axios.post('http://localhost:5000/room', roomData);
      if (addResponse.data) {
        const updatedRooms = [...rooms, addResponse.data];
        setRooms(updatedRooms);

        // Update localStorage after adding a room
        localStorage.setItem('rooms', JSON.stringify(updatedRooms));
        alert('Room added successfully!');
        setRoomData({
          RoomName: '',
          PersonName: renter.RenterName || '',
          Description: '',
          Price: '',
          EmailAddress: renter.Mail || ''
        });
      }
    } catch (error) {
      console.error('Error adding room:', error);
      setError('Error adding room. Please try again later.');
    }
  };

  // Handle room deletion
  const handleRemoveRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/room/${id}`);
      const updatedRooms = rooms.filter(room => room._id !== id);
      setRooms(updatedRooms);

      // Update localStorage after deleting a room
      localStorage.setItem('rooms', JSON.stringify(updatedRooms));
      alert('Room deleted successfully!');
    } catch (error) {
      console.error('Error deleting room:', error);
      setError('Error deleting room. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      {error && <div style={styles.errorMessage}>{error}</div>}

      {/* Add Room Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add Room</h2>
        <form onSubmit={handleAddRoom} style={styles.formBox}>
          <label style={styles.label}>Room Name:</label>
          <input
            type="text"
            name="RoomName"
            value={roomData.RoomName}
            onChange={handleInputChange}
            required
            placeholder="Room Name"
            style={styles.inputField}
          />

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
            required
            placeholder="Description"
            style={styles.textArea}
          />

          <label style={styles.label}>Price:</label>
          <input
            type="number"
            name="Price"
            value={roomData.Price}
            onChange={handleInputChange}
            required
            placeholder="Price"
            style={styles.inputField}
          />

          <button
            type="submit"
            style={styles.addButton}
          >
            Add Room
          </button>
        </form>
      </div>

      {/* Room Details Table */}
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

// Styles
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
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default RoomAdd;