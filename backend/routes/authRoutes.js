const express = require('express');
const { registerUser } = require('../controllers/authController');
const { getUserData, updateUserData, logoutUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/user/:id', getUserData);
router.post('/update-user', updateUserData);
router.post('/logout', logoutUser);

module.exports = router;