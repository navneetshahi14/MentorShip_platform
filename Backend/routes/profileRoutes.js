const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const profileRoutes = express();


profileRoutes.get('/:userId', authMiddleware.authenticateToken, profileController.getProfile);

profileRoutes.post('/create/:userId', authMiddleware.authenticateToken, profileController.createProfile);

profileRoutes.post('/update/:userId', authMiddleware.authenticateToken, profileController.updateProfile);

profileRoutes.post('/delete/:userId', authMiddleware.authenticateToken, profileController.deleteProfile);

module.exports = profileRoutes;
