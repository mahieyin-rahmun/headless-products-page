const path = require("path");

// initialize .env file if in DEVELOPMENT mode
if (process.env.NODE_ENV === "dev") {
	require("dotenv").config({
		path: path.resolve(__dirname, "./.env")
	});
}

// define port
const PORT = process.env.PORT || 3001;

// necessary imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const winston = require("winston");
const expressWinston = require("express-winston");
const passport = require("passport");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// express app
const app = express();


// express app config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passport config
app.use(passport.initialize());
app.use(passport.session());

// session config, required by flash
app.use(session({
	cookie: { maxAge: 60000 },
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
}));

// flash config
app.use(flash());

// logger config
app.use(expressWinston.logger({
	transports: [
		new winston.transports.File({ filename: 'headless-info.log' })
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	)
}));

// error logger config
app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.File({ filename: 'headless-error.log' })
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	)
}));


// database options
const dbURI = process.env.dbURI;
const dbOptions = {
	keepAlive: 30000,
	connectTimeoutMS: 30000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
};

mongoose.connect(dbURI, dbOptions)
	.then(() => console.log("Connected to MongoDB Atlas"))
	.catch(err => console.log(err));

app.use(express.static(path.resolve(__dirname, "./build")));

// product routes
app.use("/api/v1/products", productRoutes);
// authentication routes
app.use("/api/v1/auth", authRoutes);

app.get("*/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./build/index.html"));
});


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

module.exports = app;