const { doc, getDoc, updateDoc } = require('firebase/firestore');
const { db } = require('../config/firebaseConfig');

const getUserData = async (req, res) => {
    const { id } = req.params;

    try {
        const userDoc = await getDoc(doc(db, 'users', id.toString()));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user data', details: error.message });
    }
};

const updateUserData = async (req, res) => {
    const { id, field, value } = req.body;

    try {
        const userDoc = await getDoc(doc(db, 'users', id.toString()));
        if (userDoc.exists()) {
            await updateDoc(doc(db, 'users', id.toString()), {
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

module.exports = { getUserData, updateUserData };