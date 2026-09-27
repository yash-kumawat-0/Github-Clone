const express = require("express");
const IssueController = require("../controllers/issueController");

const IssueRouter = express.Router();

IssueRouter.post("/issue/create", IssueController.createIssue);
IssueRouter.put("/issue/update/:id", IssueController.updateIssueById);
IssueRouter.delete("/issue/delete/:id", IssueController.deleteIssueById);
IssueRouter.get("/issue/all", IssueController.getAllIssues);
IssueRouter.get("/issue/:id", IssueController.getIssueById)

module.exports = IssueRouter;