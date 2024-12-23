const { createUserWithEmailAndPassword } = require('firebase/auth');
const { collection, addDoc } = require('firebase/firestore');
const { auth, db } = require('../config/firebaseConfig');
const { uploadImage } = require('../utils/uploadImage');
const { validateFields } = require('../utils/validation');

const DEFAULT_AVATAR_URL = 'https://i.ibb.co/gjgSdCw/avatar.png';

const registerUser = async (req, res) => {
    try {
        const { email, password, name, nickname, phone, gender } = req.body;
        const avatar = req.file;

        const validationErrors = validateFields({ email, password, name, nickname, phone, gender });
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({ error: 'Validation failed', details: validationErrors });
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        let avatarUrl = DEFAULT_AVATAR_URL;
        if (avatar) {
            avatarUrl = await uploadImage(avatar);
        }

        const userDocRef = await addDoc(collection(db, 'users'), {
            email,
            name,
            nickname,
            phone,
            gender,
            avatar: avatarUrl,
        });

        res.status(201).json({ message: 'Registration successful', userId: userDocRef.id });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
};

module.exports = { registerUser };