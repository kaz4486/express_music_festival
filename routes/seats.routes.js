const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controllers');

// const db = require('../db');
// const { v4: uuidv4 } = require('uuid');

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getById);

router.post('/seats', SeatController.post);

router.put('/seats/:id', SeatController.put);

router.delete('/seats/:id', SeatController.delete);

module.exports = router;
