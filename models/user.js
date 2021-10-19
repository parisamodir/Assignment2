const mongoose = require("mongoose");

const Schema = mongoose.Schema; // alias for mongoose Schema

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("users", userSchema);
