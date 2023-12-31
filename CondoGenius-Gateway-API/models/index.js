const dbConfig = require("../config/db.config.js");

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

db.users = require("../models/UserModel.js")(sequelize, Sequelize);
db.roles = require("../models/RoleModel.js")(sequelize, Sequelize);
db.residents = require("../models/ResidentModel.js")(sequelize, Sequelize);
db.admins = require("../models/AdminModel.js")(sequelize, Sequelize);
db.reset_password_tokens = require("../models/ResetPasswordTokenModel.js")(sequelize, Sequelize);

module.exports = db;