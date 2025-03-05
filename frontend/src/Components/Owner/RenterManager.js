import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importing the plugin for table in pdf

const RenterManager = () => {
    const navigate = useNavigate();
    const [renters, setRenters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRenters, setFilteredRenters] = useState([]);

    useEffect(() => {
        fetchRenters();
    }, []);

    useEffect(() => {
        const filtered = renters.filter(renter =>
            renter.renterName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRenters(filtered);
    }, [searchQuery, renters]);

    const fetchRenters = async () => {
        try {
            const response = await axios.get('http://localhost:5000/renters');
            setRenters(response.data);
        } catch (error) {
            console.error('Error fetching renters:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/renters/delete/${id}`);
            fetchRenters();
        } catch (error) {
            console.error('Error deleting renter:', error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-renter/${id}`);
    };

    // Function to generate and download PDF
    const handleDownloadReport = () => {
        const doc = new jsPDF();
        doc.text('Renter Report', 14, 16);

        const tableColumn = ['Renter Name', 'NIC Number', 'Age', 'Description', 'Contact Number'];
        const tableRows = [];

        filteredRenters.forEach(renter => {
            const renterData = [
                renter.renterName,
                renter.nicNumber,
                renter.age,
                renter.description,
                renter.contactNumber,
            ];
            tableRows.push(renterData);
        });

        // Add table to PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        // Save the PDF
        doc.save('renters_report.pdf');
    };

    return (
        <div style={styles.container}>
            <div style={styles.buttonContainer}>
                <button onClick={() => navigate('/add-renter')} style={styles.addButton}>
                    Add Renter
                </button>
                <button onClick={handleDownloadReport} style={styles.reportButton}>
                    Generate PDF Report
                </button>
            </div>

            {/* Search Input */}
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by renter name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.tableFrame}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Renter Name</th>
                            <th style={styles.tableHeader}>NIC Number</th>
                            <th style={styles.tableHeader}>Age</th>
                            <th style={styles.tableHeader}>Description</th>
                            <th style={styles.tableHeader}>Contact Number</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRenters.map(renter => (
                            <tr key={renter._id}>
                                <td style={styles.tableCell}>{renter.renterName}</td>
                                <td style={styles.tableCell}>{renter.nicNumber}</td>
                                <td style={styles.tableCell}>{renter.age}</td>
                                <td style={styles.tableCell}>{renter.description}</td>
                                <td style={styles.tableCell}>{renter.contactNumber}</td>
                                <td style={styles.tableCell}>
                                    <button onClick={() => handleUpdate(renter._id)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => handleDelete(renter._id)} style={styles.deleteButton}>Delete</button>
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
        padding: '20px',
        backgroundColor: '#f9f9f9',
        maxWidth: '1200px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    reportButton: {
        padding: '10px 20px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    searchContainer: {
        marginBottom: '20px',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    tableFrame: {
        border: '2px solid #007bff',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
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
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#ffc107',
        color: '#000',
        border: 'none',
        borderRadius: '5px',
        marginRight: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default RenterManager;
