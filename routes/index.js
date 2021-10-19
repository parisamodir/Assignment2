let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  /* render home page. */

  res.render("index", { title: "Home" });
});
/* GET projects page. */

router.get("/projects", function (req, res, next) {
  /* render projects page. */

  res.render("pages/projects");
});
/* GET services page. */

router.get("/services", function (req, res, next) {
  /* render services page. */

  res.render("pages/services");
});
/* GET contactme page. */

router.get("/contactme", function (req, res, next) {
  /* render contactme page. */

  res.render("pages/contactme");
});
/* GET aboutme page. */

router.get("/aboutme", function (req, res, next) {
  /* render aboutme page. */

  res.render("pages/aboutme");
});

router.get("/login", function (req, res, next) {
  /* render aboutme page. */
  const haveError = req.query.error

  res.render("pages/login",{haveError});
});
router.get("/register", function (req, res, next) {
  /* render aboutme page. */

  res.render("pages/register");
});
module.exports = router;
