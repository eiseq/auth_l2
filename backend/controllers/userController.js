const { doc, getDoc, updateDoc } = require('firebase/firestore');
const { auth, db } = require('../config/firebaseConfig');
const { validateFields } = require('../utils/validation');

const getUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const userDoc = await getDoc(doc(db, 'users', id));

        if (userDoc.exists()) {
            const userData = { id: userDoc.id, ...userDoc.data() };
            if (uid !== id) {
                return res.status(403).json({ error: 'Unauthorized: You do not have access to this user data' });
            }
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user data', details: error.message });
    }
};

const updateUserData = async (req, res) => {
    try {
        const { id, field, value } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const validationErrors = validateFields({ [field]: value });
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({ error: 'Validation failed', details: validationErrors });
        }

        const userDoc = await getDoc(doc(db, 'users', id));

        if (userDoc.exists()) {
            if (uid !== id) {
                return res.status(403).json({ error: 'Unauthorized: You do not have access to this user data' });
            }
            await updateDoc(doc(db, 'users', id), {
                [field]: value,
            });
            res.status(200).json({ message: 'User data updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating user data', details: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging out user', details: error.message });
    }
};

module.exports = { getUserData, updateUserData, logoutUser };