const { Router } = require("express");
const authController = require("../controllers/User/authController");

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.loginAdmin);

module.exports = router;
