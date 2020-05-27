const { Router } = require("express");
const { v4 } = require("uuid");

const Product = require("../models/Product");
const Favorite = require("../models/Favorite");
const Order = require("../models/Order");
const verifyToken = require("./auth/utils/middleware/verifyToken");

const router = Router();

/*
	GET /api/v1/products
	
	@returns 
		on-success => { messageType: String, messageBody: Array }	
		on-failure => { messageType: String, messageBody: String }	
*/
router.get("/", verifyToken, (req, res) => {
	Product.find({}, (err, docs) => {
		if (err) {
			return res.status(500).send({
				messageType: "error",
				messageBody: "Internal server error" 
			});
		}

		if (docs.length > 0) {
			return res.json({
				messageType: "success",
				messageBody: docs
			});
		} else {
			return res.json({
				messageType: "success",
				messageBody: []
			});
		}		
	})
});


router.get("/orders", verifyToken, (req, res) => {
	const { userID } = req.user;
	Order.find({ userID: userID }, (err, docs) => {
		if (err) {
			return res.status(500).send({
				messageType: "error",
				messageBody: "Internal server error"
			});
		}

		if (docs.length > 0) {
			return res.json({
				messageType: "success",
				messageBody: docs
			});
		} else {
			return res.json({
				messageType: "success",
				messageBody: []
			});
		}
	})
});


router.get("/favorite", verifyToken, (req, res) => {
	const { userID } = req.user;

	Favorite.find({ userID: userID }, (err, user) => {
		if (err) {
			return res.status(500).send({
				messageType: "error",
				messageBody: "Internal server error"
			});
		}

		if (user.length > 0) {
			return res.json({
				messageType: "success",
				messageBody: {
					productIDs: user[0].productIDs
				}
			});
		} else {
			return res.json({
				messageType: "success",
				messageBody: {
					productIDs: []
				}
			});
		}
	});
});


router.post("/favorite", verifyToken, (req, res) => {
	const { productID } = req.body;
	const { userID } = req.user;

	if (!productID) {
		return res.status(400).send({
			messageType: "error",
			messageBody: "Bad request"
		});
	}

	Favorite.find({ userID: userID }, (err, user) => {
		if (err) {
			return res.status(500).send({
				messageType: "error",
				messageBody: "Internal server error"
			});
		}

		// if the user has favorited products before, update the existing array of favorited product IDs
		if (user.length > 0) {
			Favorite.updateOne({ userID: userID }, { "$addToSet": { "productIDs": productID } }, (err, doc) => {
				if (err) {
					return res.status(500).send({
						messageType: "error",
						messageBody: "Internal server error"
					});
				}

				return res.json({
					messageType: "success"
				});
			});
		} else {
			// user is using favorites option for the first time
			const newFavorite = new Favorite({
				userID: userID,
				productIDs: [productID]
			});

			newFavorite.save((err, favoriteDoc) => {
				if (err) {
					return res.status(500).send({
						messageType: "error",
						messageBody: "Internal server error"
					});
				}

				return res.json({
					messageType: "success"
				});
			});
		}
	});
});


router.post("/unfavorite", verifyToken, (req, res) => {
	const { productID } = req.body;
	const { userID } = req.user;

	if (!productID) {
		return res.status(400).send({
			messageType: "error",
			messageBody: "Bad request"
		});
	}

	Favorite.find({ userID: userID }, (err, user) => {
		if (err) {
			return res.status(500).send({
				messageType: "error",
				messageBody: "Internal server error"
			});
		}

		// remove the product ID from the array of favorite products
		if (user) {
			Favorite.updateOne({ userID: userID }, { "$pull": { "productIDs": productID } }, { safe: true } ,(err, doc) => {
				if (err) {
					return res.status(500).send({
						messageType: "error",
						messageBody: "Internal server error"
					});
				}

				return res.json({
					messageType: "success"
				});
			});
		} else {
			return res.status(400).send({
				messageType: "error",
				messageBody: "Bad request. User not found"
			});
		}
	});
});

router.post("/confirmorder", verifyToken, (req, res) => {
	// products is an array containing
	// product id, quantity, price
	const { products } = req.body;
	const { userID } = req.user;

	// calculate total price
	let totalPrice = 0;
	for (let i = 0; i < products.length; i++) {
		totalPrice += products[i].price * products[i].quantity;
	}

	const order = new Order({
		orderID: v4(),
		userID: userID,
		products: products,
		totalAmount: totalPrice
	});

	order.save((err, orderDoc) => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				messageType: "error",
				messageBody: "Internal server error"
			});
		}

		return res.json({
			messageType: "success",
			messageBody: orderDoc
		});
	})

});

module.exports = router;