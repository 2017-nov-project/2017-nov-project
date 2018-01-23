process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const House = require('../models');
const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const app = require('../listen');

describe('App', () => {

    it('responds with status 200', (done) => {
        chai.request(app)
            .get('/api/houses')
            .end((err, res) => {
                expect(res).to.have.status(200)
                console.log(res);
                done()
            })
    });
});