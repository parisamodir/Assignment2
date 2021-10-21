// this below code is for detecting user authentication
module.exports = {
  
  isLoggedIn: function (req, res, next) {
    if (req.session.logedin) {
      return next();
    } else {
      res.redirect("/login");
    }
  },
};
