const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/Product");
const isAuth = require("../Middlewares/isAuthenticated");
const isAdmin = require("../Middlewares/isAdmin");
const jsonwebtoken = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send(`respond with a resource${process.env.MONGO_ATLAS_PW}`);
});

module.exports = router;
