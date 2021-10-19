let express = require("express");
let router = express.Router();
let contacts = require("../models/contacts");
const { isLoggedIn } = require("../helper/auth");
router.get("/", isLoggedIn, function (req, res, next) {
  /* render aboutme page. */
  contacts
    .find({})
  
    .then((data) => {
      data = data.sort((a, b) => a.name.localeCompare(b.name));
      res.render("pages/contacts", { data });
    });
});
router.get("/create", isLoggedIn, function (req, res, next) {
  /* render aboutme page. */
  res.render("pages/contacts/create");
});
router.get("/edit/:id", isLoggedIn, function (req, res, next) {
  /* render aboutme page. */
  contacts.findOne({ _id: req.params.id }).then((data) => {
    res.render("pages/contacts/create", { data });
  });
});
router.get("/delete/:id", isLoggedIn, function (req, res, next) {
  /* render aboutme page. */
  contacts.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect("/contacts");
  });
});
router.post("/add/:id", (req, res) => {
  const { name, familly, email, phonenumber } = req.body;

  contacts.findOne({ _id: req.params.id }).then((ct) => {
    ct.name = name;
    ct.familly = familly;
    ct.email = email;
    ct.phonenumber = phonenumber;
    ct.save().then(() => {
      res.redirect("/contacts");
    });
  });
});
router.post("/add", (req, res) => {
  const { name, familly, email, phonenumber } = req.body;

  const newContact = new contacts({
    name,
    familly,
    email,
    phonenumber,
  });
  newContact.save().then(() => {
    res.redirect("/contacts");
  });
});
module.exports = router;
