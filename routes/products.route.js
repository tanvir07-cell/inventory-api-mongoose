const router = require("express").Router();
const productController = require("../controller/product.controller");
const { authorization } = require("../middleware/authorization");
const uploader = require("../middleware/uploader");
const { verifyToken } = require("../middleware/verifyToken");

router
  .post("/file-upload", uploader.single("image"), productController.fileUpload)
  .route("/bulk-update")
  .patch(productController.updateBulkProduct);
router.delete("/bulk-delete", productController.deleteBulkProduct);

router
  .route("/")
  .get(productController.getProducts)
  // verifyToken diye check korle je user ti login kora ache kina login nah thakle login kore ese ei route e dukte parbe:
  .post(verifyToken, authorization("admin"), productController.createProduct);

// param diye jei request gula handle korbo seigula ekdom last e dibo:
router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProductById);

module.exports = router;
