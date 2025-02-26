// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const RenterAdd = () => {
//     const [renterName, setRenterName] = useState('');
//     const [nicNumber, setNicNumber] = useState('');
//     const [age, setAge] = useState('');
//     const [description, setDescription] = useState('');
//     const [address, setAddress] = useState('');
//     const [contactNumber, setContactNumber] = useState('');
//     const [errors, setErrors] = useState({});

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationErrors = validateFields();

//         if (Object.keys(validationErrors).length === 0) {
//             const renterData = {
//                 RenterName: renterName,
//                 NicNumber: nicNumber,
//                 Age: age,
//                 description,
//                 Address: address,
//                 ContactNumber: contactNumber,
//             };

//             try {
//                 await axios.post('http://localhost:5000/renters/add', renterData);
//                 alert('Renter added successfully');
//                 navigate('/RenterDashboard');
//             } catch (error) {
//                 console.error('Error adding renter:', error);
//             }
//         } else {
//             setErrors(validationErrors);
//         }
//     };

//     const validateFields = () => {
//         const validationErrors = {};
//         if (!renterName) validationErrors.renterName = 'Renter Name is required.';
//         if (!nicNumber || isNaN(nicNumber)) validationErrors.nicNumber = 'Valid NIC Number is required.';
//         if (!age || isNaN(age) || age <= 0) validationErrors.age = 'Valid age is required.';
//         if (!description) validationErrors.description = 'Description is required.';
//         if (!address) validationErrors.address = 'Address is required.';
//         if (!contactNumber || isNaN(contactNumber)) validationErrors.contactNumber = 'Valid Contact Number is required.';
//         return validationErrors;
//     };

//     return React.createElement(
//         'div',
        
//         { style: styles.formContainer },
//         React.createElement(
//             'form',
//             { onSubmit: handleSubmit },
//             React.createElement('h2', { style: styles.heading }, 'Add Renter'),
            
//             React.createElement('label', { style: styles.label }, 'Renter Name:'),
//             React.createElement('input', { type: 'text', value: renterName, onChange: (e) => setRenterName(e.target.value), style: styles.input }),
//             errors.renterName && React.createElement('p', { style: styles.error }, errors.renterName),

//             React.createElement('label', { style: styles.label }, 'NIC Number:'),
//             React.createElement('input', { type: 'text', value: nicNumber, onChange: (e) => setNicNumber(e.target.value), style: styles.input }),
//             errors.nicNumber && React.createElement('p', { style: styles.error }, errors.nicNumber),

//             React.createElement('label', { style: styles.label }, 'Age:'),
//             React.createElement('input', { type: 'number', value: age, onChange: (e) => setAge(e.target.value), style: styles.input }),
//             errors.age && React.createElement('p', { style: styles.error }, errors.age),

//             React.createElement('label', { style: styles.label }, 'Description:'),
//             React.createElement('textarea', { value: description, onChange: (e) => setDescription(e.target.value), style: styles.textarea }),
//             errors.description && React.createElement('p', { style: styles.error }, errors.description),

//             React.createElement('label', { style: styles.label }, 'Address:'),
//             React.createElement('textarea', { value: address, onChange: (e) => setAddress(e.target.value), style: styles.textarea }),
//             errors.address && React.createElement('p', { style: styles.error }, errors.address),

//             React.createElement('label', { style: styles.label }, 'Contact Number:'),
//             React.createElement('input', { type: 'text', value: contactNumber, onChange: (e) => setContactNumber(e.target.value), style: styles.input }),
//             errors.contactNumber && React.createElement('p', { style: styles.error }, errors.contactNumber),

//             React.createElement('button', { type: 'submit', style: styles.button }, 'Add Renter')
//         )
//     );
// };

