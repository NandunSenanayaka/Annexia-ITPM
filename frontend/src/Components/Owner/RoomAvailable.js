import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RoomAvailable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { renters } = location.state || { renters: [] };

  // State to hold the room statuses
  const [roomStatuses, setRoomStatuses] = useState([]);

  // Function to get initial room statuses from localStorage
  const getInitialStatuses = () => {
    const savedStatuses = JSON.parse(localStorage.getItem('roomStatuses')) || [];
    return renters.map((_, index) => savedStatuses[index] || 'Available');
  };

  // Initialize room statuses
  useEffect(() => {
    setRoomStatuses(getInitialStatuses());
  }, [renters]);

  // Sync room statuses to localStorage
  useEffect(() => {
    if (roomStatuses.length > 0) {
      localStorage.setItem('roomStatuses', JSON.stringify(roomStatuses));
    }
  }, [roomStatuses]);

  // Function to update room status
  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...roomStatuses];
    updatedStatuses[index] = newStatus;
    setRoomStatuses(updatedStatuses);
  };

  // Function to get row color based on status
  const getRowColor = (status) => {
    switch (status) {
      case 'Available':
        return '#d4edda'; // Green
      case 'Occupied':
        return '#f8d7da'; // Red
      case 'Maintenance':
        return '#fff3cd'; // Yellow
      default:
        return 'transparent';
    }
  };

  // Function to navigate to RoomAdd page with selected renter details
  const handleAddRoom = (renter) => {
    navigate('/RoomAdd', { state: { renter } });
  };

  // Count room statuses
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

      {/* Rooms table */}
      <div style={styles.tableFrame}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Renter Name</th>
              <th style={styles.tableHeader}>Mail</th>
              <th style={styles.tableHeader}>Contact Number</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renters.map((renter, index) => (
              <tr key={index} style={{ backgroundColor: getRowColor(roomStatuses[index]) }}>
                <td style={styles.tableCell}>{renter.RenterName}</td>
                <td style={styles.tableCell}>{renter.Mail}</td>
                <td style={styles.tableCell}>{renter.ContactNumber}</td>
                <td style={styles.tableCell}>
                  <select
                    value={roomStatuses[index] || 'Available'}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    style={styles.select}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </td>
                <td style={styles.tableCell}>
                  {roomStatuses[index] === 'Available' && (
                    <button onClick={() => handleAddRoom(renter)} style={styles.assignButton}>
                      ADD Room
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  select: {
    padding: '5px',
    fontSize: '14px',
    borderRadius: '4px',
  },
  assignButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RoomAvailable;
