module.exports = app => {
  // const meetings = require("../controllers/meetingController");

  var router = require("express").Router();

  app.use('/api', router);
};