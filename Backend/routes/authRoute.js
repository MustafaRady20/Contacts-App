const express = require("express")
const { SignUp,Login, RefreshToken } = require("../controllers/AuthController")

const router = express.Router()


router.route("/signUp").post(SignUp)
router.route("/login").post(Login)
router.route("/refresh").get(RefreshToken)


module.exports = router