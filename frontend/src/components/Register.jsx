import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { validateFields, generateRandomPassword, uploadImage } from '../utils';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR_URL = 'https://i.ibb.co/gjgSdCw/avatar.png';

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
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleRegister = async () => {
        const validationErrors = validateFields(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const { email, password, confirmPassword, name, nickname, phone, gender, avatar } = formData;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let avatarUrl = DEFAULT_AVATAR_URL;
            if (avatar) {
                avatarUrl = await uploadImage(avatar);
            }

            await setDoc(doc(db, 'users', user.uid), {
                name,
                nickname,
                phone,
                gender,
                avatar: avatarUrl,
            });

            navigate('/', { state: { avatarUrl } });
        } catch (error) {
            alert('Error registering user: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p>{errors.email}</p>}
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p>{errors.password}</p>}
            <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p>{errors.name}</p>}
            <input type="text" placeholder="Nickname" name="nickname" value={formData.nickname} onChange={handleChange} />
            {errors.nickname && <p>{errors.nickname}</p>}
            <input type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p>{errors.phone}</p>}
            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {errors.gender && <p>{errors.gender}</p>}
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setFormData({ ...formData, password: generateRandomPassword(16) })}>Generate Random Password</button>
        </div>
    );
};

export default Register;