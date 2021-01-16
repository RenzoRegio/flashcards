const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render("index", { name });
  } else {
    res.redirect("/hello");
  }
});

router.get("/hello", (req, res) => {
  const cookies = req.cookies.username;
  if (!cookies) {
    res.render("hello"); //reads the cookies saved on the browser and returns it to the template
  } else {
    res.redirect("/");
  }
});

router.post("/hello", (req, res) => {
  res.cookie("username", req.body.username); //Will send a cookie to the browser after we submit the form
  res.redirect("/"); //redirects the user to the root / welcome page
});

router.post("/goodbye", (req, res) => {
  res.clearCookie("username"); //clears the "username" cookie
  res.redirect("/hello"); //redirects back to the /hello route
});

module.exports = router;
