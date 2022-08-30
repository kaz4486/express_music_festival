const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  const getTestimonialById = db.testimonials.find(
    (element) => element.id == req.params.id
  );
  res.json(getTestimonialById);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newElement = {
    id: uuidv4(),
    author: author,
    text: text,
  };
  if (author && text) {
    db.testimonials.push(newElement);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: '404 not found...' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const elementToModify = db.testimonials.find(
    (element) => element.id == req.params.id
  );
  if (author && text) {
    elementToModify.author = author;
    elementToModify.text = text;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: '404 not found...' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const elementToDelete = db.testimonials.find(
    (element) => element.id == req.params.id
  );
  const indexElementToDelete = db.testimonials.indexOf(elementToDelete);
  db.testimonials.splice(indexElementToDelete, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
