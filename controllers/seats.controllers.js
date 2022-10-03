const Seat = require('../models/seat.model');
const Client = require('../models/client.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    return res.json(await Seat.find());
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      res.status(404).json({ message: 'Not found' });
    }
    return res.json(seat);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const day = sanitize(req.body.day);
    const client = sanitize(req.body.client);
    const email = sanitize(req.body.email);
    const seat = sanitize(req.body.seat);

    const seatBooked = await Seat.findOne({ day, seat });
    if (seatBooked) {
      return res.status(404).json({ message: 'Seat is booked' });
    }
    const savedClient = await Client.findOneAndUpdate(
      { email },
      { name: client, email },
      { new: true, upsert: true }
    );

    const clientId = savedClient._id;
    const newSeat = new Seat({
      day,
      seat,
      clientId,
    });

    const savedSeat = await newSeat.save();
    req.io.emit('seatsUpdated', savedSeat);
    return res.json(savedSeat);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const seatData = await Seat.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { day, seat, client, email } },
      { new: true }
    );
    if (seatData) {
      return res.json({
        message: 'OK',
        modifiedSeatData: seatData,
      });
    }
    return res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat = await Seat.findOneAndDelete({ _id: req.params.id });
    if (seat) {
      return res.json({ message: 'OK', deletedSeat: seat });
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
