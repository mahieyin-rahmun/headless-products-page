const { Router } = require("express");

const localAuthRoutes = require("./auth/localAuthRoutes");
const googleAuthRoutes = require("./auth/googleAuthRoutes");

const verifyToken = require("./auth/utils/middleware/verifyToken");

const router = Router();

router.use("/local", localAuthRoutes);
router.use("/google", googleAuthRoutes);

router.get("/verify", verifyToken, (req, res) => {
	res.send({
		messageType: "success"
	});
});

module.exports = router;
