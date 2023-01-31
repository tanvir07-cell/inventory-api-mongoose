const router = require("express").Router();
const userController = require("../controller/user.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/me", verifyToken, userController.getMe);

module.exports = router;
