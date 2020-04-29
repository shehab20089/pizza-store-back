const express = require("express");
const router = express.Router();
const fs = require("fs");
const mongoose = require("mongoose");
const Product = require("../Models/Product");
const isAuth = require("../Middlewares/isAuthenticated");
const isAdmin = require("../Middlewares/isAdmin");
const jsonwebtoken = require("jsonwebtoken");
const { promisify } = require("util");
const multer = require("multer");
const AWS = require("aws-sdk");
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

const ID = process.env.AWS_ACCESS_KEY;
const SECRET = process.env.AWS_SECRET_KEY;
let uploadFile = () => {};
if (process.env.bucket_name) {
  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
  });
  const fsPromise = promisify(fs.readFile);
  const s3Promise = promisify(s3.upload).bind(s3);
  uploadFile = async fileName => {
    const fileContent = await fsPromise(fileName);

    const params = {
      Bucket: process.env.bucket_name,
      Key: Date.now() + "pizza.jpg",
      Body: fileContent
    };

    // Uploading files to the bucket
    return await s3Promise(params);
  };
}

router.get("/", async function(req, res, next) {
  try {
    let allProducts = await Product.find();
    res.status(202).json({
      products: allProducts
    });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
});

router.post("/add", isAuth, isAdmin, upload.single("image"), async function(
  req,
  res,
  next
) {
  console.log(req.file.stream);
  let filelink = req.file.path;
  if (process.env.bucket_name) {
    filelink = await uploadFile(req.file.path);
  }

  let newProdut = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: process.env.bucket_name
      ? filelink.Location
      : "http://" + req.headers.host + "/api/" + req.file.path
  });
  try {
    let Product = await newProdut.save();
    res.status(201).json({
      Product: Product,
      message: "Pizza added successfully"
    });
  } catch (err) {
    res.status(400).json({ error: "error uploading image", err });
  }
});

module.exports = router;
