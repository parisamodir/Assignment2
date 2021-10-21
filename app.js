let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
let app = express();
let passport = require("passport");
let User = require("./models/user.js");
let passportLocal = require("passport-local");
mongoose.connect(
  "mongodb+srv://parisa:parisa@cluster0.ukv7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/parisa",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection; // alias for the mongoose connection
db.on("error", function () {
  console.error("Connection Error");
});

db.once("open", function () {
  console.log(`Connected to MongoDB at: `);
});
let localStrategy = passportLocal.Strategy; // alias

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(function (req, res, next) {
  app.locals.helpers = {
    loggedIn: function () {
      return req.session.user;
    },
  };
  next();
});
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 999999999,
      path: "/",
    },
  })
);
// middleware config
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "node_modules")));

// passport
app.use(passport.initialize());
app.use(passport.session());

// implement an Auth Strategy - "local" - username / password
passport.use(User.createStrategy());

// serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add routers

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/Auth"));
app.use("/contacts", require("./routes/contacts"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
