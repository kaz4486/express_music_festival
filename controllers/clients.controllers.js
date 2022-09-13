const Client = require('../models/client.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Client.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) res.status(404).json({ message: 'Not found' });
    else res.json(client);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newClient = new Client({ name, email });
    await newClient.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { name, email } = req.body;

  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name, email } },
      { new: true }
    );
    if (client) {
      res.json({
        message: 'OK',
        modifiedClient: client,
      });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ _id: req.params.id });
    if (client) {
      res.json({ message: 'OK', deletedClient: client });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
