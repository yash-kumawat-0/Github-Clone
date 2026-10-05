const mongoose = require("mongoose");
const Repository = require("../models/repoModel")
const User = require("../models/userModel")
const Issue = require("../models/issueModel")

const createRepository = async (req, res) => {
  const {owner, repositoryName, issues, content, description, visibility} = req.body;
  try{

    if(!repositoryName){
      res.status(404).json({error: "Repository name is required!"});
    }

    if(!mongoose.Types.ObjectId.isValid(owner)){
      res.status(404).json({error: "Invalid UserID!"});
    }

    const newRepository = new Repository({
      owner,
      repositoryName,
      issues,
      content,
      description,
      visibility,
    })

    const result = await newRepository.save()

    res.status(201).json({
      message: "Repository Created",
      repositoryID: result._id,
    })

  }catch(err){
    console.error("Error while repository creation: ",err.message);
    res.status(500).send({message: "Server Error"})
  }
};

const getAllRepositories = (req, res) => {
  res.send("ALL REPO FETCHED");
};

const fetchRepositoryById = (req, res) => {
  res.send("REPO DETAILS FETCHED");
};

const fetchRepositoryByName = (req, res) => {
  res.send("REPO DETAILS FETCHED");
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
