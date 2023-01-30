const router = require("express").Router();
const supplierController = require("../controller/supplier.controller");

router
  .route("/")
  .post(supplierController.createSupplier)
  .get(supplierController.getAllSuppliers);

router
  .route("/:id")
  .get(supplierController.getSupplierById)
  .patch(supplierController.updateSupplierById);

module.exports = router;
