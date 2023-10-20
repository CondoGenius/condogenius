module.exports = {
  HOST: "mysql",
  USER: "root",
  PASSWORD: "genius",
  DB: "genius",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};