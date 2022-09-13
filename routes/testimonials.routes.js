const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controllers');

// const db = require('../db');
// const { v4: uuidv4 } = require('uuid');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/:id', TestimonialController.getById);

router.post('/testimonials', TestimonialController.post);

router.put('/testimonials/:id', TestimonialController.put);

router.delete('/testimonials/:id', TestimonialController.delete);

module.exports = router;
