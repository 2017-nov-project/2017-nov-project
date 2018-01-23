process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const House = require('../models');

describe('api', () => {
    describe('/houses', function () {
        it('GET returns an object with all topics and status 200', () => {
            return request(app)
                .get('/api/houses')
                .expect(200)
                .then(res => {
                    //console.log(res.body)
                })
        })
    })
})