let express = require("express");
let router = express.Router();
let contacts = require("../models/contacts");
const { isLoggedIn } = require("../helper/auth");
// router for main contacts page - protected
router.get("/", isLoggedIn, function (req, res, next) {
  /* get data form db and render aboutme page. */
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
  /* find contact and render aboutme page. */
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
// edit contacts
router.post("/add/:id", (req, res) => {
  const { name, familly, email, phonenumber } = req.body;
  // find contact and updte then save
  contacts.findOne({ _id: req.params.id }).then((ct) => {
    ct.name = name;
    ct.familly = familly;
    ct.email = email;
    ct.phonenumber = phonenumber;
    // finaly save the changes
    ct.save().then(() => {
      res.redirect("/contacts");
    });
  });
});
// create contact route
router.post("/add", (req, res) => {
  const { name, familly, email, phonenumber } = req.body;
  // create new instance of contact
  const newContact = new contacts({
    name,
    familly,
    email,
    phonenumber,
  });
  // save new contacts
  newContact.save().then(() => {
    res.redirect("/contacts");
  });
});
module.exports = router;
