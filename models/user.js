const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema; // alias for mongoose Schema
// schema user
const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    // this below code is for attlas db problem, found in stackoverflow

    writeConcern: {
      j: true,
      wtimeout: 1000,
    },
    collection: "users",
  }
);
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", userSchema);
