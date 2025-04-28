const mongoose = require("mongoose");
const URI =
  "mongodb+srv://ajayr665:jJCZ96SbHAOOZLHr@cluster0.jvsi1ay.mongodb.net/devTinder";
const connectDB = async () => {
  await mongoose.connect(URI);
};

module.exports = {
    connectDB
}
