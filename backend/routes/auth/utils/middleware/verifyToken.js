const jwt = require("jsonwebtoken");
const User = require("../../../../models/User");

/*
	Helper function to generate the Verification Failed message.
	
	@return	{object}	the message JSON object
*/
const getVerificationFailedMessage = (messageBody = "") => ({ messageType: "error", messageBody: messageBody });


/*
	Middleware function to check whether the incoming token from the user is valid
	
	The header must be named "Authorization"
	The token should be formatted like "Bearer <token>"
	Aborts and sends back error message if token could not be verified

	@return {function} next	success in executing the middleware || {object} verification failed JSON object 
*/

const verifyToken = (req, res, next) => {
	let token = req.get("Authorization");

	// if token does not exist
	if (!token) {
		return res.status(401).json(getVerificationFailedMessage());
	}

	token = token.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		// if the verification process fails
		if (err) {
			return res.status(401).json(getVerificationFailedMessage("Login state expired. Re-enter your credentials."));
		}
			
		if (!decoded) {
			return res.status(401).json(getVerificationFailedMessage("Malformed token"));
	  }

	  const { userID } = decoded;

	  User.findOne({ userID: userID }, (err, user) => {
	  	if (err) {
	  		// if can't look up the database for the user
				return res.status(401).json(getVerificationFailedMessage("Internal server error while communicating with database. Please try again in a few minutes."));
	  	}

	  	// proceed if user exists
			if (user) {
				// attach the decoded userObject to the req object
				req.user = user;
	  		return next();
	  	}

	  	// user does not exist in the database
			return res.status(401).json(getVerificationFailedMessage("The owner of this token does not exist in the database."));
	  });
	});
}

module.exports = verifyToken;
