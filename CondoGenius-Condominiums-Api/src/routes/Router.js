module.exports = app => {
  const condominiums = require("../controllers/condominiumController");

  var router = require("express").Router();

  router.get("/condominium/:user_id", condominiums.getCondominumByUserID);
  

  
  
  app.use('/api', router);
};