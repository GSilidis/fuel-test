const Sequelize = require('sequelize');
const axios = require('axios');
let db;

async function setupDB (config) {
    db = new Sequelize({
        dialect: 'sqlite',
        storage: config.sqliteDBName,
        logging: false,
    });

    db.models.stations = require('../models/stations')(db, Sequelize.DataTypes);
    db.models.products = require('../models/products')(db, Sequelize.DataTypes);
    db.models.columns = require('../models/columns')(db, Sequelize.DataTypes);

    db.models.stations.hasMany(db.models.products);
    db.models.stations.hasMany(db.models.columns);

    db.models.products.belongsTo(db.models.stations);

    db.models.columns.belongsTo(db.models.products);
    db.models.columns.belongsTo(db.models.stations);

    await db.models.products.sync({ force: true });
    await db.models.stations.sync({ force: true });
    await db.models.columns.sync({ force: true });
}

async function _initStationData (config) {
    const base = await axios.get(`${config.apiEndpoint}/v2/station?apikey=${config.apiSecret}`);

    for (const item of base.data) {
        try {
            const newStation = await db.models.stations.create({
                uid: item.Id,
                name: item.Name,
                address: item.Address,
                brand: item.Brand,
                lon: item.Location.Lon,
                lat: item.Location.Lat,
                takeOffBefore: item.TakeOffBefore,
                postPay: item.PostPay,
                enable: item.Enable,
            });

            console.info(`Создана новая АЗС: ${newStation.uid}`);

            const fuels = {};

            if (item.Fuels) {
                for (const fuelItem of item.Fuels) {
                    const newFuel = await db.models.products.create({
                        exid: fuelItem.Id,
                        price: fuelItem.Price,
                        type: fuelItem.Type,
                        brand: fuelItem.Brand,
                        name: fuelItem.Name,
                        StationId: newStation.id,
                    });

                    fuels[fuelItem.Id] = newFuel.recordId;

                    console.info(`Для АЗС ${newStation.uid} создано топливо ${newFuel.type}`);
                }
            } else {
                console.warn(`Данные по топливу для АЗС ${newStation.uid} отсутствуют`);
            }

            if (item.Columns) {
                for (const columnNum of Object.keys(item.Columns)) {
                    if (item.Columns[columnNum].Fuels) {
                        for (const columnFuelItem of item.Columns[columnNum].Fuels) {
                            if (fuels[columnFuelItem]) {
                                await db.models.columns.create({
                                    num: Number(columnNum),
                                    StationId: newStation.id,
                                    ProductRecordId: fuels[columnFuelItem],
                                });

                                console.info(`Для АЗС ${newStation.uid} создана колонка ${Number(columnNum)} с топливом ${fuels[columnFuelItem]}`);
                            }
                        }
                    }
                }
            } else {
                console.warn(`Данные по колонкам для АЗС ${newStation.uid} отсутствуют`);
            }
        } catch (error) {
            console.error(`Ошибка записи: ${error.toString()}`);
        }
    }
}

async function _updatePrices (config) {
    const base = await axios.get(`${config.apiEndpoint}/v2/price?apikey=${config.apiSecret}`);

    if (base.data) {
        for (const item of base.data) {
            const station = await db.models.stations.findOne({
                where: {
                    uid: item.StationId,
                },
                include: [{
                    model: db.models.products,
                    where: {
                        exid: item.ProductId,
                    },
                }],
            });

            if (station?.Products[0]) {
                station.Products[0].price = item.Price;
                await station.Products[0].save();

                console.info(`Данные по ценам для топлива ${station.Products[0].type} на АЗС ${station.uid} обновлены!`);
            }

        }
    }
}

async function initWithData (config) {
    await _initStationData(config);
    await _updatePrices(config);
}

async function getStationList () {
    return await db.models.stations.findAll();
}

async function getStationInfo (uid) {
    return await db.models.stations.findOne({
        where: {
            uid,
        },
        include: [{
            model: db.models.columns,
            attributes: ['num'],
            include: [{
                model: db.models.products,
                attributes: ['exid'],
            }],
        }, {
            model: db.models.products,
            attributes: ['exid', 'price', 'type', 'brand', 'name'],
        }],
        order: [
            [db.models.products, 'name', 'ASC'],
        ],
    });
}

module.exports = {
    setupDB,
    initWithData,
    getStationList,
    getStationInfo,
};
