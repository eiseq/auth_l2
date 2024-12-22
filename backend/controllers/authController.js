const { createUserWithEmailAndPassword } = require('firebase/auth');
const { doc, setDoc } = require('firebase/firestore');
const { auth, db } = require('../config/firebaseConfig');
const { uploadImage } = require('../utils/uploadImage');
const { validateFields } = require('../utils/validation.js');

const DEFAULT_AVATAR_URL = 'https://i.ibb.co/gjgSdCw/avatar.png';

const registerUser = async (req, res) => {
    const { email, password, name, nickname, phone, gender } = req.body;
    const avatar = req.file;

    const validationErrors = validateFields(req.body);
    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({ error: 'Validation failed', details: validationErrors });
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

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
};

module.exports = { registerUser };
