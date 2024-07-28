const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateUser } = require("../middlewares/validation");

router.post("/users", validateUser, userController.createUser);
router.get("/users/:userId", userController.getUser);

module.exports = router;
