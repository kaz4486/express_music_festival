const Seat = require('../models/seat.model');
const Client = require('../models/client.model');

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
  const { day, seat, client, email } = req.body;
  try {
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
        await newSeat.save();
        res.json({ message: 'OK' });
      } else {
        const newClient = new Client({ name: client, email });
        await newClient.save();
        const newSeat = new Seat({
          day,
          seat,
          clientId: newClient._id,
        });
        await newSeat.save();
        res.json({ message: 'OK' });
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
