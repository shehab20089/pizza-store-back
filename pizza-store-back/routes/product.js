const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../Models/Product");
const isAuth = require("../Middlewares/isAuthenticated");
const isAdmin = require("../Middlewares/isAdmin");
const jsonwebtoken = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/", async function(req, res, next) {
  try {
    let allProducts = await Product.find();
    res.status(202).json({
      products: allProducts
    });
  } catch (err) {}
  res.send(`respond with a resource${process.env.MONGO_ATLAS_PW}`);
});

router.post("/add", isAuth, isAdmin, upload.single("image"), async function(
  req,
  res,
  next
) {
  let newProdut = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.file.path
  });
  try {
    let Product = await newProdut.save();
    res.status(201).json({
      Product: Product,
      message: "Pizza added successfully"
    });
  } catch (err) {
    res.status(400);
  }
});

module.exports = router;
