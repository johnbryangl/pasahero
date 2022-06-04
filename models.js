const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('~/sequelize/instance')(Sequelize);

const initialModels = require('~/sequelize/definitions')(sequelize, DataTypes);
const associatedModels = require('~/sequelize/associations')(initialModels);

module.exports = Object.assign({ sequelize }, associatedModels)


