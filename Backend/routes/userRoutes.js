const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const userRoutes = express();


userRoutes.get('/', authMiddleware.authenticateToken, userController.getAllUsers);


// userRoutes.get('/:userId', authMiddleware, userController.getAllUsers);

module.exports = userRoutes;
