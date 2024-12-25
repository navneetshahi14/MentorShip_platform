const express = require('express');
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');

const requestRoutes = express();


requestRoutes.post('/', authMiddleware.authenticateToken, requestController.createRequest);

requestRoutes.get('/', authMiddleware.authenticateToken, requestController.getRequests);

requestRoutes.post('/:requestId', authMiddleware.authenticateToken, requestController.updateRequestStatus);

module.exports = requestRoutes;
