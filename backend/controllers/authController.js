const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { auth, db, collection, getDocs, doc, setDoc, query, orderBy, limit } = require('../config/firebaseConfig');
const { validateFields } = require('../utils/validation');

const DEFAULT_AVATAR_URL = 'https://i.ibb.co/gjgSdCw/avatar.png';

const registerUser = async (req, res) => {
    try {
        const { email, password, name, nickname, phone, gender, avatar } = req.body;

        const validationErrors = validateFields({ email, password, name, nickname, phone, gender });
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({ error: 'Validation failed', details: validationErrors });
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const avatarUrl = avatar || DEFAULT_AVATAR_URL;

        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('id', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        let newUserId = 1;
        if (!querySnapshot.empty) {
            const lastUserDoc = querySnapshot.docs[0];
            newUserId = lastUserDoc.data().id + 1;
        }

        await setDoc(doc(db, 'users', user.uid), {
            id: newUserId,
            userId: user.uid,
            email,
            name,
            nickname,
            phone,
            gender,
            avatar: avatarUrl,
        });

        const idToken = await user.getIdToken();

        res.status(201).json({ message: 'Registration successful', userId: user.uid, token: idToken });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }


};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        res.status(200).json({ message: 'Login successful', userId: user.uid });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error logging in user', details: error.message });
    }
};
module.exports = { registerUser, loginUser };