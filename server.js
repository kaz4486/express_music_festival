const express = require('express');
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', concertsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});
