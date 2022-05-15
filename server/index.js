const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js');
const fuelService = require('./api/service/fuel');
const stationsController = require('./api/controller/stations');

config.dev = process.env.NODE_ENV !== 'production';
process.send = process.send || function () {};

const app = express();

async function start () {
    const nuxt = new Nuxt(config);
    const { host, port } = nuxt.options.server;

    if (config.dev) {
        await new Builder(nuxt).build();
    } else {
        await nuxt.ready();
    }

    await fuelService.setupDB(config.serverConfig);
    await fuelService.initWithData(config.serverConfig);

    app.use('/api/stations/', stationsController.route(fuelService));

    app.use(nuxt.render);
    app.listen({ port, host }, function () {
        process.send('ready');
    });

    console.log(`Server listening on http://${host}:${port}`);
}

start();
