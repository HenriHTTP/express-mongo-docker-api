// global routes
const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');

router.use('/api/user', userRoutes);

module.exports = router;
