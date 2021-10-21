const mongoose = require("mongoose");

const Schema = mongoose.Schema; // alias for mongoose Schema
// schema for contacts
const Contactschema = new Schema(
  {
    name: String,
    familly: String,
    email: String,
    phonenumber: Number,
  },
  {
    // this below code is for attlas db problem, found in stackoverflow
    writeConcern: {
      j: true,
      wtimeout: 1000,
    },
    collection: "Contacts",
  }
);
//export contacts

module.exports = mongoose.model("Contacts", Contactschema);
