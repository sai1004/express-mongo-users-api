const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getUsers);

router.get("/user/:id", userController.getUserById);

router.post("/newuser", userController.postUsers);

router.put("/update-user", userController.putUsers);

router.delete("/user/:id", userController.deleteUsers);

module.exports = router;
