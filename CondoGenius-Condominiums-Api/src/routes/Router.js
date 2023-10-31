module.exports = app => {
  const condominiums = require("../controllers/");

  var router = require("express").Router();

  // Residents routes
  router.post("/condominiums/", condominiums.createResident);
  router.get("/condominiums/", condominiums.listcondominiums);
  router.get('/condominiums/residence/:residence_id', condominiums.listcondominiumsByResidence)
  router.get("/condominiums/:id", condominiums.listResidentById);
  

  app.use('/api', router);
};