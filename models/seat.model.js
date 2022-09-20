const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  clientId: { type: String, require: true, ref: 'Client' },
  // email: { type: String, require: true },
  // client: { type: String, required: false, ref: 'Client' },
});

module.exports = mongoose.model('Seat', seatSchema);
