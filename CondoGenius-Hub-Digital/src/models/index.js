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

db.posts        = require("../../src/models/PostModel.js")(sequelize, Sequelize);
db.polls        = require("../../src/models/PollModel.js")(sequelize, Sequelize);
db.poll_options = require("../../src/models/PollOptionModel.js")(sequelize, Sequelize);
db.poll_votes = require("../../src/models/PollVotes.js")(sequelize, Sequelize);
db.comments     = require("../../src/models/CommentModel.js")(sequelize, Sequelize);

module.exports = db;