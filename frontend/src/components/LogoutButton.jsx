import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/global.css';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button className="btn btn--logout" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
