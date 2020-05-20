const mongoose = require("mongoose");

const User = mongoose.model(
	"User",

	{
		provider: {
			type: String
		},

		username: { 
			type: String,
			unique: true
		},

		userEmail: {
			type: String,
			unique: true
		},

		password: { 
			type: String
		},

		userID: {
			type: String,
			unique: true
		}

	},

	"users"
);

module.exports = User;