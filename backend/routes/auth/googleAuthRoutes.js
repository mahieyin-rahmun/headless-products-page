const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const queryString = require("querystring");

require("../../passport-config/passportGoogleStrategyConfig")(passport);

const router = Router();


router.get("/login", passport.authenticate("google", {
	scope: ["profile", "email"],
	prompt: "select_account"
}));


router.get("/callback", (req, res, next) => {
	passport.authenticate("google", async (err, user, info) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			return res.redirect("/api/v1/auth/google/failed");
		}

		const userObject = {
			provider: user.provider,
			userID: user.userID
		};

		const token = await jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: "2h" });

		const qs = queryString.stringify({
			messageType: "success",
			token: token
		});

		return res.redirect("/login/success/" + qs);
	})(req, res, next);
});


router.get("/failed", (req, res) => {
	const qs = queryString.stringify({
		messageType: "error",
		messageBody: req.flash("loginFailed")[0]
	});

	return res.redirect("/login/failed/" + qs);
})


module.exports = router;