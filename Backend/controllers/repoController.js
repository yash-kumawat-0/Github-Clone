const createRepository = (req, res) => {
  res.send("REPO CREATED");
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
