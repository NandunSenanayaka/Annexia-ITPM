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

    useEffect(() => {
        fetchRenters();
    }, [location.state?.refresh]);

    const fetchRenters = async () => {
        try {
            const response = await axios.get(URL);
            setRenters(response.data.renters);
            setFilteredRenters(response.data.renters);
            setError(null);
        } catch (error) {
            console.error('Error fetching renters:', error);
            setError('Failed to fetch renters. Please try again later.');
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = renters.filter(renter =>
            renter.RenterName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredRenters(filtered);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            fetchRenters();
        } catch (error) {
            console.error('Error deleting renter:', error);
            setError('Failed to delete renter. Please try again later.');
        }
    };

    const handleUpdate = (id) => {
        navigate(`/RenterUpdate/${id}`);
    };

    const handleRegisterEmail = async (id) => {
        try {
            await axios.post(`${URL}/notify-register/${id}`);
            alert("Registration email sent!");
        } catch (error) {
            alert("Failed to send registration email.");
        }
    };

    const handlePaymentEmail = async (id) => {
        try {
            await axios.post(`${URL}/notify-payment/${id}`);
            alert("Payment email sent!");
        } catch (error) {
            alert("Failed to send payment email.");
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Renter Details', 10, 10);

        const columns = [
            'Renter Name', 'NIC Number', 'Age', 'Date', 'Mail', 'Description', 'Contact Number'
        ];

        const rows = filteredRenters.map(renter => [
            renter.RenterName,
            renter.NicNumber,
            renter.Age,
            new Date(renter.Date).toLocaleDateString('en-CA'),
            renter.Mail,
            renter.description,
            renter.ContactNumber,
        ]);

        autoTable(doc, { head: [columns], body: rows, startY: 20 });
        doc.save('Renter_Details.pdf');
    };

    const handleManageRooms = () => {
        navigate('/RoomAvilable', { state: { renters } });
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerCard}>
                {error && <div style={styles.errorMessage}>{error}</div>}

                <div style={styles.buttonContainer}>
                    <button onClick={() => navigate('/RenterAdd')} style={styles.addButton}>Add Renter</button>
                    <button onClick={generatePDF} style={styles.pdfButton}>Generate PDF</button>
                    <button onClick={handleManageRooms} style={styles.manageRoomsButton}>Manage Rooms</button>
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
                                    <td style={styles.tableCell}>{new Date(renter.Date).toLocaleDateString('en-CA')}</td>
                                    <td style={styles.tableCell}>{renter.Mail}</td>
                                    <td style={styles.tableCell}>{renter.description}</td>
                                    <td style={styles.tableCell}>{renter.ContactNumber}</td>
                                    <td style={{ ...styles.tableCell, ...styles.buttonRow }}>
                                        <button onClick={() => handleUpdate(renter._id)} style={styles.editButton}>Edit</button>
                                        <button onClick={() => handleDelete(renter._id)} style={styles.deleteButton}>Delete</button>
                                        <button onClick={() => handleRegisterEmail(renter._id)} style={styles.registerButton}>Notify Register</button>
                                        <button onClick={() => handlePaymentEmail(renter._id)} style={styles.paymentButton}>Notify Payment</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("/amy.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflowY: 'auto',
        fontFamily: 'Arial, sans-serif',
    },
    innerCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '1300px',
        width: '100%',
        margin: '40px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    pdfButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    manageRoomsButton: {
        padding: '10px 20px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
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
    },
    tableFrame: {
        border: '2px solidrgb(0, 217, 255)',
        borderRadius: '12px',
        padding: '10px',
        backgroundImage: 'url("caro.jpg")', // ⚠️ Place this image in /public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
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
        textAlign: 'center',
        border: '1px solid #ddd',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: '12px',
        border: '1px solid #ddd',
        fontSize: '14px',
        textAlign: 'center',
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: '6px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    editButton: {
        padding: '6px 12px',
        backgroundColor: '#ffc107',
        color: '#000',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '6px 12px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    registerButton: {
        padding: '6px 12px',
        backgroundColor: '#17a2b8',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    paymentButton: {
        padding: '6px 12px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default RenterManager;
