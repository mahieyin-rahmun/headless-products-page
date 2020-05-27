const mongoose = require("mongoose");

const Order = mongoose.model("Order",
  {
    orderID: {
      type: String,
      unique: true
    },
    userID: {
      type: String
    },
    products: {
      type: Array
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    totalAmount: {
      type: Number
    }
  },
  "orders"
);

module.exports = Order;