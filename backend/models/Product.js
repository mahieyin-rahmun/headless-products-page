const mongoose = require("mongoose");

const Product = mongoose.model(
	"Product",

	{
		name: {
			type: String,
			unique: true
		},
		price: {
			type: Number
		},
		imageURL: {
			type: String
		}
	},

	"products"
);

module.exports = Product;