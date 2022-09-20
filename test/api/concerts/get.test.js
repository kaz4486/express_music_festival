const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'Red Hot Chili Peppers',
      genre: 'funk rock',
      price: 100,
      day: 2,
      image: 'rhcp.com/asdas',
      tickets: 10,
    });
    await testConOne.save();

    const testConTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'Jorja Smith',
      genre: 'soul r&b',
      price: 50,
      day: 1,
      image: 'jorja.com/asdas',
      tickets: 35,
    });
    await testConTwo.save();
    const testConThree = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee49',
      performer: 'Jorja Smith',
      genre: 'soul r&b',
      price: 60,
      day: 2,
      image: 'jorja.com/asdas',
      tickets: 20,
    });
    await testConThree.save();
  });
  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get(
      '/api/concerts/5d9f1140f10a81216cfd4408'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });
  it('/performer/:performer should return all concerts by :performer ', async () => {
    const res = await request(server).get(
      '/api/concerts/performer/Jorja Smith'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  it('/genre/:genre should return all concerts by :genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/funk rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  it('/price/:price_min/:price_max should return all concerts for which price is equal or greater than "price_min" and equal or lower than "price_max', async () => {
    const res = await request(server).get('/api/concerts/price/60/100');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  it('/concerts/price/day/:day should return all concerts by day', async () => {
    const res = await request(server).get('/api/concerts/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  after(async () => {
    await Concert.deleteMany();
  });
});
