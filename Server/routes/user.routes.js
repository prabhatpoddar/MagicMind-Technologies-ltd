const { Router } = require("express");
const userController = require("../controllers/User/userController");

const router = Router();

router.get("/getUser", userController.getUser);

module.exports = router;
