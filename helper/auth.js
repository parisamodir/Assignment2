module.exports = {
  userAuth: function (req, res, next) {
    if (req.session.logedin) {
      return next();
    } else {
      res.redirect("/login");
    }
  },
  isLoggedIn: function (req, res, next) {
    if (req.session.logedin) {
      console.log(req.session.logedin);
      return next();
    } else {
      res.redirect("/login");
    }
  },
};
