const dbConfig = require("../../config/db.config.js");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host:  dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.condominiums = require("./CondominiumModel.js")(sequelize, Sequelize);
db.users = require("./UserModel.js")(sequelize, Sequelize);
db.fast_lists = require("./FastListModel.js")(sequelize, Sequelize);

module.exports = db;