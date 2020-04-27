const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/User");
const isAuth = require("../Middlewares/isAuthenticated");
const isAdmin = require("../Middlewares/isAdmin");
const jsonwebtoken = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  const AdminPassword = "admin";
  let ADMINchecker = false;
  if (req.body.IsAdmin == AdminPassword) {
    ADMINchecker = true;
  } else if (req.body.IsAdmin) {
    return res.status(400).json({
      error: "admin code is not right please type admin"
    });
  }
  let userExists = await User.findOne({ email: req.body.email });
  console.log(userExists);
  if (userExists) {
    console.log(userExists);
    return res.status(409).json({
      error: "This Email is already exists"
    });
  }
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    fname: req.body.fname,
    lname: req.body.lname,
    IsAdmin: ADMINchecker,
    email: req.body.email,
    Password: req.body.password
  });
  let userRes = await user.save();
  res.status(201).json({
    user: userRes,
    message: "User Created"
  });
});

router.post("/login", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      error: "email is not found "
    });
  }

  if (user.length < 1) {
    return res.status(404).json({
      error: "Mail is wrong or doesn't exist's"
    });
  }
  console.log(user);
  console.log(req.body.password);

  if (user.Password != req.body.password) {
    return res.status(404).json({
      error: "Passowrd is wrong "
    });
  }

  const token = jsonwebtoken.sign(
    {
      email: user.email,
      userId: user._id,
      firstName: user.fname,
      fullname: user.fname + " " + user.lname,
      IsAdmin: user.IsAdmin
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h"
    }
  );
  return res.status(200).json({
    message: "Authenticaion Successful",
    token: token
  });
});

router.get("/", isAuth, function(req, res, next) {
  res.status(202).json({
    user: req.user
  });
});
module.exports = router;
