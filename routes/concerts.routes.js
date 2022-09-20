const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controllers');

// const db = require('../db');
// const { v4: uuidv4 } = require('uuid');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getById);

router.get('/concerts/performer/:performer', ConcertController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getByGenre);

router.get(
  '/concerts/price/:price_min/:price_max',
  ConcertController.getByPrice
);

router.get('/concerts/day/:day', ConcertController.getByDay);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.put);

router.delete('/concerts/:id', ConcertController.delete);

module.exports = router;
