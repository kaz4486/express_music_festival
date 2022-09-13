const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clients.controllers');

// const db = require('../db');
// const { v4: uuidv4 } = require('uuid');

router.get('/clients', ClientController.getAll);

router.get('/clients/:id', ClientController.getById);

router.post('/clients', ClientController.post);

router.put('/clients/:id', ClientController.put);

router.delete('/clients/:id', ClientController.delete);

module.exports = router;
