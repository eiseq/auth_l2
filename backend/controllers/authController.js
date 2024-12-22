const { createUserWithEmailAndPassword } = require('firebase/auth');
const { doc, setDoc } = require('firebase/firestore');
const { auth, db } = require('../config/firebaseConfig');
const { uploadImage } = require('../utils/uploadImage');

const DEFAULT_AVATAR_URL = 'https://i.ibb.co/gjgSdCw/avatar.png';

const registerUser = async (req, res) => {
    const { email, password, name, nickname, phone, gender, avatar } = req.body;

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

        res.status(200).send('Registration successful');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
};

module.exports = { registerUser };