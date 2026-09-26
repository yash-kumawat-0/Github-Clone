const express = require("express");
const UserRouter = require("./user.router");

const mainRouter = express.Router();

mainRouter.use(UserRouter)

mainRouter.get("/", (req, res) => {
  res.send("WELCOME");
});

module.exports = mainRouter;
