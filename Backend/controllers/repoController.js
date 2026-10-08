const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

const createRepository = async (req, res) => {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(404).json({ error: "Repository name is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(404).json({ error: "Invalid UserID!" });
    }

    const newRepository = new Repository({
      owner,
      name,
      issues,
      content,
      description,
      visibility,
    });

    const result = await newRepository.save();

    res.status(201).json({
      message: "Repository Created",
      repositoryID: result._id,
    });
  } catch (err) {
    console.error("Error while repository creation: ", err.message);
    res.status(500).send({ message: "Server Error" });
  }
};

const getAllRepositories = async (req, res) => {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(repositories);
  } catch (err) {
    console.error("Error while fetching repositories: ", err.message);
    res.status(500).send({ message: "Server Error" });
  }
};

const fetchRepositoryById = async (req, res) => {
  const repoId = req.params.id;
  try {
    const repository = await Repository.find({ _id: repoId })
      .populate("owner")
      .populate("issues");

    if (repository.length == 0) {
      res.json({ message: "No Repository" });
    }
    res.json(repository);
  } catch (err) {
    console.error("Error while fetching repository: ", err.message);
    res.status(500).send("Server Error");
  }
};

const fetchRepositoryByName = async (req, res) => {
  res.send("REPO BY NAME FETCHED");
};

const fetchRepositoriesForCurrentUser = (req, res) => {
  res.send("REPO FOR CURRENT USER FETCHED");
};

const updateRepositoryById = (req, res) => {
  res.send("REPO UPDATED");
};

const toggleVisibilityById = (req, res) => {
  res.send("VISIBILITY TOGGLED");
};

const deleteRepositoryById = (req, res) => {
  res.send("REPO DELETED");
};

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
