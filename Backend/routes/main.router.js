const express = require("express");
const UserRouter = require("./user.router");
const RepoRouter = require("./repo.router");
const IssueRouter = require("./issue.router");

const mainRouter = express.Router();

mainRouter.use(UserRouter);
mainRouter.use(RepoRouter);
mainRouter.use(IssueRouter);

mainRouter.get("/", (req, res) => {
  res.send("WELCOME");
});

module.exports = mainRouter;
