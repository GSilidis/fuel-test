/**
 * @jest-environment node
 */

const request = require('supertest');
const express = require('express');

const Stations = require('../../../../server/api/controller/stations');

let app;

describe('GET /api/stations/', () => {
    beforeEach(() => {
        app = express();
    });

    test('Should return 200 when request is correct', async () => {
        const service = {
            getStationList: async () => [],
        }
        app.use('/api/stations/', Stations.route(service));
        const { body, statusCode } = await request(app).get('/api/stations/');

        expect(statusCode).toEqual(200);
        expect(body).toEqual([]);
    });

    test('Should return 500 on db error', async () => {
        const service = {
            getStationList: async () => {
                throw new Error('mock');
            },
        }
        app.use('/api/stations/', Stations.route( service));
        const { body, statusCode } = await request(app).get('/api/stations/');

        expect(statusCode).toEqual(500);
        expect(body.detail).toBeTruthy();
    });
});

describe('GET /api/stations/{id}/', () => {
    beforeEach(() => {
        app = express();
    });

    test('Should return 200 when request is correct', async () => {
        const service = {
            getStationInfo: async () => { return { field: 'a' } },
        }
        app.use('/api/stations/', Stations.route(service));
        const { body, statusCode } = await request(app).get('/api/stations/123/');

        expect(statusCode).toEqual(200);
        expect(body).toEqual({field: 'a'});
    });

    test('Should return 404 on missing station', async () => {
        const service = {
            getStationInfo: async () => null,
        }
        app.use('/api/stations/', Stations.route(service));
        const { body, statusCode } = await request(app).get('/api/stations/404/');

        expect(statusCode).toEqual(404);
        expect(body.detail).toBeTruthy();
    });

    test('Should return 500 on db error', async () => {
        const service = {
            getStationInfo: async () => { throw new Error('mock')},
        }
        app.use('/api/stations/', Stations.route(service));
        const { body, statusCode } = await request(app).get('/api/stations/500/');

        expect(statusCode).toEqual(500);
        expect(body.detail).toBeTruthy();
    });
});
