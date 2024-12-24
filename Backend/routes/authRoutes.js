const express = require('express');
const authController = require('../controllers/authController');

const authRoutes = express();


authRoutes.post('/register', authController.register);


authRoutes.post('/login', authController.login);

module.exports = authRoutes;
