const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

const oderValidation = require('../validations/oders/isValidOrder');

router.post('/register/', oderValidation, orderController.createOrder);

module.exports = router;
