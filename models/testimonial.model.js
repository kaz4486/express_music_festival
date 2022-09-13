const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true, ref: 'Participant' },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
