const getAllUsers = (req, res) => {
    res.send("ALL USERS ARE FETCHED");
}

const signup = (req, res)=> {
    res.send("SIGNING UP");
}

const login = (req, res) => {
    res.send("LOGGED IN");
}

const getUserProfile = (req, res) => {
    res.send("PROFILE FETCHED");
}

const updateUserProfile = (req, res) => {
    res.send("PROFILE UPDATED");
}

const deleteUserProfile = (req, res) => {
    res.send("PROFILE DELETED");
}

module.exports = {getAllUsers, signup, login, getUserProfile, updateUserProfile, deleteUserProfile}