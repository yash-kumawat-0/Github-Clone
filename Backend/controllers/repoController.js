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
  const repoName = req.params.name;
  try {
    const repository = await Repository.find({ name: repoName })
      .populate("owner")
      .populate("issues");

    res.json(repository);
  } catch (err) {
    console.error("Error while fetching repository: ", err.message);
    res.status(500).send("Server Error");
  }
};

const fetchRepositoriesForCurrentUser = async (req, res) => {
  const userID = req.user;
  try {
    const repositories = await Repository.find({ owner: userID });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({error:"User Repositories Not Found"})
    }

    res.json({message:"Repositories Found", repositories});
  } catch (err) {
    console.error("Error while fetching repositories: ", err.message);
    res.status(500).send("Server Error");
  }
};

const updateRepositoryById = async (req, res) => {
  const repoID = req.params.id;
  const {name, content, description, visibility} = req.body;
  try{
    if(content !== undefined && (!Array.isArray(content) || content.some((item) => typeof item !== "string"))){
      return res.status(400).json({error: "Content must be an array of strings"});
    }

    const repository = await Repository.findById(repoID);
    if(!repository){
      return res.status(404).json({error: "Repository Not Found"})
    }

    if(content){
      repository.content.push(...content);
    }
    if(description !== undefined){
      repository.description = description;
    }
    if(name !== undefined){
      repository.name = name;
    }
    if(visibility !== undefined){
      repository.visibility = visibility;
    }

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository Updated Successfully",
      repository: updatedRepository
    })
  }catch(err){
    console.error("Error while updating repository: ", err.message);
    res.status(500).send("Server Error")
  }
};

const toggleVisibilityById = async (req, res) => {
  const repoID = req.params.id;
  try {
    const repository = await Repository.findById(repoID);

    if (!repository) {
      return res.status(404).json({ error: "Repository Not Found" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository updated Successfully",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error while toggling visibility: ", err.message);
    res.status(500).send("Server Error");
  }
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
