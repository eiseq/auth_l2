const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getUserData, updateUserData, logoutUser } = require('../controllers/userController');
const { authenticateUid } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:uid', authenticateUid, getUserData);
router.post('/update-user', authenticateUid, updateUserData);
router.post('/logout', authenticateUid, logoutUser);

module.exports = router;