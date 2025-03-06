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
    EmailAddress: renter.Mail || ''
  });

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/room');
      if (Array.isArray(response.data)) {
        setRooms(response.data);
        setFilteredRooms(response.data); // Initialize filtered rooms
      } else {
        setRooms([]);
        setFilteredRooms([]);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
      setFilteredRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = rooms.filter(room =>
      room.RoomName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleInputChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const addResponse = await axios.post('http://localhost:5000/room', roomData);
      if (addResponse.data) {
        setRooms([...rooms, addResponse.data]); // Update rooms state
        setFilteredRooms([...rooms, addResponse.data]); // Update filtered rooms
      }
      setRoomData({
        RoomName: '',
        PersonName: renter.RenterName || '',
        Description: '',
        Price: '',
        EmailAddress: renter.Mail || ''
      });
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Error adding room.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRoom = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/room/${id}`);
      const updatedRooms = rooms.filter(room => room._id !== id);
      setRooms(updatedRooms); // Update rooms state
      setFilteredRooms(updatedRooms); // Update filtered rooms
      alert('Room deleted successfully!');
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Error deleting room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
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

          <button type="submit" disabled={loading} style={styles.addButton}>
            {loading ? 'Adding...' : 'Add Room'}
          </button>
        </form>
      </div>

      {/* Room Details Table */}
      <div style={styles.tableContainer}>
        <h2 style={styles.heading}>Room Details</h2>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Room Name"
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredRooms.length === 0 ? (
          <p>No rooms added yet.</p>
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
              {filteredRooms.map((room) => (
                <tr key={room._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{room.RoomName}</td>
                  <td style={styles.tableCell}>{room.PersonName}</td>
                  <td style={styles.tableCell}>{room.EmailAddress}</td>
                  <td style={styles.tableCell}>{room.Description}</td>
                  <td style={styles.tableCell}>{room.Price}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleRemoveRoom(room._id)}
                      disabled={loading}
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

// Creative CSS Styles
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
    transition: 'border-color 0.3s ease-in-out',
  },
  textArea: {
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',
    transition: 'border-color 0.3s ease-in-out',
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
    transition: 'background-color 0.3s ease',
  },
  addButtonHover: {
    backgroundColor: '#0056b3',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    padding: '12px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    transition: 'background-color 0.3s ease',
  },
  tableRowHover: {
    backgroundColor: '#f1f1f1',
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
    transition: 'background-color 0.3s ease',
  },
  removeButtonHover: {
    backgroundColor: '#c82333',
  },
};

export default RoomAdd;