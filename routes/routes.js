// global routes
const express = require('express');
const router = express.Router();

//routes
const userRoutes = require('./user.routes');
const orderRoutes = require('./order.routes');

router.use('/api/user', userRoutes);
router.use('/api/order', orderRoutes);

module.exports = router;
