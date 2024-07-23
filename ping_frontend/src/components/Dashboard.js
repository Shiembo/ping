import React, { useState } from 'react';
import axios from 'axios';
import { processBitcoinPayment } from '../utils/payment';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('Processing payment...');

        // Placeholder for Bitcoin payment processing
        try {
            const paymentResponse = await processBitcoinPayment(); // Replace with actual payment logic

            if (paymentResponse.success) {
                setMessage('Payment successful. Pinging search engines...');
                
                const response = await axios.post('/api/ping', { site_url: url });

                if (response.data.success) {
                    setMessage('Search engines pinged successfully.');
                } else {
                    setMessage('Error pinging search engines: ' + response.data.message);
                }
            } else {
                setMessage('Payment failed: ' + paymentResponse.message);
            }
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your website URL"
                    required
                />
                <button type="submit">Ping Search Engines</button>
            </form>
            <div>{message}</div>
        </div>
    );
};

export default Dashboard;
