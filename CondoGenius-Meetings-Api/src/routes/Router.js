module.exports = app => {
  const meetings = require("../controllers/MeetingsController.js");

  var router = require("express").Router();

  router.post("/meetings/", meetings.createMeeting);
  router.get("/meetings/", meetings.listMeetings);
  router.get("/meetings/:id", meetings.getMeeting);
  router.delete("/meetings/:id", meetings.deleteMeeting);
  router.get("/meetings/user/:user_id", meetings.listMeetingsByUserId);

  app.use('/api', router);
};