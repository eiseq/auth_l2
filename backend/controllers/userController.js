const { db, doc, getDoc, updateDoc } = require('../config/firebaseConfig');
const { validateField } = require('../utils/validation');

const getUserData = async (req, res) => {
    try {
        const { uid } = req.params;
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (userDoc.exists()) {
            const userData = { uid: userDoc.id, ...userDoc.data() };
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ error: 'Error retrieving user data', details: error.message });
    }
};

const updateUserData = async (req, res) => {
    try {
        const { uid } = req.params;
        const { field, value } = req.body;

        const validationErrors = validateField(field, value);
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({ error: 'Validation failed', details: validationErrors });
        }

        const userDoc = await getDoc(doc(db, 'users', uid));

        if (userDoc.exists()) {
            await updateDoc(doc(db, 'users', uid), {
                [field]: value,
            });
            res.status(200).json({ message: 'User data updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ error: 'Error updating user data', details: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Error logging out user', details: error.message });
    }
};

module.exports = { getUserData, updateUserData, logoutUser };