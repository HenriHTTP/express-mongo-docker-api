const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//validations
const registerValidation = require('../validations/Register.validation');

router.post('/user', registerValidation, userController.registerUser);

module.exports = router;
