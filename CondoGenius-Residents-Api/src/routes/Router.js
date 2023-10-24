module.exports = app => {
  const residents = require("../controllers/residentController");
  const residences = require("../controllers/residenceController");

  var router = require("express").Router();

  // Residents routes
  router.post("/residents/", residents.createResident);
  router.get("/residents/", residents.listResidents);
  router.get('/residents/residence/:residence_id', residents.listResidentsByResidence)
  router.get("/residents/id/:id", residents.listResidentById);
  router.get("/residents/cpf/:cpf", residents.listResidentByCpf)
  router.get("/residents/user/:user_id", residents.listResidentByUserId)
  
  router.put("/residents/:id", residents.updateResident);
  router.delete("/residents/:id", residents.deleteResident);

  // Residences routes
  router.post("/residences/", residences.createResidence);
  router.get("/residences/", residences.listResidences);
  router.get("/residences/:id", residences.getResidenceById);
  router.put("/residences/:id", residences.updateResidence);
  router.delete("/residences/:id", residences.deleteResidence);

  app.use('/api', router);
};