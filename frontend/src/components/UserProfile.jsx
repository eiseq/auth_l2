import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../assets/styles/global.css';

const UserProfile = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [newValue, setNewValue] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/user/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleEditClick = (field) => {
        setEditingField(field);
        setNewValue(userData[field]);
    };

    const handleSaveClick = async () => {
        if (!editingField || !newValue) return;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/update-user', {
                id,
                field: editingField,
                value: newValue,
            });
            setUserData({ ...userData, [editingField]: newValue });
            setEditingField(null);
            setNewValue('');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2 className="user-profile__title">User Profile</h2>
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
        </div>
    );
};

export default UserProfile;