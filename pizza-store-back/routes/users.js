const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/User");
const isAuth = require("../Middlewares/isAuthenticated");
const isAdmin = require("../Middlewares/isAdmin");
const jsonwebtoken = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send(`respond with a resource${process.env.MONGO_ATLAS_PW}`);
});
router.post("/register", (req, res, next) => {
  const AdminPassword = "admin";
  let ADMINchecker = false;
  if (req.body.IsAdmin == AdminPassword) {
    ADMINchecker = true;
  }
  console.log(req.body);
  User.count(
    {
      email: req.body.email
    },
    function(err, count) {
      if (count <= 0) {
        console.log("here");
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          fname: req.body.fname,
          lname: req.body.lname,
          IsAdmin: ADMINchecker,
          email: req.body.email,
          Password: req.body.password
        });
        user
          .save()
          .then(result => {
            res.status(201).json({
              user: result,
              error: "User Created"
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      } else {
        return res.status(409).json({
          error: "This Email is already exists"
        });
      }
    }
  );
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
      fullname: user.fname + " " + user.lname,
      IsAdmin: user.IsAdmin
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h"
    }
  );
  return res.status(200).json({
    error: "Authenticaion Successful",
    token: token
  });
});

router.get("/user", isAuth, function(req, res, next) {
  console.log(req);
  res.send(`respond with a resource${process.env.MONGO_ATLAS_PW}`);
});
module.exports = router;
