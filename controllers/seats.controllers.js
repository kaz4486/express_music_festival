const Seat = require('../models/seat.model');
const Client = require('../models/client.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
    // else res.json({...seat, client: client.name, email: client.email})
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  // req.body = sanitize(req.body);
  //??
  console.log(req.body);
  // const { day, seat, client, email } = req.body;
  try {
    const day = sanitize(req.body.day);
    const client = sanitize(req.body.client);
    const email = sanitize(req.body.email);
    const seat = sanitize(req.body.seat);
    console.log(day, client, email, seat);
    //dalej nie czyści
    const seatBooked = await Seat.findOne({ day, seat });
    if (seatBooked) {
      res.status(404).json({ message: 'Seat is booked' });
    } else {
      const clientInBase = await Client.findOne({ email });
      if (clientInBase) {
        const clientId = clientInBase._id;
        const newSeat = new Seat({
          day,
          seat,
          clientId,
        });
        const savedSeat = await newSeat.save();
        req.io.emit('seatsUpdated', savedSeat);
        res.json(savedSeat);
      } else {
        const newClient = new Client({ name: client, email });
        await newClient.save();
        const newSeat = new Seat({
          day,
          seat,
          clientId: newClient._id,
        });
        const savedSeat = await newSeat.save();
        req.io.emit('seatsUpdated', savedSeat);
        res.json(savedSeat);
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
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
      res.json({
        message: 'OK',
        modifiedSeatData: seatData,
      });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat = await Seat.findOneAndDelete({ _id: req.params.id });
    if (seat) {
      res.json({ message: 'OK', deletedSeat: seat });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
