const { Router } = require("express");
const router = Router();
const taskController = require("../controllers/User/taskController");

router.post("/create", taskController.createTodo);
router.get("/getAll", taskController.getAllTodo);
router.get("/getById/:id", taskController.getTodoById);
router.put("/update/:id", taskController.updateTodo);

module.exports = router;
