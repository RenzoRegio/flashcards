const express = require("express");

const bodyParser = require("body-parser"); // returns "body" object to the browser - to access req.body.__
const cookieParser = require("cookie-parser"); // returns an "cookies" object to the browser - to access req.cookies.___

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

app.use((req, res, next) => {
  req.message = "This message came from the first middleware";
  next();
});

app.use((req, res, next) => {
  console.log(req.message);
  next();
});

app.get("/", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render("index", { name });
  } else {
    res.redirect("/hello");
  }
});

app.get("/cards", (req, res) => {
  res.render("card", {
    prompt: "Who's buried in grant's tomb?",
  });
});

app.get("/hello", (req, res) => {
  const cookies = req.cookies.username;
  if (!cookies) {
    res.render("hello"); //reads the cookies saved on the browser and returns it to the template
  } else {
    res.redirect("/");
  }
});

app.post("/hello", (req, res) => {
  res.cookie("username", req.body.username); //Will send a cookie to the browser after we submit the form
  res.redirect("/"); //redirects the user to the root / welcome page
});

app.post("/goodbye", (req, res) => {
  res.clearCookie("username"); //clears the "username" cookie
  res.redirect("/hello"); //redirects back to the /hello route
});

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
