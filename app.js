let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
let app = express();

mongoose.connect("mongodb://localhost/parisa", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection; // alias for the mongoose connection
db.on("error", function () {
  console.error("Connection Error");
});

db.once("open", function () {
  console.log(`Connected to MongoDB at: `);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
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
