const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

require("../../passport-config/passportLocalStrategyConfig")(passport);

const router = Router();

router.post("/login", (req, res, next) => {
	passport.authenticate("local-login", (err, user, info) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			return res.status(401).json({
				messageType: "error",
				messageBody: req.flash("loginFailed")[0]
			});
		}

		req.logIn(user, async (err) => {
			if (err) {
				return next(err);
			}

			const userObject = {
				userID: user.userID,
				provider: user.provider
			};

			const token = await jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: "2h" });

			return res.json({
				messageType: "success",
				token: token
			});
		});
	})(req, res, next);
});


router.post("/signup", (req, res, next) => {
	passport.authenticate("local-signup", async (err, user, info) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			return res.status(401).json({
				messageType: "error",
				messageBody: req.flash("signupFailed")[0]
			});
		}

		const userObject = {
			userID: user.userID,
			provider: user.provider
		};

		const token = await jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: "2h" });

		return res.json({
			messageType: "success",
			token: token
		});

	})(req, res, next);
});


module.exports = router;