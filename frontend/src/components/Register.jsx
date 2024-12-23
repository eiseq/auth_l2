import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { generateRandomPassword } from '../utils';
import '../assets/styles/global.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        nickname: '',
        phone: '',
        gender: '',
        avatar: null,
    });
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && isValidImageFile(file)) {
            setFormData({ ...formData, avatar: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setError('Invalid file type. Please upload a valid image file.');
        }
    };

    const handleGeneratePassword = () => {
        const password = generateRandomPassword(16);
        setFormData({ ...formData, password, confirmPassword: password });
    };

    const handleRegister = async () => {
        const { email, password, confirmPassword, name, nickname, phone, gender, avatar } = formData;

        if (!email || !password || !confirmPassword || !name || !nickname || !phone || !gender) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('email', email);
        formDataToSend.append('password', password);
        formDataToSend.append('name', name);
        formDataToSend.append('nickname', nickname);
        formDataToSend.append('phone', phone);
        formDataToSend.append('gender', gender);
        if (avatar) {
            formDataToSend.append('avatar', avatar);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('uid', response.data.userId);
            navigate(`/profile/${response.data.userId}`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.details) {
                setError(Object.values(error.response.data.details).join(', '));
            } else {
                setError('Error registering user: ' + error.message);
            }
        }
    };

    const isValidImageFile = (file) => {
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        return validExtensions.includes(fileExtension);
    };

    return (
        <div className="register">
            <h2 className="register__title">Register</h2>
            {error && <p className="register__error">{error}</p>}
            <div className="form-group">
                <label className="form-group__label" htmlFor="email">Email</label>
                <input className="form-group__input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="form-group__label" htmlFor="password">Password</label>
                <input className="form-group__input" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="form-group__label" htmlFor="confirmPassword">Confirm Password</label>
                <input className="form-group__input" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <button className="btn btn--secondary" onClick={handleGeneratePassword}>Generate Random Password</button>
            <div className="form-group">
                <label className="form-group__label" htmlFor="name">Name</label>
                <input className="form-group__input" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="form-group__label" htmlFor="nickname">Nickname</label>
                <input className="form-group__input" type="text" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="form-group__label" htmlFor="phone">Phone</label>
                <input className="form-group__input" type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="form-group__label" htmlFor="gender">Gender</label>
                <select className="form-group__input" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label className="form-group__label" htmlFor="avatar">Avatar</label>
                <input className="form-group__input" type="file" id="avatar" onChange={handleFileChange} />
                {previewUrl && <img src={previewUrl} alt="Preview" style={{ marginTop: '10px', width: '100px', height: '100px', borderRadius: '50%' }} />}
            </div>
            <button className="btn" onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;