module.exports = app => {
  const condominiums = require("../controllers/condominiumController");
  const fast_lists = require("../controllers/fastListController");

  var router = require("express").Router();

  router.get("/condominium/:user_id", condominiums.getCondominumByUserID);
  
  router.post("/fast_list", fast_lists.createFastList);
  router.get("/fast_list", fast_lists.getFastList);
  router.delete("/fast_list/:id", fast_lists.deleteFastList)
  
  app.use('/api', router);
};