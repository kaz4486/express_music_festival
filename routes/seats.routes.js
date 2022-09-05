const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
  req.io.emit('seatsUpdated', db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const getSeatsById = db.seats.find((element) => element.id == req.params.id);
  res.json(getSeatsById);
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newElement = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };

  if (
    day &&
    seat &&
    client &&
    email &&
    !db.seats.some(
      (element) =>
        element.seat == newElement.seat && element.day == newElement.day
    )
  ) {
    db.seats.push(newElement);
    req.io.emit('seatsUpdated', db.seats);

    res.json({ message: 'OK' });
  } else if (
    day &&
    seat &&
    client &&
    email &&
    db.seats.some(
      (element) =>
        element.seat == newElement.seat && element.day == newElement.day
    )
  ) {
    res.status(404).json({ message: 'The slot is already taken...' });
  } else {
    res.status(404).json({ message: '404 not found...' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const elementToModify = db.seats.find(
    (element) => element.id == req.params.id
  );
  if (day && seat && client && email) {
    elementToModify.day = day;
    elementToModify.seat = seat;
    elementToModify.client = client;
    elementToModify.email = email;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: '404 not found...' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const elementToDelete = db.seats.find(
    (element) => element.id == req.params.id
  );
  const indexElementToDelete = db.seats.indexOf(elementToDelete);
  db.seats.splice(indexElementToDelete, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
