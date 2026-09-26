const express = require("express");
const userController = require("../controllers/userController")

const UserRouter = express.Router();

UserRouter.get("/allUsers", userController.getAllUsers);
UserRouter.get("/user", userController.getUserProfile);
UserRouter.post("/signup", userController.signup);
UserRouter.post("/login", userController.login);
UserRouter.put("/updateProfile", userController.updateUserProfile);
UserRouter.delete("/deleteProfile", userController.deleteUserProfile);

module.exports = UserRouter;