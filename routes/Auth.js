let express = require("express");
let router = express.Router();
let users = require("../models/user");
let passport = require("passport");
const { isLoggedIn } = require("../helper/auth");
const user = require("../models/user");
router.post("/register", ProcessRegisterPage);

router.post("/login", ProcessLoginPage);
function ProcessLoginPage(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    console.log(user);

    // are there any server errors?
    if (err) {
      console.error(err);
      return next(err);
    }

    // are there any login errors?
    if (!user) {
      return res.redirect("/login?error=true");
    }

    req.login(user, (err) => {
      // are there any db errors?
      if (err) {
        console.error(err);
        return next(err);
      }

      console.log("Logged in Successfully");
      req.session.logedin = true;
      req.session.user = user;
      return res.redirect("/contacts");
    });
  })(req, res, next);
}

function ProcessRegisterPage(req, res, next) {
  // instantiate a new User Object
  const { username, password } = req.body;

  const newUser = new users({
    username,
    password,
  });

  users.register(newUser, password, (err) => {
    if (err) {
      console.error("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        console.error("Error: User Already Exists");
      }

      return res.redirect("/register");
    }

    // after successful registration - let's login the user
    return passport.authenticate("local")(req, res, () => {
      req.session.logedin = true;
      req.session.user = newUser;
      return res.redirect("/contacts");
    });
  });
}

module.exports = router;
