const mongoose = require("mongoose");

const Schema = mongoose.Schema; // alias for mongoose Schema

const Contactschema = new Schema(
  {
    name: String,
    familly: String,
    email: String,
    phonenumber: Number,
  },
  {
    collection: "Contacts",
  }
);

module.exports = mongoose.model("Contacts", Contactschema);
