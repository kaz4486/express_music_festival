const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const seatsDay1 = await Seat.find({ day: 1 });
    const seatsDay2 = await Seat.find({ day: 2 });
    const ticketsLeftDay1 = 50 - seatsDay1.length;
    const ticketsLeftDay2 = 50 - seatsDay2.length;
    const concerts = await Concert.find();
    concerts.forEach((concert) => {
      concert.day === 1
        ? (concert.tickets = ticketsLeftDay1)
        : (concert.tickets = ticketsLeftDay2);
    });
    return res.json(concerts);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.json(concert);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const concert = await Concert.find({ performer: req.params.performer });
    if (!concert) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.json(concert);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const concert = await Concert.find({ genre: req.params.genre });
    console.log(concert);
    if (!concert) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.json(concert);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const concert = await Concert.find({
      price: { $gte: req.params.price_min, $lte: req.params.price_max },
    });
    if (!concert) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.json(concert);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const concert = await Concert.find({ day: req.params.day });
    if (!concert) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.json(concert);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    return res.json({ message: 'OK' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const concert = await Concert.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { performer, genre, price, day, image } },
      { new: true }
    );
    if (concert) {
      return res.json({
        message: 'OK',
        modifiedConcert: concert,
      });
    }
    return res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const concert = await Concert.findOneAndDelete({ _id: req.params.id });
    if (concert) {
      return res.json({ message: 'OK', deletedConcert: concert });
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
