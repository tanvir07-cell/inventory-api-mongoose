const router = require("express").Router();
const productController = require("../controller/product.controller");

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/:id").patch(productController.updateProduct);

module.exports = router;