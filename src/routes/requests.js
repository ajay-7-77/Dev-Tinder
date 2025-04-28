const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

// Send Connection Request POST:/sendConnectionRequest
requestRouter.post("/sendConnectionRequest", userAuth, (req, res, next) => {
  try {
    const { user } = req;
    res.send(user.firstName + " has sent you a request!");
  } catch (e) {
    res.status(400).send("Error : " + e.message);
  }
});

module.exports = requestRouter;

