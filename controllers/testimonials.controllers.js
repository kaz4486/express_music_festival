const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    return res.json(await Testimonial.find());
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.json(testimonial);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    return res.json({ message: 'OK' });
  } catch (err) {
    return res.status(500).json({ message: err });
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
      return res.json({
        message: 'OK',
        modifiedTestimonial: testimonial,
      });
    }
    return res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOneAndDelete({
      _id: req.params.id,
    });
    if (testimonial) {
      return res.json({ message: 'OK', deletedTestimonial: testimonial });
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
