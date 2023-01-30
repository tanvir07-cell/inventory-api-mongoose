const router = require("express").Router();
const stockController = require("../controller/stock.controller");

router
  .route("/")
  .post(stockController.createStock)
  .get(stockController.getAllStocks);

router.route("/:id").patch(stockController.updateStock);

module.exports = router;
