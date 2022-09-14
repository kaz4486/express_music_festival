const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('New socket!' + socket.id);
});

app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');
// const clientsRoutes = require('./routes/clients.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', concertsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
// app.use('/api', clientsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

mongoose.connect(
  'mongodb+srv://kaz4486:Robinho789@cluster0.telw8lc.mongodb.net/NewWaveDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));
