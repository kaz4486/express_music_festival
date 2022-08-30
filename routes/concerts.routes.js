const express = require('express');

const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const getConcertsById = db.concerts.find(
    (element) => element.id == req.params.id
  );
  res.json(getConcertsById);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newElement = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  };
  if (performer && genre && price && day && image) {
    db.concerts.push(newElement);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: '404 not found...' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const elementToModify = db.concerts.find(
    (element) => element.id == req.params.id
  );
  if (performer && genre && price && day && image) {
    elementToModify.performer = performer;
    elementToModify.genre = genre;
    elementToModify.price = price;
    elementToModify.day = day;
    elementToModify.image = image;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: '404 not found...' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const elementToDelete = db.concerts.find(
    (element) => element.id == req.params.id
  );
  const indexElementToDelete = db.concerts.indexOf(elementToDelete);
  db.concerts.splice(indexElementToDelete, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
