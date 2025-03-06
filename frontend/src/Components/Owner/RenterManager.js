import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const URL = "http://localhost:5000/renter";

const RenterManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [renters, setRenters] = useState([]);
    const [filteredRenters, setFilteredRenters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    // Fetch renters from the backend
    useEffect(() => {
        fetchRenters();
    }, [location.state?.refresh]); // Re-fetch on state change

    const fetchRenters = async () => {
        try {
            const response = await axios.get(URL);
            setRenters(response.data.renters); // Ensure correct data format
            setFilteredRenters(response.data.renters); // Initialize filtered renters
            setError(null);
        } catch (error) {
            console.error('Error fetching renters:', error);
            setError('Failed to fetch renters. Please try again later.');
        }
    };

    // Handle search input change
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = renters.filter(renter =>
            renter.RenterName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredRenters(filtered);
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            fetchRenters();
        } catch (error) {
            console.error('Error deleting renter:', error);
            setError('Failed to delete renter. Please try again later.');
        }
    };

    // Handle update
    const handleUpdate = (id) => {
        navigate(`/RenterUpdate/${id}`);
    };

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text('Renter Details', 10, 10);

        // Define columns for the table
        const columns = [
            { header: 'Renter Name', dataKey: 'RenterName' },
            { header: 'NIC Number', dataKey: 'NicNumber' },
            { header: 'Age', dataKey: 'Age' },
            { header: 'Date', dataKey: 'Date' },
            { header: 'Mail', dataKey: 'Mail' },
            { header: 'Description', dataKey: 'description' },
            { header: 'Contact Number', dataKey: 'ContactNumber' },
        ];

        // Map filtered renters to rows
        const rows = filteredRenters.map(renter => [
            renter.RenterName,
            renter.NicNumber,
            renter.Age,
            renter.Date,
            renter.Mail,
            renter.description,
            renter.ContactNumber,
        ]);

        // Add table to PDF
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: rows,
            startY: 20,
        });

        // Save the PDF
        doc.save('Renter_Details.pdf');
    };

    return (
        <div style={styles.container}>
            {error && <div style={styles.errorMessage}>{error}</div>}

            <div style={styles.buttonContainer}>
                <button onClick={() => navigate('/RenterAdd')} style={styles.addButton}>
                    Add Renter
                </button>
                <button onClick={generatePDF} style={styles.pdfButton}>
                    Generate PDF
                </button>
            </div>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by Renter Name"
                    value={searchTerm}
                    onChange={handleSearch}
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
                            <th style={styles.tableHeader}>Date</th>
                            <th style={styles.tableHeader}>Mail</th>
                            <th style={styles.tableHeader}>Description</th>
                            <th style={styles.tableHeader}>Contact Number</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRenters.map(renter => (
                            <tr key={renter._id}>
                                <td style={styles.tableCell}>{renter.RenterName}</td>
                                <td style={styles.tableCell}>{renter.NicNumber}</td>
                                <td style={styles.tableCell}>{renter.Age}</td>
                                <td style={styles.tableCell}>{renter.Date}</td>
                                <td style={styles.tableCell}>{renter.Mail}</td>
                                <td style={styles.tableCell}>{renter.description}</td>
                                <td style={styles.tableCell}>{renter.ContactNumber}</td>
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

// Styles (same as before)
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        maxWidth: '1200px',
        margin: 'auto',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
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
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    pdfButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    searchInputFocus: {
        borderColor: '#007bff',
        boxShadow: '0 0 8px rgba(0, 123, 255, 0.3)',
    },
    tableFrame: {
        border: '2px solid #007bff',
        borderRadius: '12px',
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
    tableCell: {
        padding: '12px',
        border: '1px solid #ddd',
        fontSize: '14px',
    },
    editButton: {
        padding: '8px 16px',
        backgroundColor: '#ffc107',
        color: '#000',
        border: 'none',
        borderRadius: '6px',
        marginRight: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    deleteButton: {
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    hoverEffect: {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default RenterManager;