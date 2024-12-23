const express = require('express');
const { registerUser } = require('../controllers/authController');
const { getUserData, updateUserData, logoutUser } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.get('/user/:id', authenticateToken, getUserData);
router.post('/update-user', authenticateToken, updateUserData);
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;