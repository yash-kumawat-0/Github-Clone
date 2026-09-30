const express = require("express");
const userController = require("../controllers/userController")

const UserRouter = express.Router();

UserRouter.get("/allUsers", userController.getAllUsers);
UserRouter.post("/signup", userController.signup);
UserRouter.post("/login", userController.login);
UserRouter.get("/user/:id", userController.getUserProfile);
UserRouter.put("/updateProfile/:id", userController.updateUserProfile);
UserRouter.delete("/deleteProfile/:id", userController.deleteUserProfile);

module.exports = UserRouter;