// const styles = {
//     formContainer: {
//         backgroundColor: '#ffffff',
//         padding: '20px 40px',
//         borderRadius: '10px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//         maxWidth: '400px',
//         margin: 'auto'
//     },
//     heading: { textAlign: 'center', marginBottom: '20px' },
//     label: { marginBottom: '8px', fontWeight: 'bold' },
//     input: {
//         padding: '10px',
//         marginBottom: '15px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         fontSize: '16px',
//         width: '100%'
//     },
//     textarea: {
//         padding: '10px',
//         marginBottom: '15px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         fontSize: '16px',
//         width: '100%'
//     },
//     button: {
//         padding: '10px',
//         backgroundColor: '#007bff',
//         color: 'white',
//         border: 'none',
//         borderRadius: '5px',
//         fontSize: '16px',
//         cursor: 'pointer'
//     },
//     error: { color: 'red', fontSize: '12px', marginBottom: '10px' }
// };

// export default RenterAdd;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OwnerDashboard from '../Owner/OwnerDashboard/OwnerDashboard'

const RenterAdd = () => {
    const [renterName, setRenterName] = useState('');
    const [nicNumber, setNicNumber] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length === 0) {
            const renterData = {
                RenterName: renterName,
                NicNumber: nicNumber,
                Age: age,
                description,
                Address: address,
                ContactNumber: contactNumber,
            };

            try {
                await axios.post('http://localhost:5000/renters/add', renterData);
                alert('Renter added successfully');
                navigate('/RenterDashboard');
            } catch (error) {
                console.error('Error adding renter:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateFields = () => {
        const validationErrors = {};
        if (!renterName) validationErrors.renterName = 'Renter Name is required.';
        if (!nicNumber || isNaN(nicNumber)) validationErrors.nicNumber = 'Valid NIC Number is required.';
        if (!age || isNaN(age) || age <= 0) validationErrors.age = 'Valid age is required.';
        if (!description) validationErrors.description = 'Description is required.';
        if (!address) validationErrors.address = 'Address is required.';
        if (!contactNumber || isNaN(contactNumber)) validationErrors.contactNumber = 'Valid Contact Number is required.';
        return validationErrors;
    };

    return (
        
        <div style={styles.formContainer}>
        <div className="owner-container">
        <OwnerDashboard/>
        <div className="owner-content">
      

            <form onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Add Renter</h2>
                <label style={styles.label}>Renter Name:</label>
                <input type='text' value={renterName} onChange={(e) => setRenterName(e.target.value)} style={styles.input} />
                {errors.renterName && <p style={styles.error}>{errors.renterName}</p>}

                <label style={styles.label}>NIC Number:</label>
                <input type='text' value={nicNumber} onChange={(e) => setNicNumber(e.target.value)} style={styles.input} />
                {errors.nicNumber && <p style={styles.error}>{errors.nicNumber}</p>}

                <label style={styles.label}>Age:</label>
                <input type='number' value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} />
                {errors.age && <p style={styles.error}>{errors.age}</p>}

                <label style={styles.label}>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} />
                {errors.description && <p style={styles.error}>{errors.description}</p>}

                <label style={styles.label}>Address:</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} style={styles.textarea} />
                {errors.address && <p style={styles.error}>{errors.address}</p>}

                <label style={styles.label}>Contact Number:</label>
                <input type='text' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} style={styles.input} />
                {errors.contactNumber && <p style={styles.error}>{errors.contactNumber}</p>}

                <button type='submit' style={styles.button}>Add Renter</button>
            </form>
        </div></div></div>
    );
};

const styles = {
    // formContainer: {
    //     backgroundColor: '#ffffff',
    //     padding: '20px 40px',
    //     borderRadius: '10px',
    //     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    //     maxWidth: '400px',
    //     margin: 'auto'
    // },
    heading: { textAlign: 'none', marginBottom: '20px' },
    label: { marginBottom: '8px', fontWeight: 'bold' },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%'
    },
    textarea: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    error: { color: 'red', fontSize: '12px', marginBottom: '10px' }
};

export default RenterAdd;
