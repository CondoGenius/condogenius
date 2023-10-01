module.exports = app => {
  const residents = require("../controllers/residentController");

  var router = require("express").Router();

  router.post("/", residents.createResident);

  router.get("/", residents.listResidents);

  router.get("/:id", residents.listResidentById);

  router.put("/:id", residents.updateResident);

  router.delete("/:id", residents.deleteResident);

  app.use('/api/residents', router);
};