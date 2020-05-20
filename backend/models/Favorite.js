const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite",
  {
    userID: {
      type: String,
      unique: true
    },
    productIDs: {
      type: Array,
      default: []
    }
  },
  "favorites"
);

module.exports = Favorite;