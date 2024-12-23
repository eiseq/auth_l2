import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import '../assets/styles/global.css';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (token && userId) {
                    const response = await axios.get(`http://localhost:5000/api/auth/user/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserData(response.data);
                } else {
                    navigate('/register');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
            }
        };

        fetchUserData();
    }, [id, token, userId, navigate]);

    const handleEditClick = (field) => {
        if (token && userId) {
            setEditingField(field);
            setNewValue(userData[field]);
            setError('');
        } else {
            navigate('/register');
        }
    };

    const handleSaveClick = async () => {
        if (!editingField || !newValue) return;

        const formData = new FormData();
        formData.append('id', id);
        formData.append('field', editingField);
        formData.append('value', newValue);

        try {
            if (token && userId) {
                const response = await axios.post('http://localhost:5000/api/auth/update-user', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                setUserData({ ...userData, [editingField]: newValue });
                setEditingField(null);
                setNewValue('');
                setError('');
            } else {
                navigate('/register');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.details) {
                setError(Object.values(error.response.data.details).join(', '));
            } else {
                setError('Error updating user data: ' + error.message);
            }
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2 className="user-profile__title">User Profile</h2>
            {error && <p className="register__error">{error}</p>}
            <div className="user-profile__field">
                <label className="user-profile__label">Email:</label>
                <span className="user-profile__value">{userData.email}</span>
            </div>
            <div className="user-profile__field">
                <label className="user-profile__label">Name:</label>
                {editingField === 'name' ? (
                    <input
                        className="user-profile__input"
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                ) : (
                    <span className="user-profile__value">{userData.name}</span>
                )}
                {editingField === 'name' ? (
                    <button className="btn" onClick={handleSaveClick}>Save</button>
                ) : (
                    <button className="btn btn--secondary" onClick={() => handleEditClick('name')}>Edit</button>
                )}
            </div>
            <div className="user-profile__field">
                <label className="user-profile__label">Nickname:</label>
                {editingField === 'nickname' ? (
                    <input
                        className="user-profile__input"
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                ) : (
                    <span className="user-profile__value">{userData.nickname}</span>
                )}
                {editingField === 'nickname' ? (
                    <button className="btn" onClick={handleSaveClick}>Save</button>
                ) : (
                    <button className="btn btn--secondary" onClick={() => handleEditClick('nickname')}>Edit</button>
                )}
            </div>
            <div className="user-profile__field">
                <label className="user-profile__label">Phone:</label>
                {editingField === 'phone' ? (
                    <input
                        className="user-profile__input"
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                ) : (
                    <span className="user-profile__value">{userData.phone}</span>
                )}
                {editingField === 'phone' ? (
                    <button className="btn" onClick={handleSaveClick}>Save</button>
                ) : (
                    <button className="btn btn--secondary" onClick={() => handleEditClick('phone')}>Edit</button>
                )}
            </div>
            <div className="user-profile__field">
                <label className="user-profile__label">Gender:</label>
                {editingField === 'gender' ? (
                    <select
                        className="user-profile__input"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                ) : (
                    <span className="user-profile__value">{userData.gender}</span>
                )}
                {editingField === 'gender' ? (
                    <button className="btn" onClick={handleSaveClick}>Save</button>
                ) : (
                    <button className="btn btn--secondary" onClick={() => handleEditClick('gender')}>Edit</button>
                )}
            </div>
            <div className="user-profile__field">
                <label className="user-profile__label">Avatar:</label>
                <img src={userData.avatar} alt="User Avatar" className="user-profile__avatar" />
            </div>
            <LogoutButton />
        </div>
    );
};

export default UserProfile;