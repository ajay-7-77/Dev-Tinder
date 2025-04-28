const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json()); //ExpressJSON() middleware parse incoming JSON request bodies
app.use(cookieParser()); // Middleware for parsing Cookie

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestsRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully...");
    app.listen(7777, function () {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("Database connection failed..."+ err.message);
  });
