const router = require("express").Router();
const categoryController = require("../controller/category.controller");

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.createCategory);

module.exports = router;
