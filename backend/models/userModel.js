const { collection, addDoc, query, orderBy, limit, getDocs, doc, getDoc, updateDoc } = require('firebase/firestore');
const { db } = require('../config/firebaseConfig');

const getNextUserId = async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('id', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    let newUserId = 1;
    if (!querySnapshot.empty) {
        const lastUserDoc = querySnapshot.docs[0];
        newUserId = lastUserDoc.data().id + 1;
    }

    return newUserId;
};

const createUser = async (userData) => {
    const newUserId = await getNextUserId();
    await addDoc(collection(db, 'users'), {
        id: newUserId,
        ...userData,
    });
    return newUserId;
};

const getUserById = async (id) => {
    const userDoc = await getDoc(doc(db, 'users', id));
    if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
};

const updateUserById = async (id, updates) => {
    const userDoc = await getDoc(doc(db, 'users', id));
    if (userDoc.exists()) {
        await updateDoc(doc(db, 'users', id), updates);
        return true;
    }
    return false;
};

module.exports = { createUser, getUserById, updateUserById };