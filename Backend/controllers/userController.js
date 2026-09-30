const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
}

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("Github-Clone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ username });
    if (user) {
      return res.status(404).json({ message: "User already exists!" });
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
    };

    const result = await userCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (err) {
    console.error("Unable to Sign Up :", err.message);
    res.status(500).send("SERVER ERROR");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("Github-Clone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Unable to Logged In: ", err.message);
    res.status(500).send("Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    await connectClient();
    const db = client.db("Github-Clone");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error("Error While Fetching: ", err.message);
    res.status(500).send({ message: "Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  const currentId = req.params.id;
  try {
    await connectClient();
    const db = client.db("Github-Clone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentId),
    });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.send(user, { message: "Profile Fetched" });
    
  } catch (err) {
    console.error("Error While Fetching: ", err.message);
    res.status(500).send({ message: "Server Error" });
  }
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
