const Sequelize = require('sequelize');

const sequelize = new Sequelize('genius', 'root', 'genius', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false, // Defina como true para ver as consultas SQL no console
});

module.exports = sequelize;
