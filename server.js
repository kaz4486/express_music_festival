const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;

const io = socket(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {});

app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(helmet());

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');
const clientsRoutes = require('./routes/clients.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', concertsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', clientsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
const MongoDB_Username = process.env.MONGODB_USERNAME;
const MongoDB_Password = process.env.MONGODB_PASSWORD;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = 'url to remote db';
else if (NODE_ENV === 'test')
  dbUri = 'mongodb://localhost:27017/NewWaveDBDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

if (NODE_ENV === 'production')
  connectionString = `mongodb+srv://${MongoDB_Username}:${MongoDB_Password}@cluster0.telw8lc.mongodb.net/NewWaveDB?retryWrites=true&w=majority`;
else
  connectionString =
    'mongodb+srv://kaz4486:Robinho789@cluster0.telw8lc.mongodb.net/NewWaveDB?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));
