const express = require("express");

const bodyParser = require("body-parser"); // returns "body" object to the browser - to access req.body.__
const cookieParser = require("cookie-parser"); // returns an "cookies" object to the browser - to access req.cookies.___

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

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
  res.render("hello"); //reads the cookies saved on the browser and returns it to the template
});

app.post("/hello", (req, res) => {
  res.cookie("username", req.body.username); //Will send a cookie to the browser after we submit the form
  res.redirect("/"); //redirects the user to the root / welcome page
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
