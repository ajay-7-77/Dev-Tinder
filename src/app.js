const express = require("express");
// const { adminAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json()); //ExpressJSON() middleware parse incoming JSON request bodies 

app.post("/signup", async (req, res, next) => {
  const user = new User(req.body); // getting user from request body
  try {
//   validate request
  await user.save();
  res.send("user added successfully...")
  } catch (err) {
    res.status(400).send("Error saving user..."+ err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(7777, function () {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("Database connection failed...");
  });
