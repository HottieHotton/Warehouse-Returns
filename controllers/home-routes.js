const router = require("express").Router();
const withAuth = require("../utils/auth");
const path = require("path");

//All Necessary pages with authorization as needed

router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/office", withAuth, (req, res) => {
  res.render("office");
});

router.get("/warehouse", withAuth, (req, res) => {
  res.render("warehouse");
});

router.get("/completed", withAuth, (req, res) => {
  res.render("completed");
});

router.get("/request", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/request.html"));
});

module.exports = router;
