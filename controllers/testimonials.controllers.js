const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;

  try {
    const testimonial = await Testimonial.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { author, text } },
      { new: true }
    );
    if (testimonial) {
      res.json({
        message: 'OK',
        modifiedTestimonial: testimonial,
      });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOneAndDelete({
      _id: req.params.id,
    });
    if (testimonial) {
      res.json({ message: 'OK', deletedTestimonial: testimonial });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
