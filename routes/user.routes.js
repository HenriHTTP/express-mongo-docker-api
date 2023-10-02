const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//validations
const registerValidation = require('../validations/Register.validation');
const loginValidation = require('../validations/login.validation');
const tokenValidation = require('../validations/tokenValidation');

router.post('/register', registerValidation, userController.registerUser);
router.post('/login', loginValidation, userController.loginUser);
router.get('/checkuser', tokenValidation, userController.checkuser);

module.exports = router;
