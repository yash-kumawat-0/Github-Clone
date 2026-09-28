const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async  function connectClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
}

const signup = async (req, res) => {
  const {username, password, email} = req.body;
  try{
    await connectClient();
    const db = client.db("Github-Clone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({username})
    if(user){
        return res.status(404).json({message:"User already exists!"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
        username,
        password: hashPassword,
        email,
        repositories: [],
        followedUsers: [],
        starRepos: [],
    }

    const result = await userCollection.insertOne(newUser);

    const token = jwt.sign({id:result.insertedId}, process.env.JWT_SECRET_KEY, {expiresIn:"1h"});
    res.json({token});
  }catch(err){
    console.error("Unable to Sign Up :", err.message);
    res.status(500).send("SERVER ERROR");
  }
};

const login = (req, res) => {
    res.send("LOGGED IN");
};

const getAllUsers = (req, res) => {
  res.send("ALL USERS ARE FETCHED");
};

const getUserProfile = (req, res) => {
  res.send("PROFILE FETCHED");
};

const updateUserProfile = (req, res) => {
  res.send("PROFILE UPDATED");
};

const deleteUserProfile = (req, res) => {
  res.send("PROFILE DELETED");
};

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
