process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const { seedDB } = require('../seed/seed');

describe('api', () => {
    let app;
    
    before(() => {        
        return seedDB('mongodb://localhost:27017/housing_test')
            .then(() => {app = require('../app')});
    });

    after(() => mongoose.connection.db.dropDatabase());

    describe('/houses', () => {
        it('GET returns an object with all houses', () => {
            return request(app)
                .get('/api/houses')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1000);
                });
        });
        it('?property_type=(property_type) - GET returns an object with all houses for given property type', () => {
            return request(app)
                .get('/api/houses?property_type=S')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(320);
                    expect(res.body.houses[0].property_type).to.equal('S');
                });
        });
        it('?new_build=(new_build) - GET returns an object with all houses for given build status', () => {
            return request(app)
                .get('/api/houses?new_build=Y')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(133);
                    expect(res.body.houses[0].new_build).to.equal('Y');
                });
        });
    });
    describe('/average_price', () => {
        it('GET returns an array with average price for all UK houses', () => {
            return request(app)
                .get('/api/average_price')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0].average).to.equal(68278.409);
                });
        });
        it('?property_type=(property_type) - GET returns an array with average price for houses and given property type', () => {
            return request(app)
                .get('/api/average_price?property_type=S')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0].average).to.equal(59015.9875);
                });
        });
        it('?new_build=(new_build) - GET returns an array with average price for houses and given build status', () => {
            return request(app)
                .get('/api/average_price?new_build=Y')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0].average).to.equal(78391.72932330827);
                });
        });
    });
    describe('/coordinates/postcodes', () => {
        it('GET returns an object with all coordinates for available postcodes', () => {
            return request(app)
                .get('/api/coordinates/postcodes')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.coordinatesArr).to.be.an('array');
                    expect(res.body.coordinatesArr.length).to.equal(999);
                    expect(res.body.coordinatesArr[0].longitude).to.be.a('number');
                    expect(res.body.coordinatesArr[0].latitude).to.be.a('number');

                });
        });
    })
    describe('/postcode/:postcode/average_price', () => {
        it('GET returns an array with average price for given postcode', () => {
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
        it('?street=(street_name) - GET returns an array with average price for given postcode and street', () => {
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
        it('?property_type=(property_type) - GET returns an array with average price for given postcode and propert type', () => {
            return request(app)
                .get('/api/postcode/B13 0QH/average_price?property_type=S')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('B13 0QH');
                    expect(res.body[0].average).to.equal(78000);
                });
        });
        it('?new_build=(new_build) - GET returns an array with average price for given postcode and build status', () => {
            return request(app)
                .get('/api/postcode/B13 0QH/average_price?new_build=N')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('B13 0QH');
                    expect(res.body[0].average).to.equal(78000);
                });
        });
    });
    describe('/postcode/:postcode/houses', () => {
        it('GET returns an object with all houses for given postcode', () => {
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
        it('?street=(street_name) - GET returns an object with all houses for given postcode and street', () => {
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
        it('?property_type=(property_type) - GET returns an object with all houses for given postcode and property type', () => {
            return request(app)
                .get('/api/postcode/B23 6QF/houses?property_type=T')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].postcode).to.equal('B23 6QF');
                    expect(res.body.houses[0].property_type).to.equal('T');
                });
        });
        it('?new_build=(new_build) - GET returns an object with all houses for given postcode and build status', () => {
            return request(app)
                .get('/api/postcode/B23 6QF/houses?new_build=N')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].postcode).to.equal('B23 6QF');
                    expect(res.body.houses[0].new_build).to.equal('N');
                });
        });
    });
    describe('/postcode/:postcode/coordinates', () => {
        it('GET returns an object with latitude and longitude for given postcode', () => {
            return request(app)
                .get('/api/postcode/B23 6QF/coordinates')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.coordinates).to.be.an('object');
                    expect(res.body.coordinates.latitude).to.be.an('number');
                    expect(res.body.coordinates.longitude).to.be.an('number');
                })
        })
    });
    describe('/locality/:locality/average_price', () => {
        it('GET returns an array with average price for given locality', () => {
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
        it('?street=(street_name) - GET returns an array with average price for given locality and street', () => {
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
        it('?property_type=(property_type) - GET returns an array with average price for given locality and propert type', () => {
            return request(app)
                .get('/api/locality/BRIDLINGTON/average_price?property_type=S')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('BRIDLINGTON');
                    expect(res.body[0].average).to.equal(52000);
                });
        });
        it('?new_build=(new_build) - GET returns an array with average price for given locality and build status', () => {
            return request(app)
                .get('/api/locality/BRIDLINGTON/average_price?new_build=Y')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('BRIDLINGTON');
                    expect(res.body[0].average).to.equal(44950);
                });
        });
    });
    describe('/locality/:locality/houses', () => {
        it('GET returns an object with all houses for given locality', () => {
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
        it('?street=(street_name) - GET returns an object with all houses for given locality and street', () => {
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
        it('?property_type=(property_type) - GET returns an object with all houses for given locality and property type', () => {
            return request(app)
                .get('/api/locality/BRIDLINGTON/houses?property_type=S')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].locality).to.equal('BRIDLINGTON');
                    expect(res.body.houses[0].property_type).to.equal('S');
                });
        });
        it('?new_build=(new_build) - GET returns an object with all houses for given locality and build status', () => {
            return request(app)
                .get('/api/locality/BRIDLINGTON/houses?new_build=N')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].locality).to.equal('BRIDLINGTON');
                    expect(res.body.houses[0].new_build).to.equal('N');
                });
        });
    });
    describe('/town/:town/average_price', () => {
        it('GET returns an array with average price for given town', () => {
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
        it('?street=(street_name) - GET returns an array with average price for given town and street', () => {
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
        it('?property_type=(property_type) - GET returns an array with average price for given town and property type', () => {
            return request(app)
                .get('/api/town/YORK/average_price?property_type=S')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('YORK');
                    expect(res.body[0].average).to.equal(56125);
                });
        });
        it('?new_build=(new_build) - GET returns an array with average price for given town and build status', () => {
            return request(app)
                .get('/api/town/YORK/average_price?new_build=N')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('YORK');
                    expect(res.body[0].average).to.equal(66740);
                });
        });
    });
    describe('/town/:town/houses', () => {
        it('GET returns an object with all houses for given town', () => {
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
        it('/houses?street=(street_name) - GET returns an object with all houses for given town and street', () => {
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
        it('?property_type=(property_type) - GET returns an object with all houses for given town and property type', () => {
            return request(app)
                .get('/api/town/BRIDLINGTON/houses?property_type=S')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].town).to.equal('BRIDLINGTON');
                    expect(res.body.houses[0].property_type).to.equal('S');
                });
        });
        it('?new_build=(new_build) - GET returns an object with all houses for given town and build status', () => {
            return request(app)
                .get('/api/town/BRIDLINGTON/houses?new_build=N')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].town).to.equal('BRIDLINGTON');
                    expect(res.body.houses[0].new_build).to.equal('N');
                });
        });
    });
    describe('/town/:town/coordinates', () => {
        it('GET returns an object with latitude and longitude for given town', () => {
            return request(app)
                .get('/api/town/YORK/coordinates')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.coordinates).to.be.an('object');
                    expect(res.body.coordinates.latitude).to.be.an('number');
                    expect(res.body.coordinates.longitude).to.be.an('number');
                })
        })
    });
    describe('/district/:district/average_price', () => {
        it('GET returns an array with average price for given district', () => {
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
        it('?street=(street_name) - GET returns an array with average price for given district and street', () => {
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
        it('?property_type=(property_type) - GET returns an array with average price for given district and property type', () => {
            return request(app)
                .get('/api/district/SOUTH BEDFORDSHIRE/average_price?property_type=F')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('SOUTH BEDFORDSHIRE');
                    expect(res.body[0].average).to.equal(9000);
                });
        });
        it('?new_build=(new_build) - GET returns an array with average price for given district and build status', () => {
            return request(app)
                .get('/api/district/SOUTH BEDFORDSHIRE/average_price?new_build=N')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('SOUTH BEDFORDSHIRE');
                    expect(res.body[0].average).to.equal(72000);
                });
        });
    });
    describe('/district/:district/houses', () => {
        it('GET returns an object with all houses for given district', () => {
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
        it('?street=(street_name) - GET returns an object with all houses for given district and street', () => {
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
        it('?property_type=(property_type) - GET returns an object with all houses for given district and property type', () => {
            return request(app)
                .get('/api/district/SOUTH BEDFORDSHIRE/houses?property_type=F')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(1);
                    expect(res.body.houses[0].district).to.equal('SOUTH BEDFORDSHIRE');
                    expect(res.body.houses[0].property_type).to.equal('F');
                });
        });
        it('?new_build=(new_build) - GET returns an object with all houses for given district and build status', () => {
            return request(app)
                .get('/api/district/SOUTH BEDFORDSHIRE/houses?new_build=N')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(2);
                    expect(res.body.houses[0].district).to.equal('SOUTH BEDFORDSHIRE');
                    expect(res.body.houses[0].new_build).to.equal('N');
                });
        });
    });
    describe('/county/:county/average_prices', () => {
        it('GET returns an array with average price for given county', () => {
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
        it('?street=(street_name) - GET returns an array with average price for given county and street', () => {
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
        it('?property_type=(property_type) - GET returns an array with average price for given county and property type', () => {
            return request(app)
                .get('/api/county/GREATER MANCHESTER/average_price?property_type=F')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('GREATER MANCHESTER');
                    expect(res.body[0].average).to.equal(72975);
                });
        });
        it('?new_build=(new_build) - GET returns an array with average price for given county and build status', () => {
            return request(app)
                .get('/api/county/GREATER MANCHESTER/average_price?new_build=Y')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]._id).to.equal('GREATER MANCHESTER');
                    expect(res.body[0].average).to.equal(96149.16666666667);
                });
        });
    });
    describe('/county/:county/houses', () => {
        it('GET returns an object with all houses for given county', () => {
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
        it('?street=(street_name) - GET returns an object with all houses for given county and street', () => {
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
        it('?property_type=(property_type) - GET returns an object with all houses for given county and property type', () => {
            return request(app)
                .get('/api/county/GREATER MANCHESTER/houses?property_type=F')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(4);
                    expect(res.body.houses[0].county).to.equal('GREATER MANCHESTER');
                    expect(res.body.houses[0].property_type).to.equal('F');
                });
        });
        it('?new_build=(new_build) - GET returns an object with all houses for given county and build status', () => {
            return request(app)
                .get('/api/county/GREATER MANCHESTER/houses?new_build=Y')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.houses).to.be.an('array');
                    expect(res.body.houses.length).to.equal(6);
                    expect(res.body.houses[0].county).to.equal('GREATER MANCHESTER');
                    expect(res.body.houses[0].new_build).to.equal('Y');
                });
        });
    });
});