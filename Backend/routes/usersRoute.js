const express = require("express")
const router = express.Router()


const { getAll } = require("../controllers/Users")


router.route("/").get(getAll)


module.exports = router