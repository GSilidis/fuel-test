/**
 * Fuel station columns
 *
 * @param {Sequelize} db
 * @param {Sequelize.DataTypes} DataTypes
 * @return Sequelize.Model
 */
module.exports = (db, DataTypes) => {
    return db.define('Columns', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        num: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'station_colums',
        timestamps: false,
    });
};
