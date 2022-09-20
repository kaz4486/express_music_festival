const Concert = require('../concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert', () => {
  it('should throw an error if no "performer" arg', () => {
    const con = new Concert({
      genre: 'rock',
      price: 40,
      day: 1,
      image: 'metallica.com/sdad',
    });
    con.validate((err) => {
      expect(err.errors.performer).to.exist;
    });
  });
  it('should throw an error if "performer" arg is not a string', () => {
    const cases = [{}, []];
    const genre = 'rock';
    const price = 40;
    const day = 1;
    const image = 'metallica.com/sdad';
    for (let performer of cases) {
      const con = new Concert({ performer, genre, price, day, image });
      con.validate((err) => {
        expect(err.errors.performer).to.exist;
      });
    }
  });
  it('should not throw an error if "performer" is okay', () => {
    const con = new Concert({
      performer: 'John Rock',
      genre: 'rock',
      price: 40,
      day: 1,
      image: 'metallica.com/sdad',
    });
    con.validate((err) => {
      expect(err).to.not.exist;
    });
  });
  after(() => {
    mongoose.models = {};
  });
});
