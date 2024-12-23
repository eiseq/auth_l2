const { db, doc, getDoc } = require('../config/firebaseConfig');

const authenticateUid = async (req, res, next) => {
    const { uid } = req.params;
    if (!uid) {
        return res.status(401).json({ error: 'Unauthorized: No uid provided' });
    }

    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (!userDoc.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = userDoc.data();
        next();
    } catch (error) {
        console.error('Error verifying uid:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid uid' });
    }
};

module.exports = { authenticateUid };