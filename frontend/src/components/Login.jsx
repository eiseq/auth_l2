import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/global.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        const { email, password } = formData;

        if (!email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('uid', response.data.userId);
            navigate(`/profile/${response.data.userId}`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.details) {
                setError(Object.values(error.response.data.details).join(', '));
            } else {
                setError('Error logging in user: ' + error.message);
            }
        }
    };

    return (
        <div className="login">
            <h2 className="login__title">Login</h2>
            {error && <p className="login__error">{error}</p>}
            <div className="form-group">
                <label className="form-group__label" htmlFor="email">Email</label>
                <input className="form-group__input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="form-group__label" htmlFor="password">Password</label>
                <input className="form-group__input" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button className="btn" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;