module.exports.route = function (service) {
    const express = require('express');
    const ErrorHandler = require('../../utils/error/handler');
    const { NotFoundError, InternalServerError } = require('../../utils/error/errors');
    const StationsRoute = express.Router();

    StationsRoute.get('/', async (req, res, next) => {
        try {
            const list = await service.getStationList();

            return res.json(list);
        } catch (error) {
            console.error(error);

            return next(new InternalServerError());
        }
    });

    StationsRoute.get('/:uid/', async (req, res, next) => {
        try {
            const station = await service.getStationInfo(req.params.uid);

            if (station)
                return res.json(station);
            else
                return next(new NotFoundError('Gas station not found'));
        } catch (error) {
            console.error(error);

            return next(new InternalServerError());
        }
    });

    // eslint-disable-next-line no-unused-vars
    StationsRoute.use((err, req, res, next) => {
        ErrorHandler(err, res);
    });

    return StationsRoute;
};
