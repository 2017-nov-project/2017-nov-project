process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const House = require('../models');

describe('api', () => {
    describe('/houses', function () {
        it('GET returns an object with all houses and status 200', () => {
            return request(app)
                .get('/api/houses')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1000);
                });
        });
    });
    describe('/postcode/:postcode', function () {
        it('/average_price - GET returns an array with average price for given postcode and status 200', () => {
            return request(app)
                .get('/api/postcode/B23 6QF/average_price')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('B23 6QF');
                    expect(res.body[0].average).to.equal(24000);
                });
        });
        it('/average_price?street=(street_name) - GET returns an array with average price for given postcode and street and status 200', () => {
            return request(app)
                .get('/api/postcode/B23 6QF/average_price?street=DEAN ROAD')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('B23 6QF');
                    expect(res.body[0].average).to.equal(24000);
                });
        });
        it('/houses - GET returns an object with all houses for given postcode and status 200', () => {
            return request(app)
                .get('/api/postcode/B23 6QF/houses')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].postcode).to.equal('B23 6QF');
                });
        });
        it('/houses?street=(street_name) - GET returns an object with all houses for given postcode and street and status 200', () => {
            return request(app)
                .get('/api/postcode/B23 6QF/houses?street=DEAN ROAD')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].postcode).to.equal('B23 6QF');
                    expect(res.body.houses[0].street).to.equal('DEAN ROAD');
                });
        });
    });
    describe('/locality/:locality', function () {
        it('/average_price - GET returns an array with average price for given locality and status 200', () => {
            return request(app)
                .get('/api/locality/BRIDLINGTON/average_price')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('BRIDLINGTON');
                    expect(res.body[0].average).to.equal(48475);
                });
        });
        it('/average_price?street=(street_name) - GET returns an array with average price for given locality and street and status 200', () => {
            return request(app)
                .get('/api/locality/BRIDLINGTON/average_price?street=AVENUE COURT')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('BRIDLINGTON');
                    expect(res.body[0].average).to.equal(44950);
                });
        });
        it('/houses - GET returns an object with all houses for given locality and status 200', () => {
            return request(app)
                .get('/api/locality/BRIDLINGTON/houses')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(2);
                    expect(res.body.houses[0].locality).to.equal('BRIDLINGTON');
                });
        });
        it('/houses?street=(street_name) - GET returns an object with all houses for given locality and street and status 200', () => {
            return request(app)
                .get('/api/locality/BRIDLINGTON/houses?street=AVENUE COURT')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].locality).to.equal('BRIDLINGTON');
                    expect(res.body.houses[0].street).to.equal('AVENUE COURT');
                });
        });
    });
    describe('/town/:town', function () {
        it('/average_price - GET returns an array with average price for given town and status 200', () => {
            return request(app)
                .get('/api/town/YORK/average_price')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('YORK');
                    expect(res.body[0].average).to.equal(66740);
                });
        });
        it('/average_price?street=(street_name) - GET returns an array with average price for given town and street and status 200', () => {
            return request(app)
                .get('/api/town/YORK/average_price?street=TURNBERRY DRIVE')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('YORK');
                    expect(res.body[0].average).to.equal(55250);
                });
        });
        it('/houses - GET returns an object with all houses for given town and status 200', () => {
            return request(app)
                .get('/api/town/YORK/houses')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(5);
                    expect(res.body.houses[0].town).to.equal('YORK');
                });
        });
        it('/houses?street=(street_name) - GET returns an object with all houses for given town and street and status 200', () => {
            return request(app)
                .get('/api/town/YORK/houses?street=TURNBERRY DRIVE')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].town).to.equal('YORK');
                    expect(res.body.houses[0].street).to.equal('TURNBERRY DRIVE');
                });
        });
    });
    describe('/district/:district', function () {
        it('/average_price - GET returns an array with average price for given district and status 200', () => {
            return request(app)
                .get('/api/district/SOUTH BEDFORDSHIRE/average_price')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('SOUTH BEDFORDSHIRE');
                    expect(res.body[0].average).to.equal(72000);
                });
        });
        it('/average_price?street=(street_name) - GET returns an array with average price for given district and street and status 200', () => {
            return request(app)
                .get('/api/district/SOUTH BEDFORDSHIRE/average_price?street=HOCKLIFFE ROAD')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('SOUTH BEDFORDSHIRE');
                    expect(res.body[0].average).to.equal(135000);
                });
        });
        it('/houses - GET returns an object with all houses for given district and status 200', () => {
            return request(app)
                .get('/api/district/SOUTH BEDFORDSHIRE/houses')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(2);
                    expect(res.body.houses[0].district).to.equal('SOUTH BEDFORDSHIRE');
                });
        });
        it('/houses?street=(street_name) - GET returns an object with all houses for given district and street and status 200', () => {
            return request(app)
                .get('/api/district/SOUTH BEDFORDSHIRE/houses?street=HOCKLIFFE ROAD')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].district).to.equal('SOUTH BEDFORDSHIRE');
                    expect(res.body.houses[0].street).to.equal('HOCKLIFFE ROAD');
                });
        });
    });
    describe('/county/:county', function () {
        it('/average_price - GET returns an array with average price for given county and status 200', () => {
            return request(app)
                .get('/api/county/GREATER MANCHESTER/average_price')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('GREATER MANCHESTER');
                    expect(res.body[0].average).to.equal(49806.50943396227);
                });
        });
        it('/average_price?street=(street_name) - GET returns an array with average price for given county and street and status 200', () => {
            return request(app)
                .get('/api/county/GREATER MANCHESTER/average_price?street=BARDSLEY%20STREET')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('GREATER MANCHESTER');
                    expect(res.body[0].average).to.equal(26000)
                });
        });
        it('/houses - GET returns an object with all houses for given county and status 200', () => {
            return request(app)
                .get('/api/county/GREATER MANCHESTER/houses')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(53);
                    expect(res.body.houses[0].county).to.equal('GREATER MANCHESTER');
                });
        });
        it('/houses?street=(street_name) - GET returns an object with all houses for given county and street and status 200', () => {
            return request(app)
                .get('/api/county/GREATER MANCHESTER/houses?street=BARDSLEY%20STREET')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].county).to.equal('GREATER MANCHESTER');
                    expect(res.body.houses[0].street).to.equal('BARDSLEY STREET');
                });
        });
    });
});