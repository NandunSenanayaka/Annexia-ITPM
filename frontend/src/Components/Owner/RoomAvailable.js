import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RoomAvailable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { renters } = location.state || { renters: [] };

  // State to hold the room statuses
  const [roomStatuses, setRoomStatuses] = useState([]);

  // Function to get the initial statuses from localStorage or set as empty
  const getInitialStatuses = () => {
    const savedStatuses = localStorage.getItem('roomStatuses');
    if (savedStatuses) {
      return JSON.parse(savedStatuses); // If data is in localStorage, return it
    } else {
      return []; // Initialize as empty (no default value)
    }
  };

  // Initialize room statuses from localStorage or default to an empty array
  useEffect(() => {
    // Set the initial room statuses on component mount
    setRoomStatuses(getInitialStatuses());
  }, [renters]);

  // Sync room statuses to localStorage every time they change
  useEffect(() => {
    if (roomStatuses.length > 0) {
      localStorage.setItem('roomStatuses', JSON.stringify(roomStatuses));
    }
  }, [roomStatuses]); // Dependency on roomStatuses

  // Function to update room status
  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...roomStatuses];
    updatedStatuses[index] = newStatus;
    setRoomStatuses(updatedStatuses);
  };

  // Function to get the row color based on room status
  const getRowColor = (status) => {
    switch (status) {
      case 'Available':
        return '#d4edda'; // Green background for Available
      case 'Occupied':
        return '#f8d7da'; // Red background for Occupied
      case 'Maintenance':
        return '#fff3cd'; // Yellow background for Maintenance
      default:
        return 'transparent'; // Default background
    }
  };

  // Function to remove a room
  const handleRemoveRoom = (index) => {
    const updatedRenters = renters.filter((_, i) => i !== index);
    const updatedStatuses = roomStatuses.filter((_, i) => i !== index);

    // Update state and localStorage
    setRoomStatuses(updatedStatuses);
    localStorage.setItem('roomStatuses', JSON.stringify(updatedStatuses));
  };

  // Count the rooms by status
  const availableCount = roomStatuses.filter(status => status === 'Available').length;
  const occupiedCount = roomStatuses.filter(status => status === 'Occupied').length;
  const maintenanceCount = roomStatuses.filter(status => status === 'Maintenance').length;

  return (
    <div style={styles.container}>
      {/* Status summary boxes */}
      <div style={styles.statusBoxes}>
        <div style={styles.statusBox}>
          <h3>Available Rooms</h3>
          <h2>{availableCount}</h2>
        </div>
        <div style={styles.statusBox}>
          <h3>Occupied Rooms</h3>
          <h2>{occupiedCount}</h2>
        </div>
        <div style={styles.statusBox}>
          <h3>Under Maintenance</h3>
          <h2>{maintenanceCount}</h2>
        </div>
      </div>

      {/* Rooms table with status dropdowns */}
      <div style={styles.tableFrame}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Renter Name</th>
              <th style={styles.tableHeader}>Mail</th>
              <th style={styles.tableHeader}>Contact Number</th>
              <th style={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {renters.map((renter, index) => (
              <tr
                key={index}
                style={{ backgroundColor: getRowColor(roomStatuses[index]) }} // Apply dynamic background color
              >
                <td style={styles.tableCell}>{renter.RenterName}</td>
                <td style={styles.tableCell}>{renter.Mail}</td>
                <td style={styles.tableCell}>{renter.ContactNumber}</td>
                <td style={styles.tableCell}>
                  <select
                    value={roomStatuses[index] || 'Available'} // If no value is set, use 'Available'
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    style={styles.select}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => handleRemoveRoom(index)}
                    style={styles.assignbuttion}
                  >
                    Assign Room
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  },
  statusBoxes: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '900px',
    marginBottom: '20px',
  },
  statusBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '30%',
    textAlign: 'center',
  },
  tableFrame: {
    width: '100%',
    maxWidth: '900px',
    border: '2px solid #007bff',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  select: {
    padding: '5px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  assignbuttion: {
    padding: '5px 10px',
    marginLeft: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default RoomAvailable;
