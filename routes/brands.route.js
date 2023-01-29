const router = require("express").Router();
const brandController = require("../controller/brand.controller");

router
  .route("/")
  .post(brandController.createBrand)
  .get(brandController.getAllBrands);

router
  .route("/:id")
  .get(brandController.getBrandById)
  .patch(brandController.updateBrandById);

module.exports = router;
