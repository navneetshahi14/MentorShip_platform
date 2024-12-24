const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const profileRoutes = express();


profileRoutes.get('/', authMiddleware.authenticateToken, profileController.getProfile);

profileRoutes.post('/create', authMiddleware.authenticateToken, profileController.createProfile);

profileRoutes.post('/update', authMiddleware.authenticateToken, profileController.updateProfile);

profileRoutes.delete('/', authMiddleware.authenticateToken, profileController.deleteProfile);

module.exports = profileRoutes;
