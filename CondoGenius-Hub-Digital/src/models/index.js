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

db.users = require("../../src/models/UserModel.js")(sequelize, Sequelize);
db.residents = require("../../src/models/ResidentModel.js")(sequelize, Sequelize);

db.users.hasOne(db.residents, { foreignKey: "user_id", as: "resident" });
db.residents.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.users.hasMany(db.posts, { foreignKey: "user_id", as: "posts" });
db.posts.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.users.hasMany(db.polls, { foreignKey: "user_id", as: "polls" });
db.polls.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.users.hasMany(db.comments, { foreignKey: "user_id", as: "comments" });
db.comments.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.posts.hasOne(db.polls, { foreignKey: "post_id", as: "poll" });
db.polls.belongsTo(db.posts, {
  foreignKey: "post_id",
  as: "post",
});

db.polls.hasMany(db.poll_options, {  foreignKey: 'poll_id', as: "options" });
db.poll_options.belongsTo(db.polls, {
  foreignKey: "poll_id",
  as: "poll",
});

db.posts.hasMany(db.comments, {  foreignKey: 'post_id', as: "comments" });
db.comments.belongsTo(db.posts, {
  foreignKey: "post_id",
  as: "post",
});

module.exports = db;