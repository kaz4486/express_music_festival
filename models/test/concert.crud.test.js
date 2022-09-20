const Concert = require('../concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/NewWaveDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });
  describe('Reading data', () => {
    before(async () => {
      const testConOne = new Concert({
        performer: 'Red Hot Chili Peppers',
        genre: 'funk rock',
        price: 100,
        day: 2,
        image: 'rhcp.com/asdas',
        tickets: 10,
      });
      await testConOne.save();

      const testConTwo = new Concert({
        performer: 'Jorja Smith',
        genre: 'soul r&b',
        price: 50,
        day: 1,
        image: 'jorja.com/asdas',
        tickets: 35,
      });
      await testConTwo.save();
    });
    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      const expectedLength = 2;
      expect(concerts.length).to.be.equal(expectedLength);
    });
    it('should return a proper document by "performer" with "findOne" method', async () => {
      const concert = await Concert.findOne({
        performer: 'Red Hot Chili Peppers',
      });
      const expectedName = 'Red Hot Chili Peppers';
      expect(concert.performer).to.be.equal(expectedName);
    });
    after(async () => {
      await Concert.deleteMany();
    });
  });
});
