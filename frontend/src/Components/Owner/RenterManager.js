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
    // Your existing styles here
};

export default RenterManager;