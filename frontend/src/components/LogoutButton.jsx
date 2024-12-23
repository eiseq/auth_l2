import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/register');
    };

    return (
        <button className="btn" onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;