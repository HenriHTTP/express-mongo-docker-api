const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//validations
const registerValidation = require('../validations/Register.validation');
const loginValidation = require('../validations/login.validation');

router.post('/register', registerValidation, userController.registerUser);
router.post('/login', loginValidation, userController.loginUser);

module.exports = router;
