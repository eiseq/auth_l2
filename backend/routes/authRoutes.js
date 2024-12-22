const express = require('express');
const { registerUser } = require('../controllers/authController');
const { getUserData, updateUserData } = require('../controllers/userController');
const fileUpload = require('express-fileupload');

const router = express.Router();

router.post('/register', fileUpload(), registerUser);
router.get('/user/:id', getUserData);
router.post('/update-user', updateUserData);

module.exports = router;