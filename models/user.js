const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", userSchema);
