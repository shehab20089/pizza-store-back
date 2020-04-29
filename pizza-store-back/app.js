var express = require("express");
var cors = require("cors");
const mongoos = require("mongoose");
const env = require("dotenv").config();
var path = require("path");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");
var OrderRouter = require("./routes/order");
mongoos.connect(
  `mongodb+srv://shehab20089:${process.env.MONGO_ATLAS_PW}@cluster0-1qwga.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/uploads", express.static("uploads"));
app.use("/api/", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/product", productRouter);
app.use("/api/order", OrderRouter);
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
