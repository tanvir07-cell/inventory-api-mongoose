const router = require("express").Router();
const storeController = require("../controller/store.controller");

router
  .route("/")
  .get(storeController.getAllSotre)
  .post(storeController.createStore);

router.route("/:id").get(storeController.getStoreById);

module.exports = router;
