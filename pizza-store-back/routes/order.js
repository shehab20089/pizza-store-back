const express = require("express");
// const app =express();
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../Models/Order");
const isUser = require("../Middlewares/isUser");
const isAuthenticated = require("../Middlewares/isAuthenticated");

router.get("/", isAuthenticated, async (req, res, next) => {
  console.log(req.user);
  try {
    let historyObj = await Order.find({
      user_id: req.user.userId
    });
    console.log(historyObj);
    res.status(202).json({
      orders: historyObj
    });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
});

router.post("/", isUser, async (req, res, next) => {
  console.log(req.body);
  let userId = new mongoose.Types.ObjectId();
  if (req.user) userId = req.user.userId;

  let newOrder = new Order({
    _id: new mongoose.Types.ObjectId(),
    user_id: userId,
    Products: req.body.Products,
    Address: req.body.Address,
    phone: req.body.phone,
    name: req.body.name
  });

  try {
    let orderObj = await newOrder.save();
    let obj = { ...orderObj._doc };
    delete obj.user_id;
    console.log(obj);
    res.status(201).json({
      orderObj: obj,
      message: "your order successfully submitted"
    });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
});

module.exports = router;
