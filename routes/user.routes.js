// user routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/user', userController.CreateUser);

module.exports = router;
