const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const profileRouter = express.Router();


// GET user profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error fetching user..." + err.message);
  }
});


// GET user by emailId
profileRouter.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmailId });
    if (users.length === 0) {
      res.status(404).send("user not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Error fetching user..." + err.message);
  }
});

// Feed API: GET/feed: get all the users from the database
profileRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("user not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Error fetching user..." + err.message);
  }
});

// DELETE/user
profileRouter.delete("/user", async (req, res) => {
  const id = req.body.userId;
  try {
    //   const users = await User.findByIdAndDelete({_id: id});
    const users = await User.findByIdAndDelete(id);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("Error deleting user..." + err.message);
  }
});

// UPDATE/user update existing user
profileRouter.patch("/user/:userId", async (req, res) => {
  const user = req.body;
  const userId = req.params.userId;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    isUpdateAllowed = Object.keys(user).every((prop) => {
      return ALLOWED_UPDATES.includes(prop);
    });
    console.log(isUpdateAllowed, user);
    if (!isUpdateAllowed) {
      throw new Error("update is not allowed...");
    }
    //   const users = await User.findByIdAndUpdate({_id: user.userId}, user); //by default it returns user before updated
    const users = await User.findByIdAndUpdate({ _id: userId }, user, {
      returnDocument: "after",
      runValidators: true,
    }); // can use after or before
    //   const users = await User.findOneAndUpdate({_id: user.userId}, user);
    res.send("user updated successfully" + users);
  } catch (err) {
    res.status(400).send("Error deleting user..." + err.message);
  }
});


module.exports = profileRouter;



