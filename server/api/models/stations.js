/**
 * Fuel stations
 *
 * @param {Sequelize} db
 * @param {Sequelize.DataTypes} DataTypes
 * @return Sequelize.Model
 */
module.exports = (db, DataTypes) => {
    return db.define('Stations', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        lon: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        takeOffBefore: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        postPay: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        enable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        tableName: 'stations',
        timestamps: false,
    });
};
