const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passportGoogleStrategyConfig = (passport) => {
	passport.serializeUser((user, done) => {
		return done(null, user);
	});

	passport.deserializeUser((userID, done) => {
		User.findOne({ userID: userID }, (err, user) => {
			if (err) {
				return done(err);
			}

			return done(null, user);
		});
	});

	passport.use(new GoogleStrategy(
		{
			callbackURL: "/api/v1/auth/google/callback",
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			passReqToCallback: true	
		},
		(req, accessToken, refreshToken, profile, done) => {
			User.findOne({ $or: [ { userID: profile.id }, { userEmail: profile.emails[0].value } ]  }, (err, user) => {
				if (err) {
					return done(err);
				}

				if (user) {
					if (user.provider === "google") {
						return done(null, user);
					}

					return done(null, false, req.flash("loginFailed", "User signed up with a different auth provider before. Please use the appropriate auth provider."));					
				}

				// user doesn't exist, first time logging in
        const newGoogleUser = new User({
          provider: profile.provider,
          username: profile.displayName.toLowerCase(),
          userEmail: profile.emails[0].value,
          userID: profile.id,
        });

        newGoogleUser.save((err, user) => {
        	if (err) {
        		return done(err);
        	}

        	return done(null, user);
        })
 			});
		}
	));
};

module.exports = passportGoogleStrategyConfig;