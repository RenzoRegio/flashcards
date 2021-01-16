const express = require("express");

const bodyParser = require("body-parser"); // returns "body" object to the browser - to access req.body.__
const cookieParser = require("cookie-parser"); // returns an "cookies" object to the browser - to access req.cookies.___

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  next();
});

const mainRoutes = require("./routes");
const cardRoutes = require("./routes/cards");

app.use(mainRoutes);
app.use("/cards", cardRoutes);

app.use((req, res, next) => {
  const err = new Error("Page not found...");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
