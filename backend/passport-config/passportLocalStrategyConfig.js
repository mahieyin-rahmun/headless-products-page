const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

const passportLocalStrategyConfig = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.userID);
	});

	passport.deserializeUser((userID, done) => {
		User.findOne({userID: userID}, (err, user) => {
			if (err) {
				return done(err);
			}

			return done(null, user);
		});
	});

	passport.use("local-signup", new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true	
		},

		(req, email, password, done) => {
			User.findOne({ $or: [{ userEmail: email }, { username: req.body.username }] }, (err, user) => {
				if (err) {
					return done(err);
				}

				if (user) {
					if (user.username === req.body.username) {
						return done(null, false, req.flash("signupFailed", "User already exists with the given username!"));
					}
					return done(null, false, req.flash("signupFailed", "User already exists with the given email!"));
				} else {
					const userID = v4();

					const newUser = new User({
            provider: "local",
            username: req.body.username,
            userEmail: email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
            userID: userID
			    });

			    newUser.save((err, user) => {
			    	if (err) {
			    		return done(err);
			    	}

			    	return done(null, user);
			    });
				}
			});
		}
	));

	passport.use("local-login", new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true	
		},

		(req, email, password, done) => {
			User.findOne({ userEmail: email }, (err, user) => {
				if (err) {
					return done(err);
				}

				if (user) {
					if (user.provider === "local") {
						const savedPassword = user.password;
						const isPasswordMatched = bcrypt.compareSync(password, savedPassword);

						if (isPasswordMatched) {
							return done(null, user);
						}
						return done(null, false, req.flash("loginFailed", "Incorrect password"));
					}
					
					return done(null, false, req.flash("loginFailed", "User signed up with a different auth provider before. Please use the appropriate auth provider."));
				}

				return done(null, false, req.flash("loginFailed", "The user doesn't exist!"));
			});
		}
	));
}


module.exports = passportLocalStrategyConfig;