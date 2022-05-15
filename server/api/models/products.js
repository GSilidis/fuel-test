/**
 * Fuel station products
 *
 * @param {Sequelize} db
 * @param {Sequelize.DataTypes} DataTypes
 * @return Sequelize.Model
 */
module.exports = (db, DataTypes) => {
    return db.define('Products', {
        recordId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        exid: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DOUBLE,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'station_products',
        timestamps: false,
    });
};
