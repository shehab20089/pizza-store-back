const mongoose = require("mongoose");
const OrdersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Products: [{ id: mongoose.Schema.Types.ObjectId, quantity: Number }],
  Address: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true }
});
module.exports = mongoose.model("Order", OrdersSchema);
