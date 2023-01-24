const router = require("express").Router();
const productController = require("../controller/product.controller");

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/bulk-update").patch(productController.updateBulkProduct);

// param diye jei request gula handle korbo seigula ekdom last e dibo:
router.route("/:id").patch(productController.updateProduct);

module.exports = router;
