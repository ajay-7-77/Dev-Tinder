const express = require("express");
const User = require("../models/user");
const validate = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

// signup
authRouter.post("/signup", async (req, res, next) => {
  try {
    validate(req);
    const { password, firstName, lastName, emailId } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // sometimes we use buildRequest Utils
    const user = new User({
      password: passwordHash,
      firstName,
      lastName,
      emailId,
    }); // getting user from request body
    await user.save();
    res.send("user added successfully...");
  } catch (err) {
    res.status(400).send("Error saving user..." + err.message);
  }
});

//login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      // throw new Error("Email id is not found");
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // create JWT token
      const token = await user.getJWT();
      // create cookie and add JWT token
      res.cookie("token", token);
      res.send("Login Successful!");
    } else {
      throw new Error("Invalid Credentials");
      // throw new Error("Password is incorrect.")
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//logout
authRouter.post("/logout", async (req, res) => {
  // cleanup activities
  // expire token , session
  res.cookie("token", null, {
    expiresIn: "0d",
  });
  res.send("logout successfully..");
});

module.exports = authRouter;
