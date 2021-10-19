let express = require("express");
let router = express.Router();
let users = require("../models/user");
const { isLoggedIn } = require("../helper/auth");
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  users.findOne({ username }).then((foundedUser) => {
    console.log(foundedUser);
    if (!foundedUser) {
      const user = new users({
        username,
        password,
      });
      console.log(user);
      user.save().then(() => {
        req.session.logedin = true;
        req.session.user = user;
        res.redirect("/contacts");
      });
    } else {
      res.redirect("/login");
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  users.findOne({ username }).then((foundedUser) => {
    if (foundedUser) {
      if (password == foundedUser.password) {
        req.session.logedin = true;
        req.session.user = foundedUser;
        res.redirect("/contacts");
      } else {

        res.redirect("/login?error=true");
      }
    } else {
      res.redirect("/register");
    }
  });
});
module.exports = router;
