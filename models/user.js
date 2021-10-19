const mongoose = require("mongoose");

const Schema = mongoose.Schema; // alias for mongoose Schema

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    writeConcern: {
      j: true,
      wtimeout: 1000,
    },
    collection: "users",
  }
);

module.exports = mongoose.model("users", userSchema);
