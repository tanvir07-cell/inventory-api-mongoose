const router = require("express").Router();
const productController = require("../controller/product.controller");
const uploader = require("../middleware/uploader");

router
  .post("/file-upload", uploader.single("image"), productController.fileUpload)
  .route("/bulk-update")
  .patch(productController.updateBulkProduct);
router.delete("/bulk-delete", productController.deleteBulkProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

// param diye jei request gula handle korbo seigula ekdom last e dibo:
router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProductById);

module.exports = router;
