const mongoose = require("mongoose");
const OrdersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  Products: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  Address: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true }
});
module.exports = mongoose.model("Order", OrdersSchema);
